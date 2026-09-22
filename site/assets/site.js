const button=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
if(button&&nav){
 const close=()=>{button.setAttribute('aria-expanded','false');nav.classList.remove('open');};
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
 nav.addEventListener('click',e=>{if(e.target.closest('a'))close();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){close();button.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.header'))close();});
 matchMedia('(min-width: 801px)').addEventListener('change',e=>{if(e.matches)close();});
}
