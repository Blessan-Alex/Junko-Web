import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "..");
const tsxCli = path.join(root, "node_modules", "tsx", "dist", "cli.mjs");
const script = path.join(__dirname, "assert-product-seo.mts");

execSync(`node "${tsxCli}" "${script}"`, { cwd: root, stdio: "inherit" });
