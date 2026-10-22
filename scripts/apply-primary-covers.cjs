const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const descriptions = ['', 'Thỏ, gấu và gà con đọc sách', 'Cáo và vịt đi học trong khu vườn', 'Gấu trúc và thỏ làm xe buýt giấy', 'Gấu trúc đỏ và gấu khám phá khu rừng', 'Cáo và gấu thả máy bay giấy'];
// Các bản dựng lại gọi script này để giữ bìa và không thêm lại mục chọn lớp.
for (let grade = 1; grade <= 5; grade++) {
  const dir = path.join(root, `grade/lop${grade}`);
  for (const name of fs.readdirSync(dir).filter(name => name.endsWith('.html'))) {
    const file = path.join(dir, name);
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/^[ \t]*<primary-grade-nav\b[^>]*><\/primary-grade-nav>\s*\r?\n/gm, '')
      .replace(/^[ \t]*<script src="\.\.\/\.\.\/shared\/primary-grade-nav\.js"><\/script>\s*\r?\n/gm, '');
    if (name === `lop${grade}.html` && !html.includes('primary-cover-hero')) {
      html = html.replace('</head>', '  <link rel="stylesheet" href="../../shared/primary-covers.css?v=pencil-1">\n</head>');
      html = html.replace(/<body([^>]*)>/, (_, attrs) => attrs.includes('class=')
        ? `<body${attrs.replace(/class="([^"]*)"/, `class="$1 primary-cover-page primary-cover-${grade}"`)}>`
        : `<body${attrs} class="primary-cover-page primary-cover-${grade}">`);
      html = html.replace(/<header class="(?:g4-hero|hero)">([\s\S]*?)<\/header>/, (_, content) => {
        if (grade === 2) content = content.replace(/\s*<div class="hero-content">\s*<div class="hero-text">/, '').replace(/\s*<\/div>\s*<\/div>\s*$/, '');
        // Giữ hướng dẫn thao tác tại nơi chọn bài; bỏ dòng phụ lặp tiêu đề.
        content = content.replace(/\s*<p class="g4-subtitle">[^<]*<\/p>/, '');
        return `<header class="${grade === 2 ? 'hero' : 'g4-hero'} primary-cover-hero">\n    <div class="primary-cover-copy">${content}\n    </div>\n    <img class="primary-cover-art" src="./assets/images/grade${grade}-cover-pencil-v1.webp" width="1200" height="800" alt="${['', 'Thỏ, gấu và gà con đọc sách', 'Cáo và vịt đi học trong khu vườn', 'Gấu trúc và thỏ làm xe buýt giấy', 'Gấu trúc đỏ và gấu khám phá khu rừng', 'Cáo và gấu thả máy bay giấy'][grade]}" fetchpriority="high">\n  </header>`;
      });
    }
    if (name === `lop${grade}.html`) {
      html = html.replace(/^[ \t]+$/gm, '');
      html = html.replace(/primary-cover-[1-5](?=["\s])/g, `primary-cover-${grade}`)
        .replace(/grade[1-5]-cover-pencil-v1.webp/g, `grade${grade}-cover-pencil-v1.webp`)
        .replace(/(<img class="primary-cover-art"[^>]*alt=")[^"]*/, `$1${descriptions[grade]}`);
    }
    if (html !== fs.readFileSync(file, 'utf8')) fs.writeFileSync(file, html);
  }
}
