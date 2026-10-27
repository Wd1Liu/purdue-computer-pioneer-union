 'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menuButton && navigation) {
  const closeMenu = () => { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); }
  });
}

// Preserve shared links from the old overlay reader, but navigate to a real page.
const legacyPages = {
  'chips-ai': '/notes/flashattention-4.html',
  'quantitative-research': '/notes/rd-agent-quant.html',
  robotics: '/notes/pi07-robot-coaching.html',
  'autonomous-driving': '/notes/waymo-world-model.html',
  'ai-education': '/notes/ai-tutor-study-routine.html',
  'ai-healthcare': '/notes/amie-video-consultations.html',
  'multimodal-vision': '/notes/sam-3-concept-segmentation.html'
};
function followLegacyReaderLink() {
  const hash = location.hash;
  if (hash.startsWith('#article/')) {
    const destination = legacyPages[hash.slice(9)];
    if (destination) location.replace(destination);
  } else if (hash === '#event/ai') location.replace('/events/from-hbm-to-agents.html');
  else if (hash === '#event/xr') location.replace('/events/ego-scaling.html');
}
window.addEventListener('hashchange', followLegacyReaderLink);
followLegacyReaderLink();

function initOrbit() {
// A lightweight original orbital diagram: deterministic geometry, no libraries.
const canvas=document.querySelector('#frontier-canvas');if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');let width=0,height=0,frame=0,visible=true,raf=0;
const orbitParticles=Array.from({length:42},(_,i)=>({orbit:i%3,phase:i*2.399963,radius:i%7===0?2.8:1.6}));
function resizeCanvas(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(false)}
function orbitPoint(angle,orbit){const radius=Math.min(width,height)*.37;const tilt=[-.47,.69,1.66][orbit];const x=Math.cos(angle)*radius;const y=Math.sin(angle)*radius*[.42,.59,.38][orbit];return{x:width*.5+x*Math.cos(tilt)-y*Math.sin(tilt),y:height*.48+x*Math.sin(tilt)+y*Math.cos(tilt),depth:Math.sin(angle)}}
function draw(animate=true){ctx.clearRect(0,0,width,height);const cx=width*.5,cy=height*.48;const radius=Math.min(width,height)*.37;const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,radius*1.25);glow.addColorStop(0,'rgba(129,146,87,0.08)');glow.addColorStop(1,'rgba(129,146,87,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);ctx.setLineDash([2,7]);ctx.strokeStyle='rgba(164,180,128,0.17)';ctx.lineWidth=.6;ctx.beginPath();ctx.arc(cx,cy,radius*1.13,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);for(let orbit=0;orbit<3;orbit++){ctx.beginPath();for(let step=0;step<=160;step++){const p=orbitPoint(step/160*Math.PI*2,orbit);step?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)}ctx.strokeStyle=['rgba(216,187,131,0.63)','rgba(165,187,120,0.38)','rgba(216,187,131,0.35)'][orbit];ctx.lineWidth=.8;ctx.stroke()}const time=frame*.0018;const points=orbitParticles.map(p=>({...orbitPoint(p.phase+time*(p.orbit%2?-1:1),p.orbit),radius:p.radius}));for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],distance=Math.hypot(a.x-b.x,a.y-b.y);if(distance<radius*.6&&distance>radius*.15){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(170,184,131,${.1*(1-distance/(radius*.6))})`;ctx.lineWidth=.5;ctx.stroke()}}}points.forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);ctx.fillStyle=p.radius>2?'#e5c98e':`rgba(191,207,150,${.45+(p.depth+1)*.22})`;ctx.fill();if(p.radius>2){ctx.beginPath();ctx.arc(p.x,p.y,6,0,Math.PI*2);ctx.strokeStyle='rgba(216,187,131,.16)';ctx.stroke()}});ctx.strokeStyle='rgba(216,187,131,.14)';ctx.beginPath();ctx.moveTo(cx-radius*1.15,cy);ctx.lineTo(cx-radius*.22,cy);ctx.moveTo(cx+radius*.22,cy);ctx.lineTo(cx+radius*1.15,cy);ctx.stroke();if(animate&&!reducedMotion.matches&&visible){frame++;raf=requestAnimationFrame(()=>draw())}}
const resizeObserver=new ResizeObserver(resizeCanvas);resizeObserver.observe(canvas);const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;cancelAnimationFrame(raf);if(visible)draw()},{threshold:0});visibilityObserver.observe(canvas);reducedMotion.addEventListener('change',()=>{cancelAnimationFrame(raf);draw()});document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(raf);if(!document.hidden&&visible)draw()});

}
initOrbit();
