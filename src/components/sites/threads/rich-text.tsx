import Link from "next/link";
import { USERS } from "./data";
import { profileHref, searchHref } from "./href";

/** #hashtags (Latin, accented Latin, Hangul) and @handles. split() keeps the captured tokens at odd indexes. */
const TOKEN = /(#[0-9A-Za-z_À-ɏᄀ-ᇿ㄰-㆏가-힣]+|@[A-Za-z0-9._]+)/;

const KNOWN_HANDLES: ReadonlySet<string> = new Set(USERS.map((user) => user.handle));

/** Post body text: hashtags link to search, known @mentions link to profiles. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        if (index % 2 === 0) return part;
        if (part.startsWith("#")) {
          return (
            <Link key={index} href={searchHref(part)} className="hover:underline">
              {part}
            </Link>
          );
        }
        const handle = part.slice(1).replace(/\.+$/, "");
        if (KNOWN_HANDLES.has(handle)) {
          return (
            <Link key={index} href={profileHref(handle)} className="font-semibold hover:underline">
              {part}
            </Link>
          );
        }
        return part;
      })}
    </>
  );
}
