const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const sharedFile = path.join(root, 'shared', 'contact-footer.js');
const pages = [path.join(root, 'index.html')];
const errors = [];

function findHtml(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) findHtml(file);
    else if (entry.isFile() && entry.name.endsWith('.html')) pages.push(file);
  }
}

findHtml(path.join(root, 'grade'));
if (!fs.existsSync(sharedFile)) errors.push('Thiếu shared/contact-footer.js');

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const name = path.relative(root, file);
  const opening = (html.match(/<contact-danh\b[^>]*>/gi) || []).length;
  const closing = (html.match(/<\/contact-danh\s*>/gi) || []).length;
  if (opening !== 1 || closing !== 1) errors.push(`${name}: cần đúng một cặp <contact-danh>`);
  if (/<footer\b/i.test(html)) errors.push(`${name}: có footer HTML trùng với footer dùng chung`);
  if (/components\.js/i.test(html)) errors.push(`${name}: còn tham chiếu components.js cũ`);

  const scripts = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi)]
    .map(match => match[2].split(/[?#]/, 1)[0]);
  const sharedScripts = scripts.filter(src => src.endsWith('contact-footer.js'));
  if (sharedScripts.length !== 1) {
    errors.push(`${name}: cần đúng một script contact-footer.js`);
  } else if (path.resolve(path.dirname(file), sharedScripts[0]) !== sharedFile) {
    errors.push(`${name}: đường dẫn contact-footer.js không trỏ tới file dùng chung`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exitCode = 1;
} else {
  console.log(`Footer hợp lệ trên ${pages.length} trang (trang chủ và các trang trong grade).`);
}
