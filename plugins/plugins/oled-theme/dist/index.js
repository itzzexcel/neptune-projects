var g=Object.defineProperty;var x=Object.getOwnPropertyDescriptor;var I=Object.getOwnPropertyNames;var S=Object.prototype.hasOwnProperty;var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var v=(e,t)=>{for(var r in t)g(e,r,{get:t[r],enumerable:!0})},k=(e,t,r,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let c of I(t))!S.call(e,c)&&c!==r&&g(e,c,{get:()=>t[c],enumerable:!(a=x(t,c))||a.enumerable});return e};var N=e=>k(g({},"__esModule",{value:!0}),e);var b={};v(b,{Tracer:()=>y,libTrace:()=>R});import{actions as f}from"@neptune";var y,R,h=A(()=>{"use strict";y=e=>{let t=s=>{let i=(...l)=>{s(e,...l)};return i.withContext=l=>(...p)=>{s(e,l,...p)},i},r=t(console.log),a=t(console.warn),c=t(console.error),o=t(console.debug),n=(s,i,l)=>{let p=m=>{s(m),i({message:`${e} - ${m}`,category:"OTHER",severity:l})};return p.withContext=m=>{let w=s.withContext(m);return u=>{w(u),u instanceof Error&&(u=u.message),i({message:`${e}.${m} - ${u}`,category:"OTHER",severity:l})}},p};return{log:r,warn:a,err:c,debug:o,msg:{log:n(r,f.message.messageInfo,"INFO"),warn:n(a,f.message.messageWarn,"WARN"),err:n(c,f.message.messageError,"ERROR")}}},R=y("[lib]")});h();import{intercept as O}from"@neptune";h();var _=y("[OLED Theme]"),L="https://raw.githubusercontent.com/ItzzExcel/neptune-projects/refs/heads/main/themes/black-neptune-theme.css",C,d,T=new MutationObserver(e=>{e.forEach(()=>{E()})});function P(){let e=document.querySelector('span[data-test="now-playing-track-title"]');e&&T.observe(e,{characterData:!0,childList:!0,subtree:!0,innerHTML:!0})}function D(e){let t=document.createElement("style");return t.type="text/css",t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e)),document.head.appendChild(t),t}function U(){d&&d.parentNode&&d.parentNode.removeChild(d)}async function $(e){try{let t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return await t.text()}catch(t){return _.msg.err(`Failed to fetch URL: ${t.message}`),null}}(async()=>(C=await $(L),d=D(C)))();var E=function(e=0){e===1&&setTimeout(()=>{E()},2e3);let t=document.querySelector('figure[class*="albumImage"] > div > div > div > img'),r;t&&(r=t.src,r=r.replace(/\d+x\d+/,"1280x1280"),t.src=r);let a=document.querySelector('[class*="nowPlayingContainer"]');if(a&&r){a.querySelectorAll(".corner-image").forEach(s=>s.remove());let o=document.createElement("img");o.src=r,o.className="corner-image",o.style.position="absolute",o.style.left="50%",o.style.top="50%",o.style.transform="translate(-50%, -50%)",o.style.width="75vw",o.style.height="150vh",o.style.objectFit="cover",o.style.zIndex="-1",o.style.filter="blur(100px) brightness(0.6) contrast(1.2) saturate(1)",o.style.animation="spin 35s linear infinite",a.appendChild(o);let n=document.createElement("img");if(n.src=r,n.className="corner-image",n.style.position="absolute",n.style.left="50%",n.style.top="50%",n.style.transform="translate(-50%, -50%)",n.style.width="75vw",n.style.height="150vh",n.style.objectFit="cover",n.style.zIndex="-1",n.style.filter="blur(100px) brightness(0.6) contrast(1.2) saturate(1)",n.style.animation="spin 35s linear infinite",a.appendChild(n),!document.querySelector("#spinAnimation")){let s=document.createElement("style");s.id="spinAnimation",s.textContent=`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `,document.head.appendChild(s)}}},q=function(){[...document.getElementsByClassName("corner-image")].forEach(e=>{e.remove()})},F=["playbackControls/PREFILL_MEDIA_PRODUCT_TRANSITION","playbackControls/MEDIA_PRODUCT_TRANSITION","playbackControls/SEEK","playbackControls/SET_PLAYBACK_STATE","playbackControls/TIME_UPDATE","playbackControls/"],M=F.map(e=>O(e,E));P();function Y(){U(),M.forEach(e=>e()),q(),T.disconnect()}export{Y as onUnload};
