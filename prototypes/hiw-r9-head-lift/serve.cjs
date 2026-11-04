// Local review only. The application routes and port 3000 are untouched.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const publicRoot = path.resolve(process.env.HIW_PUBLIC_ROOT || path.join(root, '../../public'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.wasm': 'application/wasm', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };
http.createServer((req, res) => {
  let url;
  try { url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  const local = url.startsWith('/hiw-r8/');
  const base = local ? root : publicRoot;
  const home = url === '/' || url === '/index';
  const file = home ? path.join(root, 'home.html') : path.resolve(base, '.' + (local ? url.slice(7) : url));
  if (!home && !file.startsWith(base + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
}).listen(4690, '127.0.0.1', () => console.log('R9 review: http://127.0.0.1:4690/index'));
