if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let o={};const d=e=>s(e,t),f={module:{uri:t},exports:o,require:d};i[t]=Promise.all(n.map((e=>f[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3625d7b0"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-6c9c8a2b.js",revision:null},{url:"assets/index-cd0c1bb5.css",revision:null},{url:"index.html",revision:"e9650f918b040765631eaea55af662df"},{url:"registerSW.js",revision:"8ffe0bd2f2af65989f1a2bd109d784e5"},{url:"icons/512.png",revision:"206d2d383ea704d54ee8f39d4bfd3b1f"},{url:"manifest.webmanifest",revision:"bd2f60b388e716c84aaef2227d94b070"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
