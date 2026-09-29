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
const contactForm=document.querySelector('.contact-form');
if(contactForm){
 const status=contactForm.querySelector('.form-status');
 const submit=contactForm.querySelector('button[type="submit"]');
 const preview=['localhost','127.0.0.1','[::1]'].includes(location.hostname)||location.protocol==='file:';
 contactForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(submit.disabled||!contactForm.reportValidity())return;
  if(preview){status.textContent='This preview does not send messages. Please email Michael directly using the link beside this form.';status.focus();return;}
  const body=new URLSearchParams(new FormData(contactForm)).toString();
  submit.disabled=true;
  contactForm.setAttribute('aria-busy','true');
  status.textContent='Sending your message…';
  try{
   const response=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body,signal:AbortSignal.timeout(20000)});
   if(!response.ok)throw new Error('Submission failed');
   contactForm.reset();
   status.textContent='Thank you. Your message has been submitted.';
  }catch(error){
   status.textContent=error.name==='TimeoutError'?'We could not confirm receipt. Please email Michael directly before sending again.':'Your message could not be sent. Please try again or email Michael directly.';
  }finally{
   submit.disabled=false;
   contactForm.removeAttribute('aria-busy');
   status.focus();
  }
 });
}
