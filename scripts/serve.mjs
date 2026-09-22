import './build.mjs';
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('dist');const port=Number(process.env.PORT||4174);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{try{let path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);return res.end();}if((await stat(path)).isDirectory())path=resolve(path,'index.html');res.setHeader('Content-Type',types[extname(path)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(await readFile(path));}catch{res.writeHead(404,{'Content-Type':'text/html'});res.end(await readFile(resolve(root,'404.html')));}}).listen(port,'127.0.0.1',()=>console.log(`Preview: http://127.0.0.1:${port}`));
