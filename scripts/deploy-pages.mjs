// Deploys ./out to the gh-pages branch of this repository's `origin` (GitHub Pages: "Deploy from a branch").
// Build first with the Pages base path:
//   PowerShell:  $env:NEXT_PUBLIC_BASE_PATH='/threads'; npm run build
//   bash:        NEXT_PUBLIC_BASE_PATH=/threads npm run build
// Uses only Node built-ins and your existing git credentials; nothing is installed or downloaded.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const out = resolve("out");
if (!existsSync(join(out, "index.html"))) {
  console.error("out/index.html not found. Build first with NEXT_PUBLIC_BASE_PATH=/threads npm run build");
  process.exit(1);
}

const env = { ...process.env, GIT_TERMINAL_PROMPT: "0", GCM_INTERACTIVE: "never" };
const run = (args, cwd) => execFileSync("git", args, { cwd, env, stdio: ["ignore", "inherit", "inherit"] });
const read = (args) => execFileSync("git", args, { env, encoding: "utf8" }).trim();

const remote = read(["remote", "get-url", "origin"]);
const name = read(["config", "user.name"]);
const email = read(["config", "user.email"]);

const work = mkdtempSync(join(tmpdir(), "threads-pages-"));
try {
  cpSync(out, work, { recursive: true });
  // Keep GitHub Pages from running Jekyll, which would drop the _next folder.
  writeFileSync(join(work, ".nojekyll"), "");
  run(["init", "-q", "-b", "gh-pages"], work);
  run(["config", "user.name", name], work);
  run(["config", "user.email", email], work);
  run(["add", "-A"], work);
  run(["commit", "-q", "-m", `Deploy ${new Date().toISOString()}`], work);
  run(["push", "--force", remote, "gh-pages"], work);
  console.log(`Pushed gh-pages to ${remote}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
