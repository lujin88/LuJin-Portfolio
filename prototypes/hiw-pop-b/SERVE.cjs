const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,publicDir=process.env.PUBLIC_DIR||path.resolve(root,'../../public');
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.wasm':'application/wasm','.riv':'application/octet-stream','.png':'image/png','.woff2':'font/woff2','.svg':'image/svg+xml','.webp':'image/webp'};
const overrides={
 '/styles/shell-tokens.css':'shell-tokens.css','/styles/home-motion.css':'home-motion.css',
 '/':'index.html','/review':'index.html','/index':process.env.PUBLIC_DIR?'integration.html':'index.html',
 '/assets/vendor/rive/rive.js':'vendor/rive.js','/assets/vendor/rive/rive.wasm':'vendor/rive.wasm',
 '/assets/motion/how-i-work/r9/hiw-r9.js':'hiw-r9.js',
 '/assets/motion/how-i-work/r9/hiw-r9.css':'hiw-r9.css',
 '/assets/motion/how-i-work/r9/still-crop-ll.webp':'still.webp'
};
for(const name of ['bear','rabbit','fox'])overrides['/assets/motion/how-i-work/r9/'+name+'.riv']=name[0].toUpperCase()+name.slice(1)+'/build/'+name+'.riv';
module.exports=http.createServer((req,res)=>{
 let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400).end();return;}
 const file=overrides[url]?path.join(root,overrides[url]):path.resolve(publicDir,'.'+url);
 if(!overrides[url]&&!file.startsWith(publicDir+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(file,(error,data)=>{if(error){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'}).end(data);});
});
if(require.main===module)module.exports.listen(Number(process.env.PORT||4777),'127.0.0.1');
