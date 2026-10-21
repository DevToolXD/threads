/**
 * Minimal Firebase client over the public REST APIs (Identity Toolkit + Firestore): no SDK, no dependencies.
 * Active only when NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set at build time;
 * otherwise every call is a no-op and the app keeps using localStorage only.
 *
 * Data model (one document per anonymous visitor): users/{uid} { state: string (JSON), updatedAt: timestamp }.
 * Access is limited to the owner by firebase/firestore.rules.
 */
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "";
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "";

export const firebaseEnabled = API_KEY.length > 0 && PROJECT_ID.length > 0;

const AUTH_KEY = "threads.firebase.auth.v1";

interface StoredAuth {
  uid: string;
  idToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface RemoteState {
  state: string;
  updatedAt: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readAuth(): StoredAuth | null {
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      isRecord(parsed) &&
      typeof parsed.uid === "string" &&
      typeof parsed.idToken === "string" &&
      typeof parsed.refreshToken === "string" &&
      typeof parsed.expiresAt === "number"
    ) {
      return { uid: parsed.uid, idToken: parsed.idToken, refreshToken: parsed.refreshToken, expiresAt: parsed.expiresAt };
    }
  } catch {
    // Storage unavailable or corrupted: fall through to a fresh anonymous sign-in.
  }
  return null;
}

function writeAuth(auth: StoredAuth): void {
  try {
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch {
    // Private mode / quota: the session simply will not persist.
  }
}

function str(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) throw new Error(`Unexpected auth response: ${field}`);
  return value;
}

async function signUpAnonymously(): Promise<StoredAuth> {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${encodeURIComponent(API_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ returnSecureToken: true }),
  });
  if (!res.ok) throw new Error(`Anonymous sign-in failed (HTTP ${res.status})`);
  const data: unknown = await res.json();
  if (!isRecord(data)) throw new Error("Unexpected auth response");
  return {
    uid: str(data.localId, "localId"),
    idToken: str(data.idToken, "idToken"),
    refreshToken: str(data.refreshToken, "refreshToken"),
    expiresAt: Date.now() + Number(str(data.expiresIn, "expiresIn")) * 1000,
  };
}

async function refreshAuth(auth: StoredAuth): Promise<StoredAuth> {
  const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${encodeURIComponent(API_KEY)}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: auth.refreshToken }),
  });
  if (!res.ok) throw new Error(`Token refresh failed (HTTP ${res.status})`);
  const data: unknown = await res.json();
  if (!isRecord(data)) throw new Error("Unexpected token response");
  return {
    uid: str(data.user_id, "user_id"),
    idToken: str(data.id_token, "id_token"),
    refreshToken: str(data.refresh_token, "refresh_token"),
    expiresAt: Date.now() + Number(str(data.expires_in, "expires_in")) * 1000,
  };
}

let pendingAuth: Promise<StoredAuth> | null = null;

async function ensureAuth(): Promise<StoredAuth> {
  const stored = readAuth();
  if (stored && stored.expiresAt - Date.now() > 60_000) return stored;
  if (!pendingAuth) {
    pendingAuth = (async () => {
      try {
        const next = stored ? await refreshAuth(stored).catch(() => signUpAnonymously()) : await signUpAnonymously();
        writeAuth(next);
        return next;
      } finally {
        pendingAuth = null;
      }
    })();
  }
  return pendingAuth;
}

function documentUrl(uid: string): string {
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(PROJECT_ID)}/databases/(default)/documents/users/${encodeURIComponent(uid)}`;
}

/** Returns the visitor's saved state, or null when nothing is stored yet (or Firebase is not configured). */
export async function loadRemoteState(): Promise<RemoteState | null> {
  if (!firebaseEnabled) return null;
  const auth = await ensureAuth();
  const res = await fetch(documentUrl(auth.uid), { headers: { Authorization: `Bearer ${auth.idToken}` } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Firestore read failed (HTTP ${res.status})`);
  const doc: unknown = await res.json();
  if (!isRecord(doc) || !isRecord(doc.fields)) return null;
  const state = isRecord(doc.fields.state) ? doc.fields.state.stringValue : undefined;
  const updated = isRecord(doc.fields.updatedAt) ? doc.fields.updatedAt.timestampValue : undefined;
  if (typeof state !== "string") return null;
  return { state, updatedAt: typeof updated === "string" ? Date.parse(updated) || 0 : 0 };
}

/** Upserts the visitor's state document. */
export async function saveRemoteState(state: string): Promise<void> {
  if (!firebaseEnabled) return;
  const auth = await ensureAuth();
  const url = `${documentUrl(auth.uid)}?updateMask.fieldPaths=state&updateMask.fieldPaths=updatedAt`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${auth.idToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        state: { stringValue: state },
        updatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!res.ok) throw new Error(`Firestore write failed (HTTP ${res.status})`);
}
