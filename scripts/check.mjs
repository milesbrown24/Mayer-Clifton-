import {readFile,access} from 'node:fs/promises';
import {resolve} from 'node:path';
const pages=['index.html','company/index.html','team/index.html','services/index.html','transactions/index.html'];
let count=0;
for(const page of pages){const html=await readFile('dist/'+page,'utf8');if((html.match(/<h1>/g)||[]).length!==1)throw Error(`${page}: expected one h1`);if(/\bXXX\b/.test(html))throw Error(`${page}: unfinished copy`);for(const [,url] of html.matchAll(/(?:href|src)="(\/[^"#]*)(?:#[^"]*)?"/g)){await access(resolve('dist','.'+url+(url.endsWith('/')?'index.html':'')));count++;}}
const home=await readFile('dist/index.html','utf8');if(!home.includes('<h1>Goodwill<br>Integrity<br>Competence</h1>'))throw Error('Homepage headline mismatch');
const services=JSON.parse(await readFile('content/site.json','utf8')).services;if(services.length!==4||services.some(s=>!s.body||!s.capabilities.length))throw Error('Missing service content');
console.log(`Checked all five pages, ${count} local links/assets, homepage headline, and service content.`);

for(const page of pages){
 const html=await readFile('dist/'+page,'utf8');
 const form=html.match(/<form class="contact-form"[\s\S]*?<\/form>/)?.[0];
 if(!form||!form.includes('method="POST"')||!form.includes('data-netlify="true"')||!form.includes('netlify-honeypot="bot-field"')||!form.includes('name="form-name" value="reach-out"'))throw Error(`${page}: missing Netlify registration`);
 for(const id of ['contact-name','contact-email','contact-message']){
  if(!form.includes(`for="${id}"`)||!form.includes(`id="${id}"`))throw Error(`${page}: missing field label`);
 }
 if(!form.includes('action="/thank-you/"')||!html.includes('mailto:Michael@mayercliftonpartners.com'))throw Error(`${page}: missing contact destination`);
}
await access('dist/thank-you/index.html');
console.log('Verified Reach out form registration, labels, email link, and confirmation page. Email delivery requires Netlify configuration.');
