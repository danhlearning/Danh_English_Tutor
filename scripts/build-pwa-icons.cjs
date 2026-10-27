// Optional: regenerate app PNGs when app.svg changes (requires sharp).
const path = require('node:path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const root = path.resolve(__dirname, '..');
Promise.all([180, 192, 512].map(size => sharp(path.join(root, 'assets/icons/app.svg')).resize(size, size).png().toFile(path.join(root, `assets/icons/app-${size}.png`))))
  .then(() => console.log('PWA icons ready.')).catch(error => {console.error(error); process.exitCode = 1;});
