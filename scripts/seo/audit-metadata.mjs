/**
 * SEO metadata audit (titles + descriptions).
 * Usage:
 *   npm run seo:audit
 *   npm run seo:audit -- --out=docs/seo/phase-2-audit.json
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");

function parseArgs(argv) {
  let out = null;
  for (const arg of argv) {
    if (arg.startsWith("--out=")) out = arg.slice("--out=".length);
  }
  if (!out) {
    const date = new Date().toISOString().slice(0, 10);
    out = `docs/seo/phase-2-audit-${date}.json`;
  }
  return { out: path.join(root, out) };
}

function main() {
  const { out } = parseArgs(process.argv.slice(2));
  const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
  const runAudit = path.join(__dirname, "run-audit.mts");
  const stdout = execSync(`node "${tsxCli}" "${runAudit}"`, {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    cwd: root,
  });
  const report = JSON.parse(stdout);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(report, null, 2), "utf8");
  console.log(`Wrote ${path.relative(root, out)}`);
  console.log("Summary:", JSON.stringify(report.summary));
  const dupMeta = report.summary.byType?.meta_duplicate ?? 0;
  const dupTitle = report.summary.byType?.title_duplicate ?? 0;
  if (dupMeta > 0 || dupTitle > 0) {
    process.exitCode = 2;
  }
}

main();
