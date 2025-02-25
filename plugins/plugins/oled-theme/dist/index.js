var g=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var S=Object.getOwnPropertyNames;var I=Object.prototype.hasOwnProperty;var w=(t,e)=>()=>(t&&(e=t(t=0)),e);var v=(t,e)=>{for(var r in e)g(t,r,{get:e[r],enumerable:!0})},A=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let c of S(e))!I.call(t,c)&&c!==r&&g(t,c,{get:()=>e[c],enumerable:!(a=x(e,c))||a.enumerable});return t};var N=t=>A(g({},"__esModule",{value:!0}),t);var C={};v(C,{Tracer:()=>y,libTrace:()=>k});import{actions as h}from"@neptune";var y,k,E=w(()=>{"use strict";y=t=>{let e=s=>{let l=(...i)=>{s(t,...i)};return l.withContext=i=>(...p)=>{s(t,i,...p)},l},r=e(console.log),a=e(console.warn),c=e(console.error),o=e(console.debug),n=(s,l,i)=>{let p=m=>{s(m),l({message:`${t} - ${m}`,category:"OTHER",severity:i})};return p.withContext=m=>{let b=s.withContext(m);return u=>{b(u),u instanceof Error&&(u=u.message),l({message:`${t}.${m} - ${u}`,category:"OTHER",severity:i})}},p};return{log:r,warn:a,err:c,debug:o,msg:{log:n(r,h.message.messageInfo,"INFO"),warn:n(a,h.message.messageWarn,"WARN"),err:n(c,h.message.messageError,"ERROR")}}},k=y("[lib]")});E();import{intercept as R}from"@neptune";E();var O=y("[OLED Theme]"),_="https://raw.githubusercontent.com/ItzzExcel/neptune-projects/refs/heads/main/themes/black-neptune-theme.css",T,d;function D(){let t=document.querySelector('div[class*="textContainer--"] > a > span');t&&t.addEventListener("DOMSubtreeModified",()=>{setTimeout(()=>{f()},300)})}function L(t){let e=document.createElement("style");return e.type="text/css",e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t)),document.head.appendChild(e),e}function P(){d&&d.parentNode&&d.parentNode.removeChild(d)}async function M(t){try{let e=await fetch(t);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);return await e.text()}catch(e){return O.msg.err(`Failed to fetch URL: ${e.message}`),null}}(async()=>(T=await M(_),d=L(T)))();var f=function(t=0){t===1&&setTimeout(()=>{f()},2e3);let e=document.querySelector('figure[class*="albumImage"] > div > div > div > img'),r;e&&(r=e.src,r=r.replace(/\d+x\d+/,"1280x1280"),e.src=r);let a=document.querySelector('[class*="nowPlayingContainer"]');if(a&&r){a.querySelectorAll(".corner-image").forEach(s=>s.remove());let o=document.createElement("img");o.src=r,o.className="corner-image",o.style.position="absolute",o.style.left="50%",o.style.top="50%",o.style.transform="translate(-50%, -50%)",o.style.width="75vw",o.style.height="150vh",o.style.objectFit="cover",o.style.zIndex="-1",o.style.filter="blur(100px) brightness(0.6) contrast(1.2) saturate(1)",o.style.animation="spin 35s linear infinite",a.appendChild(o);let n=document.createElement("img");if(n.src=r,n.className="corner-image",n.style.position="absolute",n.style.left="50%",n.style.top="50%",n.style.transform="translate(-50%, -50%)",n.style.width="75vw",n.style.height="150vh",n.style.objectFit="cover",n.style.zIndex="-1",n.style.filter="blur(100px) brightness(0.6) contrast(1.2) saturate(1)",n.style.animation="spin 35s linear infinite",a.appendChild(n),!document.querySelector("#spinAnimation")){let s=document.createElement("style");s.id="spinAnimation",s.textContent=`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `,document.head.appendChild(s)}}},U=function(){[...document.getElementsByClassName("corner-image")].forEach(t=>{t.remove()})},q=["playbackControls/PREFILL_MEDIA_PRODUCT_TRANSITION","playbackControls/MEDIA_PRODUCT_TRANSITION","playbackControls/SEEK","playbackControls/SET_PLAYBACK_STATE","playbackControls/TIME_UPDATE"];D();var $=q.map(t=>R(t,f));function W(){P(),$.forEach(e=>e()),U();let t=document.querySelector('div[class*="textContainer--"] > a > span');t&&t.removeEventListener("DOMSubtreeModified",f)}export{W as onUnload};
