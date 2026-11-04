const pptxgen = require('pptxgenjs');
const fs = require('node:fs');
const path = require('node:path');
const slides = require('../docs/slides.json');
const root = path.join(__dirname, '..');
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'KNOL';
pptx.title = '교실에서 바로 쓰는 웹 도구';
pptx.lang = 'ko-KR';
const ink = '132722', paper = 'F6F5EF', green = '1A614F', muted = '526760', white = 'FFFFFF';
const fontFace = 'Apple SD Gothic Neo';
function txt(slide, value, x, y, w, h, options = {}) {
  slide.addText(value, { x, y, w, h, fontFace, fontSize: 16, color: ink, margin: 0, valign: 'mid', breakLine: false, ...options });
}
function box(slide, x, y, w, h, fill) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, line: { color: fill }, fill: { color: fill } });
}
function photo(slide, id, x, y, w, h) {
  const file = path.join(root, 'assets', 'screenshots', id + '.png');
  if (!fs.existsSync(file)) throw new Error('Missing screenshot: ' + file);
  box(slide, x - .08, y - .08, w + .16, h + .16, 'E2E8DF');
  const png = fs.readFileSync(file);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const scale = Math.min(w / width, h / height);
  const fittedWidth = width * scale;
  const fittedHeight = height * scale;
  slide.addImage({
    path: file,
    x: x + (w - fittedWidth) / 2, y: y + (h - fittedHeight) / 2,
    w: fittedWidth, h: fittedHeight, altText: id + ' 공개 서비스 화면',
  });
}
function link(slide, label, url, x, y, w) {
  txt(slide, label, x, y, w, .3, { fontSize: 11, bold: true, color: green, hyperlink: { url } });
}
slides.forEach((data, index) => {
  const s = pptx.addSlide();
  const isCover = data.kind === 'cover';
  const isEnd = data.kind === 'end';
  s.background = { color: isCover ? ink : paper };
  const fg = isCover ? white : ink;
  const small = isCover ? 'B9D8C9' : green;
  txt(s, data.tag, .64, .44, 11.9, .32, { color: small, fontSize: 13, bold: true });
  box(s, .64, .94, 12.03, .018, isCover ? '50766A' : 'C5D5C9');
  if (isCover) {
    txt(s, data.title, .64, 1.47, 6.5, 2.14, { fontSize: 38, bold: true, color: fg });
    txt(s, data.body, .67, 3.85, 5.65, 1.13, { fontSize: 17, color: 'E1EDE6' });
    txt(s, data.label, .67, 5.52, 6.1, .45, { fontSize: 14, color: small, bold: true });
    photo(s, 'art-tile', 7.13, 1.59, 5.37, 3.15);
    photo(s, 'print', 8.5, 4.48, 3.95, 1.86);
  } else if (isEnd) {
    txt(s, data.title, .65, 1.43, 11.8, 1.85, { fontSize: 39, bold: true });
    txt(s, data.body, .66, 3.46, 10.95, .91, { fontSize: 20, color: muted });
    slides.filter(d => ['record','art-tile','print','quiz'].includes(d.image)).forEach((d, i) => {
      const x = .67 + i * 3.05;
      box(s, x, 4.95, 2.78, .95, 'E4EEE4');
      link(s, d.tag.split(' · ').at(-1) + ' 열기 ↗', d.url, x + .18, 5.26, 2.44);
    });
  } else if (data.images) {
    txt(s, data.title.replace('\n', ' '), .65, 1.24, 12, .83, { fontSize: 32, bold: true });
    txt(s, data.body.replaceAll('\n', '   '), .67, 2.12, 11.96, .66, { fontSize: 14, color: muted });
    data.images.forEach((id, i) => photo(s, id, .78 + i * 6.05, 3.01, 5.72, 3.05));
    txt(s, '01  놀아트 · 작품 제작', .78, 6.23, 5.72, .34, { fontSize: 12, color: green });
    txt(s, '02  놀프린트 · 분할 출력', 6.83, 6.23, 5.72, .34, { fontSize: 12, color: green });
  } else {
    txt(s, data.title, .64, 1.43, 4.65, 2.0, { fontSize: 28, bold: true });
    txt(s, data.body, .66, 3.52, 4.26, 1.68, { fontSize: 16, color: muted });
    link(s, '공개 서비스 열기 ↗', data.url, .66, 5.67, 4.55);
    if (data.secondary) link(s, '살아남기 시리즈 둘러보기 ↗', data.secondary, .66, 6.07, 4.55);
    photo(s, data.image, 5.51, 1.46, 7.06, 4.84);
    txt(s, data.label, 5.51, 6.44, 7.06, .25, { fontSize: 10, color: muted, align: 'right' });
  }
  txt(s, 'KNOL  /  웹 포트폴리오', .65, 7.01, 7, .22, { fontSize: 9, color: small });
  txt(s, String(index + 1).padStart(2, '0'), 11.91, 7.01, .74, .22, { fontSize: 10, color: small, align: 'right' });
});
pptx.writeFile({ fileName: path.join(root, 'deliverables', 'knol-portfolio.pptx') }).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
