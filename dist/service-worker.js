if(!self.define){let l,o={};const r=(r,i)=>(r=new URL(r+".js",i).href,o[r]||new Promise((o=>{if("document"in self){const l=document.createElement("script");l.src=r,l.onload=o,document.head.appendChild(l)}else l=r,importScripts(r),o()})).then((()=>{let l=o[r];if(!l)throw new Error(`Module ${r} didn’t register its module`);return l})));self.define=(i,n)=>{const e=l||("document"in self?document.currentScript.src:"")||location.href;if(o[e])return;let a={};const p=l=>r(l,e),c={module:{uri:e},exports:a,require:p};o[e]=Promise.all(i.map((l=>c[l]||p(l)))).then((l=>(n(...l),a)))}}define(["./workbox-d6430d1c"],(function(l){"use strict";l.setCacheNameDetails({prefix:"proyectofinal"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/proyectoFinalRpalrod/img/HideIcon.a9a79c96.png",revision:null},{url:"/proyectoFinalRpalrod/img/LogoOscuroTransparente.bb9b3ca6.png",revision:null},{url:"/proyectoFinalRpalrod/img/LupaBlanca.85d3dc92.png",revision:null},{url:"/proyectoFinalRpalrod/img/SeeThrough.145eb1a4.png",revision:null},{url:"/proyectoFinalRpalrod/img/UnHideIcon.aeb20bf3.png",revision:null},{url:"/proyectoFinalRpalrod/img/blackUser.7fd50797.png",revision:null},{url:"/proyectoFinalRpalrod/img/bolsoBlanco.5f4ec665.png",revision:null},{url:"/proyectoFinalRpalrod/img/cancel.f31a3304.png",revision:null},{url:"/proyectoFinalRpalrod/img/checked.184f69c9.png",revision:null},{url:"/proyectoFinalRpalrod/img/contact-mail.d519e92a.png",revision:null},{url:"/proyectoFinalRpalrod/img/delivery.94c34f3d.png",revision:null},{url:"/proyectoFinalRpalrod/img/gift.dcbf2785.png",revision:null},{url:"/proyectoFinalRpalrod/img/imInicioUsoWeb.9e0b7ac3.jpg",revision:null},{url:"/proyectoFinalRpalrod/img/imSec2.acd0cebe.png",revision:null},{url:"/proyectoFinalRpalrod/img/imSec2Comprimida.79b1675a.jpg",revision:null},{url:"/proyectoFinalRpalrod/img/imSec3.65d1ecff.jpg",revision:null},{url:"/proyectoFinalRpalrod/img/imSec3comprimida.461063eb.jpg",revision:null},{url:"/proyectoFinalRpalrod/img/imagenComprimidaGuia.904ab54e.jpg",revision:null},{url:"/proyectoFinalRpalrod/img/imagenContactoComprmida.e450fb06.jpg",revision:null},{url:"/proyectoFinalRpalrod/img/isntagramIcon.1b79477c.png",revision:null},{url:"/proyectoFinalRpalrod/img/trash-can.9d385316.png",revision:null},{url:"/proyectoFinalRpalrod/img/twitterIcon.e2a3ac89.png",revision:null},{url:"/proyectoFinalRpalrod/img/unVoted.a6e5c9f4.png",revision:null},{url:"/proyectoFinalRpalrod/img/usuario.f8ef7cb7.png",revision:null},{url:"/proyectoFinalRpalrod/img/whatsapp.7e588c81.png",revision:null},{url:"/proyectoFinalRpalrod/img/worldIcon.b4347293.png",revision:null},{url:"/proyectoFinalRpalrod/index.html",revision:"804f1fa087233275cb2614780a59087d"},{url:"/proyectoFinalRpalrod/js/122.82e8f625.js",revision:null},{url:"/proyectoFinalRpalrod/js/125.54660d3b.js",revision:null},{url:"/proyectoFinalRpalrod/js/237.6ca747ed.js",revision:null},{url:"/proyectoFinalRpalrod/js/27.9cf8106f.js",revision:null},{url:"/proyectoFinalRpalrod/js/289.3ecece88.js",revision:null},{url:"/proyectoFinalRpalrod/js/303.f9775163.js",revision:null},{url:"/proyectoFinalRpalrod/js/468.708f4dd1.js",revision:null},{url:"/proyectoFinalRpalrod/js/542.0bc72b8b.js",revision:null},{url:"/proyectoFinalRpalrod/js/578.238566b6.js",revision:null},{url:"/proyectoFinalRpalrod/js/624.93fa8631.js",revision:null},{url:"/proyectoFinalRpalrod/js/664.5264c437.js",revision:null},{url:"/proyectoFinalRpalrod/js/700.8a2ff0fb.js",revision:null},{url:"/proyectoFinalRpalrod/js/827.ea7ce91a.js",revision:null},{url:"/proyectoFinalRpalrod/js/85.2c89abdd.js",revision:null},{url:"/proyectoFinalRpalrod/js/870.cbd0582e.js",revision:null},{url:"/proyectoFinalRpalrod/js/997.64229ba4.js",revision:null},{url:"/proyectoFinalRpalrod/js/app.56fe9f89.js",revision:null},{url:"/proyectoFinalRpalrod/js/chunk-vendors.531bec07.js",revision:null},{url:"/proyectoFinalRpalrod/manifest.json",revision:"4b5e8b2ebf6286f2872778a2fe44324f"},{url:"/proyectoFinalRpalrod/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
