import {readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
const pages=['index.html','company/index.html','team/index.html','services/index.html','transactions/index.html'];
let count=0;
for(const page of pages){const html=await readFile('dist/'+page,'utf8');if((html.match(/<h1>/g)||[]).length!==1)throw Error(`${page}: expected one h1`);if(/\bXXX\b/.test(html))throw Error(`${page}: unfinished copy`);for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){await access(resolve('dist','.'+url+(url.endsWith('/')?'index.html':'')));count++;}}
const home=await readFile('dist/index.html','utf8');if(!home.includes('<h1>Goodwill<br>Integrity<br>Competence</h1>'))throw Error('Homepage headline mismatch');
const services=JSON.parse(await readFile('content/site.json','utf8')).services;if(services.length!==4||services.some(s=>!s.body||!s.capabilities.length))throw Error('Missing service content');
console.log(`Checked all five pages, ${count} local links/assets, homepage headline, and service content.`);
