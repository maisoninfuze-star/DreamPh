import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('./', import.meta.url).pathname;
const PORT = process.env.PORT || 8190;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ico': 'image/x-icon',
  '.json': 'application/json',
};

async function resolve(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p === '/' || p === '') return join(ROOT, 'index.html');
  let fp = join(ROOT, p);
  try { const s = await stat(fp); if (s.isDirectory()) fp = join(fp, 'index.html'); return fp; } catch {}
  // Webflow extensionless route -> .html
  try { await stat(fp + '.html'); return fp + '.html'; } catch {}
  return fp;
}

createServer(async (req, res) => {
  try {
    const fp = await resolve(req.url);
    const buf = await readFile(fp);
    res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
    res.end(buf);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: ' + req.url);
  }
}).listen(PORT, () => console.log('Tangan clone running at http://localhost:' + PORT));
