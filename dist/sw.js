if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const f=e=>i(e,t),d={module:{uri:t},exports:o,require:f};s[t]=Promise.all(n.map((e=>d[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-5111ff10.css",revision:null},{url:"assets/index-6514b6c0.js",revision:null},{url:"index.html",revision:"977fde19eb34a8056835c8cf9bd26ec3"},{url:"registerSW.js",revision:"8ffe0bd2f2af65989f1a2bd109d784e5"},{url:"icons/512.png",revision:"206d2d383ea704d54ee8f39d4bfd3b1f"},{url:"manifest.webmanifest",revision:"bd2f60b388e716c84aaef2227d94b070"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
