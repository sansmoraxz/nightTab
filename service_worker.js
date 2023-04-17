(()=>{"use strict";const e=async function(e,t){let n=await caches.match(t.request),i=t.request;if(void 0!==n)return n;{const t=await fetch(i),n=t.clone(),s=await caches.open(e);return await s.put(i,n),t}},t=async function(e,t){let n=t.request;try{const t=await fetch(n),i=t.clone(),s=await caches.open(e);return await s.put(n,i),t}catch(e){return caches.match(t.request)}},n=[{url:/^chrome-extension:.*$/i,handle:async function(e,t){return fetch(t.request)}},{url:/^https:\/\/\w*\.github\.io\/nightTab\/.*$/i,handle:e},{url:/^(ftp|https?):.*\.(jpe?g|png|gif|svg)($|\?.*)/i,handle:e},{url:/^(ftp|https?):.*\.(mp\d|webm|ogg|wav|flac)($|\?.*)/i,handle:e},{url:/^(ftp|https?):.*\.(ttf|otf|woff\d?)($|\?.*)/i,handle:e},{url:/^(ftp|https?):.*\.([jt]sp?|css|html?)($|\?.*)/i,handle:t},{url:/^(ftp|https?):.*\.(csv|json|txt|xml)($|\?.*)/i,handle:t},{url:/.+/i,handle:e}],i="nightTab",s="7.5.0",a=`nightTab-${s}`;self.addEventListener("install",(e=>{console.log("serviceWorker installing..."),e.waitUntil((async()=>{await caches.open(a).then((e=>{chrome?.extension?console.log("running in chrome extension, nothing to cache"):e.addAll(["/","/index.html"])})),console.log("serviceWorker installed...")}))})),self.addEventListener("fetch",(e=>{"GET"!==e.request.method&&e.respondWith(fetch(e.request));let t=n.find((t=>t.url.test(e.request.url)));e.respondWith(t.handle(a,e))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){let t=e.filter((function(e){return e.indexOf(i)}));return t.push(a),Promise.all(e.map((function(n,i){if(-1===t.indexOf(n))return console.log("deleting cache : "+e[i]),caches.delete(e[i])})))}))),console.log("serviceWorker version "+s+" activated")}))})();