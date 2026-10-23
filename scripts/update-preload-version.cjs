const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || ['artifacts', 'output', 'outputs', 'tmp', 'node_modules', 'tests', 'docs'].includes(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!/\.(html|cjs)$/.test(entry.name) || file === __filename) continue;
    const before = fs.readFileSync(file, 'utf8');
    const after = before.replace(/(shared\/learner-profile\.js)(?:\?v=[\w.-]+)?(?=["'])/g, '$1?v=ui-20261022');
    if (before !== after) { fs.writeFileSync(file, after); count++; }
  }
}
walk(root);
console.log(`Updated learner script version in ${count} pages/templates/builders.`);
