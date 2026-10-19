const { execSync } = require("child_process");
const path = require("path");

const RUN_LOAD = path.join(__dirname, "run-load.mts");
const TSX_CLI = path.join(
  __dirname,
  "..",
  "..",
  "node_modules",
  "tsx",
  "dist",
  "cli.mjs",
);
const MAX_BUFFER = 10 * 1024 * 1024;

function loadCatalog() {
  const stdout = execSync(`node "${TSX_CLI}" "${RUN_LOAD}"`, {
    encoding: "utf8",
    maxBuffer: MAX_BUFFER,
    cwd: path.join(__dirname, "..", ".."),
  });
  return JSON.parse(stdout);
}

module.exports = { loadCatalog };
