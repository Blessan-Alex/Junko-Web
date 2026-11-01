const fs = require("fs");
const path = process.argv[2];
const h = fs.readFileSync(path, "utf8");
const headEnd = h.indexOf("</head>");
const can = h.indexOf('rel="canonical"');
const title = h.indexOf("<title");
const delayed = h.indexOf('id="_R_"');
console.log({
  file: path,
  headEnd,
  can,
  title,
  canInHead: can > 0 && can < headEnd,
  titleInHead: title > 0 && title < headEnd,
  delayedMetaAfterR: delayed > 0 && can > delayed,
});
