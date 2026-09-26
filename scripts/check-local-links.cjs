const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pages = [];
const errors = [];
function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'templates') continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (entry.isFile() && entry.name.endsWith('.html')) pages.push(file);
  }
}
visit(root);
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8')
    .replace(/<!--[^]*?-->/g, '')
    .replace(/(<script\b[^>]*>)[^]*?<\/script>/gi, '$1</script>')
    .replace(/(<style\b[^>]*>)[^]*?<\/style>/gi, '$1</style>');
  const ids = new Set();
  for (const match of html.matchAll(/<([a-z][\w-]*)\b([^<>]*)>/gi)) {
    const [, tag, attributes] = match;
    const id = attributes.match(/\bid\s*=\s*(["'])(.*?)\1/i)?.[2];
    if (id) {
      if (ids.has(id)) errors.push(`${path.relative(root, page)}: ID trùng ${id}`);
      ids.add(id);
    }
    const attribute = /^(a|link)$/i.test(tag) ? 'href' : /^(script|img|iframe|audio|video|source)$/i.test(tag) ? 'src' : null;
    if (!attribute) continue;
    const value = attributes.match(new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'i'))?.[2];
    if (!value || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) continue;
    const pathname = decodeURIComponent(value.split(/[?#]/, 1)[0]);
    if (!pathname) continue;
    const target = path.resolve(path.dirname(page), pathname);
    if (!fs.existsSync(target)) errors.push(`${path.relative(root, page)}: thiếu ${value}`);
  }
}
if (errors.length) {
  errors.forEach(error => console.error(error));
  process.exitCode = 1;
} else console.log(`Liên kết và ID hợp lệ trên ${pages.length} trang đang dùng.`);
