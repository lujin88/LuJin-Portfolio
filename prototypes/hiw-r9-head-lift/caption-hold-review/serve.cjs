// Review only: a captured home document + the developer's exact SPEED=2/HOLD=2 controller.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.woff2':'font/woff2','.wasm':'application/wasm','.mp4':'video/mp4','.riv':'application/octet-stream'};
const publicRoot=process.env.HIW_PUBLIC_ROOT && path.resolve(process.env.HIW_PUBLIC_ROOT);
http.createServer((req,res)=>{
 const u=new URL(req.url,'http://localhost').pathname;
 const names={bear:'Bear',rabbit:'Rabbit',fox:'Fox'};
 let file;
 if(u==='/'||u==='/index')file=path.join(__dirname,'home.html');
 if(u==='/hiwx/hiw-r9.js')file=path.join(__dirname,'developer-controller.js');
 const m=/^\/assets\/motion\/how-i-work\/r9\/(bear|rabbit|fox)\.riv$/.exec(u);
 if(m)file=path.join(__dirname,'..',names[m[1]],'build',m[1]+'.riv');
 // Optional read-only fallback after reboot when the canonical server is down.
 if(!file&&publicRoot){
  const candidate=path.resolve(publicRoot,'.'+decodeURIComponent(u));
  if(candidate.startsWith(publicRoot+path.sep)&&fs.existsSync(candidate)&&fs.statSync(candidate).isFile())file=candidate;
 }
 if(file){fs.readFile(file,(e,b)=>{if(e){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'}).end(b)});return;}
 const proxy=http.request({hostname:'127.0.0.1',port:3000,path:req.url,method:'GET'},r=>{res.writeHead(r.statusCode,r.headers);r.pipe(res)});
 proxy.on('error',()=>res.writeHead(502).end());proxy.end();
}).listen(4696,'127.0.0.1',()=>console.log('Caption hold review http://127.0.0.1:4696/index'));
