if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const d=e=>i(e,t),l={module:{uri:t},exports:o,require:d};s[t]=Promise.all(n.map((e=>l[e]||d(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-7a4c5d95.js",revision:null},{url:"assets/index-7ed778fd.css",revision:null},{url:"index.html",revision:"563ed6740570c25e40549e3c420a2985"},{url:"registerSW.js",revision:"8ffe0bd2f2af65989f1a2bd109d784e5"},{url:"icons/512.png",revision:"206d2d383ea704d54ee8f39d4bfd3b1f"},{url:"manifest.webmanifest",revision:"bd2f60b388e716c84aaef2227d94b070"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
