import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ORIGIN = 'https://www.tangan.fr';
const OUT = new URL('./', import.meta.url).pathname;

const pages = ['/', '/reflexologie-plantaire', '/massage-abhyanga', '/physioscan', '/contact'];

// Seed assets discovered from the live DOM
const seedAssets = new Set([
  '/css/normalize.css',
  '/css/webflow.css',
  '/css/tangan.webflow.css',
  '/js/jquery-3.5.1.min.dc5e7f18c8_site-5bc989248743153705f137da.js',
  '/js/webflow.js',
  '/luxy_js/dist/js/luxy.js',
  '/images/favicon.png',
  '/images/webclip.png',
  '/5bc989248743153705f137da/6040e04dca42f6d760b0ba2d_home-massage-poster-00001.jpg',
  '/images/reflexo.jpg',
  '/images/massage_ayurvedique.jpg',
  '/images/physioscan.jpg',
  '/images/home__thumb__reflexologie.jpg',
  '/images/home__thumb__massage.jpg',
  '/images/home__thumb__physioscan.jpg',
  '/5bc989248743153705f137da/6040e04dca42f6d760b0ba2d_home-massage-transcode.mp4',
  '/5bc989248743153705f137da/6040e04dca42f6d760b0ba2d_home-massage-transcode.webm',
]);

const downloaded = new Set();
const failed = [];

function toLocalPath(pathname) {
  // pages -> index.html files
  if (pathname === '/' || pathname === '') return 'index.html';
  if (!/\.[a-z0-9]{2,5}$/i.test(pathname)) return pathname.replace(/^\//, '') + '.html';
  return pathname.replace(/^\//, '');
}

async function fetchBuf(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36' } });
  if (!res.ok) throw new Error(res.status + ' ' + url);
  return Buffer.from(await res.arrayBuffer());
}

async function save(pathname, buf) {
  const local = join(OUT, toLocalPath(pathname));
  await mkdir(dirname(local), { recursive: true });
  await writeFile(local, buf);
}

async function getAsset(pathname) {
  if (downloaded.has(pathname)) return;
  downloaded.add(pathname);
  try {
    const buf = await fetchBuf(ORIGIN + pathname);
    await save(pathname, buf);
    // Parse CSS for nested url() assets
    if (pathname.endsWith('.css')) {
      const css = buf.toString('utf8');
      const cssAbs = ORIGIN + pathname; // base for resolving relative url()
      for (const m of css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
        let u = m[2].trim();
        if (u.startsWith('data:')) continue;
        if (u.startsWith('//')) u = 'https:' + u;
        // Resolve relative (../, ./, bare) against the CSS file's URL
        const abs = new URL(u, cssAbs);
        if (!abs.hostname.includes('tangan.fr')) continue;
        seedAssets.add(abs.pathname.split('?')[0]);
      }
    }
    process.stdout.write('.');
  } catch (e) { failed.push(pathname + ' -> ' + e.message); process.stdout.write('x'); }
}

// 1. Download HTML pages
const htmlAssets = new Set();
for (const p of pages) {
  try {
    const buf = await fetchBuf(ORIGIN + (p === '/' ? '/' : p));
    let html = buf.toString('utf8');
    // collect assets referenced in html
    for (const m of html.matchAll(/(?:src|href|content|poster)=["']([^"']+)["']/g)) {
      let u = m[1].trim();
      if (u.startsWith('data:') || u.startsWith('mailto:') || u.startsWith('tel:') || u.startsWith('#')) continue;
      if (u.startsWith('//')) u = 'https:' + u;
      if (u.startsWith('http')) { if (!u.includes('tangan.fr')) continue; u = new URL(u).pathname; }
      if (!u.startsWith('/')) continue;
      const clean = u.split('?')[0].split('#')[0];
      if (/\.(css|js|jpg|jpeg|png|gif|svg|webp|mp4|webm|woff2?|ttf|eot|ico|json)$/i.test(clean)) htmlAssets.add(clean);
    }
    // also srcset
    for (const m of html.matchAll(/srcset=["']([^"']+)["']/g)) {
      for (const part of m[1].split(',')) {
        let u = part.trim().split(/\s+/)[0];
        if (u && u.includes('tangan.fr')) u = new URL(u.startsWith('http')?u:'https://www.tangan.fr'+u).pathname;
        if (u && u.startsWith('/')) htmlAssets.add(u.split('?')[0]);
      }
    }
    await save(p, buf);
    process.stdout.write('H');
  } catch (e) { failed.push('PAGE ' + p + ' -> ' + e.message); process.stdout.write('X'); }
}

// merge
for (const a of htmlAssets) seedAssets.add(a);

// 2. Download all assets (CSS first so nested url()s get queued)
const cssFirst = [...seedAssets].sort((a,b)=> (a.endsWith('.css')?-1:0) - (b.endsWith('.css')?-1:0));
for (const a of cssFirst) await getAsset(a);
// second pass for nested css assets
for (const a of [...seedAssets]) await getAsset(a);

console.log('\n\nDownloaded:', downloaded.size, 'assets +', pages.length, 'pages');
if (failed.length) console.log('FAILED (' + failed.length + '):\n' + failed.join('\n'));
else console.log('No failures.');
