

// ==========================================
// ARCHIVO: js/config.js
// ==========================================

/* ══════════════════════════════════════
   CONFIG GLOBAL — Wufly
   Constantes compartidas por todos los módulos.
   Este archivo debe cargarse PRIMERO en index.html.
   ══════════════════════════════════════ */

const SUPABASE_URL  = 'https://ybnacudfqerbzpvqcjzc.supabase.co';
const SUPABASE_REF  = 'ybnacudfqerbzpvqcjzc';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibmFjdWRmcWVyYnpwdnFjanpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzYzNjksImV4cCI6MjA5MTk1MjM2OX0.pQ4PVNS1wqHvnvEPO0TYwlMS6ooDpsP7DaYXqdTbFxE';


// ==========================================
// ARCHIVO: js/supabase.min.js
// ==========================================

/**
 * Minified by jsDelivr using Terser v5.39.0.
 * Original file: /npm/@supabase/supabase-js@2.104.1/dist/umd/supabase.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var supabase=function(e){function t(e,t){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(r[s[i]]=e[s[i]])}return r}var r,s=class extends Error{constructor(e,t="FunctionsError",r){super(e),this.name=t,this.context=r}toJSON(){return{name:this.name,message:this.message,context:this.context}}},i=class extends s{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}},a=class extends s{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}},n=class extends s{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}};!function(e){e.Any="any",e.ApNortheast1="ap-northeast-1",e.ApNortheast2="ap-northeast-2",e.ApSouth1="ap-south-1",e.ApSoutheast1="ap-southeast-1",e.ApSoutheast2="ap-southeast-2",e.CaCentral1="ca-central-1",e.EuCentral1="eu-central-1",e.EuWest1="eu-west-1",e.EuWest2="eu-west-2",e.EuWest3="eu-west-3",e.SaEast1="sa-east-1",e.UsEast1="us-east-1",e.UsWest1="us-west-1",e.UsWest2="us-west-2"}(r||={});var o=class{constructor(e,{headers:t={},customFetch:s,region:i=r.Any}={}){this.url=e,this.headers=t,this.region=i,this.fetch=(e=>e?(...t)=>e(...t):(...e)=>fetch(...e))(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return function(e,t,r,s){function i(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||=Promise)((function(r,a){function n(e){try{h(s.next(e))}catch(e){a(e)}}function o(e){try{h(s.throw(e))}catch(e){a(e)}}function h(e){e.done?r(e.value):i(e.value).then(n,o)}h((s=s.apply(e,t||[])).next())}))}(this,arguments,void 0,(function*(e,t={}){let r,s;try{let{headers:o,method:h,body:c,signal:l,timeout:u}=t,d={},{region:p}=t;p||=this.region;let f,g=new URL(`${this.url}/${e}`);p&&"any"!==p&&(d["x-region"]=p,g.searchParams.set("forceFunctionRegion",p)),c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(d["Content-Type"]="application/octet-stream",f=c):"string"==typeof c?(d["Content-Type"]="text/plain",f=c):typeof FormData<"u"&&c instanceof FormData?f=c:(d["Content-Type"]="application/json",f=JSON.stringify(c)):f=!c||"string"==typeof c||typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer||typeof FormData<"u"&&c instanceof FormData?c:JSON.stringify(c);let m=l;u&&(s=new AbortController,r=setTimeout((()=>s.abort()),u),l?(m=s.signal,l.addEventListener("abort",(()=>s.abort()))):m=s.signal);let y=yield this.fetch(g.toString(),{method:h||"POST",headers:Object.assign(Object.assign(Object.assign({},d),this.headers),o),body:f,signal:m}).catch((e=>{throw new i(e)})),b=y.headers.get("x-relay-error");if(b&&"true"===b)throw new a(y);if(!y.ok)throw new n(y);let w,_=(y.headers.get("Content-Type")??"text/plain").split(";")[0].trim();return w="application/json"===_?yield y.json():"application/octet-stream"===_||"application/pdf"===_?yield y.blob():"text/event-stream"===_?y:"multipart/form-data"===_?yield y.formData():yield y.text(),{data:w,error:null,response:y}}catch(e){return{data:null,error:e,response:e instanceof n||e instanceof a?e.context:void 0}}finally{r&&clearTimeout(r)}}))}};let h=e=>Math.min(1e3*2**e,3e4),c=[520,503],l=["GET","HEAD","OPTIONS"];var u=class extends Error{constructor(e){super(e.message),this.name="PostgrestError",this.details=e.details,this.hint=e.hint,this.code=e.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function d(e,t){return new Promise((r=>{if(t?.aborted)return void r();let s=setTimeout((()=>{t?.removeEventListener("abort",i),r()}),e);function i(){clearTimeout(s),r()}t?.addEventListener("abort",i)}))}function p(e,t,r,s){return!(!s||r>=3||!l.includes(e)||!c.includes(t))}var f=class{constructor(e){this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=e.method,this.url=e.url,this.headers=new Headers(e.headers),this.schema=e.schema,this.body=e.body,this.shouldThrowOnError=e.shouldThrowOnError??!1,this.signal=e.signal,this.isMaybeSingle=e.isMaybeSingle??!1,this.shouldStripNulls=e.shouldStripNulls??!1,this.urlLengthLimit=e.urlLengthLimit??8e3,this.retryEnabled=e.retry??!0,e.fetch?this.fetch=e.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if("text/csv"===this.headers.get("Accept"))throw Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(e,t){return this.headers=new Headers(this.headers),this.headers.set(e,t),this}retry(e){return this.retryEnabled=e,this}then(e,t){var r=this;if(void 0===this.schema||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),"GET"!==this.method&&"HEAD"!==this.method&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){let e=this.headers.get("Accept");"application/vnd.pgrst.object+json"===e?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!e||"application/json"===e)&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}let s=this.fetch,i=(async()=>{let e=0;for(;;){let t,i=new Headers(r.headers);e>0&&i.set("X-Retry-Count",String(e));try{t=await s(r.url.toString(),{method:r.method,headers:i,body:JSON.stringify(r.body,((e,t)=>"bigint"==typeof t?t.toString():t)),signal:r.signal})}catch(t){if("AbortError"===t?.name||"ABORT_ERR"===t?.code||!l.includes(r.method))throw t;if(r.retryEnabled&&e<3){let t=h(e);e++,await d(t,r.signal);continue}throw t}if(!p(r.method,t.status,e,r.retryEnabled))return await r.processResponse(t);{let s=t.headers?.get("Retry-After")??null,i=null===s?h(e):1e3*Math.max(0,parseInt(s,10)||0);await t.text(),e++,await d(i,r.signal)}}})();return this.shouldThrowOnError||(i=i.catch((e=>{let t="",r="",s="",i=e?.cause;if(i){let r=i?.message??"",s=i?.code??"";t=`${e?.name??"FetchError"}: ${e?.message}`,t+=`\n\nCaused by: ${i?.name??"Error"}: ${r}`,s&&(t+=` (${s})`),i?.stack&&(t+=`\n${i.stack}`)}else t=e?.stack??"";let a=this.url.toString().length;return"AbortError"===e?.name||"ABORT_ERR"===e?.code?(s="",r="Request was aborted (timeout or manual cancellation)",a>this.urlLengthLimit&&(r+=`. Note: Your request URL is ${a} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):("HeadersOverflowError"===i?.name||"UND_ERR_HEADERS_OVERFLOW"===i?.code)&&(s="",r="HTTP headers exceeded server limits (typically 16KB)",a>this.urlLengthLimit&&(r+=`. Your request URL is ${a} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${e?.name??"FetchError"}: ${e?.message}`,details:t,hint:r,code:s},data:null,count:null,status:0,statusText:""}}))),i.then(e,t)}async processResponse(e){var t=this;let r=null,s=null,i=null,a=e.status,n=e.statusText;if(e.ok){if("HEAD"!==t.method){let r=await e.text();""===r||(s="text/csv"===t.headers.get("Accept")||t.headers.get("Accept")&&t.headers.get("Accept")?.includes("application/vnd.pgrst.plan+text")?r:JSON.parse(r))}let o=t.headers.get("Prefer")?.match(/count=(exact|planned|estimated)/),h=e.headers.get("content-range")?.split("/");o&&h&&h.length>1&&(i=parseInt(h[1])),t.isMaybeSingle&&Array.isArray(s)&&(s.length>1?(r={code:"PGRST116",details:`Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},s=null,i=null,a=406,n="Not Acceptable"):s=1===s.length?s[0]:null)}else{let i=await e.text();try{r=JSON.parse(i),Array.isArray(r)&&404===e.status&&(s=[],r=null,a=200,n="OK")}catch{404===e.status&&""===i?(a=204,n="No Content"):r={message:i}}if(r&&t.shouldThrowOnError)throw new u(r)}return{success:null===r,error:r,data:s,count:i,status:a,statusText:n}}returns(){return this}overrideTypes(){return this}},g=class extends f{select(e){let t=!1,r=(e??"*").split("").map((e=>/\s/.test(e)&&!t?"":('"'===e&&(t=!t),e))).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(e,{ascending:t=!0,nullsFirst:r,foreignTable:s,referencedTable:i=s}={}){let a=i?`${i}.order`:"order",n=this.url.searchParams.get(a);return this.url.searchParams.set(a,`${n?`${n},`:""}${e}.${t?"asc":"desc"}${void 0===r?"":r?".nullsfirst":".nullslast"}`),this}limit(e,{foreignTable:t,referencedTable:r=t}={}){let s=void 0===r?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${e}`),this}range(e,t,{foreignTable:r,referencedTable:s=r}={}){let i=void 0===s?"offset":`${s}.offset`,a=void 0===s?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${e}`),this.url.searchParams.set(a,""+(t-e+1)),this}abortSignal(e){return this.signal=e,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:e=!1,verbose:t=!1,settings:r=!1,buffers:s=!1,wal:i=!1,format:a="text"}={}){let n=[e?"analyze":null,t?"verbose":null,r?"settings":null,s?"buffers":null,i?"wal":null].filter(Boolean).join("|"),o=this.headers.get("Accept")??"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${a}; for="${o}"; options=${n};`),this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(e){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${e}`),this}};let m=RegExp("[,()]");var y=class extends g{eq(e,t){return this.url.searchParams.append(e,`eq.${t}`),this}neq(e,t){return this.url.searchParams.append(e,`neq.${t}`),this}gt(e,t){return this.url.searchParams.append(e,`gt.${t}`),this}gte(e,t){return this.url.searchParams.append(e,`gte.${t}`),this}lt(e,t){return this.url.searchParams.append(e,`lt.${t}`),this}lte(e,t){return this.url.searchParams.append(e,`lte.${t}`),this}like(e,t){return this.url.searchParams.append(e,`like.${t}`),this}likeAllOf(e,t){return this.url.searchParams.append(e,`like(all).{${t.join(",")}}`),this}likeAnyOf(e,t){return this.url.searchParams.append(e,`like(any).{${t.join(",")}}`),this}ilike(e,t){return this.url.searchParams.append(e,`ilike.${t}`),this}ilikeAllOf(e,t){return this.url.searchParams.append(e,`ilike(all).{${t.join(",")}}`),this}ilikeAnyOf(e,t){return this.url.searchParams.append(e,`ilike(any).{${t.join(",")}}`),this}regexMatch(e,t){return this.url.searchParams.append(e,`match.${t}`),this}regexIMatch(e,t){return this.url.searchParams.append(e,`imatch.${t}`),this}is(e,t){return this.url.searchParams.append(e,`is.${t}`),this}isDistinct(e,t){return this.url.searchParams.append(e,`isdistinct.${t}`),this}in(e,t){let r=Array.from(new Set(t)).map((e=>"string"==typeof e&&m.test(e)?`"${e}"`:`${e}`)).join(",");return this.url.searchParams.append(e,`in.(${r})`),this}notIn(e,t){let r=Array.from(new Set(t)).map((e=>"string"==typeof e&&m.test(e)?`"${e}"`:`${e}`)).join(",");return this.url.searchParams.append(e,`not.in.(${r})`),this}contains(e,t){return"string"==typeof t?this.url.searchParams.append(e,`cs.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cs.{${t.join(",")}}`):this.url.searchParams.append(e,`cs.${JSON.stringify(t)}`),this}containedBy(e,t){return"string"==typeof t?this.url.searchParams.append(e,`cd.${t}`):Array.isArray(t)?this.url.searchParams.append(e,`cd.{${t.join(",")}}`):this.url.searchParams.append(e,`cd.${JSON.stringify(t)}`),this}rangeGt(e,t){return this.url.searchParams.append(e,`sr.${t}`),this}rangeGte(e,t){return this.url.searchParams.append(e,`nxl.${t}`),this}rangeLt(e,t){return this.url.searchParams.append(e,`sl.${t}`),this}rangeLte(e,t){return this.url.searchParams.append(e,`nxr.${t}`),this}rangeAdjacent(e,t){return this.url.searchParams.append(e,`adj.${t}`),this}overlaps(e,t){return"string"==typeof t?this.url.searchParams.append(e,`ov.${t}`):this.url.searchParams.append(e,`ov.{${t.join(",")}}`),this}textSearch(e,t,{config:r,type:s}={}){let i="";"plain"===s?i="pl":"phrase"===s?i="ph":"websearch"===s&&(i="w");let a=void 0===r?"":`(${r})`;return this.url.searchParams.append(e,`${i}fts${a}.${t}`),this}match(e){return Object.entries(e).filter((([e,t])=>void 0!==t)).forEach((([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)})),this}not(e,t,r){return this.url.searchParams.append(e,`not.${t}.${r}`),this}or(e,{foreignTable:t,referencedTable:r=t}={}){let s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${e})`),this}filter(e,t,r){return this.url.searchParams.append(e,`${t}.${r}`),this}},b=class{constructor(e,{headers:t={},schema:r,fetch:s,urlLengthLimit:i=8e3,retry:a}){this.url=e,this.headers=new Headers(t),this.schema=r,this.fetch=s,this.urlLengthLimit=i,this.retry=a}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(e,t){let{head:r=!1,count:s}=t??{},i=r?"HEAD":"GET",a=!1,n=(e??"*").split("").map((e=>/\s/.test(e)&&!a?"":('"'===e&&(a=!a),e))).join(""),{url:o,headers:h}=this.cloneRequestState();return o.searchParams.set("select",n),s&&h.append("Prefer",`count=${s}`),new y({method:i,url:o,headers:h,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(e,{count:t,defaultToNull:r=!0}={}){let{url:s,headers:i}=this.cloneRequestState();if(t&&i.append("Prefer",`count=${t}`),r||i.append("Prefer","missing=default"),Array.isArray(e)){let t=e.reduce(((e,t)=>e.concat(Object.keys(t))),[]);if(t.length>0){let e=[...new Set(t)].map((e=>`"${e}"`));s.searchParams.set("columns",e.join(","))}}return new y({method:"POST",url:s,headers:i,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(e,{onConflict:t,ignoreDuplicates:r=!1,count:s,defaultToNull:i=!0}={}){let{url:a,headers:n}=this.cloneRequestState();if(n.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),void 0!==t&&a.searchParams.set("on_conflict",t),s&&n.append("Prefer",`count=${s}`),i||n.append("Prefer","missing=default"),Array.isArray(e)){let t=e.reduce(((e,t)=>e.concat(Object.keys(t))),[]);if(t.length>0){let e=[...new Set(t)].map((e=>`"${e}"`));a.searchParams.set("columns",e.join(","))}}return new y({method:"POST",url:a,headers:n,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(e,{count:t}={}){let{url:r,headers:s}=this.cloneRequestState();return t&&s.append("Prefer",`count=${t}`),new y({method:"PATCH",url:r,headers:s,schema:this.schema,body:e,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:e}={}){let{url:t,headers:r}=this.cloneRequestState();return e&&r.append("Prefer",`count=${e}`),new y({method:"DELETE",url:t,headers:r,schema:this.schema,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function _(e){var t=function(e,t){if("object"!=w(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=w(s))return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==w(t)?t:t+""}function k(e,t,r){return(t=_(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null==arguments[t]?{}:arguments[t];t%2?v(Object(r),!0).forEach((function(t){k(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var T=class e{constructor(e,{headers:t={},schema:r,fetch:s,timeout:i,urlLengthLimit:a=8e3,retry:n}={}){this.url=e,this.headers=new Headers(t),this.schemaName=r,this.urlLengthLimit=a;let o=s??globalThis.fetch;this.fetch=void 0!==i&&i>0?(e,t)=>{let r=new AbortController,s=setTimeout((()=>r.abort()),i),a=t?.signal;if(a){if(a.aborted)return clearTimeout(s),o(e,t);let i=()=>{clearTimeout(s),r.abort()};return a.addEventListener("abort",i,{once:!0}),o(e,S(S({},t),{},{signal:r.signal})).finally((()=>{clearTimeout(s),a.removeEventListener("abort",i)}))}return o(e,S(S({},t),{},{signal:r.signal})).finally((()=>clearTimeout(s)))}:o,this.retry=n}from(e){if(!e||"string"!=typeof e||""===e.trim())throw Error("Invalid relation name: relation must be a non-empty string.");return new b(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(t){return new e(this.url,{headers:this.headers,schema:t,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,t={},{head:r=!1,get:s=!1,count:i}={}){let a,n,o=new URL(`${this.url}/rpc/${e}`),h=e=>"object"==typeof e&&!!e&&(!Array.isArray(e)||e.some(h)),c=r&&Object.values(t).some(h);c?(a="POST",n=t):r||s?(a=r?"HEAD":"GET",Object.entries(t).filter((([e,t])=>void 0!==t)).map((([e,t])=>[e,Array.isArray(t)?`{${t.join(",")}}`:`${t}`])).forEach((([e,t])=>{o.searchParams.append(e,t)}))):(a="POST",n=t);let l=new Headers(this.headers);return c?l.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&l.set("Prefer",`count=${i}`),new y({method:a,url:o,headers:l,schema:this.schemaName,body:n,fetch:this.fetch??fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},E=class{constructor(){}static detectEnvironment(){if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&void 0!==globalThis.WebSocket)return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&void 0!==global.WebSocket)return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&void 0!==globalThis.WebSocketPair&&void 0===globalThis.WebSocket)return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&navigator.userAgent?.includes("Vercel-Edge"))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};let e=globalThis.process;if(e){let t=e.versions;if(t&&t.node){let e=t.node,r=parseInt(e.replace(/^v/,"").split(".")[0]);return r>=22?void 0===globalThis.WebSocket?{type:"unsupported",error:`Node.js ${r} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${r} detected without native WebSocket support.`,workaround:'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })'}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){let e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`\n\nSuggested solution: ${e.workaround}`),Error(t)}static isWebSocketSupported(){try{let e=this.detectEnvironment();return"native"===e.type||"ws"===e.type}catch{return!1}}};let A={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},R={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave",access_token:"access_token"},O={connecting:"connecting",open:"open",closing:"closing",closed:"closed"};var j,C=class{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&"string"==typeof e.payload.event)return t(this._binaryEncodeUserBroadcastPush(e));let r=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(r))}_binaryEncodeUserBroadcastPush(e){return this._isArrayBuffer(e.payload?.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){let t=e.payload?.payload??new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,t)}_encodeJsonUserBroadcastPush(e){let t=e.payload?.payload??{},r=(new TextEncoder).encode(JSON.stringify(t)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,r)}_encodeUserBroadcastPush(e,t,r){let s=e.topic,i=e.ref??"",a=e.join_ref??"",n=e.payload.event,o=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},h=0===Object.keys(o).length?"":JSON.stringify(o);if(a.length>255)throw Error(`joinRef length ${a.length} exceeds maximum of 255`);if(i.length>255)throw Error(`ref length ${i.length} exceeds maximum of 255`);if(s.length>255)throw Error(`topic length ${s.length} exceeds maximum of 255`);if(n.length>255)throw Error(`userEvent length ${n.length} exceeds maximum of 255`);if(h.length>255)throw Error(`metadata length ${h.length} exceeds maximum of 255`);let c=this.USER_BROADCAST_PUSH_META_LENGTH+a.length+i.length+s.length+n.length+h.length,l=new ArrayBuffer(this.HEADER_LENGTH+c),u=new DataView(l),d=0;u.setUint8(d++,this.KINDS.userBroadcastPush),u.setUint8(d++,a.length),u.setUint8(d++,i.length),u.setUint8(d++,s.length),u.setUint8(d++,n.length),u.setUint8(d++,h.length),u.setUint8(d++,t),Array.from(a,(e=>u.setUint8(d++,e.charCodeAt(0)))),Array.from(i,(e=>u.setUint8(d++,e.charCodeAt(0)))),Array.from(s,(e=>u.setUint8(d++,e.charCodeAt(0)))),Array.from(n,(e=>u.setUint8(d++,e.charCodeAt(0)))),Array.from(h,(e=>u.setUint8(d++,e.charCodeAt(0))));var p=new Uint8Array(l.byteLength+r.byteLength);return p.set(new Uint8Array(l),0),p.set(new Uint8Array(r),l.byteLength),p.buffer}decode(e,t){if(this._isArrayBuffer(e))return t(this._binaryDecode(e));if("string"==typeof e){let[r,s,i,a,n]=JSON.parse(e);return t({join_ref:r,ref:s,topic:i,event:a,payload:n})}return t({})}_binaryDecode(e){let t=new DataView(e),r=t.getUint8(0),s=new TextDecoder;if(r===this.KINDS.userBroadcast)return this._decodeUserBroadcast(e,t,s)}_decodeUserBroadcast(e,t,r){let s=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),n=t.getUint8(4),o=this.HEADER_LENGTH+4,h=r.decode(e.slice(o,o+s));o+=s;let c=r.decode(e.slice(o,o+i));o+=i;let l=r.decode(e.slice(o,o+a));o+=a;let u=e.slice(o,e.byteLength),d=n===this.JSON_ENCODING?JSON.parse(r.decode(u)):u,p={type:this.BROADCAST_EVENT,event:c,payload:d};return a>0&&(p.meta=JSON.parse(l)),{join_ref:null,ref:null,topic:h,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){return e instanceof ArrayBuffer||"ArrayBuffer"===e?.constructor?.name}_pick(e,t){return e&&"object"==typeof e?Object.fromEntries(Object.entries(e).filter((([e])=>t.includes(e)))):{}}};!function(e){e.abstime="abstime",e.bool="bool",e.date="date",e.daterange="daterange",e.float4="float4",e.float8="float8",e.int2="int2",e.int4="int4",e.int4range="int4range",e.int8="int8",e.int8range="int8range",e.json="json",e.jsonb="jsonb",e.money="money",e.numeric="numeric",e.oid="oid",e.reltime="reltime",e.text="text",e.time="time",e.timestamp="timestamp",e.timestamptz="timestamptz",e.timetz="timetz",e.tsrange="tsrange",e.tstzrange="tstzrange"}(j||={});let P=(e,t,r={})=>{let s=r.skipTypes??[];return t?Object.keys(t).reduce(((r,i)=>(r[i]=$(i,e,t,s),r)),{}):{}},$=(e,t,r,s)=>{let i=t.find((t=>t.name===e))?.type,a=r[e];return i&&!s.includes(i)?I(i,a):N(a)},I=(e,t)=>{if("_"===e.charAt(0))return D(t,e.slice(1,e.length));switch(e){case j.bool:return x(t);case j.float4:case j.float8:case j.int2:case j.int4:case j.int8:case j.numeric:case j.oid:return L(t);case j.json:case j.jsonb:return U(t);case j.timestamp:return B(t);case j.abstime:case j.date:case j.daterange:case j.int4range:case j.int8range:case j.money:case j.reltime:case j.text:case j.time:case j.timestamptz:case j.timetz:case j.tsrange:case j.tstzrange:default:return N(t)}},N=e=>e,x=e=>{switch(e){case"t":return!0;case"f":return!1;default:return e}},L=e=>{if("string"==typeof e){let t=parseFloat(e);if(!Number.isNaN(t))return t}return e},U=e=>{if("string"==typeof e)try{return JSON.parse(e)}catch{return e}return e},D=(e,t)=>{if("string"!=typeof e)return e;let r=e.length-1,s=e[r];if("{"===e[0]&&"}"===s){let s,i=e.slice(1,r);try{s=JSON.parse("["+i+"]")}catch{s=i?i.split(","):[]}return s.map((e=>I(t,e)))}return e},B=e=>"string"==typeof e?e.replace(" ","T"):e,q=e=>{let t=new URL(e);return t.protocol=t.protocol.replace(/^ws/i,"http"),t.pathname=t.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),""===t.pathname||"/"===t.pathname?t.pathname="/api/broadcast":t.pathname+="/api/broadcast",t.href};var H,M=e=>"function"==typeof e?e:function(){return e},W=typeof self<"u"?self:null,K=typeof window<"u"?window:null,F=W||K||globalThis,J=0,G=1,V=2,z=3,Y={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},X={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},Q="longpoll",Z="websocket",ee=4,te="base64url.bearer.phx.",re=class{constructor(e,t,r,s){this.channel=e,this.event=t,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=s,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(e){this.timeout=e,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(e,t){return this.hasReceived(e)&&t(this.receivedResp.response),this.recHooks.push({status:e,callback:t}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:e,response:t,_ref:r}){this.recHooks.filter((t=>t.status===e)).forEach((e=>e.callback(t)))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,(e=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=e,this.matchReceive(e)})),this.timeoutTimer=setTimeout((()=>{this.trigger("timeout",{})}),this.timeout)}hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}trigger(e,t){this.channel.trigger(this.refEvent,{status:e,response:t})}},se=class{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout((()=>{this.tries+=1,this.callback()}),this.timerCalc(this.tries+1))}},ie=class{constructor(e,t,r){this.state=Y.closed,this.topic=e,this.params=M(t||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new re(this,X.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new se((()=>{this.socket.isConnected()&&this.rejoin()}),this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError((()=>this.rejoinTimer.reset()))),this.stateChangeRefs.push(this.socket.onOpen((()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()}))),this.joinPush.receive("ok",(()=>{this.state=Y.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach((e=>e.send())),this.pushBuffer=[]})),this.joinPush.receive("error",(e=>{this.state=Y.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,e),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()})),this.onClose((()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=Y.closed,this.socket.remove(this)})),this.onError((e=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,e),this.isJoining()&&this.joinPush.reset(),this.state=Y.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()})),this.joinPush.receive("timeout",(()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new re(this,X.leave,M({}),this.timeout).send(),this.state=Y.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()})),this.on(X.reply,((e,t)=>{this.trigger(this.replyEventName(t),e)}))}join(e=this.timeout){if(this.joinedOnce)throw Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=e,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach((e=>e.destroy())),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=Y.closed,this.bindings=[]}onClose(e){this.on(X.close,e)}onError(e){return this.on(X.error,(t=>e(t)))}on(e,t){let r=this.bindingRef++;return this.bindings.push({event:e,ref:r,callback:t}),r}off(e,t){this.bindings=this.bindings.filter((r=>!(r.event===e&&(void 0===t||t===r.ref))))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(e,t,r=this.timeout){if(t||={},!this.joinedOnce)throw Error(`tried to push '${e}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let s=new re(this,e,(function(){return t}),r);return this.canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}leave(e=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=Y.leaving;let t=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(X.close,"leave")},r=new re(this,X.leave,M({}),e);return r.receive("ok",(()=>t())).receive("timeout",(()=>t())),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(e,t,r){return t}filterBindings(e,t,r){return!0}isMember(e,t,r,s){return this.topic===e&&(!s||s===this.joinRef()||(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:e,event:t,payload:r,joinRef:s}),!1))}joinRef(){return this.joinPush.ref}rejoin(e=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=Y.joining,this.joinPush.resend(e))}trigger(e,t,r,s){let i=this.onMessage(e,t,r,s);if(t&&!i)throw Error("channel onMessage callbacks must return the payload, modified or unmodified");let a=this.bindings.filter((s=>s.event===e&&this.filterBindings(s,t,r)));for(let e=0;e<a.length;e++)a[e].callback(i,r,s||this.joinRef())}replyEventName(e){return`chan_reply_${e}`}isClosed(){return this.state===Y.closed}isErrored(){return this.state===Y.errored}isJoined(){return this.state===Y.joined}isJoining(){return this.state===Y.joining}isLeaving(){return this.state===Y.leaving}},ae=class{static request(e,t,r,s,i,a,n){if(F.XDomainRequest){let r=new F.XDomainRequest;return this.xdomainRequest(r,e,t,s,i,a,n)}if(F.XMLHttpRequest){let o=new F.XMLHttpRequest;return this.xhrRequest(o,e,t,r,s,i,a,n)}if(F.fetch&&F.AbortController)return this.fetchRequest(e,t,r,s,i,a,n);throw Error("No suitable XMLHttpRequest implementation found")}static fetchRequest(e,t,r,s,i,a,n){let o={method:e,headers:r,body:s},h=null;return i&&(h=new AbortController,setTimeout((()=>h.abort()),i),o.signal=h.signal),F.fetch(t,o).then((e=>e.text())).then((e=>this.parseJSON(e))).then((e=>n&&n(e))).catch((e=>{"AbortError"===e.name&&a?a():n&&n(null)})),h}static xdomainRequest(e,t,r,s,i,a,n){return e.timeout=i,e.open(t,r),e.onload=()=>{let t=this.parseJSON(e.responseText);n&&n(t)},a&&(e.ontimeout=a),e.onprogress=()=>{},e.send(s),e}static xhrRequest(e,t,r,s,i,a,n,o){e.open(t,r,!0),e.timeout=a;for(let[t,r]of Object.entries(s))e.setRequestHeader(t,r);return e.onerror=()=>o&&o(null),e.onreadystatechange=()=>{e.readyState===ee&&o&&o(this.parseJSON(e.responseText))},n&&(e.ontimeout=n),e.send(i),e}static parseJSON(e){if(!e||""===e)return null;try{return JSON.parse(e)}catch{return console&&console.log("failed to parse JSON response",e),null}}static serialize(e,t){let r=[];for(var s in e){if(!Object.prototype.hasOwnProperty.call(e,s))continue;let i=t?`${t}[${s}]`:s,a=e[s];"object"==typeof a?r.push(this.serialize(a,i)):r.push(encodeURIComponent(i)+"="+encodeURIComponent(a))}return r.join("&")}static appendParams(e,t){return 0===Object.keys(t).length?e:`${e}${e.match(/\?/)?"&":"?"}${this.serialize(t)}`}},ne=class{constructor(e,t){t&&2===t.length&&t[1].startsWith(te)&&(this.authToken=atob(t[1].slice(21))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(e),this.readyState=J,setTimeout((()=>this.poll()),0)}normalizeEndpoint(e){return e.replace("ws://","http://").replace("wss://","https://").replace(RegExp("(.*)/"+Z),"$1/"+Q)}endpointURL(){return ae.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(e,t,r){this.close(e,t,r),this.readyState=J}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===G||this.readyState===J}poll(){let e={Accept:"application/json"};this.authToken&&(e["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",e,null,(()=>this.ontimeout()),(e=>{if(e){var{status:t,token:r,messages:s}=e;if(410===t&&null!==this.token)return this.onerror(410),void this.closeAndRetry(3410,"session_gone",!1);this.token=r}else t=0;switch(t){case 200:s.forEach((e=>{setTimeout((()=>this.onmessage({data:e})),0)})),this.poll();break;case 204:this.poll();break;case 410:this.readyState=G,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw Error(`unhandled poll status ${t}`)}}))}send(e){"string"!=typeof e&&(e=(e=>{let t="",r=new Uint8Array(e),s=r.byteLength;for(let e=0;e<s;e++)t+=String.fromCharCode(r[e]);return btoa(t)})(e)),this.currentBatch?this.currentBatch.push(e):this.awaitingBatchAck?this.batchBuffer.push(e):(this.currentBatch=[e],this.currentBatchTimer=setTimeout((()=>{this.batchSend(this.currentBatch),this.currentBatch=null}),0))}batchSend(e){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},e.join("\n"),(()=>this.onerror("timeout")),(e=>{this.awaitingBatchAck=!1,e&&200===e.status?this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[]):(this.onerror(e&&e.status),this.closeAndRetry(1011,"internal server error",!1))}))}close(e,t,r){for(let e of this.reqs)e.abort();this.readyState=z;let s=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:e,reason:t,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",s)):this.onclose(s)}ajax(e,t,r,s,i){let a;a=ae.request(e,this.endpointURL(),t,r,this.timeout,(()=>{this.reqs.delete(a),s()}),(e=>{this.reqs.delete(a),this.isActive()&&i(e)})),this.reqs.add(a)}},oe=class e{constructor(t,r={}){let s=r.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=t,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(s.state,(t=>{let{onJoin:r,onLeave:s,onSync:i}=this.caller;this.joinRef=this.channel.joinRef(),this.state=e.syncState(this.state,t,r,s),this.pendingDiffs.forEach((t=>{this.state=e.syncDiff(this.state,t,r,s)})),this.pendingDiffs=[],i()})),this.channel.on(s.diff,(t=>{let{onJoin:r,onLeave:s,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(t):(this.state=e.syncDiff(this.state,t,r,s),i())}))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(t){return e.list(this.state,t)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,t,r,s){let i=this.clone(e),a={},n={};return this.map(i,((e,r)=>{t[e]||(n[e]=r)})),this.map(t,((e,t)=>{let r=i[e];if(r){let s=t.metas.map((e=>e.phx_ref)),i=r.metas.map((e=>e.phx_ref)),o=t.metas.filter((e=>i.indexOf(e.phx_ref)<0)),h=r.metas.filter((e=>s.indexOf(e.phx_ref)<0));o.length>0&&(a[e]=t,a[e].metas=o),h.length>0&&(n[e]=this.clone(r),n[e].metas=h)}else a[e]=t})),this.syncDiff(i,{joins:a,leaves:n},r,s)}static syncDiff(e,t,r,s){let{joins:i,leaves:a}=this.clone(t);return r||=function(){},s||=function(){},this.map(i,((t,s)=>{let i=e[t];if(e[t]=this.clone(s),i){let r=e[t].metas.map((e=>e.phx_ref)),s=i.metas.filter((e=>r.indexOf(e.phx_ref)<0));e[t].metas.unshift(...s)}r(t,i,s)})),this.map(a,((t,r)=>{let i=e[t];if(!i)return;let a=r.metas.map((e=>e.phx_ref));i.metas=i.metas.filter((e=>a.indexOf(e.phx_ref)<0)),s(t,i,r),0===i.metas.length&&delete e[t]})),e}static list(e,t){return t||=function(e,t){return t},this.map(e,((e,r)=>t(e,r)))}static map(e,t){return Object.getOwnPropertyNames(e).map((r=>t(r,e[r])))}static clone(e){return JSON.parse(JSON.stringify(e))}},he={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(e,t){if(e.payload.constructor===ArrayBuffer)return t(this.binaryEncode(e));{let r=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(r))}},decode(e,t){if(e.constructor===ArrayBuffer)return t(this.binaryDecode(e));{let[r,s,i,a,n]=JSON.parse(e);return t({join_ref:r,ref:s,topic:i,event:a,payload:n})}},binaryEncode(e){let{join_ref:t,ref:r,event:s,topic:i,payload:a}=e,n=this.META_LENGTH+t.length+r.length+i.length+s.length,o=new ArrayBuffer(this.HEADER_LENGTH+n),h=new DataView(o),c=0;h.setUint8(c++,this.KINDS.push),h.setUint8(c++,t.length),h.setUint8(c++,r.length),h.setUint8(c++,i.length),h.setUint8(c++,s.length),Array.from(t,(e=>h.setUint8(c++,e.charCodeAt(0)))),Array.from(r,(e=>h.setUint8(c++,e.charCodeAt(0)))),Array.from(i,(e=>h.setUint8(c++,e.charCodeAt(0)))),Array.from(s,(e=>h.setUint8(c++,e.charCodeAt(0))));var l=new Uint8Array(o.byteLength+a.byteLength);return l.set(new Uint8Array(o),0),l.set(new Uint8Array(a),o.byteLength),l.buffer},binaryDecode(e){let t=new DataView(e),r=t.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(e,t,s);case this.KINDS.reply:return this.decodeReply(e,t,s);case this.KINDS.broadcast:return this.decodeBroadcast(e,t,s)}},decodePush(e,t,r){let s=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),n=this.HEADER_LENGTH+this.META_LENGTH-1,o=r.decode(e.slice(n,n+s));n+=s;let h=r.decode(e.slice(n,n+i));n+=i;let c=r.decode(e.slice(n,n+a));return n+=a,{join_ref:o,ref:null,topic:h,event:c,payload:e.slice(n,e.byteLength)}},decodeReply(e,t,r){let s=t.getUint8(1),i=t.getUint8(2),a=t.getUint8(3),n=t.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,h=r.decode(e.slice(o,o+s));o+=s;let c=r.decode(e.slice(o,o+i));o+=i;let l=r.decode(e.slice(o,o+a));o+=a;let u=r.decode(e.slice(o,o+n));o+=n;let d={status:u,response:e.slice(o,e.byteLength)};return{join_ref:h,ref:c,topic:l,event:X.reply,payload:d}},decodeBroadcast(e,t,r){let s=t.getUint8(1),i=t.getUint8(2),a=this.HEADER_LENGTH+2,n=r.decode(e.slice(a,a+s));a+=s;let o=r.decode(e.slice(a,a+i));return a+=i,{join_ref:null,ref:null,topic:n,event:o,payload:e.slice(a,e.byteLength)}}},ce=class{constructor(e,t={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=t.timeout||1e4,this.transport=t.transport||F.WebSocket||ne,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=t.longPollFallbackMs,this.fallbackTimer=null,this.sessionStore=t.sessionStorage||F&&F.sessionStorage,this.establishedConnections=0,this.defaultEncoder=he.encode.bind(he),this.defaultDecoder=he.decode.bind(he),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=t.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport===ne?(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder):(this.encode=t.encode||this.defaultEncoder,this.decode=t.decode||this.defaultDecoder);let r=null;K&&K.addEventListener&&(K.addEventListener("pagehide",(e=>{this.conn&&(this.disconnect(),r=this.connectClock)})),K.addEventListener("pageshow",(e=>{r===this.connectClock&&(r=null,this.connect())})),K.addEventListener("visibilitychange",(()=>{"hidden"===document.visibilityState?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown((()=>this.connect())))}))),this.heartbeatIntervalMs=t.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=t.autoSendHeartbeat??!0,this.heartbeatCallback=t.heartbeatCallback??(()=>{}),this.rejoinAfterMs=e=>t.rejoinAfterMs?t.rejoinAfterMs(e):[1e3,2e3,5e3][e-1]||1e4,this.reconnectAfterMs=e=>t.reconnectAfterMs?t.reconnectAfterMs(e):[10,50,100,150,200,250,500,1e3,2e3][e-1]||5e3,this.logger=t.logger||null,!this.logger&&t.debug&&(this.logger=(e,t,r)=>{console.log(`${e}: ${t}`,r)}),this.longpollerTimeout=t.longpollerTimeout||2e4,this.params=M(t.params||{}),this.endPoint=`${e}/${Z}`,this.vsn=t.vsn||"2.0.0",this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new se((()=>{if(this.pageHidden)return this.log("Not reconnecting as page is hidden!"),void this.teardown();this.teardown((async()=>{t.beforeReconnect&&await t.beforeReconnect(),this.connect()}))}),this.reconnectAfterMs),this.authToken=t.authToken}getLongPollTransport(){return ne}replaceTransport(e){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&=(this.conn.close(),null),this.transport=e}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let e=ae.appendParams(ae.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return"/"===e.charAt(0)?"/"===e.charAt(1)?`${this.protocol()}:${e}`:`${this.protocol()}://${location.host}${e}`:e}disconnect(e,t,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown((()=>{this.disconnecting=!1,e&&e()}),t,r)}connect(e){e&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=M(e)),(!this.conn||this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==ne?this.connectWithFallback(ne,this.longPollFallbackMs):this.transportConnect())}log(e,t,r){this.logger&&this.logger(e,t,r)}hasLogger(){return null!==this.logger}onOpen(e){let t=this.makeRef();return this.stateChangeCallbacks.open.push([t,e]),t}onClose(e){let t=this.makeRef();return this.stateChangeCallbacks.close.push([t,e]),t}onError(e){let t=this.makeRef();return this.stateChangeCallbacks.error.push([t,e]),t}onMessage(e){let t=this.makeRef();return this.stateChangeCallbacks.message.push([t,e]),t}onHeartbeat(e){this.heartbeatCallback=e}ping(e){if(!this.isConnected())return!1;let t=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:t});let s=this.onMessage((i=>{i.ref===t&&(this.off([s]),e(Date.now()-r))}));return!0}transportName(e){return e===ne?"LongPoll":e.name}transportConnect(){let e;this.connectClock++,this.closeWasClean=!1,this.authToken&&(e=["phoenix",`${te}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),e),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(e){return this.sessionStore&&this.sessionStore.getItem(e)}storeSession(e,t){this.sessionStore&&this.sessionStore.setItem(e,t)}connectWithFallback(e,t=2500){clearTimeout(this.fallbackTimer);let r,s=!1,i=!0,a=this.transportName(e),n=t=>{this.log("transport",`falling back to ${a}...`,t),this.off([void 0,r]),i=!1,this.replaceTransport(e),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return n("memorized");this.fallbackTimer=setTimeout(n,t),r=this.onError((e=>{this.log("transport","error",e),i&&!s&&(clearTimeout(this.fallbackTimer),n(e))})),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen((()=>{if(s=!0,!i){let t=this.transportName(e);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${t}`,"true"),this.log("transport",`established ${t} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(n,t),this.ping((e=>{this.log("transport","connected to primary after",e),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)}))})),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(e){this.log("error","error in heartbeat callback",e)}this.triggerChanError(),this.closeWasClean=!1,this.teardown((()=>this.reconnectTimer.scheduleTimeout()),1e3,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout((()=>this.sendHeartbeat()),this.heartbeatIntervalMs))}teardown(e,t,r){if(!this.conn)return e&&e();let s=this.conn;this.waitForBufferDone(s,(()=>{t?s.close(t,r||""):s.close(),this.waitForSocketClosed(s,(()=>{this.conn===s&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),e&&e()}))}))}waitForBufferDone(e,t,r=1){5!==r&&e.bufferedAmount?setTimeout((()=>{this.waitForBufferDone(e,t,r+1)}),150*r):t()}waitForSocketClosed(e,t,r=1){5!==r&&e.readyState!==z?setTimeout((()=>{this.waitForSocketClosed(e,t,r+1)}),150*r):t()}onConnClose(e){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",e),this.triggerChanError(),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",e)}onConnError(e){this.hasLogger()&&this.log("transport",e);let t=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",e,t,r),(t===this.transport||r>0)&&this.triggerChanError()}triggerChanError(){this.channels.forEach((e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(X.error)}))}connectionState(){switch(this.conn&&this.conn.readyState){case J:return"connecting";case G:return"open";case V:return"closing";default:return"closed"}}isConnected(){return"open"===this.connectionState()}remove(e){this.off(e.stateChangeRefs),this.channels=this.channels.filter((t=>t!==e))}off(e){for(let t in this.stateChangeCallbacks)this.stateChangeCallbacks[t]=this.stateChangeCallbacks[t].filter((([t])=>-1===e.indexOf(t)))}channel(e,t={}){let r=new ie(e,t,this);return this.channels.push(r),r}push(e){if(this.hasLogger()){let{topic:t,event:r,payload:s,ref:i,join_ref:a}=e;this.log("push",`${t} ${r} (${a}, ${i})`,s)}this.isConnected()?this.encode(e,(e=>this.conn.send(e))):this.sendBuffer.push((()=>this.encode(e,(e=>this.conn.send(e)))))}makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}sendHeartbeat(){if(this.isConnected())if(this.pendingHeartbeatRef)this.heartbeatTimeout();else{this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(e){this.log("error","error in heartbeat callback",e)}this.heartbeatTimeoutTimer=setTimeout((()=>this.heartbeatTimeout()),this.heartbeatIntervalMs)}else try{this.heartbeatCallback("disconnected")}catch(e){this.log("error","error in heartbeat callback",e)}}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach((e=>e())),this.sendBuffer=[])}onConnMessage(e){this.decode(e.data,(e=>{let{topic:t,event:r,payload:s,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){let t=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback("ok"===s.status?"ok":"error",t)}catch(e){this.log("error","error in heartbeat callback",e)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout((()=>this.sendHeartbeat()),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${s.status||""} ${t} ${r} ${i&&"("+i+")"||""}`.trim(),s);for(let e=0;e<this.channels.length;e++){let n=this.channels[e];n.isMember(t,r,s,a)&&n.trigger(r,s,i,a)}this.triggerStateCallbacks("message",e)}))}triggerStateCallbacks(e,...t){try{this.stateChangeCallbacks[e].forEach((([r,s])=>{try{s(...t)}catch(t){this.log("error",`error in ${e} callback`,t)}}))}catch(t){this.log("error",`error triggering ${e} callbacks`,t)}}leaveOpenTopic(e){let t=this.channels.find((t=>t.topic===e&&(t.isJoined()||t.isJoining())));t&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${e}"`),t.leave())}},le=class e{constructor(t,r){let s=function(e){return e?.events&&{events:e.events}}(r);this.presence=new oe(t.getChannel(),s),this.presence.onJoin(((r,s,i)=>{let a=e.onJoinPayload(r,s,i);t.getChannel().trigger("presence",a)})),this.presence.onLeave(((r,s,i)=>{let a=e.onLeavePayload(r,s,i);t.getChannel().trigger("presence",a)})),this.presence.onSync((()=>{t.getChannel().trigger("presence",{event:"sync"})}))}get state(){return e.transformState(this.presence.state)}static transformState(e){return e=function(e){return JSON.parse(JSON.stringify(e))}(e),Object.getOwnPropertyNames(e).reduce(((t,r)=>{let s=e[r];return t[r]=ue(s),t}),{})}static onJoinPayload(e,t,r){return{event:"join",key:e,currentPresences:de(t),newPresences:ue(r)}}static onLeavePayload(e,t,r){return{event:"leave",key:e,currentPresences:de(t),leftPresences:ue(r)}}};function ue(e){return e.metas.map((e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e)))}function de(e){return e?.metas?ue(e):[]}!function(e){e.SYNC="sync",e.JOIN="join",e.LEAVE="leave"}(H||={});var pe,fe,ge,me=class{get state(){return this.presenceAdapter.state}constructor(e,t){this.channel=e,this.presenceAdapter=new le(this.channel.channelAdapter,t)}},ye=class{constructor(e,t,r){let s=function(e){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},e.config)}}(r);this.channel=e.getSocket().channel(t,s),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,t){return this.channel.on(e,t)}off(e,t){this.channel.off(e,t)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,t,r){let s;try{s=this.channel.push(e,t,r)}catch{throw Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>100){let e=this.channel.pushBuffer.shift();e.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${e.event}`,e.payload())}return s}updateJoinPayload(e){let t=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},t),e)}canPush(){return this.socket.isConnected()&&this.state===A.joined}isJoined(){return this.state===A.joined}isJoining(){return this.state===A.joining}isClosed(){return this.state===A.closed}isLeaving(){return this.state===A.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}};!function(e){e.ALL="*",e.INSERT="INSERT",e.UPDATE="UPDATE",e.DELETE="DELETE"}(pe||={}),function(e){e.BROADCAST="broadcast",e.PRESENCE="presence",e.POSTGRES_CHANGES="postgres_changes",e.SYSTEM="system"}(fe||={}),function(e){e.SUBSCRIBED="SUBSCRIBED",e.TIMED_OUT="TIMED_OUT",e.CLOSED="CLOSED",e.CHANNEL_ERROR="CHANNEL_ERROR"}(ge||={});let be=A;var we=class e{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,t={config:{}},r){if(this.topic=e,this.params=t,this.socket=r,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.channelAdapter=new ye(this.socket.socketAdapter,e,this.params),this.presence=new me(this),this._onClose((()=>{this.socket._remove(this)})),this._updateFilterTransform(),this.broadcastEndpointURL=q(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&this.params.config?.broadcast?.replay)throw Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,t=this.timeout){if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){let{config:{broadcast:r,presence:s,private:i}}=this.params,a=this.bindings.postgres_changes?.map((e=>e.filter))??[],n=!!this.bindings[fe.PRESENCE]&&this.bindings[fe.PRESENCE].length>0||!0===this.params.config.presence?.enabled,o={},h={broadcast:r,presence:Object.assign(Object.assign({},s),{enabled:n}),postgres_changes:a,private:i};this.socket.accessTokenValue&&(o.access_token=this.socket.accessTokenValue),this._onError((t=>{e?.(ge.CHANNEL_ERROR,t)})),this._onClose((()=>e?.(ge.CLOSED))),this.updateJoinPayload(Object.assign({config:h},o)),this._updateFilterMessage(),this.channelAdapter.subscribe(t).receive("ok",(async({postgres_changes:t})=>{this.socket._isManualToken()||this.socket.setAuth(),void 0!==t?this._updatePostgresBindings(t,e):e?.(ge.SUBSCRIBED)})).receive("error",(t=>{this.state=A.errored,e?.(ge.CHANNEL_ERROR,Error(JSON.stringify(Object.values(t).join(", ")||"error")))})).receive("timeout",(()=>{e?.(ge.TIMED_OUT)}))}return this}_updatePostgresBindings(t,r){let s=this.bindings.postgres_changes,i=s?.length??0,a=[];for(let n=0;n<i;n++){let i=s[n],{filter:{event:o,schema:h,table:c,filter:l}}=i,u=t&&t[n];if(!(u&&u.event===o&&e.isFilterValueEqual(u.schema,h)&&e.isFilterValueEqual(u.table,c)&&e.isFilterValueEqual(u.filter,l)))return this.unsubscribe(),this.state=A.errored,void r?.(ge.CHANNEL_ERROR,Error("mismatch between server and client bindings for postgres changes"));a.push(Object.assign(Object.assign({},i),{id:u.id}))}this.bindings.postgres_changes=a,this.state!=A.errored&&r&&r(ge.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,r){let s=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===fe.PRESENCE||e===fe.POSTGRES_CHANGES;if(s&&i)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,t,r)}async httpSend(e,t,r={}){if(null==t)return Promise.reject(Error("Payload is required for httpSend()"));let s={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(s.Authorization=`Bearer ${this.socket.accessTokenValue}`);let i={method:"POST",headers:s,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},a=await this._fetchWithTimeout(this.broadcastEndpointURL,i,r.timeout??this.timeout);if(202===a.status)return{success:!0};let n=a.statusText;try{let e=await a.json();n=e.error||e.message||n}catch{}return Promise.reject(Error(n))}async send(e,t={}){if(this.channelAdapter.canPush()||"broadcast"!==e.type)return new Promise((r=>{let s=this.channelAdapter.push(e.type,e,t.timeout||this.timeout);"broadcast"===e.type&&!this.params?.config?.broadcast?.ack&&r("ok"),s.receive("ok",(()=>r("ok"))),s.receive("error",(()=>r("error"))),s.receive("timeout",(()=>r("timed out")))}));{console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");let{event:r,payload:s}=e,i={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);let a={method:"POST",headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:r,payload:s,private:this.private}]})};try{let e=await this._fetchWithTimeout(this.broadcastEndpointURL,a,t.timeout??this.timeout);return await(e.body?.cancel()),e.ok?"ok":"error"}catch(e){return"AbortError"===e.name?"timed out":"error"}}}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise((t=>{this.channelAdapter.unsubscribe(e).receive("ok",(()=>t("ok"))).receive("timeout",(()=>t("timed out"))).receive("error",(()=>t("error")))}))}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,t,r){let s=new AbortController,i=setTimeout((()=>s.abort()),r),a=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:s.signal}));return clearTimeout(i),a}_on(e,t,r){let s=e.toLocaleLowerCase(),i={type:s,filter:t,callback:r,ref:this.channelAdapter.on(e,r)};return this.bindings[s]?this.bindings[s].push(i):this.bindings[s]=[i],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings(((e,t,r)=>{let s=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(s,r))return!1;let i=this.bindings[s]?.find((t=>t.ref===e.ref));if(!i)return!0;if(["broadcast","presence","postgres_changes"].includes(s)){if("id"in i){let e=i.id,r=i.filter?.event;return e&&t.ids?.includes(e)&&("*"===r||r?.toLocaleLowerCase()===t.data?.type.toLocaleLowerCase())}{let e=(i?.filter?.event)?.toLocaleLowerCase();return"*"===e||e===(t?.event)?.toLocaleLowerCase()}}return i.type.toLocaleLowerCase()===s}))}_notThisChannelEvent(e,t){let{close:r,error:s,leave:i,join:a}=R;return t&&[r,s,i,a].includes(e)&&t!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform(((e,t,r)=>{if("object"==typeof t&&"ids"in t){let e=t.data,{schema:r,table:s,commit_timestamp:i,type:a,errors:n}=e,o={schema:r,table:s,commit_timestamp:i,eventType:a,new:{},old:{},errors:n};return Object.assign(Object.assign({},o),this._getPayloadRecords(e))}return t}))}copyBindings(e){if(this.joinedOnce)throw Error("cannot copy bindings into joined channel");for(let t in e.bindings)for(let r of e.bindings[t])this._on(r.type,r.filter,r.callback)}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_getPayloadRecords(e){let t={new:{},old:{}};return("INSERT"===e.type||"UPDATE"===e.type)&&(t.new=P(e.columns,e.record)),("UPDATE"===e.type||"DELETE"===e.type)&&(t.old=P(e.columns,e.old_record)),t}},_e=class{constructor(e,t){this.socket=new ce(e,t)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,t,r,s=1e4){return new Promise((i=>{setTimeout((()=>i("timeout")),s),this.socket.disconnect((()=>{e(),i("ok")}),t,r)}))}push(e){this.socket.push(e)}log(e,t,r){this.socket.log(e,t,r)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==O.connecting}isDisconnecting(){return this.socket.connectionState()==O.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}};let ke=25e3,ve=[1e3,2e3,5e3,1e4];var Se=class{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,t){if(this.channels=[],this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new C,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._resolveFetch=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),!t?.params?.apikey)throw Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.socketAdapter=new _e(e,this._initializeOptions(t)),this.httpEndpoint=q(e),this.fetch=this._resolveFetch(t?.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){let t=e.message;throw t.includes("Node.js")?Error(`${t}\n\nTo use Realtime in Node.js, you need to provide a WebSocket implementation:\n\nOption 1: Use Node.js 22+ which has native WebSocket support\nOption 2: Install and provide the "ws" package:\n\n  npm install ws\n\n  import ws from "ws"\n  const client = new RealtimeClient(url, {\n    ...options,\n    transport: ws\n  })`):Error(`WebSocket not available: ${t}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,t){return this.isDisconnecting()?"ok":await this.socketAdapter.disconnect((()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()}),e,t)}getChannels(){return this.channels}async removeChannel(e){let t=await e.unsubscribe();return"ok"===t&&e.teardown(),0===this.channels.length&&this.disconnect(),t}async removeAllChannels(){let e=this.channels.map((async e=>{let t=await e.unsubscribe();return e.teardown(),t})),t=await Promise.all(e);return this.disconnect(),t}log(e,t,r){this.socketAdapter.log(e,t,r)}connectionState(){return this.socketAdapter.connectionState()||O.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,t={config:{}}){let r=`realtime:${e}`,s=this.getChannels().find((e=>e.topic===r));if(s)return s;{let r=new we(`realtime:${e}`,t,this);return this.channels.push(r),r}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter((t=>t.topic!==e.topic))}async _performAuth(e=null){let t,r=!1;if(e)t=e,r=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(e){this.log("error","Error fetching access token from callback",e),t=this.accessTokenValue}else t=this.accessTokenValue;r?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach((e=>{let r={access_token:t,version:"realtime-js/2.104.1"};t&&e.updateJoinPayload(r),e.joinedOnce&&e.channelAdapter.isJoined()&&e.channelAdapter.push(R.access_token,{access_token:t})})))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch((t=>{this.log("error",`Error setting auth in ${e}`,t)}))}_setupConnectionHandlers(){this.socketAdapter.onOpen((()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch((e=>{this.log("error","error waiting for auth on connect",e)})),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()})),this.socketAdapter.onClose((()=>{this.worker&&this.workerRef&&this._terminateWorker()})),this.socketAdapter.onMessage((e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)}))}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(t,r)=>{"sent"==t&&this._setAuthSafely(),e&&e(t,r)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");let e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=e=>{this.log("worker","worker error",e.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=e=>{"keepAlive"===e.data.event&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&=(this.log("worker","terminating worker"),void this.workerRef.terminate())}_workerObjectUrl(e){let t;if(e)t=e;else{let e=new Blob(['\n  addEventListener("message", (e) => {\n    if (e.data.event === "start") {\n      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);\n    }\n  });'],{type:"application/javascript"});t=URL.createObjectURL(e)}return t}_initializeOptions(e){this.worker=e?.worker??!1,this.accessToken=e?.accessToken??null;let t={};t.timeout=e?.timeout??1e4,t.heartbeatIntervalMs=e?.heartbeatIntervalMs??ke,t.transport=e?.transport??E.getWebSocketConstructor(),t.params=e?.params,t.logger=e?.logger,t.heartbeatCallback=this._wrapHeartbeatCallback(e?.heartbeatCallback),t.reconnectAfterMs=e?.reconnectAfterMs??(e=>ve[e-1]||1e4);let r,s,i=e?.vsn??"2.0.0";switch(i){case"1.0.0":r=(e,t)=>t(JSON.stringify(e)),s=(e,t)=>t(JSON.parse(e));break;case"2.0.0":r=this.serializer.encode.bind(this.serializer),s=this.serializer.decode.bind(this.serializer);break;default:throw Error(`Unsupported serializer version: ${t.vsn}`)}if(t.vsn=i,t.encode=e?.encode??r,t.decode=e?.decode??s,t.beforeReconnect=this._reconnectAuth.bind(this),(e?.logLevel||e?.log_level)&&(this.logLevel=e.logLevel||e.log_level,t.params=Object.assign(Object.assign({},t.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw Error("Web Worker is not supported");this.workerUrl=e?.workerUrl,t.autoSendHeartbeat=!this.worker}return t}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}},Te=class extends Error{constructor(e,t){super(e),this.name="IcebergError",this.status=t.status,this.icebergType=t.icebergType,this.icebergCode=t.icebergCode,this.details=t.details,this.isCommitStateUnknown="CommitStateUnknownException"===t.icebergType||[500,502,504].includes(t.status)&&!0===t.icebergType?.includes("CommitState")}isNotFound(){return 404===this.status}isConflict(){return 409===this.status}isAuthenticationTimeout(){return 419===this.status}};function Ee(e){let t=e.fetchImpl??globalThis.fetch;return{async request({method:r,path:s,query:i,body:a,headers:n}){let o=function(e,t,r){let s=new URL(t,e);if(r)for(let[e,t]of Object.entries(r))void 0!==t&&s.searchParams.set(e,t);return s.toString()}(e.baseUrl,s,i),h=await async function(e){return e&&"none"!==e.type?"bearer"===e.type?{Authorization:`Bearer ${e.token}`}:"header"===e.type?{[e.name]:e.value}:"custom"===e.type?await e.getHeaders():{}:{}}(e.auth),c=await t(o,{method:r,headers:{...a?{"Content-Type":"application/json"}:{},...h,...n},body:a?JSON.stringify(a):void 0}),l=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),d=u&&l?JSON.parse(l):l;if(!c.ok){let e=u?d:void 0,t=e?.error;throw new Te(t?.message??`Request failed with status ${c.status}`,{status:c.status,icebergType:t?.type,icebergCode:t?.code,details:e})}return{status:c.status,headers:c.headers,data:d}}}}function Ae(e){return e.join("")}var Re=class{constructor(e,t=""){this.client=e,this.prefix=t}async listNamespaces(e){let t=e?{parent:Ae(e.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:t})).data.namespaces.map((e=>({namespace:e})))}async createNamespace(e,t){let r={namespace:e.namespace,properties:t?.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Ae(e.namespace)}`})}async loadNamespaceMetadata(e){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Ae(e.namespace)}`})).data.properties}}async namespaceExists(e){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Ae(e.namespace)}`}),!0}catch(e){if(e instanceof Te&&404===e.status)return!1;throw e}}async createNamespaceIfNotExists(e,t){try{return await this.createNamespace(e,t)}catch(e){if(e instanceof Te&&409===e.status)return;throw e}}};function Oe(e){return e.join("")}var je=class{constructor(e,t="",r){this.client=e,this.prefix=t,this.accessDelegation=r}async listTables(e){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Oe(e.namespace)}/tables`})).data.identifiers}async createTable(e,t){let r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Oe(e.namespace)}/tables`,body:t,headers:r})).data.metadata}async updateTable(e,t){let r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Oe(e.namespace)}/tables/${e.name}`,body:t});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(e,t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Oe(e.namespace)}/tables/${e.name}`,query:{purgeRequested:String(t?.purge??!1)}})}async loadTable(e){let t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Oe(e.namespace)}/tables/${e.name}`,headers:t})).data.metadata}async tableExists(e){let t={};this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Oe(e.namespace)}/tables/${e.name}`,headers:t}),!0}catch(e){if(e instanceof Te&&404===e.status)return!1;throw e}}async createTableIfNotExists(e,t){try{return await this.createTable(e,t)}catch(r){if(r instanceof Te&&409===r.status)return await this.loadTable({namespace:e.namespace,name:t.name});throw r}}},Ce=class{constructor(e){let t="v1";e.catalogName&&(t+=`/${e.catalogName}`),this.client=Ee({baseUrl:e.baseUrl.endsWith("/")?e.baseUrl:`${e.baseUrl}/`,auth:e.auth,fetchImpl:e.fetch}),this.accessDelegation=e.accessDelegation?.join(","),this.namespaceOps=new Re(this.client,t),this.tableOps=new je(this.client,t,this.accessDelegation)}async listNamespaces(e){return this.namespaceOps.listNamespaces(e)}async createNamespace(e,t){return this.namespaceOps.createNamespace(e,t)}async dropNamespace(e){await this.namespaceOps.dropNamespace(e)}async loadNamespaceMetadata(e){return this.namespaceOps.loadNamespaceMetadata(e)}async listTables(e){return this.tableOps.listTables(e)}async createTable(e,t){return this.tableOps.createTable(e,t)}async updateTable(e,t){return this.tableOps.updateTable(e,t)}async dropTable(e,t){await this.tableOps.dropTable(e,t)}async loadTable(e){return this.tableOps.loadTable(e)}async namespaceExists(e){return this.namespaceOps.namespaceExists(e)}async tableExists(e){return this.tableOps.tableExists(e)}async createNamespaceIfNotExists(e,t){return this.namespaceOps.createNamespaceIfNotExists(e,t)}async createTableIfNotExists(e,t){return this.tableOps.createTableIfNotExists(e,t)}};function Pe(e){return Pe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pe(e)}function $e(e){var t=function(e,t){if("object"!=Pe(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t||"default");if("object"!=Pe(s))return s;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==Pe(t)?t:t+""}function Ie(e,t,r){return(t=$e(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function Ne(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function xe(e){for(var t=1;t<arguments.length;t++){var r=null==arguments[t]?{}:arguments[t];t%2?Ne(Object(r),!0).forEach((function(t){Ie(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ne(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var Le=class extends Error{constructor(e,t="storage",r,s){super(e),this.__isStorageError=!0,this.namespace=t,this.name="vectors"===t?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function Ue(e){return"object"==typeof e&&!!e&&"__isStorageError"in e}var De=class extends Le{constructor(e,t,r,s="storage"){super(e,s,t,r),this.name="vectors"===s?"StorageVectorsApiError":"StorageApiError",this.status=t,this.statusCode=r}toJSON(){return xe({},super.toJSON())}},Be=class extends Le{constructor(e,t,r="storage"){super(e,r),this.name="vectors"===r?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=t}};function qe(e,t,r){let s=xe({},e),i=t.toLowerCase();for(let e of Object.keys(s))e.toLowerCase()===i&&delete s[e];return s[i]=r,s}let He=e=>{if(Array.isArray(e))return e.map((e=>He(e)));if("function"==typeof e||e!==Object(e))return e;let t={};return Object.entries(e).forEach((([e,r])=>{let s=e.replace(/([-_][a-z])/gi,(e=>e.toUpperCase().replace(/[-_]/g,"")));t[s]=He(r)})),t},Me=e=>e.msg||e.message||e.error_description||("string"==typeof e.error?e.error:e.error?.message)||JSON.stringify(e),We=(e,t,r,s)=>{let i={method:e,headers:t?.headers||{}};if("GET"===e||"HEAD"===e||!s)return xe(xe({},i),r);if((e=>{if("object"!=typeof e||!e)return!1;let t=Object.getPrototypeOf(e);return!(null!==t&&t!==Object.prototype&&null!==Object.getPrototypeOf(t)||Symbol.toStringTag in e||Symbol.iterator in e)})(s)){let e,r=t?.headers||{};for(let[t,s]of Object.entries(r))"content-type"===t.toLowerCase()&&(e=s);i.headers=qe(r,"Content-Type",e??"application/json"),i.body=JSON.stringify(s)}else i.body=s;return t?.duplex&&(i.duplex=t.duplex),xe(xe({},i),r)};async function Ke(e,t,r,s,i,a,n){return new Promise(((o,h)=>{e(r,We(t,s,i,a)).then((e=>{if(!e.ok)throw e;if(s?.noResolveJson)return e;if("vectors"===n){let t=e.headers.get("content-type");if("0"===e.headers.get("content-length")||204===e.status||!t||!t.includes("application/json"))return{}}return e.json()})).then((e=>o(e))).catch((e=>(async(e,t,r,s)=>{if("object"==typeof e&&e&&"function"==typeof e.json){let r=e,i=parseInt(r.status,10);Number.isFinite(i)||(i=500),r.json().then((e=>{let r=e?.statusCode||e?.code||i+"";t(new De(Me(e),i,r,s))})).catch((()=>{let e=i+"";t(new De(r.statusText||`HTTP ${i} error`,i,e,s))}))}else t(new Be(Me(e),e,s))})(e,h,0,n)))}))}function Fe(e="storage"){return{get:async(t,r,s,i)=>Ke(t,"GET",r,s,i,void 0,e),post:async(t,r,s,i,a)=>Ke(t,"POST",r,i,a,s,e),put:async(t,r,s,i,a)=>Ke(t,"PUT",r,i,a,s,e),head:async(t,r,s,i)=>Ke(t,"HEAD",r,xe(xe({},s),{},{noResolveJson:!0}),i,void 0,e),remove:async(t,r,s,i,a)=>Ke(t,"DELETE",r,i,a,s,e)}}let{get:Je,post:Ge,put:Ve,head:ze,remove:Ye}=Fe("storage"),Xe=Fe("vectors");var Qe=class{constructor(e,t={},r,s="storage"){this.shouldThrowOnError=!1,this.url=e,this.headers=function(e){let t={};for(let[r,s]of Object.entries(e))t[r.toLowerCase()]=s;return t}(t),this.fetch=(e=>e?(...t)=>e(...t):(...e)=>fetch(...e))(r),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(e,t){return this.headers=qe(this.headers,e,t),this}async handleOperation(e){try{return{data:await e(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(Ue(e))return{data:null,error:e};throw e}}},Ze=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t}then(e,t){return this.execute().then(e,t)}async execute(){try{return{data:(await this.downloadFn()).body,error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(Ue(e))return{data:null,error:e};throw e}}};let et;et=Symbol.toStringTag;var tt=class{constructor(e,t){this.downloadFn=e,this.shouldThrowOnError=t,this[et]="BlobDownloadBuilder",this.promise=null}asStream(){return new Ze(this.downloadFn,this.shouldThrowOnError)}then(e,t){return this.getPromise().then(e,t)}catch(e){return this.getPromise().catch(e)}finally(e){return this.getPromise().finally(e)}getPromise(){return this.promise||=this.execute(),this.promise}async execute(){try{return{data:await(await this.downloadFn()).blob(),error:null}}catch(e){if(this.shouldThrowOnError)throw e;if(Ue(e))return{data:null,error:e};throw e}}};let rt={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},st={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var it=class extends Qe{constructor(e,t={},r,s){super(e,t,s,"storage"),this.bucketId=r}async uploadOrUpdate(e,t,r,s){var i=this;return i.handleOperation((async()=>{let a,n=xe(xe({},st),s),o=xe(xe({},i.headers),"POST"===e&&{"x-upsert":String(n.upsert)}),h=n.metadata;if(typeof Blob<"u"&&r instanceof Blob?(a=new FormData,a.append("cacheControl",n.cacheControl),h&&a.append("metadata",i.encodeMetadata(h)),a.append("",r)):typeof FormData<"u"&&r instanceof FormData?(a=r,a.has("cacheControl")||a.append("cacheControl",n.cacheControl),h&&!a.has("metadata")&&a.append("metadata",i.encodeMetadata(h))):(a=r,o["cache-control"]=`max-age=${n.cacheControl}`,o["content-type"]=n.contentType,h&&(o["x-metadata"]=i.toBase64(i.encodeMetadata(h))),(typeof ReadableStream<"u"&&a instanceof ReadableStream||a&&"object"==typeof a&&"pipe"in a&&"function"==typeof a.pipe)&&!n.duplex&&(n.duplex="half")),s?.headers)for(let[e,t]of Object.entries(s.headers))o=qe(o,e,t);let c=i._removeEmptyFolders(t),l=i._getFinalPath(c),u=await("PUT"==e?Ve:Ge)(i.fetch,`${i.url}/object/${l}`,a,xe({headers:o},n?.duplex?{duplex:n.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}}))}async upload(e,t,r){return this.uploadOrUpdate("POST",e,t,r)}async uploadToSignedUrl(e,t,r,s){var i=this;let a=i._removeEmptyFolders(e),n=i._getFinalPath(a),o=new URL(i.url+`/object/upload/sign/${n}`);return o.searchParams.set("token",t),i.handleOperation((async()=>{let e,t=xe(xe({},st),s),n=xe(xe({},i.headers),{"x-upsert":String(t.upsert)});return typeof Blob<"u"&&r instanceof Blob?(e=new FormData,e.append("cacheControl",t.cacheControl),e.append("",r)):typeof FormData<"u"&&r instanceof FormData?(e=r,e.append("cacheControl",t.cacheControl)):(e=r,n["cache-control"]=`max-age=${t.cacheControl}`,n["content-type"]=t.contentType),{path:a,fullPath:(await Ve(i.fetch,o.toString(),e,{headers:n})).Key}}))}async createSignedUploadUrl(e,t){var r=this;return r.handleOperation((async()=>{let s=r._getFinalPath(e),i=xe({},r.headers);t?.upsert&&(i["x-upsert"]="true");let a=await Ge(r.fetch,`${r.url}/object/upload/sign/${s}`,{},{headers:i}),n=new URL(r.url+a.url),o=n.searchParams.get("token");if(!o)throw new Le("No token returned by API");return{signedUrl:n.toString(),path:e,token:o}}))}async update(e,t,r){return this.uploadOrUpdate("PUT",e,t,r)}async move(e,t,r){var s=this;return s.handleOperation((async()=>await Ge(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r?.destinationBucket},{headers:s.headers})))}async copy(e,t,r){var s=this;return s.handleOperation((async()=>({path:(await Ge(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:e,destinationKey:t,destinationBucket:r?.destinationBucket},{headers:s.headers})).Key})))}async createSignedUrl(e,t,r){var s=this;return s.handleOperation((async()=>{let i=s._getFinalPath(e),a="object"==typeof r?.transform&&null!==r.transform&&Object.keys(r.transform).length>0,n=await Ge(s.fetch,`${s.url}/object/sign/${i}`,xe({expiresIn:t},a?{transform:r.transform}:{}),{headers:s.headers}),o=new URLSearchParams;r?.download&&o.set("download",!0===r.download?"":r.download),null!=r?.cacheNonce&&o.set("cacheNonce",String(r.cacheNonce));let h=o.toString();return{signedUrl:encodeURI(`${s.url}${n.signedURL}${h?`&${h}`:""}`)}}))}async createSignedUrls(e,t,r){var s=this;return s.handleOperation((async()=>{let i=await Ge(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:t,paths:e},{headers:s.headers}),a=new URLSearchParams;r?.download&&a.set("download",!0===r.download?"":r.download),null!=r?.cacheNonce&&a.set("cacheNonce",String(r.cacheNonce));let n=a.toString();return i.map((e=>xe(xe({},e),{},{signedUrl:e.signedURL?encodeURI(`${s.url}${e.signedURL}${n?`&${n}`:""}`):null})))}))}download(e,t,r){let s="object"==typeof t?.transform&&null!==t.transform&&Object.keys(t.transform).length>0?"render/image/authenticated":"object",i=new URLSearchParams;t?.transform&&this.applyTransformOptsToQuery(i,t.transform),null!=t?.cacheNonce&&i.set("cacheNonce",String(t.cacheNonce));let a=i.toString(),n=this._getFinalPath(e);return new tt((()=>Je(this.fetch,`${this.url}/${s}/${n}${a?`?${a}`:""}`,{headers:this.headers,noResolveJson:!0},r)),this.shouldThrowOnError)}async info(e){var t=this;let r=t._getFinalPath(e);return t.handleOperation((async()=>He(await Je(t.fetch,`${t.url}/object/info/${r}`,{headers:t.headers}))))}async exists(e){var t=this;let r=t._getFinalPath(e);try{return await ze(t.fetch,`${t.url}/object/${r}`,{headers:t.headers}),{data:!0,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(Ue(e)){let t=e instanceof De?e.status:e instanceof Be?e.originalError?.status:void 0;if(void 0!==t&&[400,404].includes(t))return{data:!1,error:e}}throw e}}getPublicUrl(e,t){let r=this._getFinalPath(e),s=new URLSearchParams;t?.download&&s.set("download",!0===t.download?"":t.download),t?.transform&&this.applyTransformOptsToQuery(s,t.transform),null!=t?.cacheNonce&&s.set("cacheNonce",String(t.cacheNonce));let i=s.toString(),a="object"==typeof t?.transform&&null!==t.transform&&Object.keys(t.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${a}/public/${r}`)+(i?`?${i}`:"")}}}async remove(e){var t=this;return t.handleOperation((async()=>await Ye(t.fetch,`${t.url}/object/${t.bucketId}`,{prefixes:e},{headers:t.headers})))}async list(e,t,r){var s=this;return s.handleOperation((async()=>{let i=xe(xe(xe({},rt),t),{},{prefix:e||""});return await Ge(s.fetch,`${s.url}/object/list/${s.bucketId}`,i,{headers:s.headers},r)}))}async listV2(e,t){var r=this;return r.handleOperation((async()=>{let s=xe({},e);return await Ge(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,s,{headers:r.headers},t)}))}encodeMetadata(e){return JSON.stringify(e)}toBase64(e){return typeof Buffer<"u"?Buffer.from(e).toString("base64"):btoa(e)}_getFinalPath(e){return`${this.bucketId}/${e.replace(/^\/+/,"")}`}_removeEmptyFolders(e){return e.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(e,t){return t.width&&e.set("width",t.width.toString()),t.height&&e.set("height",t.height.toString()),t.resize&&e.set("resize",t.resize),t.format&&e.set("format",t.format),t.quality&&e.set("quality",t.quality.toString()),e}};let at={"X-Client-Info":"storage-js/2.104.1"};var nt=class extends Qe{constructor(e,t={},r,s){let i=new URL(e);s?.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase.")),super(i.href.replace(/\/$/,""),xe(xe({},at),t),r,"storage")}async listBuckets(e){var t=this;return t.handleOperation((async()=>{let r=t.listBucketOptionsToQueryString(e);return await Je(t.fetch,`${t.url}/bucket${r}`,{headers:t.headers})}))}async getBucket(e){var t=this;return t.handleOperation((async()=>await Je(t.fetch,`${t.url}/bucket/${e}`,{headers:t.headers})))}async createBucket(e,t={public:!1}){var r=this;return r.handleOperation((async()=>await Ge(r.fetch,`${r.url}/bucket`,{id:e,name:e,type:t.type,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers})))}async updateBucket(e,t){var r=this;return r.handleOperation((async()=>await Ve(r.fetch,`${r.url}/bucket/${e}`,{id:e,name:e,public:t.public,file_size_limit:t.fileSizeLimit,allowed_mime_types:t.allowedMimeTypes},{headers:r.headers})))}async emptyBucket(e){var t=this;return t.handleOperation((async()=>await Ge(t.fetch,`${t.url}/bucket/${e}/empty`,{},{headers:t.headers})))}async deleteBucket(e){var t=this;return t.handleOperation((async()=>await Ye(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers})))}listBucketOptionsToQueryString(e){let t={};return e&&("limit"in e&&(t.limit=String(e.limit)),"offset"in e&&(t.offset=String(e.offset)),e.search&&(t.search=e.search),e.sortColumn&&(t.sortColumn=e.sortColumn),e.sortOrder&&(t.sortOrder=e.sortOrder)),Object.keys(t).length>0?"?"+new URLSearchParams(t).toString():""}},ot=class extends Qe{constructor(e,t={},r){super(e.replace(/\/$/,""),xe(xe({},at),t),r,"storage")}async createBucket(e){var t=this;return t.handleOperation((async()=>await Ge(t.fetch,`${t.url}/bucket`,{name:e},{headers:t.headers})))}async listBuckets(e){var t=this;return t.handleOperation((async()=>{let r=new URLSearchParams;void 0!==e?.limit&&r.set("limit",e.limit.toString()),void 0!==e?.offset&&r.set("offset",e.offset.toString()),e?.sortColumn&&r.set("sortColumn",e.sortColumn),e?.sortOrder&&r.set("sortOrder",e.sortOrder),e?.search&&r.set("search",e.search);let s=r.toString(),i=s?`${t.url}/bucket?${s}`:`${t.url}/bucket`;return await Je(t.fetch,i,{headers:t.headers})}))}async deleteBucket(e){var t=this;return t.handleOperation((async()=>await Ye(t.fetch,`${t.url}/bucket/${e}`,{},{headers:t.headers})))}from(e){var t=this;if(!(e=>!(!e||"string"!=typeof e||0===e.length||e.length>100||e.trim()!==e||e.includes("/")||e.includes("\\"))&&/^[\w!.\*'() &$@=;:+,?-]+$/.test(e))(e))throw new Le("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");let r=new Ce({baseUrl:this.url,catalogName:e,auth:{type:"custom",getHeaders:async()=>t.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(r,{get(e,t){let r=e[t];return"function"==typeof r?async(...t)=>{try{return{data:await r.apply(e,t),error:null}}catch(e){if(s)throw e;return{data:null,error:e}}}:r}})}},ht=class extends Qe{constructor(e,t={},r){super(e.replace(/\/$/,""),xe(xe({},at),{},{"Content-Type":"application/json"},t),r,"vectors")}async createIndex(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/CreateIndex`,e,{headers:t.headers})||{}))}async getIndex(e,t){var r=this;return r.handleOperation((async()=>await Xe.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers})))}async listIndexes(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/ListIndexes`,e,{headers:t.headers})))}async deleteIndex(e,t){var r=this;return r.handleOperation((async()=>await Xe.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:e,indexName:t},{headers:r.headers})||{}))}},ct=class extends Qe{constructor(e,t={},r){super(e.replace(/\/$/,""),xe(xe({},at),{},{"Content-Type":"application/json"},t),r,"vectors")}async putVectors(e){var t=this;if(e.vectors.length<1||e.vectors.length>500)throw Error("Vector batch size must be between 1 and 500 items");return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/PutVectors`,e,{headers:t.headers})||{}))}async getVectors(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/GetVectors`,e,{headers:t.headers})))}async listVectors(e){var t=this;if(void 0!==e.segmentCount){if(e.segmentCount<1||e.segmentCount>16)throw Error("segmentCount must be between 1 and 16");if(void 0!==e.segmentIndex&&(e.segmentIndex<0||e.segmentIndex>=e.segmentCount))throw Error("segmentIndex must be between 0 and "+(e.segmentCount-1))}return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/ListVectors`,e,{headers:t.headers})))}async queryVectors(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/QueryVectors`,e,{headers:t.headers})))}async deleteVectors(e){var t=this;if(e.keys.length<1||e.keys.length>500)throw Error("Keys batch size must be between 1 and 500 items");return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/DeleteVectors`,e,{headers:t.headers})||{}))}},lt=class extends Qe{constructor(e,t={},r){super(e.replace(/\/$/,""),xe(xe({},at),{},{"Content-Type":"application/json"},t),r,"vectors")}async createBucket(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/CreateVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{}))}async getBucket(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/GetVectorBucket`,{vectorBucketName:e},{headers:t.headers})))}async listBuckets(e={}){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/ListVectorBuckets`,e,{headers:t.headers})))}async deleteBucket(e){var t=this;return t.handleOperation((async()=>await Xe.post(t.fetch,`${t.url}/DeleteVectorBucket`,{vectorBucketName:e},{headers:t.headers})||{}))}},ut=class extends lt{constructor(e,t={}){super(e,t.headers||{},t.fetch)}from(e){return new dt(this.url,this.headers,e,this.fetch)}async createBucket(e){return(()=>super.createBucket)().call(this,e)}async getBucket(e){return(()=>super.getBucket)().call(this,e)}async listBuckets(e={}){return(()=>super.listBuckets)().call(this,e)}async deleteBucket(e){return(()=>super.deleteBucket)().call(this,e)}},dt=class extends ht{constructor(e,t,r,s){super(e,t,s),this.vectorBucketName=r}async createIndex(e){return(()=>super.createIndex)().call(this,xe(xe({},e),{},{vectorBucketName:this.vectorBucketName}))}async listIndexes(e={}){return(()=>super.listIndexes)().call(this,xe(xe({},e),{},{vectorBucketName:this.vectorBucketName}))}async getIndex(e){return(()=>super.getIndex)().call(this,this.vectorBucketName,e)}async deleteIndex(e){return(()=>super.deleteIndex)().call(this,this.vectorBucketName,e)}index(e){return new pt(this.url,this.headers,this.vectorBucketName,e,this.fetch)}},pt=class extends ct{constructor(e,t,r,s,i){super(e,t,i),this.vectorBucketName=r,this.indexName=s}async putVectors(e){var t=this;return(()=>super.putVectors)().call(t,xe(xe({},e),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(e){var t=this;return(()=>super.getVectors)().call(t,xe(xe({},e),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(e={}){var t=this;return(()=>super.listVectors)().call(t,xe(xe({},e),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(e){var t=this;return(()=>super.queryVectors)().call(t,xe(xe({},e),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(e){var t=this;return(()=>super.deleteVectors)().call(t,xe(xe({},e),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},ft=class extends nt{constructor(e,t={},r,s){super(e,t,r,s)}from(e){return new it(this.url,this.headers,e,this.fetch)}get vectors(){return new ut(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new ot(this.url+"/iceberg",this.headers,this.fetch)}};let gt="";gt=typeof Deno<"u"?"deno":typeof document<"u"?"web":typeof navigator<"u"&&"ReactNative"===navigator.product?"react-native":"node";let mt={headers:{"X-Client-Info":`supabase-js-${gt}/2.104.1`}},yt={schema:"public"},bt={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},wt={},_t=(e,t,r)=>{let s=(e=>e?(...t)=>e(...t):(...e)=>fetch(...e))(r),i=Headers;return async(r,a)=>{let n=await t()??e,o=new i(a?.headers);return o.has("apikey")||o.set("apikey",e),o.has("Authorization")||o.set("Authorization",`Bearer ${n}`),s(r,{...a,headers:o})}};let kt="2.104.1",vt=3e4,St=3*vt,Tt={"X-Client-Info":`gotrue-js/${kt}`},Et="X-Supabase-Api-Version",At={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Rt=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;var Ot=class extends Error{constructor(e,t,r){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=r}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}};function jt(e){return"object"==typeof e&&!!e&&"__isAuthError"in e}var Ct=class extends Ot{constructor(e,t,r){super(e,t,r),this.name="AuthApiError",this.status=t,this.code=r}};function Pt(e){return jt(e)&&"AuthApiError"===e.name}var $t=class extends Ot{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}},It=class extends Ot{constructor(e,t,r,s){super(e,r,s),this.name=t,this.status=r}},Nt=class extends It{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}};function xt(e){return jt(e)&&"AuthSessionMissingError"===e.name}var Lt=class extends It{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}},Ut=class extends It{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}},Dt=class extends It{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}};function Bt(e){return jt(e)&&"AuthImplicitGrantRedirectError"===e.name}var qt=class extends It{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}},Ht=class extends It{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}};var Mt=class extends It{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}};function Wt(e){return jt(e)&&"AuthRetryableFetchError"===e.name}var Kt=class extends It{constructor(e,t,r){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}};var Ft=class extends It{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}};let Jt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Gt=" \t\n\r=".split(""),Vt=(()=>{let e=Array(128);for(let t=0;t<e.length;t+=1)e[t]=-1;for(let t=0;t<Gt.length;t+=1)e[Gt[t].charCodeAt(0)]=-2;for(let t=0;t<Jt.length;t+=1)e[Jt[t].charCodeAt(0)]=t;return e})();function zt(e,t,r){if(null!==e)for(t.queue=t.queue<<8|e,t.queuedBits+=8;t.queuedBits>=6;)r(Jt[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6;else if(t.queuedBits>0)for(t.queue<<=6-t.queuedBits,t.queuedBits=6;t.queuedBits>=6;)r(Jt[t.queue>>t.queuedBits-6&63]),t.queuedBits-=6}function Yt(e,t,r){let s=Vt[e];if(!(s>-1)){if(-2===s)return;throw Error(`Invalid Base64-URL character "${String.fromCharCode(e)}"`)}for(t.queue=t.queue<<6|s,t.queuedBits+=6;t.queuedBits>=8;)r(t.queue>>t.queuedBits-8&255),t.queuedBits-=8}function Xt(e){let t=[],r=e=>{t.push(String.fromCodePoint(e))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},a=e=>{!function(e,t,r){if(0===t.utf8seq){if(e<=127)return void r(e);for(let r=1;r<6;r+=1)if(!(e>>7-r&1)){t.utf8seq=r;break}if(2===t.utf8seq)t.codepoint=31&e;else if(3===t.utf8seq)t.codepoint=15&e;else{if(4!==t.utf8seq)throw Error("Invalid UTF-8 sequence");t.codepoint=7&e}--t.utf8seq}else if(t.utf8seq>0){if(e<=127)throw Error("Invalid UTF-8 sequence");t.codepoint=t.codepoint<<6|63&e,--t.utf8seq,0===t.utf8seq&&r(t.codepoint)}}(e,s,r)};for(let t=0;t<e.length;t+=1)Yt(e.charCodeAt(t),i,a);return t.join("")}function Qt(e,t){if(!(e<=127)){if(e<=2047)return t(192|e>>6),void t(128|63&e);if(e<=65535)return t(224|e>>12),t(128|e>>6&63),void t(128|63&e);if(e<=1114111)return t(240|e>>18),t(128|e>>12&63),t(128|e>>6&63),void t(128|63&e);throw Error(`Unrecognized Unicode codepoint: ${e.toString(16)}`)}t(e)}function Zt(e){let t=[],r={queue:0,queuedBits:0},s=e=>{t.push(e)};for(let t=0;t<e.length;t+=1)Yt(e.charCodeAt(t),r,s);return new Uint8Array(t)}function er(e){let t=[];return function(e,t){for(let r=0;r<e.length;r+=1){let s=e.charCodeAt(r);if(s>55295&&s<=56319){let t=1024*(s-55296)&65535;s=65536+(e.charCodeAt(r+1)-56320&65535|t),r+=1}Qt(s,t)}}(e,(e=>t.push(e))),new Uint8Array(t)}function tr(e){let t=[],r={queue:0,queuedBits:0},s=e=>{t.push(e)};return e.forEach((e=>zt(e,r,s))),zt(null,r,s),t.join("")}let rr=()=>typeof window<"u"&&typeof document<"u",sr={tested:!1,writable:!1},ir=()=>{if(!rr())return!1;try{if("object"!=typeof globalThis.localStorage)return!1}catch{return!1}if(sr.tested)return sr.writable;let e=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(e,e),globalThis.localStorage.removeItem(e),sr.tested=!0,sr.writable=!0}catch{sr.tested=!0,sr.writable=!1}return sr.writable};let ar=e=>e?(...t)=>e(...t):(...e)=>fetch(...e),nr=async(e,t,r)=>{await e.setItem(t,JSON.stringify(r))},or=async(e,t)=>{let r=await e.getItem(t);if(!r)return null;try{return JSON.parse(r)}catch{return r}},hr=async(e,t)=>{await e.removeItem(t)};var cr=class e{constructor(){this.promise=new e.promiseConstructor(((e,t)=>{this.resolve=e,this.reject=t}))}};function lr(e){let t=e.split(".");if(3!==t.length)throw new Ft("Invalid JWT structure");for(let e=0;e<t.length;e++)if(!Rt.test(t[e]))throw new Ft("JWT not in base64url format");return{header:JSON.parse(Xt(t[0])),payload:JSON.parse(Xt(t[1])),signature:Zt(t[2]),raw:{header:t[0],payload:t[1]}}}function ur(e){return("0"+e.toString(16)).substr(-2)}async function dr(e){if(!(typeof crypto<"u"&&void 0!==crypto.subtle&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),e;let t=await async function(e){let t=(new TextEncoder).encode(e),r=await crypto.subtle.digest("SHA-256",t),s=new Uint8Array(r);return Array.from(s).map((e=>String.fromCharCode(e))).join("")}(e);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function pr(e,t,r=!1){let s=function(){let e=new Uint32Array(56);if(typeof crypto>"u"){let e="";for(let t=0;t<56;t++)e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~".charAt(Math.floor(66*Math.random()));return e}return crypto.getRandomValues(e),Array.from(e,ur).join("")}(),i=s;r&&(i+="/recovery"),await nr(e,`${t}-code-verifier`,i);let a=await dr(s);return[a,s===a?"plain":"s256"]}cr.promiseConstructor=Promise;let fr=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;let gr=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function mr(e){if(!gr.test(e))throw Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function yr(){return new Proxy({},{get:(e,t)=>{if("__isUserNotAvailableProxy"===t)return!0;if("symbol"==typeof t){let e=t.toString();if("Symbol(Symbol.toPrimitive)"===e||"Symbol(Symbol.toStringTag)"===e||"Symbol(util.inspect.custom)"===e)return}throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function br(e){return JSON.parse(JSON.stringify(e))}let wr=e=>e.msg||e.message||e.error_description||e.error||JSON.stringify(e),_r=[502,503,504,520,521,522,523,524,530];async function kr(e){if(!(e=>"object"==typeof e&&!!e&&"status"in e&&"ok"in e&&"json"in e&&"function"==typeof e.json)(e))throw new Mt(wr(e),0);if(_r.includes(e.status))throw new Mt(wr(e),e.status);let t;try{t=await e.json()}catch(e){throw new $t(wr(e),e)}let r,s=function(e){let t=e.headers.get(Et);if(!t||!t.match(fr))return null;try{return new Date(`${t}T00:00:00.0Z`)}catch{return null}}(e);if(s&&s.getTime()>=At["2024-01-01"].timestamp&&"object"==typeof t&&t&&"string"==typeof t.code?r=t.code:"object"==typeof t&&t&&"string"==typeof t.error_code&&(r=t.error_code),r){if("weak_password"===r)throw new Kt(wr(t),e.status,t.weak_password?.reasons||[]);if("session_not_found"===r)throw new Nt}else if("object"==typeof t&&t&&"object"==typeof t.weak_password&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce(((e,t)=>e&&"string"==typeof t),!0))throw new Kt(wr(t),e.status,t.weak_password.reasons);throw new Ct(wr(t),e.status||500,r)}async function vr(e,t,r,s){let i=Object.assign({},s?.headers);i[Et]||(i[Et]=At["2024-01-01"].name),s?.jwt&&(i.Authorization=`Bearer ${s.jwt}`);let a=s?.query??{};s?.redirectTo&&(a.redirect_to=s.redirectTo);let n=await async function(e,t,r,s,i,a){let n,o=((e,t,r,s)=>{let i={method:e,headers:t?.headers||{}};return"GET"===e?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},t?.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),r))})(t,s,i,a);try{n=await e(r,Object.assign({},o))}catch(e){throw console.error(e),new Mt(wr(e),0)}if(n.ok||await kr(n),s?.noResolveJson)return n;try{return await n.json()}catch(e){await kr(e)}}(e,t,r+(Object.keys(a).length?"?"+new URLSearchParams(a).toString():""),{headers:i,noResolveJson:s?.noResolveJson},{},s?.body);return s?.xform?s?.xform(n):{data:Object.assign({},n),error:null}}function Sr(e){let t=null;return function(e){return e.access_token&&e.refresh_token&&e.expires_in}(e)&&(t=Object.assign({},e),e.expires_at||(t.expires_at=function(e){return Math.round(Date.now()/1e3)+e}(e.expires_in))),{data:{session:t,user:e.user??e},error:null}}function Tr(e){let t=Sr(e);return!t.error&&e.weak_password&&"object"==typeof e.weak_password&&Array.isArray(e.weak_password.reasons)&&e.weak_password.reasons.length&&e.weak_password.message&&"string"==typeof e.weak_password.message&&e.weak_password.reasons.reduce(((e,t)=>e&&"string"==typeof t),!0)&&(t.data.weak_password=e.weak_password),t}function Er(e){return{data:{user:e.user??e},error:null}}function Ar(e){return{data:e,error:null}}function Rr(e){let{action_link:r,email_otp:s,hashed_token:i,redirect_to:a,verification_type:n}=e,o=t(e,["action_link","email_otp","hashed_token","redirect_to","verification_type"]);return{data:{properties:{action_link:r,email_otp:s,hashed_token:i,redirect_to:a,verification_type:n},user:Object.assign({},o)},error:null}}function Or(e){return e}let jr=["global","local","others"];var Cr=class{constructor({url:e="",headers:t={},fetch:r}){this.url=e,this.headers=t,this.fetch=ar(r),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)}}async signOut(e,t=jr[0]){if(jr.indexOf(t)<0)throw Error(`@supabase/auth-js: Parameter scope must be one of ${jr.join(", ")}`);try{return await vr(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(e){if(jt(e))return{data:null,error:e};throw e}}async inviteUserByEmail(e,t={}){try{return await vr(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:Er})}catch(e){if(jt(e))return{data:{user:null},error:e};throw e}}async generateLink(e){try{let{options:r}=e,s=t(e,["options"]),i=Object.assign(Object.assign({},s),r);return"newEmail"in s&&(i.new_email=s?.newEmail,delete i.newEmail),await vr(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:Rr,redirectTo:r?.redirectTo})}catch(e){if(jt(e))return{data:{properties:null,user:null},error:e};throw e}}async createUser(e){try{return await vr(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Er})}catch(e){if(jt(e))return{data:{user:null},error:e};throw e}}async listUsers(e){try{let t={nextPage:null,lastPage:0,total:0},r=await vr(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??"",per_page:(e?.perPage)?.toString()??""},xform:Or});if(r.error)throw r.error;let s=await r.json(),i=r.headers.get("x-total-count")??0,a=r.headers.get("link")?.split(",")??[];return a.length>0&&(a.forEach((e=>{let r=parseInt(e.split(";")[0].split("=")[1].substring(0,1)),s=JSON.parse(e.split(";")[1].split("=")[1]);t[`${s}Page`]=r})),t.total=parseInt(i)),{data:Object.assign(Object.assign({},s),t),error:null}}catch(e){if(jt(e))return{data:{users:[]},error:e};throw e}}async getUserById(e){mr(e);try{return await vr(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Er})}catch(e){if(jt(e))return{data:{user:null},error:e};throw e}}async updateUserById(e,t){mr(e);try{return await vr(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:Er})}catch(e){if(jt(e))return{data:{user:null},error:e};throw e}}async deleteUser(e,t=!1){mr(e);try{return await vr(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:Er})}catch(e){if(jt(e))return{data:{user:null},error:e};throw e}}async _listFactors(e){mr(e.userId);try{let{data:t,error:r}=await vr(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:e=>({data:{factors:e},error:null})});return{data:t,error:r}}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _deleteFactor(e){mr(e.userId),mr(e.id);try{return{data:await vr(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _listOAuthClients(e){try{let t={nextPage:null,lastPage:0,total:0},r=await vr(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(e?.page)?.toString()??"",per_page:(e?.perPage)?.toString()??""},xform:Or});if(r.error)throw r.error;let s=await r.json(),i=r.headers.get("x-total-count")??0,a=r.headers.get("link")?.split(",")??[];return a.length>0&&(a.forEach((e=>{let r=parseInt(e.split(";")[0].split("=")[1].substring(0,1)),s=JSON.parse(e.split(";")[1].split("=")[1]);t[`${s}Page`]=r})),t.total=parseInt(i)),{data:Object.assign(Object.assign({},s),t),error:null}}catch(e){if(jt(e))return{data:{clients:[]},error:e};throw e}}async _createOAuthClient(e){try{return await vr(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _getOAuthClient(e){try{return await vr(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _updateOAuthClient(e,t){try{return await vr(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _deleteOAuthClient(e){try{return await vr(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _regenerateOAuthClientSecret(e){try{return await vr(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _listCustomProviders(e){try{let t={};return e?.type&&(t.type=e.type),await vr(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:t,xform:e=>({data:{providers:e?.providers??[]},error:null})})}catch(e){if(jt(e))return{data:{providers:[]},error:e};throw e}}async _createCustomProvider(e){try{return await vr(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _getCustomProvider(e){try{return await vr(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _updateCustomProvider(e,t){try{return await vr(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:t,headers:this.headers,xform:e=>({data:e,error:null})})}catch(e){if(jt(e))return{data:null,error:e};throw e}}async _deleteCustomProvider(e){try{return await vr(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(e){if(jt(e))return{data:null,error:e};throw e}}};function Pr(e={}){return{getItem:t=>e[t]||null,setItem:(t,r)=>{e[t]=r},removeItem:t=>{delete e[t]}}}let $r={debug:!!(globalThis&&ir()&&globalThis.localStorage&&"true"===globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug"))};var Ir=class extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}},Nr=class extends Ir{},xr=class extends Ir{};async function Lr(e,t,r){$r.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",e,t);let s,i=new globalThis.AbortController;t>0&&(s=setTimeout((()=>{i.abort(),$r.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",e)}),t)),await Promise.resolve();try{return await globalThis.navigator.locks.request(e,0===t?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:i.signal},(async i=>{if(!i){if(0===t)throw $r.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",e),new Nr(`Acquiring an exclusive Navigator LockManager lock "${e}" immediately failed`);if($r.debug)try{let e=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(e,null,"  "))}catch(e){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",e)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),clearTimeout(s),await r()}clearTimeout(s),$r.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",e,i.name);try{return await r()}finally{$r.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",e,i.name)}}))}catch(a){if(t>0&&clearTimeout(s),"AbortError"===a?.name&&t>0){if(i.signal.aborted)return $r.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire timeout, recovering by stealing lock",e),console.warn(`@supabase/gotrue-js: Lock "${e}" was not released within ${t}ms. This may indicate an orphaned lock from a component unmount (e.g., React Strict Mode). Forcefully acquiring the lock to recover.`),await Promise.resolve().then((()=>globalThis.navigator.locks.request(e,{mode:"exclusive",steal:!0},(async t=>{if(!t)return console.warn("@supabase/gotrue-js: Navigator LockManager returned null lock even with steal: true"),await r();$r.debug&&console.log("@supabase/gotrue-js: navigatorLock: recovered (stolen)",e,t.name);try{return await r()}finally{$r.debug&&console.log("@supabase/gotrue-js: navigatorLock: released (stolen)",e,t.name)}}))));throw $r.debug&&console.log("@supabase/gotrue-js: navigatorLock: lock was stolen by another request",e),new Nr(`Lock "${e}" was released because another request stole it`)}throw a}}let Ur={};function Dr(e){if(!/^0x[a-fA-F0-9]{40}$/.test(e))throw Error(`@supabase/auth-js: Address "${e}" is invalid.`);return e.toLowerCase()}function Br(e){let t=(new TextEncoder).encode(e);return"0x"+Array.from(t,(e=>e.toString(16).padStart(2,"0"))).join("")}var qr=class extends Error{constructor({message:e,code:t,cause:r,name:s}){super(e,{cause:r}),this.__isWebAuthnError=!0,this.name=s??(r instanceof Error?r.name:void 0)??"Unknown Error",this.code=t}},Hr=class extends qr{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}};function Mr({error:e,options:t}){let{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if("AbortError"===e.name){if(t.signal instanceof AbortSignal)return new qr({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else if("ConstraintError"===e.name){if(!0===r.authenticatorSelection?.requireResidentKey)return new qr({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:e});if("conditional"===t.mediation&&"required"===r.authenticatorSelection?.userVerification)return new qr({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:e});if("required"===r.authenticatorSelection?.userVerification)return new qr({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:e})}else{if("InvalidStateError"===e.name)return new qr({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:e});if("NotAllowedError"===e.name)return new qr({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if("NotSupportedError"===e.name)return 0===r.pubKeyCredParams.filter((e=>"public-key"===e.type)).length?new qr({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:e}):new qr({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:e});if("SecurityError"===e.name){let t=window.location.hostname;if(!zr(t))return new qr({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e});if(r.rp.id!==t)return new qr({message:`The RP ID "${r.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else if("TypeError"===e.name){if(r.user.id.byteLength<1||r.user.id.byteLength>64)return new qr({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:e})}else if("UnknownError"===e.name)return new qr({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new qr({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}function Wr({error:e,options:t}){let{publicKey:r}=t;if(!r)throw Error("options was missing required publicKey property");if("AbortError"===e.name){if(t.signal instanceof AbortSignal)return new qr({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:e})}else{if("NotAllowedError"===e.name)return new qr({message:e.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e});if("SecurityError"===e.name){let t=window.location.hostname;if(!zr(t))return new qr({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:e});if(r.rpId!==t)return new qr({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:e})}else if("UnknownError"===e.name)return new qr({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:e})}return new qr({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:e})}let Kr=new class{createNewAbortSignal(){if(this.controller){let e=Error("Cancelling existing WebAuthn API call for new one");e.name="AbortError",this.controller.abort(e)}let e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){let e=Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}};function Fr(e){if(!e)throw Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&"function"==typeof PublicKeyCredential.parseCreationOptionsFromJSON)return PublicKeyCredential.parseCreationOptionsFromJSON(e);let{challenge:r,user:s,excludeCredentials:i}=e,a=t(e,["challenge","user","excludeCredentials"]),n=Zt(r).buffer,o=Object.assign(Object.assign({},s),{id:Zt(s.id).buffer}),h=Object.assign(Object.assign({},a),{challenge:n,user:o});if(i&&i.length>0){h.excludeCredentials=Array(i.length);for(let e=0;e<i.length;e++){let t=i[e];h.excludeCredentials[e]=Object.assign(Object.assign({},t),{id:Zt(t.id).buffer,type:t.type||"public-key",transports:t.transports})}}return h}function Jr(e){if(!e)throw Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&"function"==typeof PublicKeyCredential.parseRequestOptionsFromJSON)return PublicKeyCredential.parseRequestOptionsFromJSON(e);let{challenge:r,allowCredentials:s}=e,i=t(e,["challenge","allowCredentials"]),a=Zt(r).buffer,n=Object.assign(Object.assign({},i),{challenge:a});if(s&&s.length>0){n.allowCredentials=Array(s.length);for(let e=0;e<s.length;e++){let t=s[e];n.allowCredentials[e]=Object.assign(Object.assign({},t),{id:Zt(t.id).buffer,type:t.type||"public-key",transports:t.transports})}}return n}function Gr(e){if("toJSON"in e&&"function"==typeof e.toJSON)return e.toJSON();let t=e;return{id:e.id,rawId:e.id,response:{attestationObject:tr(new Uint8Array(e.response.attestationObject)),clientDataJSON:tr(new Uint8Array(e.response.clientDataJSON))},type:"public-key",clientExtensionResults:e.getClientExtensionResults(),authenticatorAttachment:t.authenticatorAttachment??void 0}}function Vr(e){if("toJSON"in e&&"function"==typeof e.toJSON)return e.toJSON();let t=e,r=e.getClientExtensionResults(),s=e.response;return{id:e.id,rawId:e.id,response:{authenticatorData:tr(new Uint8Array(s.authenticatorData)),clientDataJSON:tr(new Uint8Array(s.clientDataJSON)),signature:tr(new Uint8Array(s.signature)),userHandle:s.userHandle?tr(new Uint8Array(s.userHandle)):void 0},type:"public-key",clientExtensionResults:r,authenticatorAttachment:t.authenticatorAttachment??void 0}}function zr(e){return"localhost"===e||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e)}function Yr(){return!!(rr()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&"function"==typeof(null==navigator?void 0:navigator.credentials)?.create&&"function"==typeof(null==navigator?void 0:navigator.credentials)?.get)}let Xr={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Qr={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Zr(...e){let t=e=>"object"==typeof e&&!!e&&!Array.isArray(e),r=e=>e instanceof ArrayBuffer||ArrayBuffer.isView(e),s={};for(let i of e)if(i)for(let e in i){let a=i[e];if(void 0!==a)if(Array.isArray(a))s[e]=a;else if(r(a))s[e]=a;else if(t(a)){let r=s[e];t(r)?s[e]=Zr(r,a):s[e]=Zr(a)}else s[e]=a}return s}function es(e,t){return Zr(Xr,e,t||{})}var ts=class{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:r,signal:s},i){try{let{data:a,error:n}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!a)return{data:null,error:n};let o=s??Kr.createNewAbortSignal();if("create"===a.webauthn.type){let{user:e}=a.webauthn.credential_options.publicKey;if(!e.name){let t=r;if(t)e.name=`${e.id}:${t}`;else{let t=(await this.client.getUser()).data.user,r=t?.user_metadata?.name||t?.email||t?.id||"User";e.name=`${e.id}:${r}`}}e.displayName||=e.name}switch(a.webauthn.type){case"create":{let{data:t,error:r}=await async function(e){try{let t=await navigator.credentials.create(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Hr("Browser returned unexpected credential type",t)}:{data:null,error:new Hr("Empty credential response",t)}}catch(t){return{data:null,error:Mr({error:t,options:e})}}}({publicKey:es(a.webauthn.credential_options.publicKey,i?.create),signal:o});return t?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:t}},error:null}:{data:null,error:r}}case"request":{let t=function(e,t){return Zr(Qr,e,t||{})}(a.webauthn.credential_options.publicKey,i?.request),{data:r,error:s}=await async function(e){try{let t=await navigator.credentials.get(e);return t?t instanceof PublicKeyCredential?{data:t,error:null}:{data:null,error:new Hr("Browser returned unexpected credential type",t)}:{data:null,error:new Hr("Empty credential response",t)}}catch(t){return{data:null,error:Wr({error:t,options:e})}}}(Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:t,signal:o}));return r?{data:{factorId:e,challengeId:a.id,webauthn:{type:a.webauthn.type,credential_response:r}},error:null}:{data:null,error:s}}}}catch(e){return jt(e)?{data:null,error:e}:{data:null,error:new $t("Unexpected error in challenge",e)}}}async _verify({challengeId:e,factorId:t,webauthn:r}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:r})}async _authenticate({factorId:e,webauthn:{rpId:t=(typeof window<"u"?window.location.hostname:void 0),rpOrigins:r=(typeof window<"u"?[window.location.origin]:void 0),signal:s}={}},i){if(!t)return{data:null,error:new Ot("rpId is required for WebAuthn authentication")};try{if(!Yr())return{data:null,error:new $t("Browser does not support WebAuthn",null)};let{data:a,error:n}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:r},signal:s},{request:i});if(!a)return{data:null,error:n};let{webauthn:o}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:o.type,rpId:t,rpOrigins:r,credential_response:o.credential_response}})}catch(e){return jt(e)?{data:null,error:e}:{data:null,error:new $t("Unexpected error in authenticate",e)}}}async _register({friendlyName:e,webauthn:{rpId:t=(typeof window<"u"?window.location.hostname:void 0),rpOrigins:r=(typeof window<"u"?[window.location.origin]:void 0),signal:s}={}},i){if(!t)return{data:null,error:new Ot("rpId is required for WebAuthn registration")};try{if(!Yr())return{data:null,error:new $t("Browser does not support WebAuthn",null)};let{data:a,error:n}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then((t=>t.data?.all.find((t=>"webauthn"===t.factor_type&&t.friendly_name===e&&"unverified"!==t.status)))).then((e=>e?this.client.mfa.unenroll({factorId:e?.id}):void 0)),{data:null,error:n};let{data:o,error:h}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:t,rpOrigins:r},signal:s},{create:i});return o?this._verify({factorId:a.id,challengeId:o.challengeId,webauthn:{rpId:t,rpOrigins:r,type:o.webauthn.type,credential_response:o.webauthn.credential_response}}):{data:null,error:h}}catch(e){return jt(e)?{data:null,error:e}:{data:null,error:new $t("Unexpected error in register",e)}}}};!function(){if("object"!=typeof globalThis)try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}();let rs={url:"http://localhost:9999",storageKey:"supabase.auth.token",autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Tt,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1};async function ss(e,t,r){return await r()}let is={};var as=class e{get jwks(){return is[this.storageKey]?.jwks??{keys:[]}}set jwks(e){is[this.storageKey]=Object.assign(Object.assign({},is[this.storageKey]),{jwks:e})}get jwks_cached_at(){return is[this.storageKey]?.cachedAt??-(2**53-1)}set jwks_cached_at(e){is[this.storageKey]=Object.assign(Object.assign({},is[this.storageKey]),{cachedAt:e})}constructor(t){var r;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;let s=Object.assign(Object.assign({},rs),t);if(this.storageKey=s.storageKey,this.instanceID=e.nextInstanceID[this.storageKey]??0,e.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!s.debug,"function"==typeof s.debug&&(this.logger=s.debug),this.instanceID>0&&rr()){let e=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(e),this.logDebugMessages&&console.trace(e)}if(this.persistSession=s.persistSession,this.autoRefreshToken=s.autoRefreshToken,this.admin=new Cr({url:s.url,headers:s.headers,fetch:s.fetch}),this.url=s.url,this.headers=s.headers,this.fetch=ar(s.fetch),this.lock=s.lock||ss,this.detectSessionInUrl=s.detectSessionInUrl,this.flowType=s.flowType,this.hasCustomAuthorizationHeader=s.hasCustomAuthorizationHeader,this.throwOnError=s.throwOnError,this.lockAcquireTimeout=s.lockAcquireTimeout,s.lock?this.lock=s.lock:this.persistSession&&rr()&&(null==globalThis?void 0:globalThis.navigator)?.locks?this.lock=Lr:this.lock=ss,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=-(2**53-1)),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new ts(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(s.storage?this.storage=s.storage:ir()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Pr(this.memoryStorage)),s.userStorage&&(this.userStorage=s.userStorage)):(this.memoryStorage={},this.storage=Pr(this.memoryStorage)),rr()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(e){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",e)}null==(r=this.broadcastChannel)||r.addEventListener("message",(async e=>{this._debug("received broadcast notification from other tab or client",e);try{await this._notifyAllSubscribers(e.data.event,e.data.session,!1)}catch(e){this._debug("#broadcastChannel","error",e)}}))}s.skipAutoInitialize||this.initialize().catch((e=>{this._debug("#initialize()","error",e)}))}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${kt}) ${(new Date).toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise||=(async()=>await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._initialize())))(),await this.initializePromise}async _initialize(){try{let e={},t="none";if(rr()&&(e=function(e){let t={},r=new URL(e);if(r.hash&&"#"===r.hash[0])try{new URLSearchParams(r.hash.substring(1)).forEach(((e,r)=>{t[r]=e}))}catch{}return r.searchParams.forEach(((e,r)=>{t[r]=e})),t}(window.location.href),this._isImplicitGrantCallback(e)?t="implicit":await this._isPKCECallback(e)&&(t="pkce")),rr()&&this.detectSessionInUrl&&"none"!==t){let{data:r,error:s}=await this._getSessionFromURL(e,t);if(s){if(this._debug("#_initialize()","error detecting session from URL",s),Bt(s)){let e=s.details?.code;if("identity_already_exists"===e||"identity_not_found"===e||"single_identity_not_deletable"===e)return{error:s}}return{error:s}}let{session:i,redirectType:a}=r;return this._debug("#_initialize()","detected session in URL",i,"redirect type",a),await this._saveSession(i),setTimeout((async()=>{"recovery"===a?await this._notifyAllSubscribers("PASSWORD_RECOVERY",i):await this._notifyAllSubscribers("SIGNED_IN",i)}),0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(e){return jt(e)?this._returnResult({error:e}):this._returnResult({error:new $t("Unexpected error during initialization",e)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){try{let{data:t,error:r}=await vr(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:e?.options?.data??{},gotrue_meta_security:{captcha_token:e?.options?.captchaToken}},xform:Sr});if(r||!t)return this._returnResult({data:{user:null,session:null},error:r});let s=t.session,i=t.user;return t.session&&(await this._saveSession(t.session),await this._notifyAllSubscribers("SIGNED_IN",s)),this._returnResult({data:{user:i,session:s},error:null})}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signUp(e){try{let t;if("email"in e){let{email:r,password:s,options:i}=e,a=null,n=null;"pkce"===this.flowType&&([a,n]=await pr(this.storage,this.storageKey)),t=await vr(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:i?.emailRedirectTo,body:{email:r,password:s,data:i?.data??{},gotrue_meta_security:{captcha_token:i?.captchaToken},code_challenge:a,code_challenge_method:n},xform:Sr})}else{if(!("phone"in e))throw new Ut("You must provide either an email or phone number and a password");{let{phone:r,password:s,options:i}=e;t=await vr(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:r,password:s,data:i?.data??{},channel:i?.channel??"sms",gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Sr})}}let{data:r,error:s}=t;if(s||!r)return await hr(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:s});let i=r.session,a=r.user;return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",i)),this._returnResult({data:{user:a,session:i},error:null})}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithPassword(e){try{let t;if("email"in e){let{email:r,password:s,options:i}=e;t=await vr(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:r,password:s,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Tr})}else{if(!("phone"in e))throw new Ut("You must provide either an email or phone number and a password");{let{phone:r,password:s,options:i}=e;t=await vr(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:r,password:s,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Tr})}}let{data:r,error:s}=t;if(s)return this._returnResult({data:{user:null,session:null},error:s});if(!r||!r.session||!r.user){let e=new Lt;return this._returnResult({data:{user:null,session:null},error:e})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:Object.assign({user:r.user,session:r.session},r.weak_password?{weakPassword:r.weak_password}:null),error:s})}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOAuth(e){return await this._handleProviderSignIn(e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:e.options?.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,(async()=>this._exchangeCodeForSession(e)))}async signInWithWeb3(e){let{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){let t,r;if("message"in e)t=e.message,r=e.signature;else{let s,{chain:i,wallet:a,statement:n,options:o}=e;if(rr())if("object"==typeof a)s=a;else{let e=window;if(!("ethereum"in e)||"object"!=typeof e.ethereum||!("request"in e.ethereum)||"function"!=typeof e.ethereum.request)throw Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");s=e.ethereum}else{if("object"!=typeof a||!o?.url)throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");s=a}let h=new URL(o?.url??window.location.href),c=await s.request({method:"eth_requestAccounts"}).then((e=>e)).catch((()=>{throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")}));if(!c||0===c.length)throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");let l=Dr(c[0]),u=o?.signInWithEthereum?.chainId;u||=function(e){return parseInt(e,16)}(await s.request({method:"eth_chainId"})),t=function(e){let{chainId:t,domain:r,expirationTime:s,issuedAt:i=new Date,nonce:a,notBefore:n,requestId:o,resources:h,scheme:c,uri:l,version:u}=e;if(!Number.isInteger(t))throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!r)throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!l)throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if("1"!==u)throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${u}`);if(e.statement?.includes("\n"))throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e.statement}`);let d=`${c?`${c}://${r}`:r} wants you to sign in with your Ethereum account:\n${Dr(e.address)}\n\n${e.statement?`${e.statement}\n`:""}`,p=`URI: ${l}\nVersion: ${u}\nChain ID: ${t}${a?`\nNonce: ${a}`:""}\nIssued At: ${i.toISOString()}`;if(s&&(p+=`\nExpiration Time: ${s.toISOString()}`),n&&(p+=`\nNot Before: ${n.toISOString()}`),o&&(p+=`\nRequest ID: ${o}`),h){let e="\nResources:";for(let t of h){if(!t||"string"!=typeof t)throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t}`);e+=`\n- ${t}`}p+=e}return`${d}\n${p}`}({domain:h.host,address:l,statement:n,uri:h.href,version:"1",chainId:u,nonce:o?.signInWithEthereum?.nonce,issuedAt:o?.signInWithEthereum?.issuedAt??new Date,expirationTime:o?.signInWithEthereum?.expirationTime,notBefore:o?.signInWithEthereum?.notBefore,requestId:o?.signInWithEthereum?.requestId,resources:o?.signInWithEthereum?.resources}),r=await s.request({method:"personal_sign",params:[Br(t),l]})}try{let{data:s,error:i}=await vr(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:t,signature:r},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Sr});if(i)throw i;if(!s||!s.session||!s.user){let e=new Lt;return this._returnResult({data:{user:null,session:null},error:e})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({},s),error:i})}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSolana(e){let t,r;if("message"in e)t=e.message,r=e.signature;else{let s,{chain:i,wallet:a,statement:n,options:o}=e;if(rr())if("object"==typeof a)s=a;else{let e=window;if(!("solana"in e)||"object"!=typeof e.solana||!("signIn"in e.solana&&"function"==typeof e.solana.signIn||"signMessage"in e.solana&&"function"==typeof e.solana.signMessage))throw Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");s=e.solana}else{if("object"!=typeof a||!o?.url)throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");s=a}let h=new URL(o?.url??window.location.href);if("signIn"in s&&s.signIn){let e,i=await s.signIn(Object.assign(Object.assign(Object.assign({issuedAt:(new Date).toISOString()},o?.signInWithSolana),{version:"1",domain:h.host,uri:h.href}),n?{statement:n}:null));if(Array.isArray(i)&&i[0]&&"object"==typeof i[0])e=i[0];else{if(!(i&&"object"==typeof i&&"signedMessage"in i&&"signature"in i))throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");e=i}if(!("signedMessage"in e&&"signature"in e&&("string"==typeof e.signedMessage||e.signedMessage instanceof Uint8Array)&&e.signature instanceof Uint8Array))throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");t="string"==typeof e.signedMessage?e.signedMessage:(new TextDecoder).decode(e.signedMessage),r=e.signature}else{if(!("signMessage"in s&&"function"==typeof s.signMessage&&"publicKey"in s&&"object"==typeof s&&s.publicKey&&"toBase58"in s.publicKey&&"function"==typeof s.publicKey.toBase58))throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");t=[`${h.host} wants you to sign in with your Solana account:`,s.publicKey.toBase58(),...n?["",n,""]:[""],"Version: 1",`URI: ${h.href}`,`Issued At: ${o?.signInWithSolana?.issuedAt??(new Date).toISOString()}`,...o?.signInWithSolana?.notBefore?[`Not Before: ${o.signInWithSolana.notBefore}`]:[],...o?.signInWithSolana?.expirationTime?[`Expiration Time: ${o.signInWithSolana.expirationTime}`]:[],...o?.signInWithSolana?.chainId?[`Chain ID: ${o.signInWithSolana.chainId}`]:[],...o?.signInWithSolana?.nonce?[`Nonce: ${o.signInWithSolana.nonce}`]:[],...o?.signInWithSolana?.requestId?[`Request ID: ${o.signInWithSolana.requestId}`]:[],...o?.signInWithSolana?.resources?.length?["Resources",...o.signInWithSolana.resources.map((e=>`- ${e}`))]:[]].join("\n");let e=await s.signMessage((new TextEncoder).encode(t),"utf8");if(!(e&&e instanceof Uint8Array))throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");r=e}}try{let{data:s,error:i}=await vr(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:t,signature:tr(r)},e.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options?.captchaToken}}:null),xform:Sr});if(i)throw i;if(!s||!s.session||!s.user){let e=new Lt;return this._returnResult({data:{user:null,session:null},error:e})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({},s),error:i})}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _exchangeCodeForSession(e){let[t,r]=(await or(this.storage,`${this.storageKey}-code-verifier`)??"").split("/");try{if(!t&&"pkce"===this.flowType)throw new Ht;let{data:s,error:i}=await vr(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:t},xform:Sr});if(await hr(this.storage,`${this.storageKey}-code-verifier`),i)throw i;if(!s||!s.session||!s.user){let e=new Lt;return this._returnResult({data:{user:null,session:null,redirectType:null},error:e})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("recovery"===r?"PASSWORD_RECOVERY":"SIGNED_IN",s.session)),this._returnResult({data:Object.assign(Object.assign({},s),{redirectType:r??null}),error:i})}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:{user:null,session:null,redirectType:null},error:e});throw e}}async signInWithIdToken(e){try{let{options:t,provider:r,token:s,access_token:i,nonce:a}=e,{data:n,error:o}=await vr(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:r,id_token:s,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:t?.captchaToken}},xform:Sr});if(o)return this._returnResult({data:{user:null,session:null},error:o});if(!n||!n.session||!n.user){let e=new Lt;return this._returnResult({data:{user:null,session:null},error:e})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers("SIGNED_IN",n.session)),this._returnResult({data:n,error:o})}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithOtp(e){try{if("email"in e){let{email:t,options:r}=e,s=null,i=null;"pkce"===this.flowType&&([s,i]=await pr(this.storage,this.storageKey));let{error:a}=await vr(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:t,data:r?.data??{},create_user:r?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:r?.captchaToken},code_challenge:s,code_challenge_method:i},redirectTo:r?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}if("phone"in e){let{phone:t,options:r}=e,{data:s,error:i}=await vr(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:t,data:r?.data??{},create_user:r?.shouldCreateUser??!0,gotrue_meta_security:{captcha_token:r?.captchaToken},channel:r?.channel??"sms"}});return this._returnResult({data:{user:null,session:null,messageId:s?.message_id},error:i})}throw new Ut("You must provide either an email or phone number.")}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async verifyOtp(e){try{let t,r;"options"in e&&(t=e.options?.redirectTo,r=e.options?.captchaToken);let{data:s,error:i}=await vr(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:r}}),redirectTo:t,xform:Sr});if(i)throw i;if(!s)throw Error("An error occurred on token verification.");let a=s.session,n=s.user;return a?.access_token&&(await this._saveSession(a),await this._notifyAllSubscribers("recovery"==e.type?"PASSWORD_RECOVERY":"SIGNED_IN",a)),this._returnResult({data:{user:n,session:a},error:null})}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async signInWithSSO(e){try{let t=null,r=null;"pkce"===this.flowType&&([t,r]=await pr(this.storage,this.storageKey));let s=await vr(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:e.options?.redirectTo??void 0}),e?.options?.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:t,code_challenge_method:r}),headers:this.headers,xform:Ar});return s.data?.url&&rr()&&!e.options?.skipBrowserRedirect&&window.location.assign(s.data.url),this._returnResult(s)}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:null,error:e});throw e}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._reauthenticate()))}async _reauthenticate(){try{return await this._useSession((async e=>{let{data:{session:t},error:r}=e;if(r)throw r;if(!t)throw new Nt;let{error:s}=await vr(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:s})}))}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{let t=`${this.url}/resend`;if("email"in e){let{email:r,type:s,options:i}=e,{error:a}=await vr(this.fetch,"POST",t,{headers:this.headers,body:{email:r,type:s,gotrue_meta_security:{captcha_token:i?.captchaToken}},redirectTo:i?.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:a})}if("phone"in e){let{phone:r,type:s,options:i}=e,{data:a,error:n}=await vr(this.fetch,"POST",t,{headers:this.headers,body:{phone:r,type:s,gotrue_meta_security:{captcha_token:i?.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a?.message_id},error:n})}throw new Ut("You must provide either an email or phone number and a type")}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>this._useSession((async e=>e))))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){let e=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),r=(async()=>(await e,await t()))();return this.pendingInLock.push((async()=>{try{await r}catch{}})()),r}return await this.lock(`lock:${this.storageKey}`,e,(async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;let e=t();for(this.pendingInLock.push((async()=>{try{await e}catch{}})()),await e;this.pendingInLock.length;){let e=[...this.pendingInLock];await Promise.all(e),this.pendingInLock.splice(0,e.length)}return await e}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}}))}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{return await e(await this.__loadSession())}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",Error().stack);try{let e=null,t=await or(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),null!==t&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};let r=!!e.expires_at&&1e3*e.expires_at-Date.now()<St;if(this._debug("#__loadSession()",`session has${r?"":" not"} expired`,"expires_at",e.expires_at),!r){if(this.userStorage){let t=await or(this.userStorage,this.storageKey+"-user");e.user=t?.user?t.user:yr()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){let t={value:this.suppressGetSessionWarning};e.user=function(e,t){return new Proxy(e,{get:(e,r,s)=>{if("__isInsecureUserWarningProxy"===r)return!0;if("symbol"==typeof r){let t=r.toString();if("Symbol(Symbol.toPrimitive)"===t||"Symbol(Symbol.toStringTag)"===t||"Symbol(util.inspect.custom)"===t||"Symbol(nodejs.util.inspect.custom)"===t)return Reflect.get(e,r,s)}return!t.value&&"string"==typeof r&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),t.value=!0),Reflect.get(e,r,s)}})}(e.user,t),t.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}let{data:s,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{session:null},error:i}):this._returnResult({data:{session:s},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let t=await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._getUser()));return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await vr(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Er}):await this._useSession((async e=>{let{data:t,error:r}=e;if(r)throw r;return t.session?.access_token||this.hasCustomAuthorizationHeader?await vr(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:t.session?.access_token??void 0,xform:Er}):{data:{user:null},error:new Nt}}))}catch(e){if(jt(e))return xt(e)&&(await this._removeSession(),await hr(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:e});throw e}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._updateUser(e,t)))}async _updateUser(e,t={}){try{return await this._useSession((async r=>{let{data:s,error:i}=r;if(i)throw i;if(!s.session)throw new Nt;let a=s.session,n=null,o=null;"pkce"===this.flowType&&null!=e.email&&([n,o]=await pr(this.storage,this.storageKey));let{data:h,error:c}=await vr(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t?.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:n,code_challenge_method:o}),jwt:a.access_token,xform:Er});if(c)throw c;return a.user=h.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),this._returnResult({data:{user:a.user},error:null})}))}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:{user:null},error:e});throw e}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._setSession(e)))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new Nt;let t=Date.now()/1e3,r=t,s=!0,i=null,{payload:a}=lr(e.access_token);if(a.exp&&(r=a.exp,s=r<=t),s){let{data:t,error:r}=await this._callRefreshToken(e.refresh_token);if(r)return this._returnResult({data:{user:null,session:null},error:r});if(!t)return{data:{user:null,session:null},error:null};i=t}else{let{data:s,error:a}=await this._getUser(e.access_token);if(a)return this._returnResult({data:{user:null,session:null},error:a});i={access_token:e.access_token,refresh_token:e.refresh_token,user:s.user,token_type:"bearer",expires_in:r-t,expires_at:r},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(e){if(jt(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._refreshSession(e)))}async _refreshSession(e){try{return await this._useSession((async t=>{if(!e){let{data:r,error:s}=t;if(s)throw s;e=r.session??void 0}if(!e?.refresh_token)throw new Nt;let{data:r,error:s}=await this._callRefreshToken(e.refresh_token);return s?this._returnResult({data:{user:null,session:null},error:s}):r?this._returnResult({data:{user:r.user,session:r},error:null}):this._returnResult({data:{user:null,session:null},error:null})}))}catch(e){if(jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async _getSessionFromURL(e,t){try{if(!rr())throw new Dt("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Dt(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if("pkce"===this.flowType)throw new qt("Not a valid PKCE flow url.");break;case"pkce":if("implicit"===this.flowType)throw new Dt("Not a valid implicit grant flow url.")}if("pkce"===t){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new qt("No code detected.");let{data:t,error:r}=await this._exchangeCodeForSession(e.code);if(r)throw r;let s=new URL(window.location.href);return s.searchParams.delete("code"),window.history.replaceState(window.history.state,"",s.toString()),{data:{session:t.session,redirectType:t.redirectType??null},error:null}}let{provider_token:r,provider_refresh_token:s,access_token:i,refresh_token:a,expires_in:n,expires_at:o,token_type:h}=e;if(!(i&&n&&a&&h))throw new Dt("No session defined in URL");let c=Math.round(Date.now()/1e3),l=parseInt(n),u=c+l;o&&(u=parseInt(o));let d=u-c;1e3*d<=vt&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${d}s, should have been closer to ${l}s`);let p=u-l;c-p>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",p,u,c):c-p<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",p,u,c);let{data:f,error:g}=await this._getUser(i);if(g)throw g;let m={provider_token:r,provider_refresh_token:s,access_token:i,expires_in:l,expires_at:u,refresh_token:a,token_type:h,user:f.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:m,redirectType:e.type},error:null})}catch(e){if(jt(e))return this._returnResult({data:{session:null,redirectType:null},error:e});throw e}}_isImplicitGrantCallback(e){return"function"==typeof this.detectSessionInUrl?this.detectSessionInUrl(new URL(window.location.href),e):!(!e.access_token&&!e.error_description)}async _isPKCECallback(e){let t=await or(this.storage,`${this.storageKey}-code-verifier`);return!(!e.code||!t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>await this._signOut(e)))}async _signOut({scope:e}={scope:"global"}){return await this._useSession((async t=>{let{data:r,error:s}=t;if(s&&!xt(s))return this._returnResult({error:s});let i=r.session?.access_token;if(i){let{error:t}=await this.admin.signOut(i,e);if(t&&(!Pt(t)||404!==t.status&&401!==t.status&&403!==t.status)&&!xt(t))return this._returnResult({error:t})}return"others"!==e&&(await this._removeSession(),await hr(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})}))}onAuthStateChange(e){let t=Symbol("auth-callback"),r={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,r),(async()=>{await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>{this._emitInitialSession(t)}))})(),{data:{subscription:r}}}async _emitInitialSession(e){return await this._useSession((async t=>{try{let{data:{session:r},error:s}=t;if(s)throw s;await(this.stateChangeEmitters.get(e)?.callback("INITIAL_SESSION",r)),this._debug("INITIAL_SESSION","callback id",e,"session",r)}catch(t){await(this.stateChangeEmitters.get(e)?.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",t),xt(t)?console.warn(t):console.error(t)}}))}async resetPasswordForEmail(e,t={}){let r=null,s=null;"pkce"===this.flowType&&([r,s]=await pr(this.storage,this.storageKey,!0));try{return await vr(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:r,code_challenge_method:s,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:null,error:e});throw e}}async getUserIdentities(){try{let{data:e,error:t}=await this.getUser();if(t)throw t;return this._returnResult({data:{identities:e.user.identities??[]},error:null})}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){try{let{data:t,error:r}=await this._useSession((async t=>{let{data:r,error:s}=t;if(s)throw s;let i=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:e.options?.redirectTo,scopes:e.options?.scopes,queryParams:e.options?.queryParams,skipBrowserRedirect:!0});return await vr(this.fetch,"GET",i,{headers:this.headers,jwt:r.session?.access_token??void 0})}));if(r)throw r;return rr()&&!e.options?.skipBrowserRedirect&&window.location.assign(t?.url),this._returnResult({data:{provider:e.provider,url:t?.url},error:null})}catch(t){if(jt(t))return this._returnResult({data:{provider:e.provider,url:null},error:t});throw t}}async linkIdentityIdToken(e){return await this._useSession((async t=>{try{let{error:r,data:{session:s}}=t;if(r)throw r;let{options:i,provider:a,token:n,access_token:o,nonce:h}=e,{data:c,error:l}=await vr(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:s?.access_token??void 0,body:{provider:a,id_token:n,access_token:o,nonce:h,link_identity:!0,gotrue_meta_security:{captcha_token:i?.captchaToken}},xform:Sr});return l?this._returnResult({data:{user:null,session:null},error:l}):c&&c.session&&c.user?(c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers("USER_UPDATED",c.session)),this._returnResult({data:c,error:l})):this._returnResult({data:{user:null,session:null},error:new Lt})}catch(e){if(await hr(this.storage,`${this.storageKey}-code-verifier`),jt(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}))}async unlinkIdentity(e){try{return await this._useSession((async t=>{let{data:r,error:s}=t;if(s)throw s;return await vr(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:r.session?.access_token??void 0})}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _refreshAccessToken(e){let t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{let r=Date.now();return await function(e,t){return new Promise(((r,s)=>{(async()=>{for(let i=0;i<1/0;i++)try{let s=await e(i);if(!t(i,null,s))return void r(s)}catch(e){if(!t(i,e))return void s(e)}})()}))}((async r=>(r>0&&await async function(e){return await new Promise((t=>{setTimeout((()=>t(null)),e)}))}(200*2**(r-1)),this._debug(t,"refreshing attempt",r),await vr(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:Sr}))),((e,t)=>{let s=200*2**e;return t&&Wt(t)&&Date.now()+s-r<vt}))}catch(e){if(this._debug(t,"error",e),jt(e))return this._returnResult({data:{session:null,user:null},error:e});throw e}finally{this._debug(t,"end")}}_isValidSession(e){return"object"==typeof e&&!!e&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){let r=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",r),rr()&&!t.skipBrowserRedirect&&window.location.assign(r),{data:{provider:e,url:r},error:null}}async _recoverAndRefresh(){let e="#_recoverAndRefresh()";this._debug(e,"begin");try{let t=await or(this.storage,this.storageKey);if(t&&this.userStorage){let e=await or(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!e&&(e={user:t.user},await nr(this.userStorage,this.storageKey+"-user",e)),t.user=e?.user??yr()}else if(t&&!t.user&&!t.user){let e=await or(this.storage,this.storageKey+"-user");e&&e?.user?(t.user=e.user,await hr(this.storage,this.storageKey+"-user"),await nr(this.storage,this.storageKey,t)):t.user=yr()}if(this._debug(e,"session from storage",t),!this._isValidSession(t))return this._debug(e,"session is not valid"),void(null!==t&&await this._removeSession());let r=1e3*(t.expires_at??1/0)-Date.now()<St;if(this._debug(e,`session has${r?"":" not"} expired with margin of 90000s`),r){if(this.autoRefreshToken&&t.refresh_token){let{error:r}=await this._callRefreshToken(t.refresh_token);r&&(console.error(r),Wt(r)||(this._debug(e,"refresh failed with a non-retryable error, removing the session",r),await this._removeSession()))}}else if(t.user&&!0===t.user.__isUserNotAvailableProxy)try{let{data:r,error:s}=await this._getUser(t.access_token);!s&&r?.user?(t.user=r.user,await this._saveSession(t),await this._notifyAllSubscribers("SIGNED_IN",t)):this._debug(e,"could not get user data, skipping SIGNED_IN notification")}catch(t){console.error("Error getting user data:",t),this._debug(e,"error getting user data, skipping SIGNED_IN notification",t)}else await this._notifyAllSubscribers("SIGNED_IN",t)}catch(t){return this._debug(e,"error",t),void console.error(t)}finally{this._debug(e,"end")}}async _callRefreshToken(e){var t,r;if(!e)throw new Nt;if(this.refreshingDeferred)return this.refreshingDeferred.promise;let s=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(s,"begin");try{this.refreshingDeferred=new cr;let{data:t,error:r}=await this._refreshAccessToken(e);if(r)throw r;if(!t.session)throw new Nt;await this._saveSession(t.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",t.session);let s={data:t.session,error:null};return this.refreshingDeferred.resolve(s),s}catch(e){if(this._debug(s,"error",e),jt(e)){let r={data:null,error:e};return Wt(e)||await this._removeSession(),null==(t=this.refreshingDeferred)||t.resolve(r),r}throw null==(r=this.refreshingDeferred)||r.reject(e),e}finally{this.refreshingDeferred=null,this._debug(s,"end")}}async _notifyAllSubscribers(e,t,r=!0){let s=`#_notifyAllSubscribers(${e})`;this._debug(s,"begin",t,`broadcast = ${r}`);try{this.broadcastChannel&&r&&this.broadcastChannel.postMessage({event:e,session:t});let s=[],i=Array.from(this.stateChangeEmitters.values()).map((async r=>{try{await r.callback(e,t)}catch(e){s.push(e)}}));if(await Promise.all(i),s.length>0){for(let e=0;e<s.length;e+=1)console.error(s[e]);throw s[0]}}finally{this._debug(s,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await hr(this.storage,`${this.storageKey}-code-verifier`);let t=Object.assign({},e),r=t.user&&!0===t.user.__isUserNotAvailableProxy;if(this.userStorage){!r&&t.user&&await nr(this.userStorage,this.storageKey+"-user",{user:t.user});let e=Object.assign({},t);delete e.user;let s=br(e);await nr(this.storage,this.storageKey,s)}else{let e=br(t);await nr(this.storage,this.storageKey,e)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await hr(this.storage,this.storageKey),await hr(this.storage,this.storageKey+"-code-verifier"),await hr(this.storage,this.storageKey+"-user"),this.userStorage&&await hr(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");let e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&rr()&&null!=window&&window.removeEventListener&&window.removeEventListener("visibilitychange",e)}catch(e){console.error("removing visibilitychange callback failed",e)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");let e=setInterval((()=>this._autoRefreshTokenTick()),vt);this.autoRefreshTicker=e,e&&"object"==typeof e&&"function"==typeof e.unref?e.unref():typeof Deno<"u"&&"function"==typeof Deno.unrefTimer&&Deno.unrefTimer(e);let t=setTimeout((async()=>{await this.initializePromise,await this._autoRefreshTokenTick()}),0);this.autoRefreshTickTimeout=t,t&&"object"==typeof t&&"function"==typeof t.unref?t.unref():typeof Deno<"u"&&"function"==typeof Deno.unrefTimer&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");let e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);let t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,(async()=>{try{let e=Date.now();try{return await this._useSession((async t=>{let{data:{session:r}}=t;if(!r||!r.refresh_token||!r.expires_at)return void this._debug("#_autoRefreshTokenTick()","no session");let s=Math.floor((1e3*r.expires_at-e)/vt);this._debug("#_autoRefreshTokenTick()",`access token expires in ${s} ticks, a tick lasts ${vt}ms, refresh threshold is 3 ticks`),s<=3&&await this._callRefreshToken(r.refresh_token)}))}catch(e){console.error("Auto refresh tick failed with error. This is likely a transient error.",e)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}))}catch(e){if(!(e.isAcquireTimeout||e instanceof Ir))throw e;this._debug("auto refresh token tick lock not available")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!rr()||null==window||!window.addEventListener)return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},null==window||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){let t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),"visible"===document.visibilityState?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,(async()=>{"visible"===document.visibilityState?await this._recoverAndRefresh():this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting")})))):"hidden"===document.visibilityState&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,r){let s=[`provider=${encodeURIComponent(t)}`];if(r?.redirectTo&&s.push(`redirect_to=${encodeURIComponent(r.redirectTo)}`),r?.scopes&&s.push(`scopes=${encodeURIComponent(r.scopes)}`),"pkce"===this.flowType){let[e,t]=await pr(this.storage,this.storageKey),r=new URLSearchParams({code_challenge:`${encodeURIComponent(e)}`,code_challenge_method:`${encodeURIComponent(t)}`});s.push(r.toString())}if(r?.queryParams){let e=new URLSearchParams(r.queryParams);s.push(e.toString())}return r?.skipBrowserRedirect&&s.push(`skip_http_redirect=${r.skipBrowserRedirect}`),`${e}?${s.join("&")}`}async _unenroll(e){try{return await this._useSession((async t=>{let{data:r,error:s}=t;return s?this._returnResult({data:null,error:s}):await vr(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:r?.session?.access_token})}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _enroll(e){try{return await this._useSession((async t=>{let{data:r,error:s}=t;if(s)return this._returnResult({data:null,error:s});let i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},"phone"===e.factorType?{phone:e.phone}:"totp"===e.factorType?{issuer:e.issuer}:{}),{data:a,error:n}=await vr(this.fetch,"POST",`${this.url}/factors`,{body:i,headers:this.headers,jwt:r?.session?.access_token});return n?this._returnResult({data:null,error:n}):("totp"===e.factorType&&"totp"===a.type&&a?.totp?.qr_code&&(a.totp.qr_code=`data:image/svg+xml;utf-8,${a.totp.qr_code}`),this._returnResult({data:a,error:null}))}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,(async()=>{try{return await this._useSession((async t=>{let{data:r,error:s}=t;if(s)return this._returnResult({data:null,error:s});let i=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:"create"===e.webauthn.type?Gr(e.webauthn.credential_response):Vr(e.webauthn.credential_response)})}:{code:e.code}),{data:a,error:n}=await vr(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:i,headers:this.headers,jwt:r?.session?.access_token});return n?this._returnResult({data:null,error:n}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+a.expires_in},a)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",a),this._returnResult({data:a,error:n}))}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}))}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,(async()=>{try{return await this._useSession((async t=>{let{data:r,error:s}=t;if(s)return this._returnResult({data:null,error:s});let i=await vr(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:r?.session?.access_token});if(i.error)return i;let{data:a}=i;if("webauthn"!==a.type)return{data:a,error:null};switch(a.webauthn.type){case"create":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Fr(a.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},a),{webauthn:Object.assign(Object.assign({},a.webauthn),{credential_options:Object.assign(Object.assign({},a.webauthn.credential_options),{publicKey:Jr(a.webauthn.credential_options.publicKey)})})}),error:null}}}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}))}async _challengeAndVerify(e){let{data:t,error:r}=await this._challenge({factorId:e.factorId});return r?this._returnResult({data:null,error:r}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){let{data:{user:e},error:t}=await this.getUser();if(t)return{data:null,error:t};let r={all:[],phone:[],totp:[],webauthn:[]};for(let t of e?.factors??[])r.all.push(t),"verified"===t.status&&r[t.factor_type].push(t);return{data:r,error:null}}async _getAuthenticatorAssuranceLevel(e){if(e)try{let{payload:t}=lr(e),r=null;t.aal&&(r=t.aal);let s=r,{data:{user:i},error:a}=await this.getUser(e);return a?this._returnResult({data:null,error:a}):(((i?.factors)?.filter((e=>"verified"===e.status))??[]).length>0&&(s="aal2"),{data:{currentLevel:r,nextLevel:s,currentAuthenticationMethods:t.amr||[]},error:null})}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}let{data:{session:t},error:r}=await this.getSession();if(r)return this._returnResult({data:null,error:r});if(!t)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};let{payload:s}=lr(t.access_token),i=null;s.aal&&(i=s.aal);let a=i;return(t.user.factors?.filter((e=>"verified"===e.status))??[]).length>0&&(a="aal2"),{data:{currentLevel:i,nextLevel:a,currentAuthenticationMethods:s.amr||[]},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession((async t=>{let{data:{session:r},error:s}=t;return s?this._returnResult({data:null,error:s}):r?await vr(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:r.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new Nt})}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _approveAuthorization(e,t){try{return await this._useSession((async r=>{let{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new Nt});let a=await vr(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"approve"},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&rr()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _denyAuthorization(e,t){try{return await this._useSession((async r=>{let{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new Nt});let a=await vr(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:s.access_token,body:{action:"deny"},xform:e=>({data:e,error:null})});return a.data&&a.data.redirect_url&&rr()&&!t?.skipBrowserRedirect&&window.location.assign(a.data.redirect_url),a}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _listOAuthGrants(){try{return await this._useSession((async e=>{let{data:{session:t},error:r}=e;return r?this._returnResult({data:null,error:r}):t?await vr(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:e=>({data:e,error:null})}):this._returnResult({data:null,error:new Nt})}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession((async t=>{let{data:{session:r},error:s}=t;return s?this._returnResult({data:null,error:s}):r?(await vr(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new Nt})}))}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}async fetchJwk(e,t={keys:[]}){let r=t.keys.find((t=>t.kid===e));if(r)return r;let s=Date.now();if(r=this.jwks.keys.find((t=>t.kid===e)),r&&this.jwks_cached_at+6e5>s)return r;let{data:i,error:a}=await vr(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return i.keys&&0!==i.keys.length&&(this.jwks=i,this.jwks_cached_at=s,r=i.keys.find((t=>t.kid===e)),r)?r:null}async getClaims(e,t={}){try{let r=e;if(!r){let{data:e,error:t}=await this.getSession();if(t||!e.session)return this._returnResult({data:null,error:t});r=e.session.access_token}let{header:s,payload:i,signature:a,raw:{header:n,payload:o}}=lr(r);t?.allowExpired||function(e){if(!e)throw Error("Missing exp claim");if(e<=Math.floor(Date.now()/1e3))throw Error("JWT has expired")}(i.exp);let h=s.alg&&!s.alg.startsWith("HS")&&s.kid&&"crypto"in globalThis&&"subtle"in globalThis.crypto?await this.fetchJwk(s.kid,t?.keys?{keys:t.keys}:t?.jwks):null;if(!h){let{error:e}=await this.getUser(r);if(e)throw e;return{data:{claims:i,header:s,signature:a},error:null}}let c=function(e){switch(e){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw Error("Invalid alg claim")}}(s.alg),l=await crypto.subtle.importKey("jwk",h,c,!0,["verify"]);if(!await crypto.subtle.verify(c,l,a,er(`${n}.${o}`)))throw new Ft("Invalid JWT signature");return{data:{claims:i,header:s,signature:a},error:null}}catch(e){if(jt(e))return this._returnResult({data:null,error:e});throw e}}};as.nextInstanceID={};var ns=as,os=Cr,hs=ns,cs=class extends hs{constructor(e){super(e)}},ls=class{constructor(e,t,r){this.supabaseUrl=e,this.supabaseKey=t;let s=function(e){let t=e?.trim();if(!t)throw Error("supabaseUrl is required.");if(!t.match(/^https?:\/\//i))throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(function(e){return e.endsWith("/")?e:e+"/"}(t))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}(e);if(!t)throw Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",s),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",s),this.storageUrl=new URL("storage/v1",s),this.functionsUrl=new URL("functions/v1",s);let i=`sb-${s.hostname.split(".")[0]}-auth-token`,a=function(e,t){let{db:r,auth:s,realtime:i,global:a}=e,{db:n,auth:o,realtime:h,global:c}=t,l={db:{...n,...r},auth:{...o,...s},realtime:{...h,...i},storage:{},global:{...c,...a,headers:{...c?.headers??{},...a?.headers??{}}},accessToken:async()=>""};return e.accessToken?l.accessToken=e.accessToken:delete l.accessToken,l}(r??{},{db:yt,realtime:wt,auth:{...bt,storageKey:i},global:mt});this.storageKey=a.auth.storageKey??"",this.headers=a.global.headers??{},a.accessToken?(this.accessToken=a.accessToken,this.auth=new Proxy({},{get:(e,t)=>{throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t)} is not possible`)}})):this.auth=this._initSupabaseAuthClient(a.auth??{},this.headers,a.global.fetch),this.fetch=_t(t,this._getAccessToken.bind(this),a.global.fetch),this.realtime=this._initRealtimeClient({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch,...a.realtime}),this.accessToken&&Promise.resolve(this.accessToken()).then((e=>this.realtime.setAuth(e))).catch((e=>console.warn("Failed to set initial Realtime auth token:",e))),this.rest=new T(new URL("rest/v1",s).href,{headers:this.headers,schema:a.db.schema,fetch:this.fetch,timeout:a.db.timeout,urlLengthLimit:a.db.urlLengthLimit}),this.storage=new ft(this.storageUrl.href,this.headers,this.fetch,r?.storage),a.accessToken||this._listenForAuthEvents()}get functions(){return new o(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(e){return this.rest.from(e)}schema(e){return this.rest.schema(e)}rpc(e,t={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(e,t,r)}channel(e,t={config:{}}){return this.realtime.channel(e,t)}getChannels(){return this.realtime.getChannels()}removeChannel(e){return this.realtime.removeChannel(e)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){if(this.accessToken)return await this.accessToken();let{data:e}=await this.auth.getSession();return e.session?.access_token??this.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:s,userStorage:i,storageKey:a,flowType:n,lock:o,debug:h,throwOnError:c},l,u){let d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new cs({url:this.authUrl.href,headers:{...d,...l},storageKey:a,autoRefreshToken:e,persistSession:t,detectSessionInUrl:r,storage:s,userStorage:i,flowType:n,lock:o,debug:h,throwOnError:c,fetch:u,hasCustomAuthorizationHeader:Object.keys(this.headers).some((e=>"authorization"===e.toLowerCase()))})}_initRealtimeClient(e){return new Se(this.realtimeUrl.href,{...e,params:{apikey:this.supabaseKey,...e?.params}})}_listenForAuthEvents(){return this.auth.onAuthStateChange(((e,t)=>{this._handleTokenChanged(e,"CLIENT",t?.access_token)}))}_handleTokenChanged(e,t,r){"TOKEN_REFRESHED"!==e&&"SIGNED_IN"!==e||this.changedAccessToken===r?"SIGNED_OUT"===e&&(this.realtime.setAuth(),"STORAGE"==t&&this.auth.signOut(),this.changedAccessToken=void 0):(this.changedAccessToken=r,this.realtime.setAuth(r))}};return function(){if(typeof window<"u")return!1;let e=globalThis.process;if(!e)return!1;let t=e.version;if(null==t)return!1;let r=t.match(/^v(\d+)\./);return!!r&&parseInt(r[1],10)<=18}()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217"),e.AuthAdminApi=os,e.AuthApiError=Ct,e.AuthClient=hs,e.AuthError=Ot,e.AuthImplicitGrantRedirectError=Dt,e.AuthInvalidCredentialsError=Ut,e.AuthInvalidJwtError=Ft,e.AuthInvalidTokenResponseError=Lt,e.AuthPKCECodeVerifierMissingError=Ht,e.AuthPKCEGrantCodeExchangeError=qt,e.AuthRetryableFetchError=Mt,e.AuthSessionMissingError=Nt,e.AuthUnknownError=$t,e.AuthWeakPasswordError=Kt,e.CustomAuthError=It,Object.defineProperty(e,"FunctionRegion",{enumerable:!0,get:function(){return r}}),e.FunctionsError=s,e.FunctionsFetchError=i,e.FunctionsHttpError=n,e.FunctionsRelayError=a,e.GoTrueAdminApi=Cr,e.GoTrueClient=ns,e.NavigatorLockAcquireTimeoutError=Nr,e.PostgrestError=u,e.REALTIME_CHANNEL_STATES=be,Object.defineProperty(e,"REALTIME_LISTEN_TYPES",{enumerable:!0,get:function(){return fe}}),Object.defineProperty(e,"REALTIME_POSTGRES_CHANGES_LISTEN_EVENT",{enumerable:!0,get:function(){return pe}}),Object.defineProperty(e,"REALTIME_PRESENCE_LISTEN_EVENTS",{enumerable:!0,get:function(){return H}}),Object.defineProperty(e,"REALTIME_SUBSCRIBE_STATES",{enumerable:!0,get:function(){return ge}}),e.RealtimeChannel=we,e.RealtimeClient=Se,e.RealtimePresence=me,e.SIGN_OUT_SCOPES=jr,e.StorageApiError=De,e.SupabaseClient=ls,e.WebSocketFactory=E,e.createClient=(e,t,r)=>new ls(e,t,r),e.isAuthApiError=Pt,e.isAuthError=jt,e.isAuthImplicitGrantRedirectError=Bt,e.isAuthPKCECodeVerifierMissingError=function(e){return jt(e)&&"AuthPKCECodeVerifierMissingError"===e.name},e.isAuthRetryableFetchError=Wt,e.isAuthSessionMissingError=xt,e.isAuthWeakPasswordError=function(e){return jt(e)&&"AuthWeakPasswordError"===e.name},e.lockInternals=$r,e.navigatorLock=Lr,e.processLock=async function(e,t,r){let s=Ur[e]??Promise.resolve(),i=(async()=>{try{return await s,null}catch{return null}})(),a=(async()=>{let s=null;try{let r=t>=0?new Promise(((r,i)=>{s=setTimeout((()=>{console.warn(`@supabase/gotrue-js: Lock "${e}" acquisition timed out after ${t}ms. This may be caused by another operation holding the lock. Consider increasing lockAcquireTimeout or checking for stuck operations.`),i(new xr(`Acquiring process lock with name "${e}" timed out`))}),t)})):null;await Promise.race([i,r].filter((e=>e))),null!==s&&clearTimeout(s)}catch(e){if(null!==s&&clearTimeout(s),e&&e.isAcquireTimeout)throw e}return await r()})();return Ur[e]=(async()=>{try{return await a}catch(e){if(e&&e.isAcquireTimeout){try{await s}catch{}return null}throw e}})(),await a},e}({});
//# sourceMappingURL=/sm/0bda17fc4480527b996479d5839f4b3713b977b67da97360b2c32a9e1449764b.map

// ==========================================
// ARCHIVO: js/clinicas-destacadas.js
// ==========================================

/* ══════════════════════════════════════════════════════════════
   CLÍNICAS DESTACADAS — Wufly
   Sistema multi-región: detecta por GPS y carga las clínicas
   de la región más cercana. Agregar nuevas regiones en
   REGIONES_CLINICAS con su bounding box y arreglo de clínicas.
   ══════════════════════════════════════════════════════════════ */

/* ── Región de Coquimbo (IV) — Capital: La Serena ── */
const CLINICAS_LASERENA = [
  {
    id: 'laserenavet',
    nombre: 'La Serena Vet',
    subtitulo: 'Urgencias 24h · Cirugía · Ortopedia',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'La Serena',
    direccion: 'Av. Los Perales 1218, La Serena',
    telefono: '',
    whatsapp: '',
    web: 'laserenavet.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria integral 24h en La Serena. Cirugía, ortopedia, radiografías, peluquería, farmacia y laboratorio clínico. Consulta gratis en primera visita.',
    rating: 4.6, reviews: 180,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Cirugía', 'Ortopedia', 'Laboratorio', 'Farmacia'],
    bannerImg: '', lat: -29.90430, lng: -71.25210,
  },
  {
    id: 'antakari-serena',
    nombre: 'Clínica Veterinaria Antakari',
    subtitulo: 'Hospital full service · 24h · Domicilio',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'La Serena',
    direccion: 'Av. Juan Cisternas 2902, La Serena',
    telefono: '+56 9 3408 2534',
    whatsapp: '56934082534',
    web: 'veterinariantakari.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Hospital veterinario full service en La Serena y Coquimbo. Urgencias 24h, laboratorio clínico propio, cirugías y atención a domicilio. Equipo de médicos altamente capacitados.',
    rating: 4.7, reviews: 210,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio', 'Domicilio', 'Cirugía', 'Hospitalización'],
    bannerImg: '', lat: -29.91800, lng: -71.24600,
  },
  {
    id: 'larrain-serena',
    nombre: 'Clínica Veterinaria Larraín',
    subtitulo: 'Urgencias 24h · Laboratorio · Especialidades',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'La Serena',
    direccion: 'Larrraín Alcalde 3096, La Serena',
    telefono: '+56 9 9883 4811',
    whatsapp: '56998834811',
    web: '',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Centro de referencia 24h en La Serena. Cuenta con laboratorio clínico propio. Referente de urgencias en la ciudad, con recepcionista nocturno permanente.',
    rating: 4.5, reviews: 150,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio', 'Especialidades', 'Hospitalización'],
    bannerImg: '', lat: -29.89500, lng: -71.24100,
  },
];

/* ── Región de Valparaíso (V) — Capital: Valparaíso / Viña del Mar ── */
const CLINICAS_DESTACADAS = [
  {
    id: 'mevetlab',
    nombre: 'MEVETLAB Clínica Veterinaria',
    subtitulo: 'Clínica · Laboratorio · Urgencias 24h',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Viña del Mar',
    direccion: 'Álvarez 2172, Chorrillos, Viña del Mar',
    telefono: '',
    whatsapp: '',
    web: 'mevetlab.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica integral especializada en pequeños animales con laboratorio propio. Quirófano equipado, hospitalización 24h y atención Fear Free. Una de las más completas de Viña del Mar.',
    rating: 4.8, reviews: 312,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Laboratorio propio', 'Hospitalización', 'Cirugía', 'Fear Free'],
    bannerImg: '/img/banner-mevetlab.png', lat: -33.02587, lng: -71.55578,
  },
  {
    id: 'artemisa',
    nombre: 'Clínica Artemisa',
    subtitulo: 'Urgencias 24h · Exóticos · Peluquería',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Viña del Mar',
    direccion: '2 Oriente 526, Viña del Mar',
    telefono: '+56 9 9109 2675',
    whatsapp: '56991092675',
    web: '',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria 24 horas comprometida con la salud animal. Atiende mascotas convencionales y animales exóticos. Urgencias permanentes y peluquería canina.',
    rating: 4.0, reviews: 364,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Animales exóticos', 'Peluquería canina', 'Farmacia'],
    bannerImg: '/img/banner-artemisa.png', lat: -33.01618, lng: -71.54760,
  },
  {
    id: 'recreo',
    nombre: 'Centro Veterinario Recreo',
    subtitulo: 'Emergencias · Cirugía · Medicina preventiva',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Valparaíso',
    direccion: 'Olga 117, Recreo, Valparaíso',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb–Dom 10–18h',
    descripcion: 'Centro veterinario especializado en emergencias. Cirugías, vacunaciones y medicina preventiva. Reconocido por su dedicación y trato cercano con los pacientes.',
    rating: 4.5, reviews: 276,
    fotos: [], veterinarios: [],
    tags: ['Emergencias', 'Cirugía', 'Vacunación', 'Medicina preventiva'],
    bannerImg: '/img/banner-recreo.png', lat: -33.02869, lng: -71.57712,
  },
];

/* ── Región Metropolitana (XIII) — Capital: Santiago ── */
const CLINICAS_SANTIAGO = [
  {
    id: 'veterinaria-colon',
    nombre: 'Veterinaria Colón',
    subtitulo: 'Clínica · Peluquería · Urgencias 24h',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Las Condes',
    direccion: 'Av. Cristóbal Colón 5781, Las Condes, Santiago',
    telefono: '+56 2 2211 9305',
    whatsapp: '',
    web: 'veterinariacolon.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria con más de 20 años en Las Condes. Atención 24h por orden de llegada. Especialidades, peluquería, farmacia y alimentos.',
    rating: 4.5, reviews: 280,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Especialidades', 'Peluquería', 'Farmacia', 'Alimentos'],
    bannerImg: '', lat: -33.40339, lng: -70.57120,
  },
  {
    id: 'clinica-veterinaria-providencia',
    nombre: 'Clínica Veterinaria Providencia',
    subtitulo: 'Urgencias 24h · Cirugía · Hospitalización',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Providencia',
    direccion: 'Santa Beatriz 126, Providencia, Santiago',
    telefono: '+56 2 2235 5855',
    whatsapp: '56989297552',
    web: 'veterinariaprovidencia.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: '40 años cuidando mascotas en Providencia. Urgencias 24h, cirugía especializada, hospitalización, farmacia y peluquería.',
    rating: 4.6, reviews: 520,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Cirugía especializada', 'Hospitalización', 'Peluquería', 'Farmacia'],
    bannerImg: '', lat: -33.43520, lng: -70.62810,
  },
  {
    id: 'cvms-santiago',
    nombre: 'Clínica Veterinaria Mascotas Santiago',
    subtitulo: 'UCI · UTI · Urgencias 24h · Laboratorio',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Santiago Centro',
    direccion: 'Av. Matta 851, Santiago Centro',
    telefono: '+56 2 2544 3528',
    whatsapp: '',
    web: 'cvms.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Hospital veterinario de alta complejidad en Santiago Centro. UCI y UTI propias, laboratorio con resultados inmediatos, cirugías de urgencia 24h.',
    rating: 4.7, reviews: 390,
    fotos: [], veterinarios: [],
    tags: ['UCI / UTI', 'Urgencias 24h', 'Laboratorio', 'Cirugía', 'Hospitalización'],
    bannerImg: '', lat: -33.45810, lng: -70.64970,
  },
];

/* ── Región de O'Higgins (VI) — Capital: Rancagua ── */
const CLINICAS_RANCAGUA = [
  {
    id: 'arrayan-rancagua',
    nombre: 'Hospital Veterinario Arrayán',
    subtitulo: 'Urgencias 24/7 · Especialidades · Cirugía',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Rancagua',
    direccion: 'Hno. Claudio 364, Rancagua',
    telefono: '',
    whatsapp: '',
    web: 'arrayanveterinaria.cl',
    horario: 'Abierto 24/7',
    descripcion: 'Hospital veterinario de referencia en Rancagua y Machalí. Urgencias 24/7, especialidades médicas, cirugías y hospitalización en la Región de O\'Higgins.',
    rating: 4.7, reviews: 195,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24/7', 'Especialidades', 'Cirugía', 'Hospitalización'],
    bannerImg: '', lat: -34.16800, lng: -70.74200,
  },
  {
    id: 'sanpablo-rancagua',
    nombre: 'San Pablo Vet Clinic',
    subtitulo: 'Hospital 24h · Cirugía · Neurología · Oftalmología',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Rancagua',
    direccion: 'Av. Central 251, Rancagua',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Clínica veterinaria con hospital 24h en Rancagua. Cirugías, neurología, oftalmología, gastroenterología, laboratorio, ecografías y rayos X. Atención personalizada.',
    rating: 4.6, reviews: 230,
    fotos: [], veterinarios: [],
    tags: ['Hospital 24h', 'Neurología', 'Oftalmología', 'Laboratorio', 'Rayos X'],
    bannerImg: '', lat: -34.17200, lng: -70.73800,
  },
  {
    id: 'petvet-rancagua',
    nombre: 'Pet & Vet Rancagua',
    subtitulo: 'Consultas · Cirugía · Vacunas · Desparasitación',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: false,
    ciudad: 'Rancagua',
    direccion: 'Av. Balmaceda 2395, Rancagua',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Vie 9–20h · Sáb 10–18h',
    descripcion: 'Clínica veterinaria con enfoque en atención personalizada en Rancagua. Vacunaciones, desparasitaciones, cirugías y chequeos anuales. Reconocida por su calidez y compromiso.',
    rating: 4.5, reviews: 160,
    fotos: [], veterinarios: [],
    tags: ['Consultas', 'Cirugía', 'Vacunas', 'Desparasitación', 'Farmacia'],
    bannerImg: '', lat: -34.16500, lng: -70.73500,
  },
];

/* ── Región del Bío-Bío (VIII) — Capital: Concepción ── */
const CLINICAS_CONCEPCION = [
  {
    id: 'pedro-valdivia-conce',
    nombre: 'Clínica Veterinaria Pedro de Valdivia',
    subtitulo: 'Urgencias 24h · Exóticos · Laboratorio',
    grad: 'linear-gradient(135deg,#5C2FA8,#7C4DCC)',
    icon: '🏥',
    urgencia: true,
    ciudad: 'Concepción',
    direccion: 'Av. Pedro de Valdivia 1559, Concepción',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Dom 24 horas',
    descripcion: 'Clínica veterinaria 24h en Concepción. Traumatología, rayos X, ecografía, ECG, endoscopía, hospital, laboratorio, peluquería, hotel y animales exóticos.',
    rating: 4.6, reviews: 220,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Exóticos', 'Laboratorio', 'Traumatología', 'Hotel'],
    bannerImg: '', lat: -36.82690, lng: -73.04980,
  },
  {
    id: 'happy-puppy-conce',
    nombre: 'Clínica Veterinaria Happy Puppy',
    subtitulo: 'Consultas · Cirugía · Peluquería · Pet shop',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐾',
    urgencia: false,
    ciudad: 'Concepción',
    direccion: 'Bernardino Corral 117, Concepción',
    telefono: '',
    whatsapp: '',
    web: '',
    horario: 'Lun–Sáb 9–20h · Dom 10–14h',
    descripcion: 'Clínica con más de 20 años en Concepción. Consultas, cirugías, baños, hotel, laboratorio y pet shop. Equipo comprometido con el bienestar animal.',
    rating: 4.5, reviews: 185,
    fotos: [], veterinarios: [],
    tags: ['Cirugía', 'Peluquería', 'Hotel', 'Pet shop', 'Laboratorio'],
    bannerImg: '', lat: -36.82100, lng: -73.04500,
  },
  {
    id: 'cmvc-conce',
    nombre: 'Centro Médico Veterinario Concepción',
    subtitulo: 'Urgencias 24h · Domicilio · Cirugía · Farmacia',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    urgencia: true,
    ciudad: 'Concepción',
    direccion: 'Manuel Bulnes 1598, Concepción',
    telefono: '',
    whatsapp: '',
    web: 'cmvc.cl',
    horario: 'Abierto 24 horas, todos los días',
    descripcion: 'Centro médico veterinario con asistencia a domicilio 24h. Cirugías, laboratorio clínico, radiografías, ecografías, farmacia y accesorios con reparto a domicilio.',
    rating: 4.6, reviews: 200,
    fotos: [], veterinarios: [],
    tags: ['Urgencias 24h', 'Domicilio', 'Laboratorio', 'Cirugía', 'Farmacia'],
    bannerImg: '', lat: -36.83200, lng: -73.05500,
  },
];

/* ══════════════════════════════════════════════════════════════
   MAPA DE REGIONES — bounding boxes geográficos
   Agrega nuevas regiones aquí sin tocar el resto del código
   ══════════════════════════════════════════════════════════════ */
const REGIONES_CLINICAS = [
  {
    nombre: 'Coquimbo',
    clinicas: CLINICAS_LASERENA,
    lat: { min: -31.5, max: -29.0 },
    lng: { min: -72.5, max: -69.5 },
  },
  {
    nombre: 'Valparaíso',
    clinicas: CLINICAS_DESTACADAS,
    lat: { min: -33.7, max: -32.0 },
    lng: { min: -72.0, max: -70.0 },
  },
  {
    nombre: 'Metropolitana',
    clinicas: CLINICAS_SANTIAGO,
    lat: { min: -34.4, max: -32.9 },
    lng: { min: -71.5, max: -69.8 },
  },
  {
    nombre: "O'Higgins",
    clinicas: CLINICAS_RANCAGUA,
    lat: { min: -35.2, max: -33.8 },
    lng: { min: -72.0, max: -70.0 },
  },
  {
    nombre: 'Bío-Bío',
    clinicas: CLINICAS_CONCEPCION,
    lat: { min: -38.5, max: -36.0 },
    lng: { min: -74.0, max: -71.0 },
  },
];

/* ══════════════════════════════════════════════════════════════
   DETECCIÓN DE REGIÓN
   ══════════════════════════════════════════════════════════════ */
let _clinicasActivas = null;

function _detectarClinicasPorCoords(lat, lng) {
  for (const region of REGIONES_CLINICAS) {
    if (lat >= region.lat.min && lat <= region.lat.max &&
        lng >= region.lng.min && lng <= region.lng.max) {
      return region.clinicas;
    }
  }
  return null; // fuera de cobertura
}

async function _detectarRegionYCargarClinicas() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      _mostrarBannerUbicacion();
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const clinicas = _detectarClinicasPorCoords(lat, lng);
        if (clinicas) {
          _clinicasActivas = clinicas;
          resolve(clinicas);
        } else {
          // Fuera de cobertura — mostrar banner informativo
          _mostrarBannerSinCobertura();
          resolve(null);
        }
      },
      () => {
        _mostrarBannerUbicacion();
        resolve(null);
      },
      { timeout: 5000, maximumAge: 3600000 }
    );
  });
}

function getClinicasActivas() {
  return _clinicasActivas;
}

/* ── Banner: permiso de ubicación negado ── */
function _mostrarBannerUbicacion() {
  if (document.getElementById('wufly-geo-banner')) return;
  ['clinicas-section', 'tiendas-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const banner = document.createElement('div');
  banner.id = 'wufly-geo-banner';
  banner.innerHTML = `
    <div style="margin:0 16px 24px;background:linear-gradient(135deg,#3B1A8C,#5C2FA8);border-radius:18px;padding:22px 20px;display:flex;flex-direction:column;gap:14px;box-shadow:0 4px 24px rgba(92,47,168,0.25);">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:36px;flex-shrink:0;">📍</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:16px;font-weight:700;color:white;line-height:1.3;">Activa tu ubicación</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;line-height:1.5;">Sin permiso de ubicación, Wufly no puede mostrarte clínicas veterinarias ni tiendas cercanas a ti.</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <button onclick="_irAConfiguracionUbicacion()" style="flex:1;background:white;color:#5C2FA8;border:none;border-radius:10px;padding:11px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">⚙️ Ir a configuración</button>
        <button onclick="this.closest('#wufly-geo-banner').remove()" style="background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);border:1.5px solid rgba(255,255,255,0.2);border-radius:10px;padding:11px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;">Ahora no</button>
      </div>
    </div>`;
  _insertarBanner(banner);
}

/* ── Banner: región sin cobertura aún ── */
function _mostrarBannerSinCobertura() {
  if (document.getElementById('wufly-geo-banner')) return;
  ['clinicas-section', 'tiendas-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const banner = document.createElement('div');
  banner.id = 'wufly-geo-banner';
  banner.innerHTML = `
    <div style="margin:0 16px 24px;background:linear-gradient(135deg,#3B1A8C,#5C2FA8);border-radius:18px;padding:22px 20px;display:flex;flex-direction:column;gap:14px;box-shadow:0 4px 24px rgba(92,47,168,0.25);">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:36px;flex-shrink:0;">🌎</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:16px;font-weight:700;color:white;line-height:1.3;">Llegando pronto a tu ciudad</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.7);margin-top:4px;line-height:1.5;">Seguimos sumando clínicas verificadas en todo Chile. ¡Pronto habrá más cerca de ti!</div>
        </div>
      </div>
      <button onclick="this.closest('#wufly-geo-banner').remove()" style="background:rgba(255,255,255,0.12);color:rgba(255,255,255,0.8);border:1.5px solid rgba(255,255,255,0.2);border-radius:10px;padding:11px 14px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;">Entendido 🐾</button>
    </div>`;
  _insertarBanner(banner);
}

function _insertarBanner(banner) {
  const ref = document.getElementById('pet-gallery-section');
  if (ref && ref.parentNode) {
    ref.parentNode.insertBefore(banner, ref.nextSibling);
  } else {
    const home = document.getElementById('page-home');
    if (home) home.prepend(banner);
  }
}

function _irAConfiguracionUbicacion() {
  const isIOS     = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  if (isIOS) {
    window.location.href = 'app-settings:';
  } else if (isAndroid) {
    window.location.href = 'intent:#Intent;action=android.settings.LOCATION_SOURCE_SETTINGS;end';
  } else {
    const isSafari  = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isFirefox = navigator.userAgent.includes('Firefox');
    let instruccion = '';
    if (isSafari)       instruccion = 'Safari → Preferencias → Sitios web → Ubicación → Permitir para wufly.cl';
    else if (isFirefox) instruccion = 'Firefox → Menú → Ajustes → Privacidad → Permisos → Ubicación';
    else                instruccion = 'Chrome → ícono 🔒 en la barra → Ubicación → Permitir → Recargar la página';
    alert(`Para activar la ubicación en tu navegador:\n\n${instruccion}`);
  }
}


// ==========================================
// ARCHIVO: js/auth.js
// ==========================================

/* ══════════════════════════════════════
   AUTH — Wufly + Supabase
   Login, registro, sync de perfil y
   recordatorios con la nube
   ══════════════════════════════════════ */

// SUPABASE_URL, SUPABASE_REF y SUPABASE_ANON vienen de js/config.js
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
let currentUser = null;

/* Revela la app con fade-in una sola vez */
let _appRevealed = false;
function _revealApp() {
  if (_appRevealed) return;
  _appRevealed = true;
  document.body.classList.add('app-ready');
}
/* Fallback: si Supabase tarda más de 1.5s, mostrar igual */
setTimeout(_revealApp, 1500);

/* ── Escuchar cambios de sesión ── */
db.auth.onAuthStateChange(async (event, session) => {
  currentUser = session?.user ?? null;
  _revealApp();
  if (currentUser) {
    localStorage.setItem('wufly_session_email', currentUser.email);
  } else if (event === 'SIGNED_OUT') {
    localStorage.removeItem('wufly_session_email');
    localStorage.removeItem('wufly_avatar');
  }
  renderAuthBanner();
  if (currentUser && event === 'SIGNED_IN') {
    // Cerrar modal de login si está abierto
    const modal = document.getElementById('authModal');
    if (modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      _limpiarModal();
    }
    // Cerrar onboarding si está abierto (vuelta de Google OAuth)
    const obOverlay = document.getElementById('onboarding-overlay');
    if (obOverlay) {
      obOverlay.style.animation = 'obFadeOut 0.3s ease forwards';
      setTimeout(() => obOverlay.remove(), 300);
    }
    // Si hay datos del onboarding en localStorage, subirlos a la DB
    try {
      const localProfile = JSON.parse(localStorage.getItem('wufly_profile_v1') || 'null');
      if (localProfile && localProfile.tipomascota) {
        await guardarPerfilEnDB(localProfile);
      }
    } catch { /* ignorar */ }
    await sincronizarPerfil();
    await sincronizarRecordatorios();
    _actualizarBotonesPublicar();
  }
});

/* ══ TOPBAR: botón de cuenta ══ */
function renderTopbarAuth() {
  const el = document.getElementById('topbarAuthBtn');
  if (!el) return;

  // Usar currentUser o el email cacheado en localStorage (cubre el window de token refresh)
  const sessionEmail = currentUser?.email || localStorage.getItem('wufly_session_email');
  if (sessionEmail) {
    // Fuente principal: localStorage (persiste entre sesiones)
    let fotoSrc = null;
    try {
      const p = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
      if (p.fotoDueno && p.fotoDueno.startsWith('http')) fotoSrc = p.fotoDueno;
    } catch {}
    // Fallback: clave dedicada
    if (!fotoSrc) {
      const av = localStorage.getItem('wufly_avatar');
      if (av && av.startsWith('http')) fotoSrc = av;
    }
    // Fallback: DOM
    if (!fotoSrc) {
      const perfilOwnerImg = document.getElementById('perfilOwnerImg');
      const rawSrc = perfilOwnerImg?.getAttribute('src');
      if (rawSrc && rawSrc.startsWith('http') && perfilOwnerImg.style.display !== 'none') {
        fotoSrc = rawSrc;
      }
    }

    const inicial = sessionEmail.charAt(0).toUpperCase();
    const avatarInner = fotoSrc
      ? `<img src="${fotoSrc}" style="width:100%;height:100%;object-fit:cover;" alt="perfil"
             onerror="this.style.display='none';this.parentNode.innerHTML='<span style=\\'font-size:14px;font-weight:700;color:white;line-height:1;\\'>${inicial}</span>'">`
      : `<span style="font-size:14px;font-weight:700;color:white;line-height:1;">${inicial}</span>`;

    el.innerHTML = `
      <button onclick="switchTab('alergias')"
        style="display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;cursor:pointer;">
        <div style="width:34px;height:34px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.6);background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;">
          ${avatarInner}
        </div>
        <span style="font-size:9px;color:rgba(255,255,255,0.85);font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;">Mi perfil</span>
      </button>`;
  } else {
    el.innerHTML = `
      <button onclick="abrirPerfil()"
        style="display:flex;flex-direction:column;align-items:center;gap:2px;background:none;border:none;cursor:pointer;">
        <div style="width:34px;height:34px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.6);background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <span style="font-size:9px;color:rgba(255,255,255,0.85);font-weight:700;font-family:'Plus Jakarta Sans',sans-serif;">Perfil</span>
      </button>`;
  }
}

/* ══ BANNER DE SESIÓN en MI PERFIL ══ */
function renderAuthBanner() {
  renderTopbarAuth();

  const banner = document.getElementById('authBanner');
  if (!banner) return;

  if (currentUser) {
    const esPremium = localStorage.getItem('wufly_premium') === '1';
    const textClr   = esPremium ? 'rgba(255,255,255,0.9)' : 'var(--mint-dark)';
    const btnBg     = esPremium ? 'rgba(255,255,255,0.1)'  : 'white';
    const btnBorder = esPremium ? 'rgba(255,255,255,0.2)'  : 'var(--border-md)';
    const btnColor  = esPremium ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)';
    banner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:34px;height:34px;border-radius:50%;background:var(--purple);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:white;flex-shrink:0;">
            ${currentUser.email.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style="font-size:12px;font-weight:700;color:${textClr};">☁️ Sincronizado</div>
            <div style="font-size:11px;color:${textClr};opacity:0.7;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${currentUser.email}</div>
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0;">
          <button onclick="activarEdicion()"
            style="font-size:11px;font-weight:700;color:${btnColor};background:${btnBg};border:1.5px solid ${btnBorder};border-radius:100px;padding:6px 12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
            Editar perfil
          </button>
          <button onclick="cerrarSesion()"
            style="font-size:11px;font-weight:700;color:${btnColor};background:${btnBg};border:1.5px solid ${btnBorder};border-radius:100px;padding:6px 12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
            Salir
          </button>
        </div>
      </div>`;
    banner.style.background    = esPremium ? '#0b1941' : 'var(--mint-light)';
    banner.style.borderColor   = esPremium ? 'rgba(255,255,255,0.08)' : 'rgba(93,214,168,0.35)';
  } else {
    banner.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--text);">☁️ Guarda tus datos en la nube</div>
          <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">Fotos y recordatorios siempre disponibles</div>
        </div>
        <button onclick="abrirAuthModal('register')"
          style="font-size:12px;font-weight:700;color:white;background:var(--purple);border:none;border-radius:100px;padding:8px 14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;">
          Crear cuenta
        </button>
      </div>`;
    banner.style.background  = 'var(--purple-light)';
    banner.style.borderColor = 'rgba(124,77,204,0.2)';
  }
}

/* ══ MODAL AUTH ══ */
function abrirAuthModal(modo = 'login') {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.dataset.modo = modo;
  _actualizarModalModo(modo);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('authEmail')?.focus(), 120);
  // Escape cierra el modal (login opcional)
  modal._escHandler = (e) => { if (e.key === 'Escape') cerrarAuthModal(); };
  document.addEventListener('keydown', modal._escHandler);
}

function cerrarAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  if (modal._escHandler) {
    document.removeEventListener('keydown', modal._escHandler);
    delete modal._escHandler;
  }
  modal.style.display = 'none';
  document.body.style.overflow = '';
  _limpiarModal();
}

function setAuthModo(modo) {
  if (document.getElementById('authModal')) {
    document.getElementById('authModal').dataset.modo = modo;
  }
  _actualizarModalModo(modo);
}

function _actualizarModalModo(modo) {
  const esRegistro = modo === 'register';
  document.getElementById('authTitulo').textContent        = esRegistro ? 'Crear cuenta' : 'Iniciar sesión';
  document.getElementById('authBtnSubmit').textContent     = esRegistro ? 'Crear cuenta' : 'Entrar';
  document.getElementById('authBtnSubmit').style.display   = 'block';
  document.getElementById('authCampoNombre').style.display = esRegistro ? 'block' : 'none';
  document.getElementById('authLinkAlternativo').innerHTML  = esRegistro
    ? `¿Ya tienes una cuenta? <button onclick="setAuthModo('login')" style="background:none;border:none;color:var(--purple);font-weight:700;cursor:pointer;font-family:inherit;font-size:13px;">Iniciar sesión</button>`
    : `¿No estás registrado? <button onclick="setAuthModo('register')" style="background:none;border:none;color:var(--purple);font-weight:700;cursor:pointer;font-family:inherit;font-size:13px;">Crear cuenta aquí</button>`;
  document.getElementById('authError').style.display = 'none';
  // Mostrar botón de Google solo en registro
  const googleBtn = document.getElementById('authGoogleBtn');
  if (googleBtn) googleBtn.style.display = esRegistro ? 'block' : 'none';
}

function _limpiarModal() {
  const ids = ['authEmail','authPassword','authNombre'];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  const err = document.getElementById('authError');
  if (err) err.style.display = 'none';
}

async function submitAuth() {
  const modal  = document.getElementById('authModal');
  const modo   = modal.dataset.modo || 'login';
  const email  = document.getElementById('authEmail').value.trim();
  const pass   = document.getElementById('authPassword').value;
  const nombre = document.getElementById('authNombre')?.value.trim() || '';
  const btn    = document.getElementById('authBtnSubmit');

  if (!email || !pass) { _authErr('Completa correo y contraseña.'); return; }
  if (pass.length < 6)  { _authErr('La contraseña debe tener al menos 6 caracteres.'); return; }

  btn.disabled = true;
  btn.textContent = '...';

  try {
    if (modo === 'register') {
      const { data, error } = await db.auth.signUp({
        email, password: pass,
        options: { data: { nombre } }
      });
      if (error) throw error;
      if (data.session) {
        // Confirmación de email desactivada en Supabase → ya está logueado
        // onAuthStateChange cierra el modal automáticamente
      } else {
        // Confirmación de email requerida → mostrar pantalla de espera
        _mostrarConfirmacionPendiente(email);
      }
      return;
    } else {
      // Login via REST directo para evitar bloqueo del SW
      const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error_description || data.msg || 'Error al iniciar sesión');

      // Guardar token en localStorage igual que lo hace el cliente de Supabase
      const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
      const tokenData = {
        access_token:  data.access_token,
        refresh_token: data.refresh_token,
        expires_at:    Math.floor(Date.now() / 1000) + data.expires_in,
        token_type:    data.token_type,
        user:          data.user,
      };
      localStorage.setItem(`sb-${ref}-auth-token`, JSON.stringify(tokenData));

      // Cargar perfil y cerrar modal
      currentUser = data.user;
      await cargarPerfil();
      cerrarAuthModal();
      renderAuthBanner();
    }
  } catch (e) {
    const mapa = {
      'Invalid login credentials':                  'Correo o contraseña incorrectos.',
      'User already registered':                    'Este correo ya tiene una cuenta.',
      'Password should be at least 6 characters':   'La contraseña debe tener al menos 6 caracteres.',
      'Email not confirmed':                        'Confirma tu correo antes de entrar.',
    };
    _authErr(mapa[e.message] || e.message || 'Ocurrió un error. Intenta de nuevo.');
    // Restaurar botón SIN llamar _actualizarModalModo (que oculta el error)
    btn.disabled = false;
    btn.textContent = modo === 'register' ? 'Crear cuenta' : 'Entrar';
    return;
  }
  // Éxito: restaurar botón
  btn.disabled = false;
  btn.textContent = modo === 'register' ? 'Crear cuenta' : 'Entrar';
}

/* Pantalla de "revisa tu correo" dentro del modal (no cierra el modal) */
function _mostrarConfirmacionPendiente(email) {
  const body = document.querySelector('#authModal > div > div:last-child');
  if (!body) return;
  body.innerHTML = `
    <div style="text-align:center;padding:10px 0 6px;">
      <div style="font-size:52px;margin-bottom:12px;">📧</div>
      <div style="font-family:'Funnel Display',sans-serif;font-size:19px;font-weight:700;color:#2D1B6B;margin-bottom:8px;">¡Casi listo!</div>
      <div style="font-size:13px;color:#6B7280;line-height:1.6;margin-bottom:6px;">
        Te enviamos un correo de confirmación a<br>
        <strong style="color:#4C1D95;">${email}</strong>
      </div>
      <div style="font-size:12px;color:#9CA3AF;margin-bottom:24px;">
        Revísalo (también la carpeta spam) y confirma tu cuenta.<br>Luego vuelve e inicia sesión.
      </div>
      <button onclick="setAuthModo('login')" class="btn-primary" style="font-size:14px;width:100%;">
        Ir a iniciar sesión
      </button>
    </div>`;
}

function _authErr(msg, tipo = 'error') {
  const el = document.getElementById('authError');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  if (tipo === 'ok') {
    el.style.color = 'var(--mint-dark)'; el.style.background = 'var(--mint-light)';
  } else {
    el.style.color = '#DC2626'; el.style.background = '#FEE2E2';
  }
}

/* Elimina toda la sesión y datos locales del usuario actual */
function _limpiarLocalStorage() {
  // Borrar todas las claves propias de Wufly
  Object.keys(localStorage)
    .filter(k => k.startsWith('wufly_') || k.startsWith('sb-') || k === 'supabase.auth.token')
    .forEach(k => localStorage.removeItem(k));
  sessionStorage.clear();
}

async function cerrarSesion() {
  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
  const stored = (() => { try { return JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null'); } catch { return null; } })();
  const token = stored?.access_token;

  // Intentar signOut en el servidor (best-effort)
  if (token) {
    try {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
    } catch { /* ignorar error de red */ }
  }

  _limpiarLocalStorage();
  currentUser = null;
  renderAuthBanner();
  _actualizarBotonesPublicar();
}


/* Botones publicar: visibles siempre, pero sin sesion abren registro */
function _actualizarBotonesPublicar() {
  const logueado = !!currentUser;
  const ids = ['btnPublicar', 'btnPublicarPerdido', 'btnPublicarRescate'];
  ids.forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (logueado) {
      btn.removeEventListener('click', btn._loginPrompt, { capture: true });
      delete btn._loginPrompt;
    } else {
      if (btn._loginPrompt) return;
      btn._loginPrompt = (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        _mostrarPromptLogin();
      };
      btn.addEventListener('click', btn._loginPrompt, { capture: true });
    }
  });
}

/* Modal de registro con aviso cuando intentan publicar sin sesion */
function _mostrarPromptLogin() {
  abrirAuthModal('register');
  setTimeout(() => {
    if (document.getElementById('authPromptAviso')) return;
    const body = document.querySelector('#authModal > div > div:last-child');
    if (!body) return;
    const aviso = document.createElement('div');
    aviso.id = 'authPromptAviso';
    aviso.style.cssText = 'background:#F3EEFF;border-radius:10px;padding:11px 14px;border:1.5px solid rgba(124,77,204,0.25);font-size:13px;color:#5C2FA8;line-height:1.5;margin-bottom:2px;';
    aviso.innerHTML = '🐾 <strong>Crea una cuenta gratis</strong> para publicar en adopción, mascotas perdidas y rescate.';
    body.insertBefore(aviso, body.firstChild);
  }, 80);
}

/* ══ LOGIN CON GOOGLE ══ */
async function loginConGoogle() {
  try {
    const { error } = await db.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
  } catch (e) {
    _authErr('Error al conectar con Google. Intenta de nuevo.');
  }
}

/* ══ STORAGE: subir foto ══ */
async function subirFotoStorage(file, carpeta) {
  if (!currentUser) throw new Error('Sin sesión');
  const path = `${carpeta}/${currentUser.id}.jpg`;
  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
  const stored = (() => { try { return JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null'); } catch { return null; } })();
  const token = stored?.access_token || SUPABASE_ANON;
  let blob = file;
  if (file.type.startsWith('image/')) {
    try { blob = await _comprimirImagen(file, 600, 0.70); } catch { /* subir sin comprimir */ }
  }
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/mascotas/${path}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${token}`, 'apikey': SUPABASE_ANON, 'Content-Type': 'image/jpeg', 'x-upsert': 'true' },
    body: blob,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Storage ${res.status}: ${t}`); }
  return `${SUPABASE_URL}/storage/v1/object/public/mascotas/${path}?t=${Date.now()}`;
}

/* ══ STORAGE: subir foto comunidad (ruta única por timestamp) ══ */
async function subirFotoComunidad(file, tipo) {
  const userId = currentUser?.id || 'anon';
  const path = `comunidad/${tipo}_${userId}_${Date.now()}.jpg`;
  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
  const stored = (() => { try { return JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null'); } catch { return null; } })();
  const token = stored?.access_token || SUPABASE_ANON;

  let blob = file;
  if (file.type.startsWith('image/')) {
    try { blob = await _comprimirImagen(file, 600, 0.70); } catch { /* subir sin comprimir */ }
  }

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/mascotas/${path}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'apikey': SUPABASE_ANON, 'Content-Type': 'image/jpeg', 'x-upsert': 'false' },
    body: blob,
  });
  if (!res.ok) { const t = await res.text(); throw new Error(`Storage ${res.status}: ${t}`); }
  return `${SUPABASE_URL}/storage/v1/object/public/mascotas/${path}`;
}

/* ══ SINCRONIZAR PERFIL DB → localStorage ══ */
async function sincronizarPerfil() {
  if (!currentUser) return;
  const { data, error } = await db
    .from('profiles')
    .select('*')
    .eq('id', currentUser.id)
    .single();
  if (error || !data) { renderTopbarAuth(); return; }

  const local = (() => {
    try { const r = localStorage.getItem('wufly_profile_v1'); return r ? JSON.parse(r) : {}; }
    catch { return {}; }
  })();

  const merged = {
    ...local,
    nombre:        data.nombre         || local.nombre        || currentUser.email.split('@')[0],
    nombreMascota: data.nombre_mascota || local.nombreMascota || '',
    tipomascota:   data.tipo_mascota   || local.tipomascota   || 'perro',
    edadmascota:   data.edad_mascota   || local.edadmascota   || 'adulto',
    salud:         (data.salud?.length ? data.salud : null)   || local.salud || [],
    fotoMascota:   data.foto_mascota_url || local.fotoMascota || null,
    fotoDueno:     data.foto_dueno_url   || local.fotoDueno   || null,
  };

  localStorage.setItem('wufly_profile_v1', JSON.stringify(merged));
  // Guardar URL de foto en clave dedicada para que el avatar la encuentre siempre
  if (merged.fotoDueno?.startsWith('http')) {
    localStorage.setItem('wufly_avatar', merged.fotoDueno);
  }
  if (typeof renderPerfilUI === 'function') renderPerfilUI(merged);
  renderTopbarAuth();
  // Si el onboarding está visible, cerrarlo ya que tenemos perfil de la nube
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.remove();
}

/* ══ GUARDAR PERFIL EN DB ══ */
async function guardarPerfilEnDB(p) {
  if (!currentUser) return;

  const payload = {
    id:               currentUser.id,
    nombre:           p.nombre         || null,
    nombre_mascota:   p.nombreMascota  || null,
    tipo_mascota:     p.tipomascota    || 'perro',
    edad_mascota:     p.edadmascota    || 'adulto',
    salud:            p.salud          || [],
    foto_mascota_url: p.fotoMascota?.startsWith('http') ? p.fotoMascota : null,
    foto_dueno_url:   p.fotoDueno?.startsWith('http')   ? p.fotoDueno   : null,
    updated_at:       new Date().toISOString(),
  };

  // Usar fetch directo para evitar que el service worker bloquee la llamada
  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
  const stored = (() => { try { return JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null'); } catch { return null; } })();
  const token = stored?.access_token || SUPABASE_ANON;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('guardarPerfilEnDB error:', res.status, txt);
      if (typeof _fotoToast === 'function') _fotoToast('Error al guardar en nube: ' + res.status, 'err');
    } else {
      console.log('guardarPerfilEnDB OK, foto_mascota_url:', payload.foto_mascota_url);
    }
  } catch(e) {
    console.error('guardarPerfilEnDB excepción:', e.message);
  }
}

/* ══ SINCRONIZAR RECORDATORIOS DB → localStorage ══ */
async function sincronizarRecordatorios() {
  if (!currentUser) return;
  const { data, error } = await db
    .from('recordatorios')
    .select('*')
    .eq('user_id', currentUser.id)
    .order('fecha');
  if (error || !data) return;

  const lista = data.map(r => ({
    id: r.id, tipo: r.tipo,
    descripcion: r.descripcion,
    fecha: r.fecha, notas: r.notas || '', creado: r.creado,
  }));

  if (typeof guardarRecordatoriosStorage === 'function') guardarRecordatoriosStorage(lista);
  if (typeof renderRecordatorios === 'function') renderRecordatorios();
  if (typeof actualizarBadgeRecordatorios === 'function') actualizarBadgeRecordatorios();
}

/* ══ GUARDAR RECORDATORIO EN DB ══ */
async function guardarRecordatorioDB(rec) {
  if (!currentUser) return;
  await db.from('recordatorios').upsert({
    id:          rec.id,
    user_id:     currentUser.id,
    tipo:        rec.tipo,
    descripcion: rec.descripcion,
    fecha:       rec.fecha,
    notas:       rec.notas || null,
    creado:      rec.creado,
  });
}

/* ══ ELIMINAR RECORDATORIO EN DB ══ */
async function eliminarRecordatorioDB(id) {
  if (!currentUser) return;
  await db.from('recordatorios').delete().eq('id', id).eq('user_id', currentUser.id);
}

/* ── Init: restaurar sesión existente ── */
document.addEventListener('DOMContentLoaded', async () => {
  let session = null;
  try {
    const { data } = await db.auth.getSession();
    session = data?.session ?? null;
  } catch { /* sin sesión */ }

  currentUser = session?.user ?? null;
  renderAuthBanner();

  if (currentUser) {
    const modal = document.getElementById('authModal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
    await sincronizarPerfil();
    await sincronizarRecordatorios();
    const overlay = document.getElementById('onboarding-overlay');
    if (overlay) overlay.remove();
  }
  // App abre sin login obligatorio
  _actualizarBotonesPublicar();
});

// ==========================================
// ARCHIVO: js/analytics.js
// ==========================================

/* ══════════════════════════════════════
   ANALYTICS — Wufly
   Tracking de clics en listings verificados
   Panel de admin en ?admin=1 o triple-tap logo
   ══════════════════════════════════════ */

/* ── Registrar clic en Supabase ── */
async function registrarClick(negocioId, negocioNombre, seccion) {
  try {
    if (typeof db === 'undefined') return;
    await db.from('clicks').insert({
      negocio_id:     negocioId,
      negocio_nombre: negocioNombre,
      seccion:        seccion,
    });
  } catch (_) {}
}

/* ══════════════════════════════════════
   PANEL DE ADMIN — Dashboard completo
   ══════════════════════════════════════ */

async function mostrarAdmin() {
  const existing = document.getElementById('admin-overlay');
  if (existing) { existing.remove(); return; }

  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:#0d0620;
    display:flex;flex-direction:column;
    font-family:'Plus Jakarta Sans',sans-serif;
    color:white;
  `;
  overlay.innerHTML = `
    <!-- Header -->
    <div style="background:#1a0a3c;padding:14px 20px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.08);">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#7C4DCC,#5DD6A8);display:flex;align-items:center;justify-content:center;font-size:18px;">🐾</div>
        <div>
          <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.12em;text-transform:uppercase;">Wufly Admin</div>
          <div style="font-size:16px;font-weight:800;color:white;margin-top:1px;">Dashboard</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div id="admin-last-update" style="font-size:10px;color:rgba(255,255,255,0.3);"></div>
        <button onclick="_recargarAdmin()" id="btn-reload-admin"
          style="padding:7px 14px;border-radius:8px;background:rgba(124,77,204,0.2);border:1px solid rgba(124,77,204,0.4);color:#a78bfa;font-size:12px;font-weight:600;cursor:pointer;">
          ↻ Actualizar
        </button>
        <button onclick="document.getElementById('admin-overlay').remove()"
          style="width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
    </div>

    <!-- Tabs -->
    <div style="display:flex;gap:2px;padding:12px 20px 0;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.06);background:#0f0728;">
      ${['overview','usuarios','contenido','negocios','servicios'].map((t, i) => `
        <button onclick="_adminTab('${t}')" id="atab-${t}"
          style="padding:8px 14px;border-radius:8px 8px 0 0;border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;
          ${i===0 ? 'background:#7C4DCC;color:white;' : 'background:transparent;color:rgba(255,255,255,0.4);'}">
          ${{overview:'📊 General', usuarios:'👥 Usuarios', contenido:'📋 Contenido', negocios:'🏢 Negocios', servicios:'🐕 Servicios'}[t]}
        </button>
      `).join('')}
    </div>

    <!-- Content -->
    <div id="admin-content" style="flex:1;overflow-y:auto;padding:20px;background:#0d0620;">
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:200px;gap:12px;">
        <div style="width:36px;height:36px;border:3px solid rgba(124,77,204,0.3);border-top-color:#7C4DCC;border-radius:50%;animation:adminSpin 0.8s linear infinite;"></div>
        <div style="color:rgba(255,255,255,0.4);font-size:13px;">Cargando datos...</div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  if (!document.getElementById('admin-styles')) {
    const s = document.createElement('style');
    s.id = 'admin-styles';
    s.textContent = `
      @keyframes adminSpin { to { transform: rotate(360deg); } }
      @keyframes adminFadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      #admin-content > div { animation: adminFadeIn 0.25s ease; }
      .admin-kpi { background:#1e1040;border:1px solid rgba(255,255,255,0.10);border-radius:14px;padding:16px;transition:transform 0.15s; }
      .admin-kpi:hover { transform:translateY(-2px); }
      .admin-card { background:#1a0d38;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;margin-bottom:14px; }
      .admin-row { display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;background:#221250;margin-bottom:6px; }
      .admin-bar-wrap { background:rgba(255,255,255,0.10);border-radius:99px;height:6px;flex:1; }
      .admin-bar { height:6px;border-radius:99px;transition:width 0.6s ease; }
      .admin-section-title { font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;margin-top:4px; }
    `;
    document.head.appendChild(s);
  }

  await _cargarAdminData();
}

let _adminData = null;
let _adminCacheTime = 0;
const _ADMIN_CACHE_MS = 5 * 60 * 1000; // 5 minutos

async function _recargarAdmin() {
  _adminData = null;
  _adminCacheTime = 0;
  const btn = document.getElementById('btn-reload-admin');
  if (btn) btn.style.opacity = '0.5';
  await _cargarAdminData();
  if (btn) btn.style.opacity = '1';
}

async function _cargarAdminData() {
  // Reusar datos si el cache aún es válido
  if (_adminData && Date.now() - _adminCacheTime < _ADMIN_CACHE_MS) {
    _renderAdminData(_adminData);
    return;
  }
  try {
    const hace7  = new Date(Date.now() - 7  * 86400000).toISOString();
    const hace30 = new Date(Date.now() - 30 * 86400000).toISOString();
    const hace1  = new Date(Date.now() - 1  * 86400000).toISOString();

    // Visitas desde el Worker (IP real)
    let visitasStats = { total: 0, hoy: 0, n7d: 0, n30d: 0, porDia: {} };
    try {
      const vRes = await fetch('https://wufly-push.pablo77tapia.workers.dev/api/stats-visitas');
      if (vRes.ok) visitasStats = await vRes.json();
    } catch (_) {}

    const [
      { count: totalProfiles },
      { count: profiles7d },
      { count: profiles30d },
      { count: profiles1d },
      { count: totalClicks },
      { count: clicks7d },
      { count: clicks30d },
      { data: todosClicks },
      { count: totalAdopciones },
      { count: adopciones7d },
      { count: totalPerdidos },
      { count: perdidos7d },
      { count: perdidosActivos },
      { count: totalRescates },
      { count: rescates7d },
      { count: totalFotos },
      { count: fotos7d },
      { count: totalRecordatorios },
      { count: totalPush },
      { count: totalSolicitudes },
      { count: solicitudes7d },
      { count: totalPaseos },
    ] = await Promise.all([
      db.from('profiles').select('*', { count:'exact', head:true }),
      db.from('profiles').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('profiles').select('*', { count:'exact', head:true }).gte('created_at', hace30),
      db.from('profiles').select('*', { count:'exact', head:true }).gte('created_at', hace1),
      db.from('clicks').select('*', { count:'exact', head:true }),
      db.from('clicks').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('clicks').select('*', { count:'exact', head:true }).gte('created_at', hace30),
      db.from('clicks').select('negocio_id,negocio_nombre,seccion,created_at').order('created_at', { ascending:false }).limit(2000),
      db.from('adopciones').select('*', { count:'exact', head:true }),
      db.from('adopciones').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('perdidos').select('*', { count:'exact', head:true }),
      db.from('perdidos').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('perdidos').select('*', { count:'exact', head:true }).eq('activo', true),
      db.from('rescates').select('*', { count:'exact', head:true }),
      db.from('rescates').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('fotos_juntos').select('*', { count:'exact', head:true }),
      db.from('fotos_juntos').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('recordatorios').select('*', { count:'exact', head:true }),
      db.from('push_subscriptions').select('*', { count:'exact', head:true }),
      db.from('solicitudes_paseador').select('*', { count:'exact', head:true }),
      db.from('solicitudes_paseador').select('*', { count:'exact', head:true }).gte('created_at', hace7),
      db.from('paseo_ubicaciones').select('*', { count:'exact', head:true }),
    ]);

    const porNegocio = {}, porSeccion = {}, clicksPorDia = {};
    (todosClicks || []).forEach(c => {
      const k = c.negocio_id;
      if (!porNegocio[k]) porNegocio[k] = { nombre: c.negocio_nombre, seccion: c.seccion, total: 0 };
      porNegocio[k].total++;
      porSeccion[c.seccion] = (porSeccion[c.seccion] || 0) + 1;
      const d2 = c.created_at?.slice(0, 10);
      if (d2) clicksPorDia[d2] = (clicksPorDia[d2] || 0) + 1;
    });
    const rankingNegocios = Object.values(porNegocio).sort((a,b) => b.total - a.total);

    _adminData = {
      totalProfiles, profiles7d, profiles30d, profiles1d,
      totalClicks, clicks7d, clicks30d,
      rankingNegocios, porSeccion, clicksPorDia,
      totalAdopciones, adopciones7d,
      totalPerdidos, perdidos7d, perdidosActivos,
      totalRescates, rescates7d,
      totalFotos, fotos7d,
      totalRecordatorios, totalPush,
      totalSolicitudes, solicitudes7d, totalPaseos,
      visitasStats,
    };
    _adminCacheTime = Date.now();

    _renderAdminData(_adminData);
  } catch (e) {
    const content = document.getElementById('admin-content');
    if (content) content.innerHTML = `
      <div style="background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.3);border-radius:14px;padding:20px;text-align:center;color:#fca5a5;">
        <div style="font-size:24px;margin-bottom:8px;">⚠️</div>
        <div style="font-weight:700;margin-bottom:4px;">Error al cargar datos</div>
        <div style="font-size:12px;opacity:0.7;">${e.message}</div>
      </div>`;
  }
}

function _renderAdminData(d) {
  const ts = document.getElementById('admin-last-update');
  if (ts) ts.textContent = 'Actualizado ' + new Date(_adminCacheTime).toLocaleTimeString('es-CL', { hour:'2-digit', minute:'2-digit' });
  _adminTab('overview');
}

function _adminTab(tab) {
  ['overview','usuarios','contenido','negocios','servicios'].forEach(t => {
    const el = document.getElementById('atab-' + t);
    if (!el) return;
    el.style.background = t === tab ? '#7C4DCC' : 'transparent';
    el.style.color = t === tab ? 'white' : 'rgba(255,255,255,0.4)';
  });

  const content = document.getElementById('admin-content');
  if (!content || !_adminData) return;
  const d = _adminData;
  const seccionIcon = { clinicas:'🏥', tiendas:'🛒', grooming:'✂️', paseadores:'🐕' };

  if (tab === 'overview') {
    const hoy14 = new Date();
    const dias14 = Array.from({ length: 14 }, (_, i) => {
      const dt = new Date(hoy14); dt.setDate(dt.getDate() - (13 - i));
      return dt.toISOString().slice(0, 10);
    });

    // Sparkline visitas
    const vals14v = dias14.map(d2 => (d.visitasStats?.porDia?.[d2] || 0));
    const max14v  = Math.max(...vals14v, 1);

    // Sparkline clics
    const vals14c = dias14.map(d2 => d.clicksPorDia[d2] || 0);
    const max14c  = Math.max(...vals14c, 1);

    content.innerHTML = `
      <!-- Visitas únicas -->
      <div class="admin-section-title">Visitas únicas (IPs distintas)</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px;">
        ${[['HOY', d.visitasStats?.hoy??0,'#5DD6A8'],['7 DÍAS',d.visitasStats?.n7d??0,'#a78bfa'],['30 DÍAS',d.visitasStats?.n30d??0,'#60a5fa'],['TOTAL',d.visitasStats?.total??0,'#fbbf24']].map(([label,val,color])=>`
          <div class="admin-kpi" style="text-align:center;">
            <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-bottom:4px;">${label}</div>
            <div style="font-size:26px;font-weight:900;color:${color};">${val}</div>
          </div>`).join('')}
      </div>

      <!-- Sparkline visitas -->
      <div class="admin-card" style="margin-bottom:16px;">
        <div class="admin-section-title" style="margin-bottom:12px;">Visitas únicas — últimos 14 días</div>
        <div style="display:flex;align-items:flex-end;gap:3px;height:50px;margin-bottom:6px;">
          ${vals14v.map((v,i)=>`<div style="flex:1;background:${v===max14v?'#5DD6A8':'rgba(93,214,168,0.3)'};border-radius:3px 3px 0 0;height:${Math.max(3,Math.round(v/max14v*44))}px;" title="${dias14[i]}: ${v}"></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:rgba(255,255,255,0.3);">
          <span>${_fmtDate(dias14[0])}</span><span>${_fmtDate(dias14[13])}</span>
        </div>
      </div>

      <!-- KPIs generales -->
      <div class="admin-section-title">Resumen general</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;">
        ${_kpi('👥','Usuarios totales',d.totalProfiles??0,'#a78bfa')}
        ${_kpi('👆','Clics totales',d.totalClicks??0,'#5DD6A8')}
        ${_kpi('📱','Push suscritos',d.totalPush??0,'#60a5fa')}
        ${_kpi('🐾','Adopciones',d.totalAdopciones??0,'#fb923c')}
        ${_kpi('🔍','Perdidos activos',d.perdidosActivos??0,'#f472b6')}
        ${_kpi('🦸','Rescates',d.totalRescates??0,'#34d399')}
      </div>

      <!-- Sparkline clics -->
      <div class="admin-card" style="margin-bottom:16px;">
        <div class="admin-section-title" style="margin-bottom:12px;">Clics en negocios — últimos 14 días</div>
        <div style="display:flex;align-items:flex-end;gap:3px;height:50px;margin-bottom:6px;">
          ${vals14c.map((v,i)=>`<div style="flex:1;background:${v===max14c?'#7C4DCC':'rgba(124,77,204,0.35)'};border-radius:3px 3px 0 0;height:${Math.max(3,Math.round(v/max14c*44))}px;" title="${dias14[i]}: ${v}"></div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:rgba(255,255,255,0.3);">
          <span>${_fmtDate(dias14[0])}</span><span>${_fmtDate(dias14[13])}</span>
        </div>
      </div>

      <!-- Esta semana -->
      <div class="admin-section-title">Esta semana</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;">
        ${_kpiMini('Usuarios nuevos',d.profiles7d??0,'#a78bfa')}
        ${_kpiMini('Clics',d.clicks7d??0,'#5DD6A8')}
        ${_kpiMini('Adopciones',d.adopciones7d??0,'#fb923c')}
        ${_kpiMini('Perdidos',d.perdidos7d??0,'#f472b6')}
        ${_kpiMini('Rescates',d.rescates7d??0,'#34d399')}
        ${_kpiMini('Fotos juntos',d.fotos7d??0,'#fbbf24')}
      </div>

      <!-- Por sección -->
      <div class="admin-card">
        <div class="admin-section-title">Secciones más activas</div>
        ${Object.entries(d.porSeccion).sort((a,b)=>b[1]-a[1]).map(([sec,total])=>{
          const mx=Math.max(...Object.values(d.porSeccion),1);
          return `<div class="admin-row">
            <div style="width:26px;text-align:center;">${seccionIcon[sec]||'📌'}</div>
            <div style="flex:1;font-size:13px;font-weight:600;color:white;text-transform:capitalize;">${sec}</div>
            <div class="admin-bar-wrap"><div class="admin-bar" style="width:${Math.round(total/mx*100)}%;background:#7C4DCC;"></div></div>
            <div style="color:#5DD6A8;font-weight:700;font-size:13px;min-width:28px;text-align:right;">${total}</div>
          </div>`;
        }).join('')||'<div style="color:rgba(255,255,255,0.3);font-size:13px;">Sin datos aún</div>'}
      </div>
    `;
  }

  else if (tab === 'usuarios') {
    content.innerHTML = `
      <div class="admin-section-title">Usuarios</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('👥','Total registrados',d.totalProfiles??0,'#a78bfa')}
        ${_kpi('🆕','Nuevos hoy',d.profiles1d??0,'#5DD6A8')}
        ${_kpi('📅','Nuevos (7d)',d.profiles7d??0,'#fbbf24')}
        ${_kpi('📆','Nuevos (30d)',d.profiles30d??0,'#60a5fa')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Actividad</div>
        ${[['Push suscritos',d.totalPush??0,'#60a5fa'],['Recordatorios',d.totalRecordatorios??0,'#fbbf24'],['Fotos Juntos',d.totalFotos??0,'#f472b6'],['% activos (7d)',d.totalProfiles>0?Math.round((d.profiles7d/d.totalProfiles)*100)+'%':0,'#5DD6A8']].map(([label,val,color])=>`
          <div class="admin-row">
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.6);">${label}</div>
            <div style="font-weight:700;color:${color};">${val}</div>
          </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Alcance push</div>
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="position:relative;width:72px;height:72px;flex-shrink:0;">
            <svg viewBox="0 0 36 36" style="width:72px;height:72px;transform:rotate(-90deg);">
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" stroke-width="3"
                stroke-dasharray="${Math.min(88,Math.round((d.totalPush??0)/(d.totalProfiles||1)*88))} 88" stroke-linecap="round"/>
            </svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:white;">
              ${d.totalProfiles>0?Math.round((d.totalPush??0)/d.totalProfiles*100):0}%
            </div>
          </div>
          <div>
            <div style="font-size:18px;font-weight:800;color:#60a5fa;">${d.totalPush??0}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.5);">de ${d.totalProfiles??0} usuarios</div>
          </div>
        </div>
      </div>
    `;
  }

  else if (tab === 'contenido') {
    const maxPR = Math.max(d.totalPerdidos??0, d.totalRescates??0, 1);
    content.innerHTML = `
      <div class="admin-section-title">Comunidad & Contenido</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('🐾','Adopciones',d.totalAdopciones??0,'#fb923c')}
        ${_kpi('🔍','Perdidos total',d.totalPerdidos??0,'#f472b6')}
        ${_kpi('🔴','Perdidos activos',d.perdidosActivos??0,'#ef4444')}
        ${_kpi('🦸','Rescates',d.totalRescates??0,'#34d399')}
        ${_kpi('📸','Fotos juntos',d.totalFotos??0,'#fbbf24')}
        ${_kpi('⏰','Recordatorios',d.totalRecordatorios??0,'#a78bfa')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Esta semana</div>
        ${[['🐾','Adopciones nuevas',d.adopciones7d,'#fb923c'],['🔍','Mascotas perdidas',d.perdidos7d,'#f472b6'],['🦸','Rescates',d.rescates7d,'#34d399'],['📸','Fotos juntos',d.fotos7d,'#fbbf24']].map(([icon,label,val,color])=>`
          <div class="admin-row">
            <div style="font-size:18px;">${icon}</div>
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.7);">${label}</div>
            <div style="font-weight:800;font-size:16px;color:${color};">${val??0}</div>
          </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Ratio pérdidas vs rescates</div>
        <div style="display:flex;gap:12px;align-items:center;margin-top:4px;">
          <div style="flex:1;">
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;">Perdidos</div>
            <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:8px;">
              <div style="background:#f472b6;height:8px;border-radius:99px;width:${Math.round((d.totalPerdidos??0)/maxPR*100)}%;"></div>
            </div>
          </div>
          <span style="font-size:12px;color:rgba(255,255,255,0.3);">vs</span>
          <div style="flex:1;">
            <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:4px;">Rescates</div>
            <div style="background:rgba(255,255,255,0.06);border-radius:99px;height:8px;">
              <div style="background:#34d399;height:8px;border-radius:99px;width:${Math.round((d.totalRescates??0)/maxPR*100)}%;"></div>
            </div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:12px;font-weight:700;">
          <span style="color:#f472b6;">🔍 ${d.totalPerdidos??0}</span>
          <span style="color:#34d399;">🦸 ${d.totalRescates??0}</span>
        </div>
      </div>
    `;
  }

  else if (tab === 'negocios') {
    const maxClics = Math.max(...d.rankingNegocios.map(n=>n.total), 1);
    content.innerHTML = `
      <div class="admin-section-title">Negocios & Clics</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('👆','Clics totales',d.totalClicks??0,'#5DD6A8')}
        ${_kpi('📅','Clics (7d)',d.clicks7d??0,'#fbbf24')}
        ${_kpi('📆','Clics (30d)',d.clicks30d??0,'#60a5fa')}
        ${_kpi('🏢','Negocios con clics',d.rankingNegocios.length,'#a78bfa')}
      </div>
      <div class="admin-card" style="margin-bottom:14px;">
        <div class="admin-section-title">Por sección</div>
        ${Object.entries(d.porSeccion).sort((a,b)=>b[1]-a[1]).map(([sec,total])=>{
          const mx=Math.max(...Object.values(d.porSeccion),1);
          const pct=Math.round(total/(d.totalClicks||1)*100);
          return `<div class="admin-row">
            <div style="width:26px;text-align:center;">${seccionIcon[sec]||'📌'}</div>
            <div style="width:80px;font-size:13px;font-weight:600;color:white;text-transform:capitalize;">${sec}</div>
            <div class="admin-bar-wrap"><div class="admin-bar" style="width:${Math.round(total/mx*100)}%;background:linear-gradient(90deg,#7C4DCC,#5DD6A8);"></div></div>
            <div style="min-width:52px;text-align:right;">
              <span style="color:#5DD6A8;font-weight:700;">${total}</span>
              <span style="color:rgba(255,255,255,0.3);font-size:10px;"> (${pct}%)</span>
            </div>
          </div>`;
        }).join('')||'<div style="color:rgba(255,255,255,0.3);font-size:13px;">Sin datos</div>'}
      </div>
      <div class="admin-section-title">Top negocios</div>
      ${d.rankingNegocios.slice(0,25).map((n,i)=>`
        <div class="admin-row">
          <div style="width:22px;height:22px;border-radius:6px;background:${i<3?'#7C4DCC':i<10?'rgba(124,77,204,0.3)':'rgba(255,255,255,0.06)'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:white;flex-shrink:0;">${i+1}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n.nombre||n.negocio_id}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.35);">${seccionIcon[n.seccion]||''} ${n.seccion}</div>
          </div>
          <div class="admin-bar-wrap" style="max-width:60px;"><div class="admin-bar" style="width:${Math.round(n.total/maxClics*100)}%;background:#5DD6A8;"></div></div>
          <div style="color:#5DD6A8;font-weight:800;font-size:14px;min-width:28px;text-align:right;">${n.total}</div>
        </div>`).join('')||'<div class="admin-card" style="color:rgba(255,255,255,0.3);font-size:13px;">Sin clics aún</div>'}
      ${d.rankingNegocios.length>5?`
        <div class="admin-section-title" style="margin-top:16px;">Menos visitados</div>
        ${d.rankingNegocios.slice(-5).reverse().map(n=>`
          <div class="admin-row" style="opacity:0.7;">
            <div style="font-size:18px;">📉</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:12px;color:rgba(255,255,255,0.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${n.nombre||n.negocio_id}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.3);">${n.seccion}</div>
            </div>
            <div style="color:#f87171;font-weight:700;">${n.total}</div>
          </div>`).join('')}`:''}
    `;
  }

  else if (tab === 'servicios') {
    content.innerHTML = `
      <div class="admin-section-title">Servicios & Paseadores</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:20px;">
        ${_kpi('🐕','Solicitudes paseador',d.totalSolicitudes??0,'#34d399')}
        ${_kpi('📍','Paseos registrados',d.totalPaseos??0,'#60a5fa')}
        ${_kpi('🗓️','Solicitudes (7d)',d.solicitudes7d??0,'#fbbf24')}
        ${_kpi('📸','Fotos juntos',d.totalFotos??0,'#f472b6')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Actividad paseadores</div>
        ${[['Solicitudes totales',d.totalSolicitudes??0,'#34d399'],['Esta semana',d.solicitudes7d??0,'#fbbf24'],['Ubicaciones de paseo',d.totalPaseos??0,'#60a5fa']].map(([label,val,color])=>`
          <div class="admin-row">
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.6);">${label}</div>
            <div style="font-weight:700;color:${color};">${val}</div>
          </div>`).join('')}
      </div>
      <div class="admin-card">
        <div class="admin-section-title">Features IA & Creativos</div>
        ${[['📸','Fotos juntos',d.totalFotos??0,'#f472b6'],['⏰','Recordatorios',d.totalRecordatorios??0,'#a78bfa'],['📱','Push suscritos',d.totalPush??0,'#60a5fa']].map(([icon,label,val,color])=>`
          <div class="admin-row">
            <div style="font-size:18px;">${icon}</div>
            <div style="flex:1;font-size:13px;color:rgba(255,255,255,0.7);">${label}</div>
            <div style="font-weight:800;font-size:16px;color:${color};">${val}</div>
          </div>`).join('')}
      </div>
      <div style="padding:12px;background:rgba(255,255,255,0.03);border-radius:10px;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">
        Datos en tiempo real · Supabase · ${new Date().toLocaleDateString('es-CL')}
      </div>
    `;
  }
}

function _kpi(icon, label, value, color) {
  return `<div class="admin-kpi">
    <div style="font-size:20px;margin-bottom:6px;">${icon}</div>
    <div style="font-size:24px;font-weight:800;color:${color};">${Number(value).toLocaleString('es-CL')}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">${label}</div>
  </div>`;
}

function _kpiMini(label, value, color) {
  return `<div style="background:#1e1040;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;">
    <div style="font-size:18px;font-weight:800;color:${color};">${Number(value).toLocaleString('es-CL')}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px;">${label}</div>
  </div>`;
}

function _fmtDate(iso) {
  if (!iso) return '';
  const [,m,d] = iso.split('-');
  return `${d}/${m}`;
}

/* ── Activar admin: URL ?admin=1 o triple-tap en el logo ── */
(function initAdmin() {
  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(mostrarAdmin, 500));
  }
  let tapCount = 0, tapTimer = null;
  document.addEventListener('click', e => {
    const logo = e.target.closest('.app-topbar img');
    if (!logo) return;
    tapCount++;
    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => { tapCount = 0; }, 600);
    if (tapCount >= 3) { tapCount = 0; mostrarAdmin(); }
  });
})();


// ==========================================
// ARCHIVO: js/vitrina.js
// ==========================================

/* ══════════════════════════════════════
   VITRINA — Wufly
   Vista exclusiva de negocios premium
   con catálogo de productos y chat IA
   ══════════════════════════════════════ */

/* ── Datos de negocios Vitrina ──
   Cada negocio puede tener:
   - info básica (nombre, desc, fotos, video)
   - productos[] con nombre, precio, desc, emoji
   - prompt personalizado para la IA
   ─────────────────────────────────────── */
const vitrinas = [
  {
    id: 'petslife-vitrina',
    negocioId: 'petslife-tienda',   // debe coincidir con el id en tiendas.js
    nombre: 'PetsLife',
    seccion: 'tiendas',
    tagline: 'Nutrición y cuidado para tu mascota',
    icon: '🐾',
    color: '#10B981',
    colorLight: '#DCFCE7',
    address: 'Av. Libertad 1198, Viña del Mar',
    horario: 'Lun–Sáb 10–19h',
    wsp: '+56966317573',
    video: null,
    fotos: [],
    productos: [
      { nombre: 'Royal Canin Adulto 15kg', precio: '$42.990', desc: 'Alimento seco para perros adultos de todas las razas.', emoji: '🥣' },
      { nombre: 'Acana Puppy 2kg', precio: '$18.500', desc: 'Fórmula premium para cachorros, libre de granos.', emoji: '🐶' },
      { nombre: 'Hills Science Diet Gato', precio: '$28.990', desc: 'Nutrición científicamente formulada para gatos adultos.', emoji: '🐈' },
      { nombre: 'Shampoo Hipoalergénico 500ml', precio: '$9.900', desc: 'Apto para pieles sensibles, sin parabenos.', emoji: '🛁' },
      { nombre: 'Correa retráctil 5m', precio: '$12.500', desc: 'Resistente hasta 40kg, con freno de seguridad.', emoji: '🦮' },
      { nombre: 'Antiparasitario Frontline', precio: '$15.990', desc: 'Pipeta mensual contra pulgas y garrapatas.', emoji: '💊' },
    ],
    promptExtra: 'Tienes alimentos de las marcas Royal Canin, Acana, Hills, Eukanuba, Proplan y Purina. También accesorios, correas, camas y productos de higiene. Entregas a domicilio disponibles a nivel nacional.',
  },
  {
    id: 'petlandia-vitrina',
    negocioId: 'petlandia',
    nombre: 'Petlandia Chile',
    seccion: 'tiendas',
    tagline: 'Todo para tu mascota en el centro de Viña',
    icon: '🦴',
    color: '#10B981',
    colorLight: '#DCFCE7',
    address: 'Av. Libertad 1002, Viña del Mar',
    horario: 'Lun–Sáb 10–19:30h · Dom 10–17h',
    wsp: '+56934471222',
    video: null,
    fotos: [],
    productos: [
      { nombre: 'Proplan Perro Senior 3kg', precio: '$19.990', desc: 'Fórmula especial para perros mayores de 7 años.', emoji: '🥣' },
      { nombre: 'Arena sanitaria Catsan 10L', precio: '$8.990', desc: 'Máxima absorción y control de olores.', emoji: '🐈' },
      { nombre: 'Cama ortopédica M', precio: '$24.900', desc: 'Memory foam para perros hasta 20kg.', emoji: '🛏️' },
      { nombre: 'Juguete Kong Classic', precio: '$11.500', desc: 'Resistente, relleno de snacks, estimula la mente.', emoji: '🦷' },
      { nombre: 'Ropa impermeable talla S', precio: '$13.990', desc: 'Ideal para paseos en días lluviosos.', emoji: '🧥' },
    ],
    promptExtra: 'También vendes ropa para mascotas, camas, juguetes interactivos, y tienes sección de regalos para mascotas. Haces envíos a domicilio y aceptas transferencia y tarjetas.',
  },
];

/* ── Historial de chat por vitrina ── */
const vitrinaChats = {};

/* ── Abrir vitrina ── */
function abrirVitrina(negocioId, seccion) {
  // Buscar vitrina por negocioId
  const v = vitrinas.find(x => x.negocioId === negocioId);
  if (!v) return false; // no tiene vitrina → no interceptar

  registrarClick(negocioId, v.nombre, seccion);

  const overlay = document.createElement('div');
  overlay.id = 'vitrina-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9998;
    background:white;
    display:flex;flex-direction:column;
    font-family:'Plus Jakarta Sans',sans-serif;
    overflow:hidden;
  `;

  overlay.innerHTML = `
    <!-- Header -->
    <div style="background:linear-gradient(135deg,${v.color},${v.color}CC);padding:16px 20px 14px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.25);display:flex;align-items:center;justify-content:center;font-size:22px;">${v.icon}</div>
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-size:18px;font-weight:700;color:white;">${v.nombre}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.8);">${v.tagline}</div>
        </div>
      </div>
      <button onclick="cerrarVitrina()"
        style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.2);border:1.5px solid rgba(255,255,255,0.4);color:white;font-size:15px;cursor:pointer;">✕</button>
    </div>

    <!-- Badge Vitrina -->
    <div style="background:linear-gradient(90deg,#FEF3C7,#FDE68A);padding:7px 20px;display:flex;align-items:center;gap:8px;flex-shrink:0;border-bottom:1px solid #FCD34D;">
      <span style="font-size:14px;">⭐</span>
      <span style="font-size:11px;font-weight:700;color:#92400E;letter-spacing:0.05em;">VITRINA PREMIUM · NEGOCIO VERIFICADO WUFLY</span>
    </div>

    <!-- Tabs -->
    <div style="display:flex;background:white;border-bottom:1.5px solid #F3F4F6;flex-shrink:0;">
      <button id="vtab-info" onclick="switchVTab('info')"
        style="flex:1;padding:12px 4px;border:none;background:none;font-size:12px;font-weight:700;cursor:pointer;color:${v.color};border-bottom:2.5px solid ${v.color};font-family:'Plus Jakarta Sans',sans-serif;">
        🏪 Negocio
      </button>
      <button id="vtab-productos" onclick="switchVTab('productos')"
        style="flex:1;padding:12px 4px;border:none;background:none;font-size:12px;font-weight:700;cursor:pointer;color:#9CA3AF;border-bottom:2.5px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;">
        📦 Productos
      </button>
      <button id="vtab-chat" onclick="switchVTab('chat')"
        style="flex:1;padding:12px 4px;border:none;background:none;font-size:12px;font-weight:700;cursor:pointer;color:#9CA3AF;border-bottom:2.5px solid transparent;font-family:'Plus Jakarta Sans',sans-serif;">
        🤖 Preguntar IA
      </button>
    </div>

    <!-- Contenido (scrollable) -->
    <div style="flex:1;overflow-y:auto;" id="vitrina-body">

      <!-- Tab: Info -->
      <div id="vpage-info" style="padding:20px;display:flex;flex-direction:column;gap:14px;">

        ${v.fotos.length > 0 ? `
        <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
          ${v.fotos.map(f => `<img src="${f}" style="height:140px;border-radius:12px;object-fit:cover;flex-shrink:0;">`).join('')}
        </div>` : ''}

        ${v.video ? `
        <div style="border-radius:12px;overflow:hidden;background:#000;">
          <iframe src="${v.video}" width="100%" height="200" frameborder="0" allowfullscreen style="display:block;"></iframe>
        </div>` : ''}

        <div style="background:#F9FAFB;border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151;">
            <span>📍</span><span>${v.address}</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#374151;">
            <span>🕐</span><span>${v.horario}</span>
          </div>
        </div>

        <a href="https://wa.me/${(v.wsp||'').replace(/\D/g,'')}" target="_blank" rel="noopener"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:12px;padding:14px;font-size:14px;font-weight:700;text-decoration:none;">
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Contactar por WhatsApp
        </a>

        <!-- CTA chat IA -->
        <button onclick="switchVTab('chat')"
          style="display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);color:white;border:none;border-radius:12px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          🤖 Preguntar a la IA sobre sus productos
        </button>
      </div>

      <!-- Tab: Productos -->
      <div id="vpage-productos" style="padding:20px;display:none;flex-direction:column;gap:10px;">
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:4px;">CATÁLOGO DE PRODUCTOS</div>
        ${v.productos.map(p => `
          <div style="background:#F9FAFB;border:1.5px solid #F3F4F6;border-radius:12px;padding:13px 14px;display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:${v.colorLight};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${p.emoji}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:13px;font-weight:700;color:#111827;">${p.nombre}</div>
              <div style="font-size:11px;color:#6B7280;margin-top:1px;line-height:1.4;">${p.desc}</div>
            </div>
            <div style="font-size:14px;font-weight:800;color:${v.color};flex-shrink:0;">${p.precio}</div>
          </div>
        `).join('')}
        <button onclick="switchVTab('chat')"
          style="margin-top:6px;display:flex;align-items:center;justify-content:center;gap:8px;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);color:white;border:none;border-radius:12px;padding:13px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
          🤖 ¿Tienes dudas? Pregunta a la IA
        </button>
      </div>

      <!-- Tab: Chat IA -->
      <div id="vpage-chat" style="display:none;flex-direction:column;height:100%;">
        <div style="padding:14px 20px 10px;background:#F9FAFB;border-bottom:1px solid #F3F4F6;flex-shrink:0;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);display:flex;align-items:center;justify-content:center;font-size:14px;">🤖</div>
            <div>
              <div style="font-size:12px;font-weight:700;color:#111827;">Asistente de ${v.nombre}</div>
              <div style="font-size:10px;color:#10B981;font-weight:600;">● En línea</div>
            </div>
          </div>
        </div>
        <div id="vitrina-chat-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;min-height:200px;">
          <div style="background:#F3F4F6;border-radius:12px 12px 12px 4px;padding:12px 14px;max-width:85%;font-size:13px;color:#374151;line-height:1.5;">
            ¡Hola! 👋 Soy el asistente de <strong>${v.nombre}</strong>. Puedo ayudarte con preguntas sobre nuestros productos, precios, disponibilidad y recomendaciones para tu mascota. ¿En qué te ayudo?
          </div>
        </div>
        <div style="padding:12px 16px;background:white;border-top:1px solid #F3F4F6;display:flex;gap:8px;flex-shrink:0;">
          <input id="vitrina-chat-input" type="text" placeholder="Ej: ¿Tienen alimento para gato senior?"
            onkeydown="if(event.key==='Enter')enviarMsgVitrina('${v.id}')"
            style="flex:1;border:1.5px solid #E5E7EB;border-radius:10px;padding:10px 13px;font-size:13px;outline:none;font-family:'Plus Jakarta Sans',sans-serif;">
          <button onclick="enviarMsgVitrina('${v.id}')"
            style="width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#7C4DCC,#9B6BE0);border:none;color:white;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            ➤
          </button>
        </div>
      </div>

    </div>
  `;

  document.body.appendChild(overlay);
  if (!vitrinaChats[v.id]) vitrinaChats[v.id] = [];

  return true;
}

/* ── Cerrar vitrina ── */
function cerrarVitrina() {
  const overlay = document.getElementById('vitrina-overlay');
  if (overlay) overlay.remove();
}

/* ── Cambiar tab de la vitrina ── */
function switchVTab(tab) {
  ['info','productos','chat'].forEach(t => {
    const page = document.getElementById(`vpage-${t}`);
    const btn  = document.getElementById(`vtab-${t}`);
    if (!page || !btn) return;
    const isActive = t === tab;
    page.style.display  = isActive ? 'flex' : 'none';
    page.style.flexDirection = 'column';
    // color del tab activo — usar color del negocio desde el botón del header
    const color = '#10B981';
    btn.style.color       = isActive ? color : '#9CA3AF';
    btn.style.borderBottom = isActive ? `2.5px solid ${color}` : '2.5px solid transparent';
  });
  if (tab === 'chat') {
    setTimeout(() => document.getElementById('vitrina-chat-input')?.focus(), 150);
  }
}

/* ── Chat IA de la vitrina ── */
async function enviarMsgVitrina(vitrinaId) {
  const v   = vitrinas.find(x => x.id === vitrinaId);
  if (!v) return;

  const input   = document.getElementById('vitrina-chat-input');
  const messages = document.getElementById('vitrina-chat-messages');
  const msg     = input?.value.trim();
  if (!msg || !input || !messages) return;

  input.value = '';
  input.disabled = true;

  // Burbuja usuario
  const userBubble = document.createElement('div');
  userBubble.style.cssText = 'background:linear-gradient(135deg,#7C4DCC,#9B6BE0);color:white;border-radius:12px 12px 4px 12px;padding:10px 14px;max-width:85%;align-self:flex-end;font-size:13px;line-height:1.5;';
  userBubble.textContent = msg;
  messages.appendChild(userBubble);

  // Burbuja loading
  const loadBubble = document.createElement('div');
  loadBubble.style.cssText = 'background:#F3F4F6;border-radius:12px 12px 12px 4px;padding:10px 14px;max-width:85%;font-size:13px;color:#9CA3AF;';
  loadBubble.textContent = '...';
  messages.appendChild(loadBubble);
  messages.scrollTop = messages.scrollHeight;

  // Guardar en historial
  if (!vitrinaChats[vitrinaId]) vitrinaChats[vitrinaId] = [];
  vitrinaChats[vitrinaId].push({ role: 'user', content: msg });

  // Contexto de la mascota del usuario
  const userCtx = typeof getUserContext === 'function' ? getUserContext() : '';

  const system = `Eres el asistente de la tienda "${v.nombre}" en Wufly, una app de mascotas chilena.
Tu función es ayudar a los clientes con preguntas sobre los productos, precios y servicios de ${v.nombre}.
Responde siempre en español, de forma amable, breve y útil.
${v.promptExtra ? `\nINFORMACIÓN DE LA TIENDA:\n${v.promptExtra}` : ''}
${v.productos.length > 0 ? `\nPRODUCTOS DISPONIBLES:\n${v.productos.map(p => `- ${p.nombre}: ${p.precio} — ${p.desc}`).join('\n')}` : ''}
${userCtx ? `\nPERFIL DE LA MASCOTA DEL CLIENTE: ${userCtx}` : ''}
Si el usuario pregunta algo que no sabes, sugiere que contacte directamente por WhatsApp al ${v.wsp}.
No inventes precios ni productos que no estén listados.`;

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 400,
        system,
        messages: vitrinaChats[vitrinaId].slice(-6), // últimos 6 turnos de contexto
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const text = data.content.map(i => i.text || '').join('');

    loadBubble.style.color = '#374151';
    loadBubble.textContent = text;

    vitrinaChats[vitrinaId].push({ role: 'assistant', content: text });
  } catch (e) {
    loadBubble.style.color = '#EF4444';
    loadBubble.textContent = 'No pude conectarme. Intenta de nuevo 🙏';
  }

  input.disabled = false;
  input.focus();
  messages.scrollTop = messages.scrollHeight;
}

/* ── Chips de preguntas rápidas en el chat ── */
function _vitrinaChatChip(vitrinaId, texto) {
  const input = document.getElementById('vitrina-chat-input');
  if (input) { input.value = texto; enviarMsgVitrina(vitrinaId); }
}


// ==========================================
// ARCHIVO: js/geo.js
// ==========================================

/* ══════════════════════════════════════
   GEO — Búsqueda de negocios cercanos
   Fuente: OpenStreetMap / Overpass API
   100% gratuito, sin API key
   ══════════════════════════════════════ */

/* ── Resultados globales accesibles por cada sección ── */
const geoResults = {
  clinicas: [],
  tiendas:  [],
};

let userLocation = null;      // { lat, lng }
let geoStatus    = 'idle';    // 'idle' | 'loading' | 'ok' | 'denied' | 'error'

/* ── Haversine: distancia en km entre dos coordenadas ── */
function haversine(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const toR  = x => x * Math.PI / 180;
  const dLat = toR(lat2 - lat1);
  const dLng = toR(lng2 - lng1);
  const a    = Math.sin(dLat / 2) ** 2
             + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/* ── Formato legible de distancia ── */
function fmtDist(km) {
  if (km == null) return '';
  if (km < 1) return Math.round(km * 1000) + ' m';
  return km.toFixed(1).replace('.', ',') + ' km';
}

/* ── Pedir ubicación al usuario ── */
function obtenerUbicacion() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) { reject(new Error('no_support')); return; }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => reject(err),
      { timeout: 12000, maximumAge: 300000, enableHighAccuracy: false }
    );
  });
}

/* ── Consulta Overpass API (OpenStreetMap) ── */
async function queryOverpass(lat, lng, radius, tags) {
  const partes = tags.flatMap(tag => {
    const [k, v] = tag.split('=');
    return [
      `node["${k}"="${v}"](around:${radius},${lat},${lng});`,
      `way["${k}"="${v}"](around:${radius},${lat},${lng});`,
    ];
  }).join('\n');

  const query = `[out:json][timeout:20];\n(\n${partes}\n);\nout center;`;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    body: query,
  });
  if (!res.ok) throw new Error('overpass_error');
  const data = await res.json();
  // Solo elementos que tienen nombre
  return (data.elements || []).filter(e => e.tags?.name);
}

/* ══ HELPERS para extraer datos de nodos OSM ══ */
function osmAddr(tags) {
  const calle  = [tags['addr:street'], tags['addr:housenumber']].filter(Boolean).join(' ');
  const ciudad = tags['addr:city'] || tags['addr:suburb'] || '';
  return [calle, ciudad].filter(Boolean).join(', ');
}

function osmHorario(oh) {
  if (!oh) return '';
  if (oh === '24/7') return 'Abierto 24 horas';
  return oh.length > 45 ? oh.substring(0, 45) + '…' : oh;
}

function osmTel(tags) {
  return tags.phone || tags['contact:phone'] || tags['mobile'] || '';
}

function osmWeb(tags) {
  return tags.website || tags['contact:website'] || '';
}

function osmCoords(node) {
  return {
    lat: node.lat ?? node.center?.lat ?? null,
    lng: node.lon ?? node.center?.lon ?? null,
  };
}

/* ── OSM → formato clínica ── */
function osmToClinica(node, uLat, uLng) {
  const { lat, lng } = osmCoords(node);
  const tags   = node.tags || {};
  const dist   = lat && lng ? haversine(uLat, uLng, lat, lng) : 9999;
  const es24h  = /24\/7|24h/i.test(tags.opening_hours || '');

  return {
    id:      'osm_' + node.id,
    name:    tags.name,
    type:    'CLÍNICA VETERINARIA',
    icon:    '🏥',
    city:    'geo',
    urgencia: es24h,
    rating:  null,
    reviews: null,
    desc:    tags.description || 'Clínica veterinaria encontrada cerca de tu ubicación.',
    tags:    ['Veterinaria', ...(es24h ? ['24 horas'] : [])],
    address: osmAddr(tags),
    tel:     osmTel(tags),
    web:     osmWeb(tags),
    horario: osmHorario(tags.opening_hours),
    distKm:  dist,
    lat, lng,
    fromOSM: true,
  };
}

/* ── OSM → formato tienda ── */
function osmToTienda(node, uLat, uLng) {
  const { lat, lng } = osmCoords(node);
  const tags = node.tags || {};
  const dist = lat && lng ? haversine(uLat, uLng, lat, lng) : 9999;

  return {
    id:         'osm_' + node.id,
    nombre:     tags.name,
    tipo:       'fisica',
    city:       'geo',
    icon:       '🐾',
    desc:       tags.description || 'Tienda de mascotas encontrada cerca de tu ubicación.',
    categorias: ['Mascotas'],
    address:    osmAddr(tags),
    horario:    osmHorario(tags.opening_hours),
    rating:     null,
    tel:        osmTel(tags),
    web:        osmWeb(tags),
    distKm:     dist,
    lat, lng,
    fromOSM:    true,
  };
}

/* ══ BANNER GEO — renderiza en múltiples banners ══ */
const _geoBanners = [
  { id: 'geoBanner',     titulo: 'Ver tiendas cerca de ti',  sub: 'Pet shops y tiendas reales en tu zona',
    msgOk: () => `${geoResults.tiendas?.length||0} negocios encontrados a menos de 7 km` },
  { id: 'geoBannerVets', titulo: 'Ver clínicas cerca de ti', sub: 'Veterinarias y urgencias en tu zona',
    msgOk: () => `${geoResults.clinicas?.length||0} clínicas encontradas a menos de 7 km` },
];

function renderGeoBanner(estado, msg = '') {
  _geoBanners.forEach(({ id, titulo, sub, msgOk }) => {
    const banner = document.getElementById(id);
    if (!banner) return;

    if (estado === 'idle') {
      banner.style.display     = 'block';
      banner.style.background  = 'var(--purple-light)';
      banner.style.borderColor = 'rgba(124,77,204,0.2)';
      banner.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:22px;">📍</span>
            <div>
              <div style="font-size:13px;font-weight:700;color:var(--text);">${titulo}</div>
              <div style="font-size:11px;color:var(--text-muted);">${sub}</div>
            </div>
          </div>
          <button onclick="iniciarGeoBusqueda(true)"
            style="font-size:12px;font-weight:700;color:white;background:var(--purple);border:none;border-radius:100px;padding:8px 14px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;flex-shrink:0;">
            Activar 📍
          </button>
        </div>`;

    } else if (estado === 'loading') {
      banner.style.display     = 'block';
      banner.style.background  = 'var(--purple-light)';
      banner.style.borderColor = 'rgba(124,77,204,0.2)';
      banner.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);border-top-color:var(--purple);border-radius:50%;animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando cerca de ti…</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
          </div>
        </div>`;

    } else if (estado === 'ok') {
      banner.style.display     = 'block';
      banner.style.background  = 'var(--mint-light)';
      banner.style.borderColor = 'rgba(93,214,168,0.35)';
      const textoOk = msgOk ? msgOk() : msg;
      banner.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:12px;font-weight:700;color:var(--mint-dark);">📍 ${textoOk}</div>
          <button onclick="iniciarGeoBusqueda(true)"
            style="font-size:11px;color:var(--text-muted);background:white;border:1.5px solid var(--border-md);border-radius:100px;padding:4px 10px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;">
            Actualizar
          </button>
        </div>`;

    } else if (estado === 'denied') {
      banner.style.display     = 'block';
      banner.style.background  = '#FEF9C3';
      banner.style.borderColor = 'rgba(234,179,8,0.4)';
      banner.innerHTML = `<div style="font-size:12px;color:#92400E;">⚠️ Permiso de ubicación denegado. Actívalo en la configuración del navegador.</div>`;

    } else if (estado === 'error') {
      banner.style.display     = 'block';
      banner.style.background  = '#FEF2F2';
      banner.style.borderColor = 'rgba(220,38,38,0.3)';
      banner.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;">
          <div style="font-size:12px;color:#DC2626;">⚠️ Error al buscar. Revisa tu conexión e inténtalo de nuevo.</div>
          <button onclick="iniciarGeoBusqueda(true)"
            style="font-size:11px;color:white;background:#DC2626;border:none;border-radius:100px;
              padding:6px 12px;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;white-space:nowrap;flex-shrink:0;">
            Reintentar
          </button>
        </div>`;

    } else {
      banner.style.display = 'none';
    }
  });
}

/* ══ ACTUALIZAR BOTONES "Cerca" en cada sección ══ */
function actualizarBotonesGeo() {
  const secciones = [
    { btnId: 'clinicaGeoBtn',  key: 'clinicas'  },
    { btnId: 'tiendaGeoBtn',   key: 'tiendas'   },
  ];
  secciones.forEach(({ btnId, key }) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const n = geoResults[key]?.length || 0;
    btn.style.display = 'inline-flex';
    btn.innerHTML = n > 0
      ? `📍 Cerca <span style="background:var(--purple);color:white;border-radius:100px;padding:1px 6px;font-size:10px;margin-left:4px;">${n}</span>`
      : '📍 Cerca';
  });
}

/* ══ BÚSQUEDA PRINCIPAL ══ */
async function iniciarGeoBusqueda(forzar = false) {
  if (geoStatus === 'loading') return;
  if (geoStatus === 'ok' && !forzar) return;

  geoStatus = 'loading';
  renderGeoBanner('loading');

  try {
    /* 1 · Pedir ubicación */
    const loc = await obtenerUbicacion();
    userLocation = loc;

    const RADIO = 7000; // 7 km

    /* 2 · Una sola query Overpass para las 3 categorías (con cache 10 min en sessionStorage) */
    const _GEO_CACHE_KEY = `wufly_geo_${Math.round(loc.lat * 10) / 10}_${Math.round(loc.lng * 10) / 10}`;
    const _GEO_CACHE_TTL = 10 * 60 * 1000;
    let elementos = null;
    try {
      const cached = JSON.parse(sessionStorage.getItem(_GEO_CACHE_KEY) || 'null');
      if (cached && Date.now() - cached.ts < _GEO_CACHE_TTL) elementos = cached.data;
    } catch {}

    if (!elementos) {
      elementos = await queryOverpass(loc.lat, loc.lng, RADIO, [
        'amenity=veterinary',
        'shop=pet', 'shop=pet_care', 'shop=pet_food',
      ]);
      try { sessionStorage.setItem(_GEO_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: elementos })); } catch {}
    }

    /* 3 · Separar por tipo y convertir */
    const esVet     = e => e.tags?.amenity === 'veterinary';
    const esTienda  = e => ['pet','pet_care','pet_food'].includes(e.tags?.shop);

    geoResults.clinicas = elementos.filter(esVet)
      .map(n => osmToClinica(n, loc.lat, loc.lng))
      .sort((a, b) => a.distKm - b.distKm);

    geoResults.tiendas  = elementos.filter(esTienda)
      .map(n => osmToTienda(n, loc.lat, loc.lng))
      .sort((a, b) => a.distKm - b.distKm);

    geoStatus = 'ok';

    const total = geoResults.clinicas.length + geoResults.tiendas.length;
    renderGeoBanner('ok', `${total} negocios encontrados a menos de 7 km`);

    /* 4 · Mostrar botones "Cerca" y re-render si aplica */
    actualizarBotonesGeo();
    if (typeof renderClinicas  === 'function') renderClinicas();
    if (typeof renderTiendas   === 'function') renderTiendas();

  } catch (err) {
    if (err.code === 1) {
      // PERMISSION_DENIED
      geoStatus = 'denied';
      renderGeoBanner('denied');
    } else {
      geoStatus = 'error';
      renderGeoBanner('error');
    }
  }
}

/* ── Init: si ya tiene permiso, buscar silenciosamente ── */
document.addEventListener('DOMContentLoaded', () => {
  // Inyectar keyframe del spinner una sola vez
  if (!document.getElementById('_geoSpinStyle')) {
    const s = document.createElement('style');
    s.id = '_geoSpinStyle';
    s.textContent = '@keyframes geoSpin { to { transform: rotate(360deg); } }';
    document.head.appendChild(s);
  }
  renderGeoBanner('idle');
  if (navigator.permissions) {
    navigator.permissions.query({ name: 'geolocation' })
      .then(result => { if (result.state === 'granted') iniciarGeoBusqueda(); })
      .catch(() => {});
  }
});


// ==========================================
// ARCHIVO: js/places.js
// ==========================================

/* ══════════════════════════════════════
   CLÍNICAS VETERINARIAS — WUFLY
   3 clínicas destacadas fijas + resultados geo cercanos
   ══════════════════════════════════════ */

/* ══ RENDER PRINCIPAL ══ */
function renderClinicas() {
  const list = document.getElementById('clinicaList');
  if (!list) return;

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.clinicas?.length > 0;
  const geoLoading    = typeof geoStatus  !== 'undefined' && geoStatus === 'loading';

  /* ── Buscador ── */
  const searchBar = `
    <div class="search-bar oculto" style="margin-bottom:12px;">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" placeholder="Buscar clínica, servicio..." id="searchClinicas"
        oninput="onSearchClinicas()" aria-label="Buscar clínica veterinaria">
    </div>`;

  /* ── 3 clínicas destacadas (siempre fijas) ── */
  const q = (document.getElementById('searchClinicas')?.value || '').toLowerCase();
  const destacadasFiltradas = (CLINICAS_DESTACADAS || []).filter(c => {
    if (!q) return true;
    return (c.nombre + c.subtitulo + c.descripcion + (c.tags||[]).join(' ')).toLowerCase().includes(q);
  });
  const destHtml = destacadasFiltradas.length > 0
    ? `<div style="font-size:11px;font-weight:700;color:var(--purple);letter-spacing:0.07em;padding:0 2px 10px;">CLINICAS DESTACADAS</div>
       ${destacadasFiltradas.map(_renderClinicaDestacada).join('')}`
    : '';

  /* ── Loading spinner geo ── */
  const loadingHtml = geoLoading ? `
    <div style="display:flex;align-items:center;gap:12px;padding:18px;background:var(--purple-light);border-radius:14px;margin-bottom:16px;">
      <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);border-top-color:var(--purple);border-radius:50%;animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando clínicas cerca de ti…</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
      </div>
    </div>` : '';

  /* ── Resultados geo cercanos ── */
  let geoHtml = '';
  if (!geoLoading) {
    if (geoDisponible) {
      const geoFiltradas = geoResults.clinicas.filter(c => {
        if (!q) return true;
        return (c.name + (c.type||'') + (c.desc||'')).toLowerCase().includes(q);
      });
      geoHtml = geoFiltradas.length > 0
        ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:16px 0 10px;">
             📍 CLÍNICAS CERCANAS
           </div>
           ${geoFiltradas.map(_renderClinicaGeo).join('')}`
        : `<div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
             <div style="font-size:32px;margin-bottom:10px;">🔍</div>
             <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">Sin resultados para tu búsqueda</div>
             <div style="font-size:13px;color:var(--text-muted);">Prueba con otro término</div>
           </div>`;
    } else {
      /* No se ha buscado aún o no encontró nada */
      const yaIntento = typeof geoStatus !== 'undefined' && (geoStatus === 'ok' || geoStatus === 'error' || geoStatus === 'denied');
      geoHtml = `
        <div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
          <div style="font-size:36px;margin-bottom:10px;">${yaIntento ? '😕' : '📍'}</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
            ${yaIntento ? 'No se encontraron clínicas cercanas' : 'Encuentra clínicas cerca de ti'}
          </div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.5;">
            ${yaIntento
              ? 'No encontramos veterinarias en tu zona. Puedes intentarlo nuevamente.'
              : 'Activa tu ubicación para ver las clínicas más cercanas a donde estás.'}
          </div>
          <button onclick="activarBusquedaGeo()"
            style="padding:12px 24px;background:var(--purple);border:none;border-radius:12px;
              font-size:14px;font-weight:700;color:white;cursor:pointer;
              font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(92,47,168,0.3);">
            ${yaIntento ? '🔄 Intenta nuevamente' : '📍 Ver clínicas cercanas'}
          </button>
        </div>`;
    }
  }

  list.innerHTML = searchBar + destHtml + loadingHtml + geoHtml;
}

/* ── Búsqueda por texto ── */
let _clinicaBusqueda = '';
function onSearchClinicas() {
  _clinicaBusqueda = (document.getElementById('searchClinicas')?.value || '').toLowerCase();
  renderClinicas();
}

/* ── Card clínica destacada ── */
function _renderClinicaDestacada(c) {
  const imgSrc = c.bannerImg || null;
  return `
    <div onclick="openClinicaDetalle('${c.id}')"
      style="border-radius:20px;overflow:hidden;cursor:pointer;margin-bottom:14px;
             box-shadow:0 8px 28px rgba(0,0,0,0.22);position:relative;">
      ${c.urgencia ? `
        <div></div>` : ''}
      ${imgSrc
        ? `<div class="fto-tienda" style="position:relative;overflow:hidden;background:transparent;">
             <img src="${imgSrc}" alt="${c.nombre}"
               style="width:100%;height:100%;object-fit:cover;display:block;"
               onerror="this.style.display='none'">
           </div>`
        : `<div style="height:130px;background:transparent;display:flex;align-items:center;justify-content:center;">
             <div style="font-size:48px;opacity:0.9;">${c.icon}</div>
           </div>`
      }
      <div style="background:white;padding:14px 16px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:17px;
            color:var(--text);line-height:1.2;">${c.nombre}</div>
          <div style="font-size:11px;font-weight:700;color:white;background:${c.grad};
            padding:4px 10px;border-radius:100px;white-space:nowrap;">Entrar</div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">${c.subtitulo}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${c.tags.slice(0,3).map(t =>
            `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
              font-weight:600;padding:3px 9px;border-radius:100px;">${t}</span>`
          ).join('')}
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;">📍 ${c.ciudad}</div>
      </div>
    </div>`;
}

/* ── Card para resultados geo (OpenStreetMap) ── */
function _renderClinicaGeo(c) {
  const distBadge = c.distKm != null && c.distKm < 100
    ? `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
        font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:5px;
        display:inline-block;">📍 ${fmtDist(c.distKm)}</span><br>`
    : '';
  const mapLink = c.lat && c.lng
    ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}"
         target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;
           font-size:12px;color:var(--purple);font-weight:700;text-decoration:none;"
         onclick="event.stopPropagation()">🗺 Cómo llegar</a>`
    : '';
  return `
    <div class="place-card">
      <div class="place-card-inner">
        <div class="place-icon" style="background:var(--bg);">${c.icon || '🐾'}</div>
        <div class="place-info">
          ${distBadge}
          <div class="place-name">${c.name}</div>
          <div class="place-type">${c.type || ''}</div>
          <div class="place-desc">${c.desc || ''}</div>
          <div class="place-footer">
            <span class="place-address">📍 ${c.address || '—'}</span>
            ${c.tel ? `<a href="tel:${c.tel}" class="place-tel" onclick="event.stopPropagation()">${c.tel}</a>` : ''}
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
}

/* ── Disparar búsqueda geo ── */
function activarBusquedaGeo() {
  if (typeof iniciarGeoBusqueda === 'function') {
    iniciarGeoBusqueda().then(() => renderClinicas());
  }
  renderClinicas(); // mostrar spinner inmediatamente
}

/* ══ VISTA DE DETALLE — clínicas destacadas ══ */
function openClinicaDetalle(id) {
  const c = (CLINICAS_DESTACADAS || []).find(x => x.id === id);
  if (!c) return;

  const stars = c.rating
    ? `${'★'.repeat(Math.round(c.rating))}${'☆'.repeat(5 - Math.round(c.rating))}`
    : '';

  const fotosHtml = c.fotos?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">FOTOS</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${c.fotos.map(url =>
          `<img src="${url}" alt="foto clínica"
            style="height:120px;width:160px;object-fit:cover;border-radius:10px;flex-shrink:0;">`
        ).join('')}
      </div>
    </div>` : '';

  const vetsHtml = c.veterinarios?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">EQUIPO VETERINARIO</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${c.veterinarios.map(v => `
          <div style="display:flex;align-items:center;gap:12px;">
            ${v.foto
              ? `<img src="${v.foto}" alt="${v.nombre}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--purple-light);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🩺</div>`}
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${v.nombre}</div>
              <div style="font-size:12px;color:var(--text-muted);">${v.especialidad}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const ctaHtml = [
    c.whatsapp
      ? `<a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:#25D366;border-radius:12px;color:white;
             font-size:13px;font-weight:700;text-decoration:none;">💬 WhatsApp</a>` : '',
    c.lat && c.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}"
           target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--purple-light);border-radius:12px;
             color:var(--purple);font-size:13px;font-weight:700;text-decoration:none;">🗺 Cómo llegar</a>` : '',
    c.web
      ? `<a href="https://${c.web}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">🌐 Sitio web</a>` : '',
    c.telefono
      ? `<a href="tel:${c.telefono}"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">📞 Llamar</a>` : '',
  ].filter(Boolean).join('');

  const detailEl = document.getElementById('page-detail');
  if (!detailEl) return;

  detailEl.innerHTML = `
    <div>
      <div style="background:${c.grad};padding:0 0 24px;position:relative;">
        <div style="padding:16px 16px 0;">
          <button onclick="switchTab('restaurantes')"
            style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);
              border:none;border-radius:100px;padding:8px 14px;color:white;font-size:13px;
              font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;
              backdrop-filter:blur(4px);">← Volver a Vets</button>
        </div>
        <div style="padding:20px 20px 0;text-align:center;">
          <div style="font-size:52px;margin-bottom:10px;line-height:1;">${c.icon}</div>
          ${c.urgencia ? `<div style="display:inline-flex;align-items:center;gap:4px;
            background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;
            font-size:11px;font-weight:700;color:white;margin-bottom:10px;">🚨 Urgencias 24h</div><br>` : ''}
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:24px;
            color:white;margin-bottom:4px;line-height:1.2;">${c.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.78);font-weight:600;
            letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${c.subtitulo}</div>
          ${c.rating ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;">
            ${stars} <span style="font-size:13px;">${c.rating} (${c.reviews} reseñas)</span>
          </div>` : ''}
        </div>
      </div>
      <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:14px;background:var(--bg);">
        ${ctaHtml ? `<div style="display:flex;gap:8px;flex-wrap:wrap;">${ctaHtml}</div>` : ''}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:8px;">SOBRE NOSOTROS</div>
          <div style="font-size:14px;color:var(--text);line-height:1.6;">${c.descripcion}</div>
        </div>
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">INFORMACIÓN</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${c.direccion ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📍</span>
              <span style="font-size:13px;color:var(--text);line-height:1.4;">${c.direccion}</span>
            </div>` : ''}
            ${c.horario ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">⏰</span>
              <span style="font-size:13px;color:var(--text);">${c.horario}</span>
            </div>` : ''}
            ${c.telefono ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📞</span>
              <a href="tel:${c.telefono}" style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${c.telefono}</a>
            </div>` : ''}
            ${c.web ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">🌐</span>
              <a href="https://${c.web}" target="_blank" rel="noopener"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${c.web}</a>
            </div>` : ''}
          </div>
        </div>
        ${fotosHtml}
        ${vetsHtml}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">SERVICIOS</div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;">
            ${c.tags.map(t =>
              `<span style="font-size:12px;font-weight:600;padding:6px 13px;border-radius:100px;
                background:var(--purple-light);color:var(--purple);">${t}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>`;

  switchTab('detail');
}

// ==========================================
// ARCHIVO: js/onboarding.js
// ==========================================

/* ══════════════════════════════════════
   ONBOARDING WUFLY
   Se activa solo cuando el usuario
   pincha el ícono de Perfil.
   Flujo: bienvenida → mascota → salud → registro
   ══════════════════════════════════════ */

const ONBOARDING_KEY = 'wufly_profile_v1';

function loadProfile() {
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveProfileData(data) {
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data));
}

/* Contexto para la IA */
function buildAIContext() {
  const p = loadProfile();
  if (!p) return '';
  const lines = [];
  if (p.nombre) lines.push(`El dueño se llama ${p.nombre}.`);
  if (p.tipomascota) {
    const tipoMap = { perro:'tiene un perro', gato:'tiene un gato', otro:'tiene otra mascota' };
    lines.push(`El usuario ${tipoMap[p.tipomascota] || 'tiene una mascota'}.`);
  }
  if (p.edadmascota) {
    const edadMap = {
      cachorro: 'Su mascota es un cachorro (menos de 1 año).',
      joven:    'Su mascota es joven (1–3 años).',
      adulto:   'Su mascota es adulta (3–8 años).',
      senior:   'Su mascota es senior (más de 8 años).',
    };
    if (edadMap[p.edadmascota]) lines.push(edadMap[p.edadmascota]);
  }
  if (p.salud && p.salud.length > 0) {
    lines.push(`Condiciones de salud especiales: ${p.salud.join(', ')}.`);
  }
  return lines.join(' ');
}

/* ══════════════════════════════════════
   PUNTO DE ENTRADA — llamado desde el
   ícono de Perfil en la navegación
   ══════════════════════════════════════ */
function abrirPerfil() {
  // Si ya hay sesión activa, ir directo a la sección de perfil
  if (typeof currentUser !== 'undefined' && currentUser) {
    if (typeof switchTab === 'function') switchTab('alergias');
    return;
  }
  // Si ya completó el onboarding pero no está logueado (caso raro), ir al perfil igual
  const profile = loadProfile();
  if (profile && profile.nombre) {
    if (typeof switchTab === 'function') switchTab('alergias');
    return;
  }
  // Usuario nuevo: mostrar pantalla de bienvenida al perfil
  injectOnboardingStyles();
  showOnboardingWelcome();
}

/* ── PANTALLA DE BIENVENIDA AL PERFIL ── */
function showOnboardingWelcome() {
  const overlay = document.createElement('div');
  overlay.id = 'onboarding-overlay';
  overlay.innerHTML = `
    <div class="ob-container">
      <div class="ob-step active" id="ob-step-welcome" style="align-items:center;text-align:center;gap:18px;">
        <div class="ob-logo">
          <img src="img/logo.png" alt="Wufly" style="height:48px;width:auto;object-fit:contain;filter:brightness(0) invert(1);">
        </div>
        <div style="font-size:52px;">🐾</div>
        <h1 class="ob-title">Sé parte de la comunidad Wufly</h1>
        <p class="ob-desc">Crea tu perfil para publicar en adopción, reportar mascotas perdidas, guardar recordatorios y acceder a todo personalizado para tu mascota.</p>
        <div style="display:flex;flex-direction:column;gap:10px;width:100%;margin-top:8px;">
          <button class="ob-btn-primary" onclick="iniciarOnboarding()">Crear mi perfil 🐾</button>
          <button class="ob-btn-ghost" onclick="cerrarOnboarding(); abrirAuthModal('login');">Ya tengo cuenta → Iniciar sesión</button>
          <button class="ob-btn-ghost" onclick="cerrarOnboarding()" style="opacity:0.55;font-size:13px;">Seguir navegando sin cuenta</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

/* ── INICIA EL FLUJO DE PREGUNTAS ── */
function iniciarOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.querySelector('.ob-container').innerHTML = `

    <!-- PASO 1: Nombre -->
    <div class="ob-step active" id="ob-step-1">
      <div class="ob-progress"><div class="ob-bar" style="width:25%"></div></div>
      <h2 class="ob-title">¿Cómo te llamamos?</h2>
      <p class="ob-desc">Tu nombre para personalizar la experiencia.</p>
      <div class="ob-field">
        <input type="text" id="ob-nombre" placeholder="Tu nombre..." autocomplete="given-name">
      </div>
      <button class="ob-btn-primary" onclick="obNext(1)">Continuar →</button>
      <button class="ob-btn-ghost" style="margin-top:-4px;" onclick="cerrarOnboarding()">Cancelar</button>
    </div>

    <!-- PASO 2: Tipo y edad de mascota -->
    <div class="ob-step" id="ob-step-2">
      <div class="ob-progress"><div class="ob-bar" style="width:50%"></div></div>
      <h2 class="ob-title">Cuéntanos sobre tu mascota</h2>
      <p class="ob-desc">La IA personalizará cada consulta según tu compañero.</p>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <div class="ob-label">¿Qué tipo de mascota tienes?</div>
        <div class="ob-options" id="ob-tipomascota">
          <div class="ob-option" onclick="obSelect('tipomascota','perro',this)">
            <span class="ob-opt-icon">🐕</span>
            <div>
              <div class="ob-opt-title">Perro</div>
              <div class="ob-opt-sub">Mi mejor amigo peludo</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('tipomascota','gato',this)">
            <span class="ob-opt-icon">🐈</span>
            <div>
              <div class="ob-opt-title">Gato</div>
              <div class="ob-opt-sub">Independiente y adorable</div>
            </div>
          </div>
          <div class="ob-option" onclick="obSelect('tipomascota','otro',this)">
            <span class="ob-opt-icon">🐾</span>
            <div>
              <div class="ob-opt-title">Otra mascota</div>
              <div class="ob-opt-sub">Conejo, ave, reptil u otro</div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:6px;margin-top:4px;">
        <div class="ob-label">¿Cuántos años tiene?</div>
        <div class="ob-options" id="ob-edadmascota">
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','cachorro',this)">
            <span class="ob-opt-icon">🍼</span>
            <div><div class="ob-opt-title">Cachorro</div><div class="ob-opt-sub">Menos de 1 año</div></div>
          </div>
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','joven',this)">
            <span class="ob-opt-icon">⚡</span>
            <div><div class="ob-opt-title">Joven</div><div class="ob-opt-sub">1 – 3 años</div></div>
          </div>
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','adulto',this)">
            <span class="ob-opt-icon">🌟</span>
            <div><div class="ob-opt-title">Adulto</div><div class="ob-opt-sub">3 – 8 años</div></div>
          </div>
          <div class="ob-option ob-option-sm" onclick="obSelect('edadmascota','senior',this)">
            <span class="ob-opt-icon">🏅</span>
            <div><div class="ob-opt-title">Senior</div><div class="ob-opt-sub">Más de 8 años</div></div>
          </div>
        </div>
      </div>

      <div class="ob-nav">
        <button class="ob-btn-ghost" onclick="obBack(2)">← Atrás</button>
        <button class="ob-btn-primary" onclick="obNext(2)">Continuar →</button>
      </div>
    </div>

    <!-- PASO 3: Condición de salud -->
    <div class="ob-step" id="ob-step-3">
      <div class="ob-progress"><div class="ob-bar" style="width:75%"></div></div>
      <h2 class="ob-title">¿Tiene alguna condición de salud?</h2>
      <p class="ob-desc">Selecciona las que apliquen. La IA las considerará en cada consulta.</p>
      <div class="ob-grid" id="ob-salud">
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Alergia alimentaria">🥣 Alergia alimentaria</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Problemas digestivos">🫁 Problemas digestivos</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Diabetes">💉 Diabetes</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Enfermedad renal">🫘 Enfermedad renal</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Problemas articulares">🦴 Problemas articulares</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Problemas de piel">🐾 Problemas de piel</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Sobrepeso">⚖️ Sobrepeso</div>
        <div class="ob-chip" onclick="obToggleChip(this)" data-val="Sin condiciones especiales">✅ Saludable</div>
      </div>
      <div class="ob-nav">
        <button class="ob-btn-ghost" onclick="obBack(3)">← Atrás</button>
        <button class="ob-btn-primary" onclick="obFinish()">Continuar →</button>
      </div>
    </div>

    <!-- PASO 4: Crear cuenta -->
    <div class="ob-step" id="ob-step-4">
      <div class="ob-progress"><div class="ob-bar" style="width:100%"></div></div>
      <h2 class="ob-title">¡Casi listo! Crea tu cuenta</h2>
      <p class="ob-desc">Tu perfil se guardará en la nube. Accede desde cualquier dispositivo.</p>

      <div class="ob-field">
        <label class="ob-label">Correo electrónico</label>
        <input type="email" id="ob-email" placeholder="tu@correo.com" autocomplete="email">
      </div>
      <div class="ob-field">
        <label class="ob-label">Contraseña</label>
        <input type="password" id="ob-password" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
      </div>

      <div id="ob-register-error" style="display:none;background:#fee2e2;color:#dc2626;border-radius:8px;padding:10px 14px;font-size:13px;"></div>

      <button class="ob-btn-primary" id="ob-register-btn" onclick="obRegistrar()">Crear cuenta y entrar 🐾</button>

      <div style="display:flex;align-items:center;gap:10px;">
        <div style="flex:1;height:1px;background:rgba(255,255,255,0.2);"></div>
        <span style="font-size:11px;color:rgba(255,255,255,0.45);font-weight:600;">O</span>
        <div style="flex:1;height:1px;background:rgba(255,255,255,0.2);"></div>
      </div>

      <button onclick="obRegistrarConGoogle()" style="width:100%;padding:13px;border:1.5px solid rgba(255,255,255,0.25);border-radius:10px;background:rgba(255,255,255,0.08);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:600;color:white;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.15)'" onmouseout="this.style.background='rgba(255,255,255,0.08)'">
        <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.08 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
        Continuar con Google
      </button>

      <div style="text-align:center;font-size:12px;color:rgba(255,255,255,0.5);margin-top:-4px;">
        ¿Ya tienes cuenta? <button onclick="obIrALogin()" style="background:none;border:none;color:#5DD6A8;font-weight:700;cursor:pointer;font-size:12px;font-family:inherit;">Inicia sesión</button>
      </div>
      <div class="ob-nav" style="margin-top:0;">
        <button class="ob-btn-ghost" onclick="obBack(4)">← Atrás</button>
      </div>
    </div>

  `;
}

/* ── ESTADO TEMPORAL ── */
const obData = { nombre:'', tipomascota:'', edadmascota:'', salud:[] };

function obNext(step) {
  if (step === 1) {
    obData.nombre = document.getElementById('ob-nombre').value.trim();
  }
  if (step === 2) {
    if (!obData.tipomascota) { obShake('ob-tipomascota'); return; }
    if (!obData.edadmascota) { obShake('ob-edadmascota'); return; }
  }
  document.getElementById('ob-step-' + step).classList.remove('active');
  document.getElementById('ob-step-' + (step + 1)).classList.add('active');
}

function obBack(step) {
  document.getElementById('ob-step-' + step).classList.remove('active');
  // Paso 2 retrocede a paso 1 (dentro del flujo dinámico)
  document.getElementById('ob-step-' + (step - 1)).classList.add('active');
}

function obSelect(field, val, el) {
  document.querySelectorAll(`#ob-${field} .ob-option`).forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  obData[field] = val;
}

function obToggleChip(el) {
  el.classList.toggle('selected');
}

function obShake(id) {
  const el = document.getElementById(id);
  el.style.animation = 'obShake 0.4s ease';
  setTimeout(() => el.style.animation = '', 400);
}

function obFinish() {
  obData.salud = [...document.querySelectorAll('#ob-salud .ob-chip.selected')].map(c => c.dataset.val);
  // Avanzar al paso de registro
  document.getElementById('ob-step-3').classList.remove('active');
  document.getElementById('ob-step-4').classList.add('active');
  setTimeout(() => document.getElementById('ob-email')?.focus(), 120);
}

/* ── REGISTRO FINAL ── */
async function obRegistrar() {
  const email    = document.getElementById('ob-email')?.value.trim();
  const password = document.getElementById('ob-password')?.value;
  const btn      = document.getElementById('ob-register-btn');
  const errEl    = document.getElementById('ob-register-error');

  if (!email || !password) { obRegError('Completa tu correo y contraseña.'); return; }
  if (password.length < 6) { obRegError('La contraseña debe tener al menos 6 caracteres.'); return; }

  btn.disabled = true;
  btn.textContent = 'Creando cuenta...';
  errEl.style.display = 'none';

  try {
    // 1. Crear usuario en Supabase Auth
    const { data, error } = await db.auth.signUp({
      email,
      password,
      options: { data: { nombre: obData.nombre } }
    });
    if (error) throw error;

    // 2. Guardar perfil en localStorage
    saveProfileData(obData);

    // 3. Si ya hay sesión (confirmación desactivada en Supabase), guardar en DB
    if (data.session) {
      currentUser = data.user;
      await guardarPerfilEnDB({
        nombre:        obData.nombre,
        nombreMascota: '',
        tipomascota:   obData.tipomascota,
        edadmascota:   obData.edadmascota,
        salud:         obData.salud,
        fotoMascota:   null,
        fotoDueno:     null,
      });
      localStorage.setItem('wufly_session_email', email);
    }

    // 4. Mostrar pantalla de éxito
    obMostrarExito(obData.nombre, !!data.session);

  } catch(e) {
    const mapa = {
      'User already registered':  'Este correo ya tiene una cuenta. Inicia sesión.',
      'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres.',
      'Invalid email': 'El correo no es válido.',
    };
    obRegError(mapa[e.message] || 'Ocurrió un error. Intenta de nuevo.');
    btn.disabled = false;
    btn.textContent = 'Crear cuenta y entrar 🐾';
  }
}

function obRegError(msg) {
  const el = document.getElementById('ob-register-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}

/* ── PANTALLA DE ÉXITO ── */
function obMostrarExito(nombre, sesionActiva) {
  const container = document.querySelector('#onboarding-overlay .ob-container');
  if (!container) return;
  container.innerHTML = `
    <div class="ob-step active" style="align-items:center;text-align:center;gap:16px;">
      <div style="font-size:64px;">🎉</div>
      <h2 class="ob-title">¡Bienvenido${nombre ? ', ' + nombre : ''}!</h2>
      <p class="ob-desc">${sesionActiva
        ? 'Tu perfil está listo. Ya puedes publicar, guardar recordatorios y consultar a la Dra. Wufly.'
        : 'Te enviamos un correo de confirmación. Revísalo y luego inicia sesión para acceder a todo.'
      }</p>
      <button class="ob-btn-primary" onclick="cerrarOnboarding()" style="margin-top:8px;">¡Explorar Wufly! 🐾</button>
    </div>
  `;
}

/* ── REGISTRO CON GOOGLE DESDE EL ONBOARDING ── */
async function obRegistrarConGoogle() {
  // Guardar los datos del perfil en localStorage antes de redirigir
  // (Google redirige fuera y vuelve, así que los datos deben persistir)
  obData.salud = obData.salud.length
    ? obData.salud
    : [...(document.querySelectorAll('#ob-salud .ob-chip.selected') || [])].map(c => c.dataset.val);
  saveProfileData(obData);

  try {
    const { error } = await db.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) throw error;
    // La redirección ocurre aquí — cuando vuelva, auth.js retomará la sesión
    // y sincronizarPerfil() subirá los datos del localStorage a la DB
  } catch(e) {
    obRegError('Error al conectar con Google. Intenta de nuevo.');
  }
}

/* ── IR A LOGIN DESDE EL ONBOARDING ── */
function obIrALogin() {
  cerrarOnboarding();
  if (typeof abrirAuthModal === 'function') abrirAuthModal('login');
}

/* ── CERRAR ONBOARDING ── */
function cerrarOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.style.animation = 'obFadeOut 0.3s ease forwards';
  setTimeout(() => {
    overlay.remove();
    if (typeof renderAuthBanner === 'function') renderAuthBanner();
    if (typeof _actualizarBotonesPublicar === 'function') _actualizarBotonesPublicar();
  }, 300);
}

function resetOnboarding() {
  localStorage.removeItem(ONBOARDING_KEY);
}

/* ── CSS DEL ONBOARDING ── */
function injectOnboardingStyles() {
  if (document.getElementById('ob-styles')) return;
  const style = document.createElement('style');
  style.id = 'ob-styles';
  style.textContent = `
    #onboarding-overlay {
      position:fixed; inset:0; z-index:2000;
      background: linear-gradient(160deg, #3B1A8C 0%, #5C2FA8 50%, #7C4DCC 100%);
      display:flex; align-items:center; justify-content:center;
      padding:24px;
      animation:obFadeIn 0.4s ease;
    }
    @keyframes obFadeIn { from{opacity:0} to{opacity:1} }
    @keyframes obFadeOut { from{opacity:1} to{opacity:0} }
    @keyframes obShake {
      0%,100%{transform:translateX(0)}
      25%{transform:translateX(-8px)}
      75%{transform:translateX(8px)}
    }
    .ob-container {
      width:100%; max-width:400px;
      max-height:92vh; overflow-y:auto; scrollbar-width:none;
    }
    .ob-container::-webkit-scrollbar { display:none; }
    .ob-step {
      display:none; flex-direction:column; gap:16px;
      background:rgba(255,255,255,0.1);
      border-radius:20px; padding:32px 24px 28px;
      backdrop-filter:blur(8px);
      border:1px solid rgba(255,255,255,0.15);
    }
    .ob-step.active { display:flex; animation:obFadeIn 0.3s ease; }
    .ob-logo { text-align:center; }
    .ob-icon { font-size:52px; text-align:center; }
    .ob-label { font-size:11px; font-weight:700; color:rgba(255,255,255,0.7); letter-spacing:0.06em; text-transform:uppercase; }
    .ob-title {
      font-family:'Funnel Display', sans-serif;
      font-weight:700; font-size:19px; line-height:1.25; color:#fff; text-align:center;
    }
    .ob-desc { font-size:13px; color:rgba(255,255,255,0.72); line-height:1.6; text-align:center; }
    .ob-progress { height:3px; background:rgba(255,255,255,0.15); border-radius:4px; overflow:hidden; }
    .ob-bar { height:100%; background:#5DD6A8; border-radius:4px; transition:width 0.4s ease; }
    .ob-field { display:flex; flex-direction:column; gap:8px; width:100%; }
    .ob-field input {
      border:1.5px solid rgba(255,255,255,0.25); border-radius:10px; padding:13px 16px;
      font-family:'Plus Jakarta Sans', sans-serif; font-size:14px; color:#fff;
      outline:none; background:rgba(255,255,255,0.1); width:100%; box-sizing:border-box;
    }
    .ob-field input::placeholder { color:rgba(255,255,255,0.4); }
    .ob-field input:focus { border-color:#5DD6A8; background:rgba(255,255,255,0.14); }
    .ob-options { display:flex; flex-direction:column; gap:8px; }
    .ob-option {
      display:flex; align-items:center; gap:12px;
      background:rgba(255,255,255,0.07); border:1.5px solid rgba(255,255,255,0.12);
      border-radius:14px; padding:12px 14px; cursor:pointer; transition:all 0.2s;
    }
    .ob-option-sm { padding:10px 14px; }
    .ob-option:hover { border-color:rgba(93,214,168,0.5); background:rgba(255,255,255,0.11); }
    .ob-option.selected { border-color:#5DD6A8; background:rgba(93,214,168,0.15); }
    .ob-opt-icon { font-size:20px; flex-shrink:0; }
    .ob-opt-title { font-size:13px; font-weight:600; color:#fff; }
    .ob-opt-sub { font-size:11px; color:rgba(255,255,255,0.55); margin-top:1px; }
    .ob-grid { display:flex; flex-wrap:wrap; gap:8px; }
    .ob-chip {
      background:rgba(255,255,255,0.08); border:1.5px solid rgba(255,255,255,0.15);
      border-radius:100px; padding:8px 14px; font-size:12px; font-weight:500;
      color:rgba(255,255,255,0.75); cursor:pointer; transition:all 0.15s;
    }
    .ob-chip:hover { border-color:#5DD6A8; color:#5DD6A8; }
    .ob-chip.selected { background:#5DD6A8; color:#1a3a2a; border-color:#5DD6A8; font-weight:700; }
    .ob-nav { display:flex; gap:10px; margin-top:4px; }
    .ob-btn-primary {
      flex:1; width:100%; background:#7C4DCC; color:white;
      border:none; border-radius:10px; padding:14px;
      font-family:'Plus Jakarta Sans', sans-serif; font-weight:700; font-size:13px;
      letter-spacing:0.08em; text-transform:uppercase; cursor:pointer; transition:all 0.2s;
      box-shadow:0 4px 20px rgba(124,77,204,0.4);
    }
    .ob-btn-primary:hover { background:#5C2FA8; transform:translateY(-1px); }
    .ob-btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    .ob-btn-ghost {
      background:transparent; border:1.5px solid rgba(255,255,255,0.2);
      border-radius:10px; padding:14px 20px;
      font-family:'Plus Jakarta Sans', sans-serif; font-size:13px;
      color:rgba(255,255,255,0.65); cursor:pointer; transition:all 0.15s;
    }
    .ob-btn-ghost:hover { border-color:#5DD6A8; color:#5DD6A8; }
    .ob-summary { display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:8px; }
    .ob-summary-tag {
      background:rgba(93,214,168,0.2); color:#5DD6A8;
      font-size:12px; font-weight:600; padding:5px 12px; border-radius:100px;
      border:1px solid rgba(93,214,168,0.3);
    }
  `;
  document.head.appendChild(style);
}

/* ── INIT: NO hacer nada al cargar ── */
// El onboarding ya NO se activa automáticamente.
// Se activa solo cuando el usuario pincha el ícono de Perfil → abrirPerfil()


// ==========================================
// ARCHIVO: js/app.js
// ==========================================

/* ══════════════════════════════════════
   CONFIG — URL del Cloudflare Worker
   ══════════════════════════════════════ */
const WORKER_URL = "https://divine-waterfall-d1dfsin-gluten-life.pablo77tapia.workers.dev";
let _lastPrimaryTab = 'home';

/* ── Debounce: evita renders en cada tecla (búsquedas) ── */
function _debounce(fn, ms = 280) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
const onSearchClinica   = _debounce(() => typeof renderClinicas   === 'function' && renderClinicas());
const onSearchTienda    = _debounce(() => typeof renderTiendas    === 'function' && renderTiendas());


/* ══ STATS DINÁMICAS — lee desde los arrays de datos al renderizar ══ */
function _infoStats() {
  const totalClinicas = typeof REGIONES_CLINICAS !== 'undefined'
    ? REGIONES_CLINICAS.reduce((s, r) => s + r.clinicas.length, 0) : '–';
  const totalTiendas = typeof REGIONES_TIENDAS !== 'undefined'
    ? REGIONES_TIENDAS.reduce((s, r) => s + r.tiendas.length, 0) : '–';

  const clinicasActivas = typeof getClinicasActivas === 'function' ? getClinicasActivas() : null;
  const clinicasRegion  = clinicasActivas?.length ?? totalClinicas;
  const urgencias24h    = clinicasActivas ? clinicasActivas.filter(c => c.urgencia).length : '–';
  const ciudades        = typeof REGIONES_CLINICAS !== 'undefined' ? REGIONES_CLINICAS.length : '–';

  const tiendasActivas = typeof getTiendasActivas === 'function' ? getTiendasActivas() : null;
  const tiendasRegion  = tiendasActivas?.length ?? totalTiendas;

  return { totalClinicas, totalTiendas, clinicasRegion, urgencias24h, ciudades, tiendasRegion };
}

/* ══ CONTENIDO PANEL DERECHO (desktop) ══ */
const INFO_COLUMN_CONTENT = {
  home: () => { const s = _infoStats(); return `
    <div class="info-card">
      <div class="info-card-tag">🐾 Bienvenido a Wufly</div>
      <h2>Todo para el cuidado de tu mascota</h2>
      <p>La plataforma de mascotas más completa de Chile.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">${s.totalClinicas}</div><div class="info-stat-label">Veterinarias</div></div>
        <div class="info-stat"><div class="info-stat-num">${s.totalTiendas}</div><div class="info-stat-label">Tiendas</div></div>
        <div class="info-stat"><div class="info-stat-num">🇨🇱</div><div class="info-stat-label">Nacional</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">💡 ¿Sabías que?</div>
      <h2>El 40% de los perros tiene sobrepeso en Chile</h2>
      <p>La obesidad es la enfermedad nutricional más común en mascotas. Puede reducir hasta 2 años de vida y aumentar el riesgo de diabetes, artritis y problemas cardíacos.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">40%</div><div class="info-stat-label">con sobrepeso</div></div>
        <div class="info-stat"><div class="info-stat-num">-2</div><div class="info-stat-label">años de vida</div></div>
        <div class="info-stat"><div class="info-stat-num">80%</div><div class="info-stat-label">prevenible</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">⚠️ Alimentos tóxicos para mascotas</div>
      <h2>Nunca darle estos alimentos a tu perro o gato</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🍫 Chocolate</span>
        <span class="info-tag-pill">🧅 Cebolla y ajo</span>
        <span class="info-tag-pill">🍇 Uvas y pasas</span>
        <span class="info-tag-pill">🥑 Palta</span>
        <span class="info-tag-pill">☕ Cafeína</span>
        <span class="info-tag-pill">🍬 Xilitol</span>
        <span class="info-tag-pill">🦴 Huesos cocidos</span>
        <span class="info-tag-pill">🧂 Sal en exceso</span>
      </div>
    </div>`; },

  restaurantes: () => { const s = _infoStats(); return `
    <div class="info-card">
      <div class="info-card-tag">🛍️ Servicios para mascotas</div>
      <h2>Encuentra lo que tu mascota necesita</h2>
      <p>Clínicas veterinarias y tiendas de mascotas cerca de ti.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">${s.clinicasRegion}</div><div class="info-stat-label">Veterinarias</div></div>
        <div class="info-stat"><div class="info-stat-num">${s.urgencias24h}</div><div class="info-stat-label">Con 24h</div></div>
        <div class="info-stat"><div class="info-stat-num">${s.tiendasRegion}</div><div class="info-stat-label">Tiendas</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🏥 Consejos</div>
      <h2>Qué llevar a la consulta veterinaria</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">📋</div><div class="info-tip-text"><strong>Carnet de vacunas</strong>Lleva el historial de vacunación actualizado de tu mascota.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📍</div><div class="info-tip-text"><strong>Activa tu ubicación</strong>Wufly ordena los servicios por distancia para que encuentres el más cercano.</div></div>
        <div class="info-tip"><div class="info-tip-icon">🚨</div><div class="info-tip-text"><strong>Urgencias 24h</strong>Algunas clínicas tienen servicio de urgencias disponible toda la noche.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🛒 Tiendas</div>
      <h2>Productos para tu mascota</h2>
      <p>Encuentra alimentos, accesorios y todo lo que tu mascota necesita.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🍖 Alimentos</span>
        <span class="info-tag-pill">🧸 Juguetes</span>
        <span class="info-tag-pill">💊 Farmacia</span>
        <span class="info-tag-pill">🧴 Higiene</span>
        <span class="info-tag-pill">🏠 Accesorios</span>
      </div>
    </div>`; },

  comunidad: () => `
    <div class="info-card">
      <div class="info-card-tag">🐾 Comunidad Wufly</div>
      <h2>Juntos por el bienestar animal</h2>
      <p>Publica mascotas en adopción, reporta perdidos o animales en situación de calle. Cada publicación puede cambiar una vida.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">🏠</div><div class="info-stat-label">Adopción</div></div>
        <div class="info-stat"><div class="info-stat-num">🔍</div><div class="info-stat-label">Perdidos</div></div>
        <div class="info-stat"><div class="info-stat-num">🆘</div><div class="info-stat-label">Rescate</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">📋 Cómo publicar</div>
      <h2>Pasos para publicar una mascota</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">📸</div><div class="info-tip-text"><strong>Foto clara</strong>Una buena foto aumenta las posibilidades de adopción o de encontrar al dueño.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📝</div><div class="info-tip-text"><strong>Descripción completa</strong>Incluye personalidad, señas particulares, si está vacunado o castrado.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📱</div><div class="info-tip-text"><strong>Contacto directo</strong>Agrega tu WhatsApp para que quienes quieran ayudar puedan contactarte fácilmente.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🍲 Recetas caseras</div>
      <h2>Comida natural para tu mascota</h2>
      <p>Descubre recetas sin conservantes ni aditivos. Prepara en casa snacks y comidas balanceadas para perros y gatos.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🐕 Perros</span>
        <span class="info-tag-pill">🐈 Gatos</span>
        <span class="info-tag-pill">🥩 Carnes</span>
        <span class="info-tag-pill">🥦 Verduras</span>
        <span class="info-tag-pill">🍚 Arroz</span>
      </div>
    </div>`,

  alergias: () => `
    <div class="info-card">
      <div class="info-card-tag">👤 Mi perfil</div>
      <h2>Tu mascota y tú en un solo lugar</h2>
      <p>Guarda la información de tu mascota, accede a sus recordatorios de vacunas y controles, y gestiona tu cuenta Wufly.</p>
      <div class="info-card-divider"></div>
      <div class="info-stat-row">
        <div class="info-stat"><div class="info-stat-num">📅</div><div class="info-stat-label">Recordatorios</div></div>
        <div class="info-stat"><div class="info-stat-num">🍲</div><div class="info-stat-label">Recetas</div></div>
        <div class="info-stat"><div class="info-stat-num">🐾</div><div class="info-stat-label">Perfil</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">💉 Vacunación anual</div>
      <h2>Vacunas esenciales para tu mascota</h2>
      <div style="display:flex;flex-direction:column;gap:14px;margin-top:4px;">
        <div class="info-tip"><div class="info-tip-icon">🐕</div><div class="info-tip-text"><strong>Perros: polivalente + rabia</strong>Moquillo, hepatitis, parvovirus, parainfluenza y rabia. Refuerzo anual obligatorio.</div></div>
        <div class="info-tip"><div class="info-tip-icon">🐈</div><div class="info-tip-text"><strong>Gatos: trivalente felina</strong>Panleucopenia, rinotraqueítis y calicivirus. Refuerzo anual o cada 3 años según el producto.</div></div>
        <div class="info-tip"><div class="info-tip-icon">📅</div><div class="info-tip-text"><strong>Usa los recordatorios</strong>Wufly te avisa cuándo toca la próxima vacuna para que nunca se te olvide.</div></div>
      </div>
    </div>
    <div class="info-card">
      <div class="info-card-tag">🔬 Chequeo preventivo</div>
      <h2>La salud de tu mascota en tus manos</h2>
      <p>Un chequeo anual detecta problemas a tiempo. Para mascotas senior (7+ años), se recomienda cada 6 meses.</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;">
        <span class="info-tag-pill">🦷 Salud dental</span>
        <span class="info-tag-pill">⚖️ Peso ideal</span>
        <span class="info-tag-pill">🩸 Examen de sangre</span>
        <span class="info-tag-pill">🫀 Corazón</span>
        <span class="info-tag-pill">👁️ Ojos y oídos</span>
      </div>
    </div>`
};

function updateInfoColumn(tabName) {
  if (window.innerWidth < 900) return;
  const col = document.getElementById('infoColumn');
  if (!col) return;
  const entry = INFO_COLUMN_CONTENT[tabName] || INFO_COLUMN_CONTENT.home;
  const content = typeof entry === 'function' ? entry() : entry;
  col.style.opacity = '0';
  setTimeout(() => {
    const esAdmin = (typeof currentUser !== 'undefined' && currentUser?.email === 'genifychile@gmail.com');
    col.innerHTML = (esAdmin ? _adminPaseadoresWidget() : '') + content;
    col.style.opacity = '1';
    if (esAdmin) _cargarSolicitudesPaseadores();
  }, 180);
}

/* ══ ADMIN WIDGET — Solicitudes de paseadores ══ */
function _adminPaseadoresWidget() {
  return `
  <div id="admin-paseadores-widget" style="background:linear-gradient(135deg,#1a0a3c,#2d1060);border-radius:16px;padding:18px;margin-bottom:16px;border:1.5px solid rgba(124,77,204,0.4);">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div>
        <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.1em;">WUFLY ADMIN</div>
        <div style="font-size:15px;font-weight:700;color:white;margin-top:2px;">🐾 Solicitudes de Paseadores</div>
      </div>
      <button onclick="_cargarSolicitudesPaseadores()" title="Actualizar"
        style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:white;font-size:13px;cursor:pointer;">↻</button>
    </div>
    <div id="admin-solicitudes-list" style="display:flex;flex-direction:column;gap:8px;">
      <div style="text-align:center;padding:20px;color:rgba(255,255,255,0.4);font-size:13px;">Cargando…</div>
    </div>
  </div>`;
}

async function _cargarSolicitudesPaseadores() {
  const list = document.getElementById('admin-solicitudes-list');
  if (!list) return;

  try {
    const { data, error } = await db
      .from('solicitudes_paseador')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      list.innerHTML = '<div style="text-align:center;padding:16px;color:rgba(255,255,255,0.4);font-size:13px;">Sin solicitudes aún</div>';
      return;
    }

    list.innerHTML = data.map(s => {
      const esPendiente = s.estado === 'pendiente';
      const esAprobado  = s.estado === 'aprobado';
      const fecha = s.created_at ? new Date(s.created_at).toLocaleDateString('es-CL', { day:'2-digit', month:'short' }) : '';

      return `
      <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:12px;border:1px solid rgba(255,255,255,0.1);">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:700;color:white;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.nombre || 'Sin nombre'}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">${s.email || ''} · ${fecha}</div>
            ${s.zona ? `<div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:1px;">📍 ${s.zona}</div>` : ''}
          </div>
          <span style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:100px;flex-shrink:0;
            background:${esPendiente ? 'rgba(245,158,11,0.2)' : esAprobado ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'};
            color:${esPendiente ? '#FCD34D' : esAprobado ? '#6EE7B7' : '#FCA5A5'};">
            ${esPendiente ? '⏳ Pendiente' : esAprobado ? '✅ Aprobado' : '❌ Rechazado'}
          </span>
        </div>
        ${esPendiente ? `
        <div style="display:flex;gap:6px;margin-top:10px;">
          <button onclick="_aprobarPaseador('${s.id}')"
            style="flex:1;padding:7px;border-radius:8px;border:none;background:#10B981;color:white;font-size:12px;font-weight:700;cursor:pointer;">
            ✓ Aprobar
          </button>
          <button onclick="_rechazarPaseador('${s.id}')"
            style="flex:1;padding:7px;border-radius:8px;border:none;background:rgba(239,68,68,0.3);color:#FCA5A5;font-size:12px;font-weight:700;cursor:pointer;border:1px solid rgba(239,68,68,0.4);">
            ✕ Rechazar
          </button>
        </div>` : ''}
      </div>`;
    }).join('');

  } catch (e) {
    list.innerHTML = `<div style="text-align:center;padding:16px;color:#FCA5A5;font-size:12px;">Error al cargar: ${e.message}</div>`;
  }
}

async function _aprobarPaseador(id) {
  try {
    const { error } = await db
      .from('solicitudes_paseador')
      .update({ estado: 'aprobado' })
      .eq('id', id);
    if (error) throw error;
    await _cargarSolicitudesPaseadores();
  } catch (e) {
    alert('Error al aprobar: ' + e.message);
  }
}

async function _rechazarPaseador(id) {
  if (!confirm('¿Seguro que quieres rechazar esta solicitud?')) return;
  try {
    const { error } = await db
      .from('solicitudes_paseador')
      .update({ estado: 'rechazado' })
      .eq('id', id);
    if (error) throw error;
    await _cargarSolicitudesPaseadores();
  } catch (e) {
    alert('Error al rechazar: ' + e.message);
  }
}

/* ══ NAVEGACIÓN ══ */
function switchTab(name, el, fromNav = false) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  // Actualizar sidebar desktop
  document.querySelectorAll('.dsb-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === name);
  });

  document.getElementById('page-' + name)?.classList.add('active');
  if (name === 'restaurantes') {
    switchServiciosTab('veterinarias');
    /* Auto-buscar solo si el usuario ya permitió la ubicación antes */
    const yaHayGeo = typeof geoStatus !== 'undefined' && (geoStatus === 'ok' || geoStatus === 'loading');
    if (!yaHayGeo && localStorage.getItem('wufly_geo_granted')) activarBusquedaGeo?.();
  }
  if (name === 'home') renderHome?.();

  // Panel derecho dinámico (solo desktop)
  updateInfoColumn(name);

  // Franja de color superior: visible en todas las vistas excepto home
  const topBar = document.getElementById('topColorBar');
  if (topBar) topBar.style.display = name === 'home' ? 'none' : 'block';

  // Para páginas secundarias, iluminar el tab padre lógico
  const secondaryParent = { recetas: 'comunidad', recordatorios: 'home', detail: _lastPrimaryTab || 'home' };
  const order = ['home', 'media', 'restaurantes', 'comunidad', 'alergias'];
  const activeName = secondaryParent[name] ?? name;
  const idx = order.indexOf(activeName);
  if (idx >= 0) {
    document.querySelectorAll('.tab')[idx]?.classList.add('active');
    document.querySelectorAll('.nav-btn')[idx]?.classList.add('active');
  }
  if (!secondaryParent[name]) _lastPrimaryTab = name;

  const appPages = document.querySelector('.app-pages');
  if (appPages && window.innerWidth >= 900) {
    appPages.scrollTop = 0;
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

/* ══ SUB-TABS DE SERVICIOS ══ */
function switchServiciosTab(tab) {
  const subs = ['veterinarias', 'tiendas'];
  subs.forEach(s => {
    const el = document.getElementById('ssub-' + s);
    if (el) el.style.display = s === tab ? 'block' : 'none';
    const btn = document.getElementById('stab-' + s);
    if (btn) {
      btn.style.background = s === tab ? 'var(--purple)' : 'transparent';
      btn.style.color      = s === tab ? 'white' : 'var(--text-muted)';
    }
  });
  if (tab === 'veterinarias') { renderClinicas?.(); }
  if (tab === 'tiendas')      { renderTiendas?.(); }
}

/* ══ SUB-TABS DE COMUNIDAD ══ */
function switchComunidadTab(tab) {
  const subs = ['adoptar', 'perdidos', 'rescate'];
  subs.forEach(s => {
    const el = document.getElementById('csub-' + s);
    if (el) el.style.display = s === tab ? 'block' : 'none';
    const btn = document.getElementById('ctab-' + s);
    if (btn) {
      btn.style.background = s === tab ? 'var(--purple)' : 'transparent';
      btn.style.color      = s === tab ? 'white' : 'var(--text-muted)';
    }
  });
  if (tab === 'perdidos')     renderPerdidos?.();
  if (tab === 'rescate')      renderRescate?.();
  if (tab === 'adoptar')      renderAdoptar?.();
}

/* ══ CONSULTA RÁPIDA ══ */
function setConsultaRapida(texto) {
  /* Función deshabilitada — Dra. Wufly eliminada */
}

/* ══ OBTENER CONTEXTO COMPLETO DEL PERFIL PARA LA IA ══ */
function getUserContext() {
  return typeof buildAIContext === 'function' ? buildAIContext() : '';
}

function resetOnboarding() {
  localStorage.removeItem('wufly_profile_v1');
  if (typeof injectOnboardingStyles === 'function') injectOnboardingStyles();
  if (typeof showOnboarding === 'function') showOnboarding();
}

/* ══ INIT ══ */
/* ══ MODAL PERMISO UBICACIÓN ══ */
function showGeoModal() {
  if (localStorage.getItem('wufly_geo_granted')) return;
  if (sessionStorage.getItem('wufly_geo_declined')) return;
  const modal = document.getElementById('geoModal');
  if (modal) modal.style.display = 'flex';
}

function geoModalPermitir() {
  document.getElementById('geoModal').style.display = 'none';
  localStorage.setItem('wufly_geo_granted', '1');
  activarBusquedaGeo?.();
}

function geoModalRechazar() {
  document.getElementById('geoModal').style.display = 'none';
  sessionStorage.setItem('wufly_geo_declined', '1');
}

/* ── Registrar visita única por sesión ── */
(function registrarVisita() {
  try {
    if (sessionStorage.getItem('wufly_visita_ok')) return;
    fetch('https://wufly-push.pablo77tapia.workers.dev/api/registrar-visita', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }).then(() => sessionStorage.setItem('wufly_visita_ok', '1')).catch(() => {});
  } catch (_) {}
})();


document.addEventListener('DOMContentLoaded', () => {
  renderClinicas();
  updateInfoColumn('home');
  /* Mostrar modal de ubicación tras 1.5s si aún no se ha respondido */
  setTimeout(showGeoModal, 1500);
  /* Pull to refresh */
  _initPullToRefresh();
  /* Botón instalar PWA */
  _initInstallBtn();
});

/* ══════════════════════════════════════
   PULL TO REFRESH
   Solo móvil. Arrastra desde el tope de
   cualquier sección para actualizar.
   ══════════════════════════════════════ */
function _initPullToRefresh() {
  if (window.innerWidth >= 900) return; // solo móvil

  /* ── Indicador visual ── */
  const ptr = document.createElement('div');
  ptr.id = 'ptr-indicator';
  ptr.innerHTML = `
    <style>
      #ptr-indicator {
        position:fixed;top:0;left:50%;
        transform:translateX(-50%) translateY(-70px);
        z-index:9998;pointer-events:none;
        transition:transform 0.3s cubic-bezier(0.34,1.2,0.64,1);
      }
      #ptr-disk {
        width:42px;height:42px;border-radius:50%;
        background:white;
        box-shadow:0 3px 14px rgba(124,77,204,0.28);
        display:flex;align-items:center;justify-content:center;
      }
      #ptr-spinner {
        width:20px;height:20px;border-radius:50%;
        border:2.5px solid #e0d8f5;
        border-top-color:var(--purple,#7C4DCC);
      }
      @keyframes ptr-spin { to { transform:rotate(360deg); } }
      #ptr-spinner.spinning { animation:ptr-spin 0.65s linear infinite; }
    </style>
    <div id="ptr-disk"><div id="ptr-spinner"></div></div>
  `;
  document.body.appendChild(ptr);

  const spinner  = ptr.querySelector('#ptr-spinner');
  const THRESHOLD = 65;
  const RESIST    = 0.38;
  let startY = 0, pulling = false, busy = false;

  /* ── Qué tab está activo ── */
  function _activeTab() {
    return document.querySelector('.page.active')?.id?.replace('page-', '') || 'home';
  }
  function _activeServiciosSub() {
    return ['veterinarias','tiendas'].find(s => {
      const el = document.getElementById('ssub-' + s);
      return el && el.style.display !== 'none';
    }) || 'veterinarias';
  }
  function _activeComunidadSub() {
    return ['adoptar','perdidos','rescate'].find(s => {
      const el = document.getElementById('csub-' + s);
      return el && el.style.display !== 'none';
    }) || 'adoptar';
  }

  /* ── Acción de refresco por sección ── */
  function _doRefresh() {
    spinner.classList.add('spinning');
    const tab = _activeTab();
    const done = () => {
      busy = false;
      spinner.classList.remove('spinning');
      ptr.style.transform = 'translateX(-50%) translateY(-70px)';
    };

    if (tab === 'home') {
      renderHome?.();
      setTimeout(done, 700);
    } else if (tab === 'restaurantes') {
      Promise.resolve(typeof iniciarGeoBusqueda === 'function' ? iniciarGeoBusqueda(true) : null)
        .then(() => { renderClinicas?.(); done(); });
    } else if (tab === 'restaurantes') {
      const sub = _activeServiciosSub();
      if (sub === 'veterinarias') { Promise.resolve(typeof iniciarGeoBusqueda === 'function' ? iniciarGeoBusqueda(true) : null).then(() => { renderClinicas?.(); setTimeout(done, 900); }); }
      else if (sub === 'tiendas')  { activarBusquedaTiendas?.(); setTimeout(done, 900); }
      else { setTimeout(done, 400); }
    } else if (tab === 'comunidad') {
      const sub = _activeComunidadSub();
      if (sub === 'adoptar')  renderAdopcion?.();
      if (sub === 'perdidos') renderPerdidos?.();
      setTimeout(done, 700);
    } else if (tab === 'alergias') {
      Promise.resolve(typeof sincronizarPerfil === 'function' ? sincronizarPerfil() : null)
        .then(() => {
          // Aplicar tema premium si corresponde
          if (typeof _perfilAplicarPremium === 'function' && localStorage.getItem('wufly_premium') === '1') {
            _perfilAplicarPremium();
          }
          done();
        });
    } else {
      setTimeout(done, 400);
    }
  }

  /* ── Listeners ── */
  window.addEventListener('touchstart', e => {
    if (busy || window.scrollY > 4) return;
    startY  = e.touches[0].clientY;
    pulling = true;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!pulling || busy) return;
    const dy = e.touches[0].clientY - startY;
    if (dy <= 0) { pulling = false; return; }
    const pull = Math.min(dy * RESIST, THRESHOLD + 18);
    ptr.style.transition = 'none';
    ptr.style.transform  = `translateX(-50%) translateY(${pull - 36}px)`;
    // Girar el spinner según el progreso del arrastre
    const pct = Math.min(pull / THRESHOLD, 1);
    spinner.style.transform = `rotate(${pct * 270}deg)`;
  }, { passive: true });

  window.addEventListener('touchend', e => {
    if (!pulling || busy) return;
    pulling = false;
    const dy = e.changedTouches[0].clientY - startY;
    spinner.style.transform = '';
    if (dy * RESIST >= THRESHOLD) {
      busy = true;
      ptr.style.transition = 'transform 0.25s ease';
      ptr.style.transform  = 'translateX(-50%) translateY(14px)';
      _doRefresh();
    } else {
      ptr.style.transition = 'transform 0.3s ease';
      ptr.style.transform  = 'translateX(-50%) translateY(-70px)';
    }
  }, { passive: true });
}

/* ══════════════════════════════════════
   INSTALAR PWA
   Detecta Chrome (beforeinstallprompt)
   e iOS Safari (navigator.standalone).
   No aparece si ya está instalada.
   ══════════════════════════════════════ */
function _initInstallBtn() {
  /* ── Ya está instalada como standalone → no mostrar ── */
  const yaInstalada =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  if (yaInstalada) return;

  const esIOS        = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const esSafari     = /safari/i.test(navigator.userAgent) && !/chrome|crios|fxios/i.test(navigator.userAgent);
  const esChromeIOS  = esIOS && /crios/i.test(navigator.userAgent);

  let deferredPrompt = null;

  /* ── Chrome/Android: capturar evento nativo ── */
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    _mostrarBtnInstalar();
  });

  /* ── iOS Safari: mostrar siempre (no hay evento nativo) ── */
  if (esIOS && esSafari) {
    setTimeout(_mostrarBtnInstalar, 1800);
  }

  /* ── Chrome en iOS: mostrar con aviso de abrir en Safari ── */
  if (esChromeIOS) {
    setTimeout(_mostrarBtnInstalar, 1800);
  }

  /* ── Ocultar si se instala ── */
  window.addEventListener('appinstalled', () => {
    document.getElementById('wufly-install-btn')?.remove();
  });

  function _mostrarBtnInstalar() {
    if (document.getElementById('wufly-install-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'wufly-install-btn';
    btn.title = 'Instalar Wufly en tu dispositivo';
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>Instalar</span>
    `;
    btn.style.cssText = `
      position:fixed;top:55px;right:70px;z-index:200;
      display:inline-flex;align-items:center;gap:6px;
      background:linear-gradient(135deg,#5C2FA8,#7C4DCC);
      color:white;border:none;border-radius:100px;
      padding:8px 14px;font-size:12px;font-weight:700;
      font-family:'Plus Jakarta Sans',sans-serif;
      cursor:pointer;
      box-shadow:0 4px 14px rgba(92,47,168,0.45);
      animation:installPulse 2.5s ease-in-out infinite;
    `;

    /* Animación de pulso */
    if (!document.getElementById('install-btn-style')) {
      const s = document.createElement('style');
      s.id = 'install-btn-style';
      s.textContent = `
        @keyframes installPulse {
          0%,100% { box-shadow:0 4px 14px rgba(92,47,168,0.45); transform:scale(1); }
          50%      { box-shadow:0 4px 22px rgba(92,47,168,0.7);  transform:scale(1.04); }
        }
        #wufly-install-btn:active { transform:scale(0.95)!important; animation:none!important; }
      `;
      document.head.appendChild(s);
    }

    btn.addEventListener('click', async () => {
      if (deferredPrompt) {
        /* Chrome/Android: prompt nativo */
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
        if (outcome === 'accepted') btn.remove();
      } else if (esChromeIOS) {
        /* Chrome en iPhone: no puede instalar, redirigir a Safari */
        _mostrarAbrirEnSafari();
      } else {
        /* iOS Safari: instrucciones paso a paso */
        _mostrarInstruccionesIOS();
      }
    });

    document.body.appendChild(btn);
  }

  function _mostrarInstruccionesIOS() {
    if (document.getElementById('ios-install-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'ios-install-modal';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(30,10,60,0.6);backdrop-filter:blur(4px);
      display:flex;align-items:flex-end;justify-content:center;
      animation:fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
      <div style="
        background:white;border-radius:28px 28px 0 0;
        padding:28px 24px 40px;width:100%;max-width:480px;
        animation:slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1);
      ">
        <div style="width:40px;height:4px;background:#e0d8f5;border-radius:4px;margin:0 auto 24px;"></div>
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
          <img src="img/icono.png" style="width:48px;height:48px;border-radius:14px;box-shadow:0 2px 10px rgba(0,0,0,0.15);">
          <div>
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:18px;color:#2D1B6B;">Instalar Wufly</div>
            <div style="font-size:12px;color:#9CA3AF;margin-top:2px;">Agrégala a tu pantalla de inicio</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:24px;">
          <div style="display:flex;align-items:center;gap:14px;background:#F8F7FF;border-radius:14px;padding:14px;">
            <div style="width:36px;height:36px;border-radius:10px;background:#E3F2FD;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">1</div>
            <div style="font-size:13px;color:#2D1B6B;line-height:1.5;">Toca el botón <strong>Compartir</strong> <span style="font-size:16px;">⬆️</span> en la barra inferior de Safari</div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;background:#F8F7FF;border-radius:14px;padding:14px;">
            <div style="width:36px;height:36px;border-radius:10px;background:#E8F5E9;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">2</div>
            <div style="font-size:13px;color:#2D1B6B;line-height:1.5;">Desliza y toca <strong>"Agregar a pantalla de inicio"</strong> <span style="font-size:16px;">➕</span></div>
          </div>
          <div style="display:flex;align-items:center;gap:14px;background:#F8F7FF;border-radius:14px;padding:14px;">
            <div style="width:36px;height:36px;border-radius:10px;background:#F3E5F5;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">3</div>
            <div style="font-size:13px;color:#2D1B6B;line-height:1.5;">Toca <strong>"Agregar"</strong> en la esquina superior derecha</div>
          </div>
        </div>
        <button onclick="document.getElementById('ios-install-modal').remove()"
          style="width:100%;padding:14px;border-radius:14px;border:none;
          background:linear-gradient(135deg,#5C2FA8,#7C4DCC);color:white;
          font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;cursor:pointer;">
          Entendido 👍
        </button>
      </div>
      <style>
        @keyframes slideUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      </style>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }

  function _mostrarAbrirEnSafari() {
    if (document.getElementById('safari-redirect-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'safari-redirect-modal';
    modal.style.cssText = `
      position:fixed;inset:0;z-index:9999;
      background:rgba(30,10,60,0.6);backdrop-filter:blur(4px);
      display:flex;align-items:flex-end;justify-content:center;
      animation:fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
      <div style="
        background:white;border-radius:28px 28px 0 0;
        padding:28px 24px 40px;width:100%;max-width:480px;
        animation:slideUp 0.35s cubic-bezier(0.34,1.2,0.64,1);
      ">
        <div style="width:40px;height:4px;background:#e0d8f5;border-radius:4px;margin:0 auto 24px;"></div>

        <div style="text-align:center;margin-bottom:20px;">
          <div style="font-size:44px;margin-bottom:10px;">🧭</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:18px;color:#2D1B6B;margin-bottom:6px;">
            Abre Wufly en Safari
          </div>
          <div style="font-size:13px;color:#6B5C8A;line-height:1.6;max-width:280px;margin:0 auto;">
            Chrome en iPhone no puede instalar apps. Para agregar Wufly a tu pantalla de inicio necesitas abrirla en <strong>Safari</strong>.
          </div>
        </div>

        <div style="background:#F8F7FF;border-radius:14px;padding:14px 16px;margin-bottom:20px;display:flex;align-items:center;gap:12px;">
          <span style="font-size:22px;flex-shrink:0;">💡</span>
          <div style="font-size:12px;color:#6B5C8A;line-height:1.5;">
            Copia la URL, pégala en Safari y luego usa<br>
            <strong>Compartir ⬆️ → Agregar a pantalla de inicio</strong>
          </div>
        </div>

        <button onclick="document.getElementById('safari-redirect-modal').remove()"
          style="width:100%;padding:14px;border-radius:14px;border:none;
          background:linear-gradient(135deg,#5C2FA8,#7C4DCC);color:white;
          font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;cursor:pointer;">
          Entendido
        </button>
      </div>
    `;
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }
}

// ==========================================
// ARCHIVO: js/perdidos.js
// ==========================================

let rescateFile = null;
let perdidoFile = null;

function escHTMLPerdidos(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const iconMapP = { perro: '🐕', gato: '🐈', otro: '🐾' };

function toggleFormPerdido() {
  const form = document.getElementById('formPerdido');
  const visible = form.style.display !== 'none';
  form.style.display = visible ? 'none' : 'block';
  document.getElementById('btnPublicarPerdido').style.display = visible ? 'flex' : 'none';
  if (!visible) {
    document.getElementById('perdidoFecha').value = new Date().toISOString().split('T')[0];
    const zone = document.getElementById('perdidoUploadZone');
    const input = document.getElementById('perdidoFileInput');
    zone.onclick = () => input.click();
    input.onchange = function(e) {
      const f = e.target.files[0]; if (!f) return;
      perdidoFile = f;
      const img = document.getElementById('perdidoPreviewImg');
      img.src = URL.createObjectURL(f); img.style.display = 'block';
      const p = zone.querySelector('p'); if (p) p.textContent = 'Toca para cambiar';
    };
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

function toggleFormRescate() {
  const form = document.getElementById('formRescate');
  const visible = form.style.display !== 'none';
  form.style.display = visible ? 'none' : 'block';
  document.getElementById('btnPublicarRescate').style.display = visible ? 'flex' : 'none';
  if (!visible) {
    const zone = document.getElementById('rescateUploadZone');
    const input = document.getElementById('rescateFileInput');
    zone.onclick = () => input.click();
    input.onchange = function(e) {
      const f = e.target.files[0]; if (!f) return;
      rescateFile = f;
      const img = document.getElementById('rescatePreviewImg');
      img.src = URL.createObjectURL(f); img.style.display = 'block';
      const p = zone.querySelector('p'); if (p) p.textContent = 'Toca para cambiar';
    };
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

async function publicarPerdido(tipo) {
  if (!currentUser) { abrirAuthModal('login'); return; }
  if (tipo === 'perdido') {
    const desc = document.getElementById('perdidoDesc').value.trim();
    const ubic = document.getElementById('perdidoUbicacion').value.trim();
    const wsp  = document.getElementById('perdidoWsp').value.trim();
    const link = document.getElementById('perdidoLink').value.trim();
    if (!desc || desc.length < 10) { alert('Por favor describe la mascota con más detalle (mínimo 10 caracteres).'); return; }
    if (!ubic || ubic.length < 5)  { alert('Por favor indica la ubicación (mínimo 5 caracteres).'); return; }
    if (!wsp && !link) { alert('Ingresa al menos un contacto: número de WhatsApp o un link.'); return; }
    if (wsp && !/^\+?\d{7,15}$/.test(wsp.replace(/[\s\-()]/g, ''))) {
      alert('El número de WhatsApp no es válido, ej: +56912345678'); return;
    }

    const btn = document.getElementById('perdidoSubmitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

    const _timeout = ms => new Promise((_, r) => setTimeout(() => r(new Error('Sin respuesta del servidor')), ms));

    let foto_url = null;
    if (perdidoFile) {
      try { foto_url = await Promise.race([subirFotoComunidad(perdidoFile, 'perdidos'), _timeout(10000)]); }
      catch { /* continuar sin foto */ }
    }

    const fechaVal = document.getElementById('perdidoFecha').value;
    let error;
    try {
      const res = await Promise.race([
        fetch(`${SUPABASE_URL}/rest/v1/perdidos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}`, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ user_id: currentUser?.id || null, especie: document.getElementById('perdidoEspecie').value, descripcion: desc, ubicacion: ubic, fecha_extravio: fechaVal || null, wsp: wsp || null, link: link || null, foto_url }),
        }),
        _timeout(10000),
      ]);
      if (!res.ok) { const t = await res.text(); error = new Error(`HTTP ${res.status}: ${t}`); }
    } catch (e) { error = e; }

    if (btn) { btn.disabled = false; btn.textContent = 'Publicar 🔍'; }
    if (error) { console.error('[perdidos]', error); alert('Error: ' + error.message); return; }

    if (typeof notificarMascotaPerdida === 'function') notificarMascotaPerdida(desc, ubic);

    toggleFormPerdido();
    document.getElementById('perdidoDesc').value = '';
    document.getElementById('perdidoWsp').value = '';
    document.getElementById('perdidoLink').value = '';
    document.getElementById('perdidoUbicacion').value = '';
    const prev = document.getElementById('perdidoPreviewImg');
    if (prev) { prev.style.display = 'none'; prev.src = ''; }
    perdidoFile = null;
    setTimeout(async () => {
      await renderPerdidoFeed();
      document.getElementById('perdidoFeed').scrollIntoView({ behavior: 'smooth' });
    }, 600);

  } else {
    const desc = document.getElementById('rescateDesc').value.trim();
    const ubic = document.getElementById('rescateUbicacion').value.trim();
    const wsp  = document.getElementById('rescateWsp').value.trim();
    const link = document.getElementById('rescateLink').value.trim();
    if (!desc || desc.length < 10) { alert('Por favor describe el animal con más detalle (mínimo 10 caracteres).'); return; }
    if (!ubic || ubic.length < 5)  { alert('Por favor indica la ubicación exacta (mínimo 5 caracteres).'); return; }
    if (wsp && !/^\+?\d{7,15}$/.test(wsp.replace(/[\s\-()]/g, ''))) {
      alert('El número de WhatsApp no es válido, ej: +56912345678'); return;
    }

    const btn = document.getElementById('btnPublicarRescate');
    if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

    const _timeout = ms => new Promise((_, r) => setTimeout(() => r(new Error('Sin respuesta del servidor')), ms));

    let foto_url = null;
    if (rescateFile) {
      try { foto_url = await Promise.race([subirFotoComunidad(rescateFile, 'rescates'), _timeout(10000)]); }
      catch { /* continuar sin foto */ }
    }

    let error;
    try {
      const res = await Promise.race([
        fetch(`${SUPABASE_URL}/rest/v1/rescates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}`, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ user_id: currentUser?.id || null, especie: document.getElementById('rescateEspecie').value, descripcion: desc, ubicacion: ubic, wsp: wsp || null, link: link || null, foto_url, estado: 'esperando' }),
        }),
        _timeout(10000),
      ]);
      if (!res.ok) { const t = await res.text(); error = new Error(`HTTP ${res.status}: ${t}`); }
    } catch (e) { error = e; }

    if (btn) { btn.disabled = false; btn.textContent = 'Publicar alerta'; }
    if (error) { console.error('[rescate]', error); alert('Error: ' + error.message); return; }

    toggleFormRescate();
    document.getElementById('rescateDesc').value = '';
    document.getElementById('rescateUbicacion').value = '';
    document.getElementById('rescateWsp').value = '';
    document.getElementById('rescateLink').value = '';
    const prev = document.getElementById('rescatePreviewImg');
    if (prev) { prev.style.display = 'none'; prev.src = ''; }
    rescateFile = null;
    renderRescateFeed();
  }
}

async function marcarRescatado(id) {
  const { error } = await db.from('rescates').update({ estado: 'rescatado' }).eq('id', id);
  if (error) { alert('No se pudo actualizar el estado.'); return; }
  renderRescateFeed();
}

function _sbToken() {
  try {
    const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
    const s = JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null');
    return s?.access_token || SUPABASE_ANON;
  } catch { return SUPABASE_ANON; }
}

async function renderPerdidoFeed() {
  const feed = document.getElementById('perdidoFeed');
  if (!feed) return;

  feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">Cargando...</div>`;

  let data, error;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/perdidos?select=*&order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (e) { error = e; }

  if (error) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:#DC2626;font-size:13px;">Error al cargar reportes. Intenta de nuevo.</div>`;
    return;
  }

  if (!data || data.length === 0) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);"><div style="font-size:32px;margin-bottom:8px;">🔍</div><div style="font-size:13px;">No hay mascotas perdidas reportadas</div></div>`;
    return;
  }

  feed.innerHTML = data.map(p => {
    const ts = new Date(p.created_at);
    const dias = Math.floor((Date.now() - ts.getTime()) / 86400000);
    const horas = Math.max(1, Math.floor((Date.now() - ts.getTime()) / 3600000));
    const tiempo = dias === 0 ? `Hace ${horas}h` : dias === 1 ? 'Ayer' : `Hace ${dias} días`;
    const fechaStr = p.fecha_extravio
      ? new Date(p.fecha_extravio + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })
      : '';
    const FOTOS_DEFAULT_P = [
      '/img/perdido-1.jpg','/img/perdido-2.jpg','/img/perdido-3.jpg',
      '/img/perdido-4.jpg','/img/perdido-5.jpg','/img/perdido-6.jpg',
    ];
    const fotoSrcP = p.foto_url || FOTOS_DEFAULT_P[Math.floor(Math.random() * FOTOS_DEFAULT_P.length)];
    const fotoHtml = `<img src="${escHTMLPerdidos(fotoSrcP)}" alt="" onclick="abrirLightbox('${escHTMLPerdidos(fotoSrcP)}')" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;cursor:pointer;" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:160px;background:linear-gradient(135deg,#FAF0EE,#FEF3E8);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:44px;\\'>${iconMapP[p.especie] || '🐾'}</div>'">`;
    const wspClean = (p.wsp || '').replace(/\D/g, '');
    const tieneWsp = wspClean.length >= 7;
    const tieneLink = !!(p.link || '').trim();
    const linkUrl = tieneLink ? ((p.link.startsWith('http') ? p.link : `https://${p.link}`)) : '';
    const btnWspP = tieneWsp ? `
      <a href="https://wa.me/${encodeURIComponent(wspClean)}" target="_blank" rel="noopener noreferrer"
        style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#25D366;color:white;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;text-decoration:none;">
        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:white;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        Contactar
      </a>` : '';
    const btnLinkP = tieneLink ? `
      <a href="${escHTMLPerdidos(linkUrl)}" target="_blank" rel="noopener noreferrer"
        style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;text-decoration:none;">
        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:none;stroke:white;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        Ver más
      </a>` : '';
    return `<div style="background:var(--surface);border-radius:var(--r);border:1.5px solid rgba(215,137,127,0.25);overflow:hidden;box-shadow:var(--shadow-sm);">
      ${fotoHtml}
      <div style="padding:13px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:100px;background:#FAF0EE;color:#D7897F;">🔍 SE BUSCA</span>
          <span style="font-size:10px;color:var(--text-hint);">${escHTMLPerdidos(tiempo)}</span>
        </div>
        <p style="font-size:13px;color:var(--text);line-height:1.6;margin-bottom:8px;">${escHTMLPerdidos(p.descripcion)}</p>
        <div style="display:flex;flex-direction:column;gap:4px;margin-bottom:11px;font-size:12px;color:var(--text-muted);">
          <div>📍 <strong style="color:var(--text);">Última vez:</strong> ${escHTMLPerdidos(p.ubicacion)}</div>
          ${fechaStr ? `<div>📅 <strong style="color:var(--text);">Perdido el:</strong> ${escHTMLPerdidos(fechaStr)}</div>` : ''}
        </div>
        <div style="display:flex;gap:8px;">
          ${btnWspP}${btnLinkP}
          <button onclick="compartirReporte('perdido','${escHTMLPerdidos(p.id)}')"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;background:var(--purple-light);color:var(--purple);border:none;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;cursor:pointer;">
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Compartir
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

async function renderRescateFeed() {
  const feed = document.getElementById('rescateFeed');
  if (!feed) return;

  feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">Cargando...</div>`;

  let data, error;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rescates?select=*&order=created_at.desc`, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (e) { error = e; }

  if (error) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:#DC2626;font-size:13px;">Error al cargar reportes. Intenta de nuevo.</div>`;
    return;
  }

  if (!data || data.length === 0) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);"><div style="font-size:32px;margin-bottom:8px;">🆘</div><div style="font-size:13px;">No hay reportes de rescate</div></div>`;
    return;
  }

  feed.innerHTML = data.map(p => {
    const ts = new Date(p.created_at);
    const dias = Math.floor((Date.now() - ts.getTime()) / 86400000);
    const horas = Math.max(1, Math.floor((Date.now() - ts.getTime()) / 3600000));
    const tiempo = dias === 0 ? `Hace ${horas}h` : dias === 1 ? 'Ayer' : `Hace ${dias} días`;
    const esRescatado = p.estado === 'rescatado';
    const fotoHtml = p.foto_url
      ? `<img src="${escHTMLPerdidos(p.foto_url)}" alt="" onclick="abrirLightbox('${escHTMLPerdidos(p.foto_url)}')" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;cursor:pointer;${esRescatado ? 'filter:grayscale(0.4);' : ''}">`
      : `<div style="width:100%;height:90px;background:linear-gradient(135deg,#FEF3E8,#FFF8E8);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:44px;">${iconMapP[p.especie] || '🐾'}</div>`;
    const wspRClean = (p.wsp || '').replace(/\D/g, '');
    const tieneWspR = wspRClean.length >= 7;
    const tieneLinkR = !!(p.link || '').trim();
    const linkUrlR = tieneLinkR ? (p.link.startsWith('http') ? p.link : `https://${p.link}`) : '';
    const btnWspR = tieneWspR ? `
      <a href="https://wa.me/${encodeURIComponent(wspRClean)}" target="_blank" rel="noopener noreferrer"
        style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#25D366;color:white;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;text-decoration:none;">
        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:white;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        Contactar
      </a>` : '';
    const btnLinkR = tieneLinkR ? `
      <a href="${escHTMLPerdidos(linkUrlR)}" target="_blank" rel="noopener noreferrer"
        style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;text-decoration:none;">
        <svg viewBox="0 0 24 24" style="width:13px;height:13px;fill:none;stroke:white;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        Ver más
      </a>` : '';
    return `<div style="background:var(--surface);border-radius:var(--r);border:1.5px solid rgba(249,185,92,0.3);overflow:hidden;box-shadow:var(--shadow-sm);">
      ${fotoHtml}
      <div style="padding:13px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="display:flex;gap:6px;align-items:center;">
            <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:100px;background:#FEF3E8;color:#E8A820;">🆘 RESCATE</span>
            <span style="font-size:10px;font-weight:700;padding:3px 9px;border-radius:100px;background:${esRescatado ? '#E6F9F3' : '#FEF3E8'};color:${esRescatado ? '#3DAF87' : '#E8A820'};">${esRescatado ? '✓ Rescatado' : '⏳ Necesita ayuda'}</span>
          </div>
          <span style="font-size:10px;color:var(--text-hint);">${escHTMLPerdidos(tiempo)}</span>
        </div>
        <p style="font-size:13px;color:var(--text);line-height:1.6;margin-bottom:8px;">${escHTMLPerdidos(p.descripcion)}</p>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:11px;">📍 <strong style="color:var(--text);">Se encuentra en:</strong> ${escHTMLPerdidos(p.ubicacion)}</div>
        <div style="display:flex;gap:8px;">
          ${btnWspR}${btnLinkR}
          <button onclick="compartirReporte('rescate','${escHTMLPerdidos(p.id)}')"
            style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:${esRescatado ? 'var(--mint-light)' : '#FEF3E8'};color:${esRescatado ? 'var(--mint-dark)' : '#E8A820'};border:none;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;cursor:pointer;">
            <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            ${esRescatado ? 'Gracias' : 'Difundir'}
          </button>
          ${!esRescatado ? `<button onclick="marcarRescatado('${escHTMLPerdidos(p.id)}')"
            style="flex:1;display:flex;align-items:center;justify-content:center;background:var(--mint-light);color:var(--mint-dark);border:none;border-radius:var(--r-xs);padding:10px;font-size:12px;font-weight:700;cursor:pointer;">✓ Rescatado</button>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

async function compartirReporte(tipo, id) {
  const tabla = tipo === 'perdido' ? 'perdidos' : 'rescates';
  const { data, error } = await db.from(tabla).select('*').eq('id', id).single();
  if (error || !data) return;
  const p = data;
  const espIco = iconMapP[p.especie] || '🐾';
  let texto;
  if (tipo === 'perdido') {
    const fechaStr = p.fecha_extravio
      ? new Date(p.fecha_extravio + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long' })
      : '';
    texto = `${espIco} *SE BUSCA MASCOTA*\n\n${p.descripcion}\n\n📍 Última vez: ${p.ubicacion}${fechaStr ? `\n📅 Perdido el: ${fechaStr}` : ''}\n\n¿La viste? Contactar: ${p.wsp}\n\n_Compartido desde Wufly 🐾_`;
  } else {
    texto = `🆘 *ANIMAL NECESITA RESCATE*\n\n${p.descripcion}\n\n📍 Se encuentra en: ${p.ubicacion}\n\n¿Puedes ayudar? Comparte este mensaje.\n\n_Reportado en Wufly 🐾_`;
  }
  if (navigator.share) {
    navigator.share({ title: tipo === 'perdido' ? 'Mascota perdida' : 'Animal necesita rescate', text: texto });
  } else {
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, '_blank');
  }
}

function renderPerdidos() { renderPerdidoFeed(); }
function renderRescate()  { renderRescateFeed(); }

document.addEventListener('DOMContentLoaded', () => {
  renderPerdidoFeed();
  renderRescateFeed();
});


// ==========================================
// ARCHIVO: js/notificaciones.js
// ==========================================

/* ══ WUFLY — Notificaciones Push ══ */

const VAPID_PUBLIC_KEY = 'BKgfIN8ffRfuVhQ-ebLhvt1zT-bTumBBsHw-pTrYIdwJgjJ217jGNk3zD9-ycbjfKwQ-awzb2G1lOVWqOLBXM50';
const PUSH_WORKER_URL  = 'https://wufly-push.pablo77tapia.workers.dev';

function _vapidKey() {
  const b = (VAPID_PUBLIC_KEY + '='.repeat((4 - VAPID_PUBLIC_KEY.length % 4) % 4))
    .replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(b), c => c.charCodeAt(0));
}

/* Muestra un toast con botón "Activar" antes de pedir permiso al browser */
function _mostrarToastNotificaciones() {
  if (document.getElementById('pushToast')) return;
  const toast = document.createElement('div');
  toast.id = 'pushToast';
  toast.style.cssText = `
    position:fixed;bottom:80px;left:50%;transform:translateX(-50%);
    background:#2D1B6B;color:white;border-radius:14px;
    padding:13px 16px;font-size:13px;font-family:'Plus Jakarta Sans',sans-serif;
    display:flex;align-items:center;gap:12px;z-index:9000;
    box-shadow:0 4px 24px rgba(0,0,0,0.25);max-width:320px;width:calc(100% - 40px);
    animation:toast-in 0.3s cubic-bezier(0.34,1.46,0.64,1);
  `;
  toast.innerHTML = `
    <span style="font-size:22px;flex-shrink:0;">🔔</span>
    <span style="flex:1;line-height:1.4;">Activa notificaciones para saber cuándo alguien pierde una mascota</span>
    <button onclick="activarNotificaciones()" style="background:var(--purple);color:white;border:none;border-radius:8px;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;font-family:'Plus Jakarta Sans',sans-serif;">Activar</button>
    <button onclick="cerrarToastPush()" style="background:none;border:none;color:rgba(255,255,255,0.6);font-size:18px;cursor:pointer;padding:0;line-height:1;">✕</button>
  `;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes toast-in{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`;
  document.head.appendChild(style);
}

function cerrarToastPush() {
  const t = document.getElementById('pushToast');
  if (t) t.remove();
  localStorage.setItem('wufly_push_asked', '1');
}

async function activarNotificaciones() {
  cerrarToastPush();
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    localStorage.setItem('wufly_push_asked', '1');
    return;
  }

  try {
    const reg = await navigator.serviceWorker.ready;
    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: _vapidKey(),
      });
    }
    // Incluir user_id para poder enviar push dirigido (Encuentro Canino)
    const subData = sub.toJSON();
    const userId  = (typeof currentUser !== 'undefined' && currentUser?.id) ? currentUser.id : null;
    await fetch(`${PUSH_WORKER_URL}/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...subData, user_id: userId }),
    });
    localStorage.setItem('wufly_push_subscribed', '1');
  } catch (e) {
    console.warn('[push] suscripción fallida', e);
  }
}

/* Llamar cuando el usuario entra a la pestaña Perdidos */
function checkPushPermiso() {
  if (!('PushManager' in window)) return;
  if (localStorage.getItem('wufly_push_asked'))    return;
  if (localStorage.getItem('wufly_push_subscribed')) return;
  if (Notification.permission === 'denied')         return;
  setTimeout(_mostrarToastNotificaciones, 1200);
}

/* Llamar después de publicar una mascota perdida con éxito */
async function notificarMascotaPerdida(descripcion, ubicacion) {
  try {
    await fetch(`${PUSH_WORKER_URL}/push`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        payload: {
          title: '🔍 Mascota perdida cerca',
          body:  `${descripcion.slice(0, 90)}${descripcion.length > 90 ? '…' : ''} — 📍 ${ubicacion}`,
          icon:  '/img/icono.png',
          badge: '/img/icon-192.svg',
          url:   '/?tab=comunidad',
        }
      }),
    });
  } catch {}
}


// ==========================================
// ARCHIVO: js/adoptar.js
// ==========================================

let adoptFilter = 'todos';
let adoptFile = null;

function escHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function _sbToken() {
  try {
    const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
    const s = JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null');
    return s?.access_token || SUPABASE_ANON;
  } catch { return SUPABASE_ANON; }
}

async function renderAdopFeed() {
  const feed = document.getElementById('adoptFeed');
  if (!feed) return;

  feed.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text-muted);font-size:13px;">Cargando...</div>`;

  let url = `${SUPABASE_URL}/rest/v1/adopciones?select=*&order=created_at.desc`;
  if (adoptFilter !== 'todos') url += `&especie=eq.${adoptFilter}`;

  let data, error;
  try {
    const res = await fetch(url, {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${_sbToken()}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (e) {
    error = e;
  }

  if (error) {
    feed.innerHTML = `<div style="text-align:center;padding:30px;color:#DC2626;font-size:13px;">Error al cargar publicaciones. Intenta de nuevo.</div>`;
    return;
  }

  if (!data || data.length === 0) {
    feed.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
        <div style="font-size:36px;margin-bottom:8px;">🐾</div>
        <div style="font-size:14px;font-weight:600;margin-bottom:4px;">No hay publicaciones</div>
        <div style="font-size:12px;">¡Sé el primero en publicar!</div>
      </div>`;
    return;
  }

  const iconMap = { perro: '🐕', gato: '🐈', otro: '🐾' };

  feed.innerHTML = data.map(a => {
    const ts = new Date(a.created_at);
    const diasAtras = Math.floor((Date.now() - ts.getTime()) / 86400000);
    const fechaStr = diasAtras === 0 ? 'Hoy' : diasAtras === 1 ? 'Ayer' : `Hace ${diasAtras} días`;
    const FOTOS_DEFAULT = [
      '/img/adopcion-1.jpg','/img/adopcion-2.jpg','/img/adopcion-3.jpg',
      '/img/adopcion-4.jpg','/img/adopcion-5.jpg','/img/adopcion-6.jpg',
    ];
    const fotoSrc = a.foto_url || FOTOS_DEFAULT[Math.floor(Math.random() * FOTOS_DEFAULT.length)];
    const fotoHtml = `<img src="${escHTML(fotoSrc)}" alt="${escHTML(a.nombre)}" onclick="abrirLightbox('${escHTML(fotoSrc)}')" style="width:100%;height:160px;object-fit:cover;border-radius:12px 12px 0 0;cursor:pointer;" onerror="this.parentElement.innerHTML='<div style=\\'width:100%;height:160px;background:var(--purple-light);border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;font-size:52px;\\'>${iconMap[a.especie] || '🐾'}</div>'">`;
    const wspClean = (a.wsp || '').replace(/\D/g, '');
    const tieneWsp = wspClean.length >= 7;
    const tieneLink = !!(a.link || '').trim();
    const linkUrl = tieneLink ? (a.link.startsWith('http') ? a.link : `https://${a.link}`) : '';
    const hasDos = tieneWsp && tieneLink;
    const btnWsp = tieneWsp ? `
      <a href="https://wa.me/${encodeURIComponent(wspClean)}" target="_blank" rel="noopener noreferrer"
         style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:#25D366;color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;">
        <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:white;flex-shrink:0;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        WhatsApp
      </a>` : '';
    const btnLink = tieneLink ? `
      <a href="${escHTML(linkUrl)}" target="_blank" rel="noopener noreferrer"
         style="flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:11px;font-size:13px;font-weight:700;text-decoration:none;">
        <svg viewBox="0 0 24 24" style="width:15px;height:15px;fill:none;stroke:white;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
        Ver más
      </a>` : '';
    return `
      <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);overflow:hidden;box-shadow:var(--shadow-sm);">
        ${fotoHtml}
        <div style="padding:14px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${escHTML(a.nombre)}</div>
            <span style="font-size:10px;color:var(--text-hint);">${escHTML(fechaStr)}</span>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:10px;">
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${iconMap[a.especie] || '🐾'} ${escHTML((a.especie||'').charAt(0).toUpperCase()+(a.especie||'').slice(1))}</span>
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--mint-light);color:var(--mint-dark);">${escHTML(a.edad)}</span>
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:var(--purple-light);color:var(--purple);">${escHTML(a.tamano)}</span>
            <span style="font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:rgba(0,0,0,0.05);color:var(--text-muted);">📍 ${escHTML(a.ciudad)}</span>
          </div>
          <p style="font-size:13px;color:var(--text-muted);line-height:1.55;margin-bottom:12px;">${escHTML(a.descripcion)}</p>
          <div style="display:flex;gap:8px;">${btnWsp}${btnLink}</div>
        </div>
      </div>`;
  }).join('');
}

function setFilterAdopcion(el, val) {
  adoptFilter = val;
  document.querySelectorAll('#csub-adoptar .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderAdopFeed();
}

function mostrarFormAdopcion() {
  document.getElementById('formAdopcion').style.display = 'block';
  document.getElementById('btnPublicar').style.display = 'none';
  document.getElementById('formAdopcion').scrollIntoView({ behavior: 'smooth' });

  const zone = document.getElementById('adoptUploadZone');
  const input = document.getElementById('adoptFileInput');
  zone.onclick = () => input.click();
  input.onchange = function(e) {
    const f = e.target.files[0];
    if (!f) return;
    adoptFile = f;
    const img = document.getElementById('adoptPreviewImg');
    img.src = URL.createObjectURL(f);
    img.style.display = 'block';
    const p = zone.querySelector('p');
    if (p) p.textContent = 'Toca para cambiar';
  };
}

function ocultarFormAdopcion() {
  document.getElementById('formAdopcion').style.display = 'none';
  document.getElementById('btnPublicar').style.display = 'flex';
  adoptFile = null;
}

async function publicarAdopcion() {
  if (!currentUser) { abrirAuthModal('login'); return; }

  const nombre = document.getElementById('adoptNombre').value.trim();
  const wsp    = document.getElementById('adoptWsp').value.trim();
  const rawLink = document.getElementById('adoptLink').value.trim();
  const link = rawLink && !rawLink.startsWith('http') ? `https://${rawLink}` : rawLink;

  if (!nombre || nombre.length < 2) { alert('Por favor ingresa el nombre de la mascota (mínimo 2 caracteres).'); return; }
  if (!wsp && !link) { alert('Ingresa al menos un contacto: número de WhatsApp o un link.'); return; }
  if (wsp && wsp.replace(/\D/g, '').length < 7) {
    alert('El número de WhatsApp no es válido, ej: +56912345678'); return;
  }

  const btn = document.getElementById('adoptBtnPublicar');
  if (btn) { btn.disabled = true; btn.textContent = 'Publicando...'; }

  const _timeout = ms => new Promise((_, r) => setTimeout(() => r(new Error('Sin respuesta del servidor')), ms));

  let foto_url = null;
  if (adoptFile) {
    try { foto_url = await Promise.race([subirFotoComunidad(adoptFile, 'adopciones'), _timeout(10000)]); }
    catch { /* continuar sin foto */ }
  }

  const payload = {
    user_id:     currentUser?.id || null,
    nombre,
    especie:     document.getElementById('adoptEspecie').value,
    edad:        document.getElementById('adoptEdad').value,
    tamano:      document.getElementById('adoptTamano').value,
    descripcion: document.getElementById('adoptDesc').value.trim() || 'Mascota en busca de un hogar lleno de amor.',
    wsp:         wsp || '',
    link:        link || '',
    ciudad:      document.getElementById('adoptCiudad').value,
    foto_url,
  };

  // Leer token desde localStorage sin hacer llamada de red
  let token = SUPABASE_ANON;
  try {
    const ref = SUPABASE_URL.replace('https://', '').split('.')[0];
    const stored = JSON.parse(localStorage.getItem(`sb-${ref}-auth-token`) || 'null');
    if (stored?.access_token) token = stored.access_token;
  } catch {}

  console.log('[adoptar] payload:', JSON.stringify(payload));

  let error;
  try {
    const res = await Promise.race([
      fetch(`${SUPABASE_URL}/rest/v1/adopciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON,
          'Authorization': `Bearer ${token}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(payload),
      }),
      _timeout(10000),
    ]);
    if (!res.ok) {
      const txt = await res.text();
      let msg = `HTTP ${res.status}`;
      try { const j = JSON.parse(txt); msg += ': ' + (j.message || j.hint || j.details || txt); }
      catch { msg += ': ' + txt; }
      error = new Error(msg);
    }
  } catch (e) { error = e; }

  if (btn) { btn.disabled = false; btn.textContent = 'Publicar'; }

  if (error) { console.error('[adoptar] error completo:', error); alert('Error al publicar: ' + error.message); return; }

  ocultarFormAdopcion();
  document.getElementById('adoptNombre').value = '';
  document.getElementById('adoptDesc').value = '';
  document.getElementById('adoptWsp').value = '';
  document.getElementById('adoptLink').value = '';
  const prev = document.getElementById('adoptPreviewImg');
  if (prev) { prev.style.display = 'none'; prev.src = ''; }
  adoptFile = null;
  setTimeout(() => renderAdopFeed(), 800);
}

function renderAdoptar() { renderAdopFeed(); }

function abrirLightbox(url) {
  const lb = document.getElementById('photoLightbox');
  const img = document.getElementById('photoLightboxImg');
  if (!lb || !img) return;
  img.src = url;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('lb-active')));
}

function cerrarLightbox() {
  const lb = document.getElementById('photoLightbox');
  if (!lb) return;
  lb.classList.remove('lb-active');
  setTimeout(() => {
    lb.style.display = 'none';
    document.getElementById('photoLightboxImg').src = '';
    document.body.style.overflow = '';
  }, 400);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarLightbox(); });

document.addEventListener('DOMContentLoaded', () => { renderAdopFeed(); });


// ==========================================
// ARCHIVO: js/tiendas-destacadas.js
// ==========================================

/* ══════════════════════════════════════════════════════════════
   TIENDAS DESTACADAS — Wufly
   Sistema multi-región: detecta por GPS y carga las tiendas
   de la región más cercana.
   ══════════════════════════════════════════════════════════════ */

/* ── Región de Coquimbo (IV) — Capital: La Serena ── */
const TIENDAS_LASERENA = [
  {
    id: 'cancatmarket-serena',
    nombre: 'Can Cat Market',
    subtitulo: 'Alimentos premium · Accesorios · Snacks',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'La Serena',
    direccion: 'La Serena (envíos gratis en La Serena y Coquimbo)',
    telefono: '+56 9 8328 3627',
    whatsapp: '56983283627',
    web: 'cancatmarket.cl',
    horario: 'Lun–Vie 10–20h · Sáb 11–16h',
    descripcion: 'Tienda especializada en alimentos premium para perros y gatos en La Serena. Amplio catálogo, snacks, accesorios y envíos gratis en La Serena y Coquimbo.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Snacks', 'Envío gratis', 'Perros y gatos'],
    bannerImg: '', lat: -29.90700, lng: -71.24900,
  },
  {
    id: 'memipetshop-serena',
    nombre: 'Memi Pet Shop',
    subtitulo: 'Alimentos · Accesorios · Envío a domicilio',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'La Serena',
    direccion: 'La Serena',
    telefono: '',
    whatsapp: '',
    web: 'memipetshop.cl',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Pet shop online y físico en La Serena y Coquimbo. Alimentos de calidad, accesorios y despacho a domicilio de lunes a sábado por compras sobre $15.000.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Accesorios', 'Despacho a domicilio', 'La Serena', 'Coquimbo'],
    bannerImg: '', lat: -29.91200, lng: -71.25300,
  },
  {
    id: 'decoralia-serena',
    nombre: 'Decoralia Pet Shop',
    subtitulo: 'Mascotas · Accesorios · Farmacia veterinaria',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'La Serena',
    direccion: 'Calle O\'Higgins 650, La Serena',
    telefono: '+56 51 2225437',
    whatsapp: '',
    web: '',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Tienda de mascotas en el centro de La Serena. Alimentos, accesorios, farmacia veterinaria básica y artículos para todo tipo de mascotas.',
    rating: 4.4, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Accesorios', 'Farmacia veterinaria', 'Alimentos', 'Centro'],
    bannerImg: '', lat: -29.90600, lng: -71.25400,
  },
];

/* ── Región de Valparaíso (V) — Capital: Valparaíso / Viña del Mar ── */
const TIENDAS_DESTACADAS = [
  {
    id: 'petslife-vit',
    nombre: 'PetsLife',
    subtitulo: 'Alimentos premium · Accesorios · Peluquería',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Viña del Mar',
    direccion: 'Av. Libertad 1198, Viña del Mar',
    telefono: '+56 9 6631 7573',
    whatsapp: '56966317573',
    web: '',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Pet shop con múltiples sucursales en Viña del Mar. Alimentos premium, accesorios, higiene y peluquería canina. Atención personalizada y asesoría en nutrición.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Peluquería canina', 'Higiene', 'Nutrición'],
    bannerImg: '/img/banner-petslife.png', lat: null, lng: null,
  },
  {
    id: 'infopet-vit',
    nombre: 'InfoPet Reñaca',
    subtitulo: 'Nutrición · Grooming · Juguetes',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Reñaca, Viña del Mar',
    direccion: 'Eluchans 1737 Local 6, Reñaca, Viña del Mar',
    telefono: '+56 9 9760 0367',
    whatsapp: '56997600367',
    web: '',
    horario: 'Lun–Sáb 11–20h',
    descripcion: 'Tienda especializada en nutrición y accesorios para mascotas en Reñaca. Alimentos de marcas premium, higiene, juguetes y servicio de grooming.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Grooming', 'Juguetes', 'Higiene', 'Marcas premium'],
    bannerImg: '/img/banner-infopet.png', lat: null, lng: null,
  },
  {
    id: 'petzonas-vit',
    nombre: 'Petzonas',
    subtitulo: 'Alimentos · Grooming · Accesorios',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Concón',
    direccion: 'Av. Concón-Reñaca 44, Concón',
    telefono: '+56 9 3078 8923',
    whatsapp: '56930788923',
    web: '',
    horario: 'Lun–Vie 9:30–20h',
    descripcion: 'Centro de productos y cuidado para mascotas en Concón. Alimentos de primeras marcas, accesorios, higiene y servicio de grooming.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Grooming', 'Accesorios', 'Higiene', 'Primeras marcas'],
    bannerImg: '/img/banner-petzonas.png', lat: null, lng: null,
  },
];

/* ── Región Metropolitana (XIII) — Capital: Santiago ── */
const TIENDAS_SANTIAGO = [
  {
    id: 'fonomascotas-stgo',
    nombre: 'Fonomascotas',
    subtitulo: 'Alimentos premium · Accesorios · Peluquería',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Providencia',
    direccion: 'Av. Francisco Bilbao 2016, Providencia, Santiago',
    telefono: '+56 2 2225 6524',
    whatsapp: '',
    web: 'fonomascotas.cl',
    horario: 'Lun–Sáb 10–20h',
    descripcion: 'Tienda con veterinaria y peluquería integradas en Providencia. Amplio stock de alimentos premium y accesorios para perros y gatos.',
    rating: 4.5, reviews: 88,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Peluquería', 'Veterinaria'],
    bannerImg: '', lat: -33.43630, lng: -70.62180,
  },
  {
    id: 'europet-stgo',
    nombre: 'Europet',
    subtitulo: 'Alimentos premium · Acana · Orijen · Brit Care',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Las Condes',
    direccion: 'Eduardo Castillo Velasco, Las Condes, Santiago',
    telefono: '',
    whatsapp: '',
    web: 'europet.cl',
    horario: 'Lun–Sáb 10–20h',
    descripcion: 'Especialistas en alimentos premium: Acana, Orijen, Brit Care y más. Entrega el mismo día en 8 comunas. Envío gratis en toda la Región Metropolitana.',
    rating: 4.7, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Acana', 'Orijen', 'Brit Care', 'Alimentos premium', 'Despacho rápido'],
    bannerImg: '', lat: -33.41200, lng: -70.57800,
  },
  {
    id: 'superzoo-stgo',
    nombre: 'SuperZoo',
    subtitulo: 'Alimentos · Accesorios · Royal Canin · Hills',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Independencia',
    direccion: 'Av. Fermín Vivaceta 1030, Local 7, Independencia',
    telefono: '',
    whatsapp: '',
    web: 'superzoo.cl',
    horario: 'Lun–Vie 9–20h · Sáb 10–18h',
    descripcion: 'Una de las tiendas más completas de Santiago. Royal Canin, Hills, ProPlan y más. Accesorios, juguetes, higiene y productos para todo tipo de mascotas.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Royal Canin', 'Hills', 'ProPlan', 'Accesorios', 'Juguetes'],
    bannerImg: '', lat: -33.41580, lng: -70.66520,
  },
];

/* ── Región de O'Higgins (VI) — Capital: Rancagua ── */
const TIENDAS_RANCAGUA = [
  {
    id: 'animania-rancagua',
    nombre: 'Animania',
    subtitulo: 'Alimentos súper premium · Farmacia · Despacho',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Rancagua',
    direccion: 'Av. Illanes 384, Rancagua',
    telefono: '',
    whatsapp: '',
    web: 'animania.cl',
    horario: 'Lun–Sáb 9:30–19:30h',
    descripcion: 'Tienda de mascotas en Rancagua con alimentos súper premium, accesorios, farmacia veterinaria básica y despacho a domicilio. También semillería e insecticidas.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos súper premium', 'Farmacia veterinaria', 'Accesorios', 'Despacho'],
    bannerImg: '', lat: -34.17000, lng: -70.74500,
  },
  {
    id: 'supermascota-rancagua',
    nombre: 'Supermercado de la Mascota',
    subtitulo: 'Alimentos · Snacks · Remedios · Juguetes',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Rancagua',
    direccion: 'Pasaje Lirima 2360, Villa Alameda, Rancagua',
    telefono: '',
    whatsapp: '',
    web: 'supermercadodelamascota.cl',
    horario: 'Lun–Sáb 10–20h',
    descripcion: 'Tienda online y física en Rancagua. Alimentos, snacks, remedios, accesorios, juguetes y ropa para perros, gatos, conejos, aves y más mascotas.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Snacks', 'Remedios', 'Juguetes', 'Ropa'],
    bannerImg: '', lat: -34.16200, lng: -70.73800,
  },
  {
    id: 'petfamily-rancagua',
    nombre: 'Pet Family',
    subtitulo: 'Alimentos premium · Accesorios · Distribución',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Rancagua',
    direccion: 'Av. Valparaíso 1414, Rancagua Sur',
    telefono: '',
    whatsapp: '',
    web: 'petfamilyweb.com',
    horario: 'Lun–Sáb 9–19h',
    descripcion: 'Punto de venta Pet Family en Rancagua. Alimentos premium y accesorios para mascotas con distribución regional.',
    rating: 4.4, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos premium', 'Accesorios', 'Distribución regional'],
    bannerImg: '', lat: -34.17800, lng: -70.74800,
  },
];

/* ── Región del Bío-Bío (VIII) — Capital: Concepción ── */
const TIENDAS_CONCEPCION = [
  {
    id: 'premiumpet-conce',
    nombre: 'Premium Pet Concepción',
    subtitulo: 'Alimentos · Accesorios · Antiparasitarios · Despacho',
    grad: 'linear-gradient(135deg,#B45309,#F59E0B)',
    icon: '🐾',
    ciudad: 'Concepción',
    direccion: 'Maipú 935, Concepción',
    telefono: '+56 9 3105 6709',
    whatsapp: '56931056709',
    web: '',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Tienda de mascotas en Concepción. Alimentos para perros y gatos, accesorios, pipetas, antiparasitarios y arena sanitaria. Reparto a domicilio disponible.',
    rating: 4.6, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Accesorios', 'Antiparasitarios', 'Domicilio'],
    bannerImg: '', lat: -36.82500, lng: -73.05200,
  },
  {
    id: 'arcadenoe-conce',
    nombre: 'El Arca de Noé',
    subtitulo: 'Alimentos · Accesorios · Despacho gratis Gran Conce',
    grad: 'linear-gradient(135deg,#0F766E,#14B8A6)',
    icon: '🐕',
    ciudad: 'Concepción',
    direccion: 'Concepción (despacho en Gran Concepción)',
    telefono: '',
    whatsapp: '',
    web: 'elarcadenoe.cl',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Tienda de mascotas con despacho gratis desde $14.990 en Concepción, Talcahuano, Hualpén, San Pedro de la Paz, Chiguayante, Penco, Tomé y más.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Accesorios', 'Despacho gratis', 'Gran Concepción'],
    bannerImg: '', lat: -36.82000, lng: -73.04800,
  },
  {
    id: 'biopetshop-conce',
    nombre: 'Bio Pet Shop',
    subtitulo: 'Alimentos · Snacks · Accesorios · Juguetes',
    grad: 'linear-gradient(135deg,#1E3A8A,#3B82F6)',
    icon: '🏬',
    ciudad: 'Concepción',
    direccion: 'Concepción',
    telefono: '',
    whatsapp: '',
    web: 'biopetshop.cl',
    horario: 'Lun–Sáb 10–19h',
    descripcion: 'Pet shop en Concepción. Alimentos, snacks, premios, accesorios, juguetes, camas, artículos de limpieza y ropa para perros y gatos.',
    rating: 4.5, reviews: 0,
    fotos: [], equipo: [],
    tags: ['Alimentos', 'Snacks', 'Juguetes', 'Accesorios', 'Ropa'],
    bannerImg: '', lat: -36.83000, lng: -73.05000,
  },
];

/* ══════════════════════════════════════════════════════════════
   MAPA DE REGIONES
   ══════════════════════════════════════════════════════════════ */
const REGIONES_TIENDAS = [
  { nombre: 'Coquimbo',      tiendas: TIENDAS_LASERENA,   lat: { min: -31.5, max: -29.0 }, lng: { min: -72.5, max: -69.5 } },
  { nombre: 'Valparaíso',    tiendas: TIENDAS_DESTACADAS, lat: { min: -33.7, max: -32.0 }, lng: { min: -72.0, max: -70.0 } },
  { nombre: 'Metropolitana', tiendas: TIENDAS_SANTIAGO,   lat: { min: -34.4, max: -32.9 }, lng: { min: -71.5, max: -69.8 } },
  { nombre: "O'Higgins",     tiendas: TIENDAS_RANCAGUA,   lat: { min: -35.2, max: -33.8 }, lng: { min: -72.0, max: -70.0 } },
  { nombre: 'Bío-Bío',       tiendas: TIENDAS_CONCEPCION, lat: { min: -38.5, max: -36.0 }, lng: { min: -74.0, max: -71.0 } },
];

/* ══════════════════════════════════════════════════════════════
   DETECCIÓN DE REGIÓN
   ══════════════════════════════════════════════════════════════ */
let _tiendasActivas = null;

function _detectarTiendasPorCoords(lat, lng) {
  for (const region of REGIONES_TIENDAS) {
    if (lat >= region.lat.min && lat <= region.lat.max &&
        lng >= region.lng.min && lng <= region.lng.max) {
      return region.tiendas;
    }
  }
  return null;
}

async function _detectarRegionYCargarTiendas() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const tiendas = _detectarTiendasPorCoords(lat, lng);
        _tiendasActivas = tiendas;
        resolve(tiendas); // null si fuera de cobertura (banner lo maneja clinicas.js)
      },
      () => resolve(null),
      { timeout: 5000, maximumAge: 3600000 }
    );
  });
}

function getTiendasActivas() {
  return _tiendasActivas;
}


// ==========================================
// ARCHIVO: js/tiendas.js
// ==========================================

/* ══════════════════════════════════════
   TIENDAS — Wufly
   3 tiendas destacadas fijas + resultados geo cercanos
   ══════════════════════════════════════ */

/* ══ RENDER PRINCIPAL ══ */
function renderTiendas() {
  const list = document.getElementById('tiendaList');
  if (!list) return;

  const geoDisponible = typeof geoResults !== 'undefined' && geoResults.tiendas?.length > 0;
  const geoLoading    = typeof geoStatus  !== 'undefined' && geoStatus === 'loading';
  const q = (document.getElementById('searchTiendas')?.value || '').toLowerCase();

  /* ── Buscador ── */
  const searchBar = `
    <div class="search-bar oculto" style="margin-bottom:12px;">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input type="text" placeholder="Buscar tienda, producto..." id="searchTiendas"
        oninput="onSearchTiendas()" aria-label="Buscar tienda de mascotas">
    </div>`;

  /* ── 3 tiendas destacadas (siempre fijas) ── */
  const destacadasFiltradas = (TIENDAS_DESTACADAS || []).filter(t => {
    if (!q) return true;
    return (t.nombre + t.subtitulo + t.descripcion + (t.tags||[]).join(' ')).toLowerCase().includes(q);
  });

  const vitrinaHtml = destacadasFiltradas.length > 0
    ? `<div style="font-size:11px;font-weight:700;color:var(--purple);letter-spacing:0.07em;padding:0 2px 10px;">TIENDAS DESTACADAS</div>
       ${destacadasFiltradas.map(_renderTiendaDestacada).join('')}`
    : '';

  /* ── Loading spinner geo ── */
  const loadingHtml = geoLoading ? `
    <div style="display:flex;align-items:center;gap:12px;padding:18px;background:var(--purple-light);border-radius:14px;margin-bottom:16px;">
      <div style="width:20px;height:20px;border:3px solid rgba(124,77,204,0.25);border-top-color:var(--purple);border-radius:50%;animation:geoSpin 0.8s linear infinite;flex-shrink:0;"></div>
      <div>
        <div style="font-size:13px;font-weight:700;color:var(--purple);">Buscando tiendas cerca de ti…</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:1px;">Obteniendo tu ubicación</div>
      </div>
    </div>` : '';

  /* ── Resultados geo o estado vacío ── */
  let geoHtml = '';
  if (!geoLoading) {
    if (geoDisponible) {
      const geoFiltradas = geoResults.tiendas.filter(t => {
        if (!q) return true;
        return ((t.nombre || t.name) + (t.desc||'')).toLowerCase().includes(q);
      });
      geoHtml = geoFiltradas.length > 0
        ? `<div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;padding:16px 0 10px;">
             📍 TIENDAS CERCANAS
           </div>
           ${geoFiltradas.map(_renderTiendaGeo).join('')}`
        : `<div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
             <div style="font-size:32px;margin-bottom:10px;">🔍</div>
             <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">Sin resultados para tu búsqueda</div>
             <div style="font-size:13px;color:var(--text-muted);">Prueba con otro término</div>
           </div>`;
    } else {
      const yaIntento = typeof geoStatus !== 'undefined' && (geoStatus === 'ok' || geoStatus === 'error' || geoStatus === 'denied');
      geoHtml = `
        <div style="text-align:center;padding:28px 16px;background:var(--surface);border-radius:16px;margin-top:16px;border:1.5px solid var(--border-md);">
          <div style="font-size:36px;margin-bottom:10px;">${yaIntento ? '😕' : '📍'}</div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
            ${yaIntento ? 'No se encontraron tiendas cercanas' : 'Encuentra tiendas cerca de ti'}
          </div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;line-height:1.5;">
            ${yaIntento
              ? 'No encontramos pet shops en tu zona. Puedes intentarlo nuevamente.'
              : 'Activa tu ubicación para ver las tiendas más cercanas a donde estás.'}
          </div>
          <button onclick="activarBusquedaTiendas()"
            style="padding:12px 24px;background:var(--purple);border:none;border-radius:12px;
              font-size:14px;font-weight:700;color:white;cursor:pointer;
              font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 14px rgba(92,47,168,0.3);">
            ${yaIntento ? '🔄 Intenta nuevamente' : '📍 Ver tiendas cercanas'}
          </button>
        </div>`;
    }
  }

  list.innerHTML = searchBar + vitrinaHtml + loadingHtml + geoHtml;
}

/* ── Búsqueda por texto ── */
function onSearchTiendas() {
  renderTiendas();
}

/* ── Card tienda destacada (vitrina) ── */
function _renderTiendaDestacada(t) {
  const imgSrc = t.bannerImg || null;
  return `
    <div onclick="openTiendaDetalle('${t.id}')"
      style="border-radius:20px;overflow:hidden;cursor:pointer;margin-bottom:14px;
             box-shadow:0 8px 28px rgba(0,0,0,0.22);position:relative;">

      ${imgSrc
        ? `<div class="fto-tienda" style="position:relative;overflow:hidden;background:transparent;">
             <img src="${imgSrc}" alt="${t.nombre}"
               style="width:100%;height:100%;object-fit:cover;display:block;"
               onerror="this.style.display='none'">
           </div>`
        : `<div style="height:130px;background:transparent;display:flex;align-items:center;justify-content:center;">
             <div style="font-size:48px;opacity:0.9;">${t.icon}</div>
           </div>`
      }
      <div style="background:white;padding:14px 16px 16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:17px;
            color:var(--text);line-height:1.2;">${t.nombre}</div>
          <div style="font-size:11px;font-weight:700;color:white;background:${t.grad};
            padding:4px 10px;border-radius:100px;white-space:nowrap;">Entrar</div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">${t.subtitulo}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">
          ${t.tags.slice(0,3).map(tag =>
            `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
              font-weight:600;padding:3px 9px;border-radius:100px;">${tag}</span>`
          ).join('')}
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;">📍 ${t.ciudad}</div>
      </div>
    </div>`;
}

/* ── Card para resultados geo (OpenStreetMap) ── */
function _renderTiendaGeo(t) {
  const distBadge = t.distKm != null && t.distKm < 100
    ? `<span style="background:var(--purple-light);color:var(--purple);font-size:10px;
        font-weight:700;padding:2px 8px;border-radius:100px;margin-bottom:5px;
        display:inline-block;">📍 ${fmtDist(t.distKm)}</span><br>`
    : '';
  const mapLink = t.lat && t.lng
    ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}"
         target="_blank" rel="noopener"
         style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;
           font-size:12px;color:var(--purple);font-weight:700;text-decoration:none;"
         onclick="event.stopPropagation()">🗺 Cómo llegar</a>`
    : '';
  return `
    <div class="place-card">
      <div class="place-card-inner">
        <div class="place-icon" style="background:var(--bg);">${t.icon || '🛒'}</div>
        <div class="place-info">
          ${distBadge}
          <div class="place-name">${t.nombre || t.name}</div>
          <div class="place-desc">${t.desc || ''}</div>
          <div class="place-footer">
            <span class="place-address">📍 ${t.address || '—'}</span>
            ${t.tel ? `<a href="tel:${t.tel}" class="place-tel" onclick="event.stopPropagation()">${t.tel}</a>` : ''}
          </div>
          ${mapLink}
        </div>
      </div>
    </div>`;
}

/* ── Disparar búsqueda geo ── */
function activarBusquedaTiendas() {
  if (typeof iniciarGeoBusqueda === 'function') {
    iniciarGeoBusqueda(true).then(() => renderTiendas());
  }
  renderTiendas();
}

/* ══ VISTA DE DETALLE — tiendas vitrina ══ */
function openTiendaDetalle(id) {
  const t = (TIENDAS_DESTACADAS || []).find(x => x.id === id);
  if (!t) return;

  const stars = t.rating
    ? `${'★'.repeat(Math.round(t.rating))}${'☆'.repeat(5 - Math.round(t.rating))}`
    : '';

  const fotosHtml = t.fotos?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">FOTOS</div>
      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;">
        ${t.fotos.map(url =>
          `<img src="${url}" alt="foto tienda" style="height:120px;width:160px;object-fit:cover;border-radius:10px;flex-shrink:0;">`
        ).join('')}
      </div>
    </div>` : '';

  const equipoHtml = t.equipo?.length > 0 ? `
    <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
      <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">EQUIPO</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${t.equipo.map(m => `
          <div style="display:flex;align-items:center;gap:12px;">
            ${m.foto
              ? `<img src="${m.foto}" alt="${m.nombre}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
              : `<div style="width:44px;height:44px;border-radius:50%;background:var(--purple-light);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏪</div>`}
            <div>
              <div style="font-size:14px;font-weight:700;color:var(--text);">${m.nombre}</div>
              <div style="font-size:12px;color:var(--text-muted);">${m.rol}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const ctaHtml = [
    t.whatsapp
      ? `<a href="https://wa.me/${t.whatsapp}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:#25D366;border-radius:12px;color:white;
             font-size:13px;font-weight:700;text-decoration:none;">💬 WhatsApp</a>` : '',
    t.lat && t.lng
      ? `<a href="https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}"
           target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--purple-light);border-radius:12px;
             color:var(--purple);font-size:13px;font-weight:700;text-decoration:none;">🗺 Cómo llegar</a>` : '',
    t.web
      ? `<a href="https://${t.web}" target="_blank" rel="noopener"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">🌐 Sitio web</a>` : '',
    t.telefono
      ? `<a href="tel:${t.telefono}"
           style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;
             padding:13px 10px;background:var(--bg);border-radius:12px;
             color:var(--text);font-size:13px;font-weight:700;text-decoration:none;
             border:1.5px solid var(--border-md);">📞 Llamar</a>` : '',
  ].filter(Boolean).join('');

  const detailEl = document.getElementById('page-detail');
  if (!detailEl) return;

  detailEl.innerHTML = `
    <div>
      <div style="background:${t.grad};padding:0 0 24px;position:relative;">
        <div style="padding:16px 16px 0;">
          <button onclick="switchTab('restaurantes');switchServiciosTab('tiendas')"
            style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.2);
              border:none;border-radius:100px;padding:8px 14px;color:white;font-size:13px;
              font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;
              backdrop-filter:blur(4px);">← Volver a Tiendas</button>
        </div>
        <div style="padding:20px 20px 0;text-align:center;">
          <div style="font-size:52px;margin-bottom:10px;line-height:1;">${t.icon}</div>
          <div style="display:inline-flex;align-items:center;gap:4px;
            background:rgba(255,255,255,0.22);border-radius:100px;padding:4px 12px;
            font-size:11px;font-weight:700;color:white;margin-bottom:10px;">⭐ Vitrina Wufly</div><br>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:24px;
            color:white;margin-bottom:4px;line-height:1.2;">${t.nombre}</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.78);font-weight:600;
            letter-spacing:0.04em;margin-bottom:10px;text-transform:uppercase;">${t.subtitulo}</div>
          ${t.rating ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);font-weight:600;">
            ${stars}${t.reviews ? ` <span style="font-size:13px;">${t.rating} (${t.reviews} reseñas)</span>` : ` <span style="font-size:13px;">${t.rating}</span>`}
          </div>` : ''}
        </div>
      </div>
      <div style="padding:20px 16px 40px;display:flex;flex-direction:column;gap:14px;background:var(--bg);">
        ${ctaHtml ? `<div style="display:flex;gap:8px;flex-wrap:wrap;">${ctaHtml}</div>` : ''}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:8px;">SOBRE LA TIENDA</div>
          <div style="font-size:14px;color:var(--text);line-height:1.6;">${t.descripcion}</div>
        </div>
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:12px;">INFORMACIÓN</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${t.direccion ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📍</span>
              <span style="font-size:13px;color:var(--text);line-height:1.4;">${t.direccion}</span>
            </div>` : ''}
            ${t.horario ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">⏰</span>
              <span style="font-size:13px;color:var(--text);">${t.horario}</span>
            </div>` : ''}
            ${t.telefono ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">📞</span>
              <a href="tel:${t.telefono}" style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${t.telefono}</a>
            </div>` : ''}
            ${t.web ? `<div style="display:flex;gap:10px;align-items:flex-start;">
              <span style="font-size:16px;">🌐</span>
              <a href="https://${t.web}" target="_blank" rel="noopener"
                style="font-size:13px;color:var(--purple);font-weight:600;text-decoration:none;">${t.web}</a>
            </div>` : ''}
          </div>
        </div>
        ${fotosHtml}
        ${equipoHtml}
        <div style="background:white;border-radius:16px;padding:16px;box-shadow:0 2px 10px rgba(0,0,0,0.06);">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">PRODUCTOS Y CATEGORÍAS</div>
          <div style="display:flex;flex-wrap:wrap;gap:7px;">
            ${t.tags.map(tag =>
              `<span style="font-size:12px;font-weight:600;padding:6px 13px;border-radius:100px;
                background:var(--purple-light);color:var(--purple);">${tag}</span>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>`;

  switchTab('detail');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderTiendas();
});

// ==========================================
// ARCHIVO: js/recetas.js
// ==========================================

/* ══════════════════════════════════════
   RECETAS CASERAS — WUFLY
   Para perros y gatos
   ══════════════════════════════════════ */

const recetas = [
  /* ══ PERROS ══ */
  {
    id: 'r1',
    nombre: 'Galletas de avena y plátano',
    especie: 'perro',
    tipo: 'snack',
    tiempo: '25 min',
    dificultad: 'Fácil',
    emoji: '🍪',
    descripcion: 'Snack crujiente y dulce que los perros adoran. Sin azúcar, sin sal, solo ingredientes naturales.',
    ingredientes: [
      '1 plátano maduro',
      '1 taza de avena en hojuelas',
      '1 huevo',
      '2 cucharadas de mantequilla de maní (sin xilitol)',
    ],
    pasos: [
      'Precalienta el horno a 180°C.',
      'Aplasta el plátano con un tenedor hasta obtener un puré.',
      'Mezcla todos los ingredientes hasta obtener una masa firme.',
      'Forma pequeñas galletas y colócalas en una bandeja con papel mantequilla.',
      'Hornea 15 min hasta que estén doradas. Deja enfriar completamente antes de dar.',
    ],
    conservacion: 'Hasta 1 semana en recipiente hermético o 1 mes congelado.',
    advertencia: null,
  },
  {
    id: 'r2',
    nombre: 'Caldo de pollo para perros',
    especie: 'perro',
    tipo: 'comida',
    tiempo: '1h 30min',
    dificultad: 'Fácil',
    emoji: '🍲',
    descripcion: 'Caldo nutritivo ideal para mejorar el apetito, hidratar en días calurosos o mezclar con croquetas.',
    ingredientes: [
      '500g de pechuga de pollo sin piel',
      '1 zanahoria grande',
      '1 rama de apio',
      '1 litro de agua',
    ],
    pasos: [
      'Coloca el pollo en una olla con agua fría.',
      'Agrega la zanahoria y el apio en trozos grandes.',
      'Cocina a fuego medio-bajo por 1 hora sin sal ni condimentos.',
      'Retira el pollo y las verduras. Deja enfriar el caldo.',
      'Puedes desmenuzar el pollo y mezclarlo de vuelta al caldo.',
      'Sirve tibio, nunca caliente.',
    ],
    conservacion: 'Hasta 4 días en refrigerador o 2 meses congelado en porciones.',
    advertencia: 'Nunca agregues cebolla, ajo, sal ni especias. Son tóxicos para los perros.',
  },
  {
    id: 'r3',
    nombre: 'Helado de yogur y arándanos',
    especie: 'perro',
    tipo: 'snack',
    tiempo: '10 min + 4h congelado',
    dificultad: 'Muy fácil',
    emoji: '🍦',
    descripcion: 'Refrescante para días de calor. El yogur natural aporta probióticos y los arándanos son ricos en antioxidantes.',
    ingredientes: [
      '1 taza de yogur natural sin azúcar',
      '½ taza de arándanos frescos o congelados',
      '1 cucharada de miel (solo para perros adultos)',
    ],
    pasos: [
      'Mezcla el yogur con los arándanos en una licuadora.',
      'Vierte en moldes de hielo o vasitos pequeños.',
      'Congela por al menos 4 horas.',
      'Sirve directamente del congelador en un día caluroso.',
    ],
    conservacion: 'Hasta 2 meses congelado.',
    advertencia: 'No uses yogur con edulcorantes artificiales ni xilitol. No dar miel a cachorros menores de 1 año.',
  },
  {
    id: 'r4',
    nombre: 'Bolitas de atún y zanahoria',
    especie: 'perro',
    tipo: 'snack',
    tiempo: '20 min',
    dificultad: 'Fácil',
    emoji: '🐟',
    descripcion: 'Snack proteico y sabroso. El atún aporta omega-3 y la zanahoria es excelente para los dientes.',
    ingredientes: [
      '1 lata de atún al agua (sin sal)',
      '1 zanahoria rallada',
      '1 huevo',
      '½ taza de harina de arroz',
    ],
    pasos: [
      'Precalienta el horno a 175°C.',
      'Escurre bien el atún y mezcla con la zanahoria y el huevo.',
      'Agrega la harina hasta obtener una masa manejable.',
      'Forma bolitas pequeñas y ponlas en una bandeja.',
      'Hornea 15 min. Deja enfriar antes de servir.',
    ],
    conservacion: 'Hasta 5 días refrigerado.',
    advertencia: null,
  },
  /* ══ GATOS ══ */
  {
    id: 'r5',
    nombre: 'Mousse de pollo para gatos',
    especie: 'gato',
    tipo: 'comida',
    tiempo: '30 min',
    dificultad: 'Fácil',
    emoji: '🐈',
    descripcion: 'Textura suave ideal para gatos exigentes o adultos mayores. Rica en proteína animal.',
    ingredientes: [
      '150g de pechuga de pollo cocida',
      '2 cucharadas de caldo de pollo sin sal',
      '1 cucharadita de aceite de salmón',
    ],
    pasos: [
      'Cocina el pollo al vapor o hervido, sin sal ni condimentos.',
      'Procesa el pollo en una licuadora o procesador.',
      'Agrega el caldo poco a poco hasta lograr una textura cremosa.',
      'Añade el aceite de salmón y mezcla bien.',
      'Sirve a temperatura ambiente.',
    ],
    conservacion: 'Hasta 3 días refrigerado en recipiente cerrado.',
    advertencia: 'Los gatos son carnívoros estrictos — nunca agregues verduras, frutas ni carbohidratos en exceso.',
  },
  {
    id: 'r6',
    nombre: 'Snack de salmón deshidratado',
    especie: 'gato',
    tipo: 'snack',
    tiempo: '3h (horno bajo)',
    dificultad: 'Media',
    emoji: '🐠',
    descripcion: 'Snacks naturales de salmón sin aditivos. Perfectos como premio o para estimular a un gato inapetente.',
    ingredientes: [
      '200g de filete de salmón fresco',
    ],
    pasos: [
      'Precalienta el horno a 90°C (temperatura muy baja).',
      'Corta el salmón en tiras finas de 1-2 cm.',
      'Colócalas en una rejilla sobre una bandeja.',
      'Deshidrata por 2,5 a 3 horas, dando vuelta a mitad del proceso.',
      'Están listas cuando se sientan secas y flexibles. Deja enfriar.',
    ],
    conservacion: 'Hasta 2 semanas en refrigerador o 2 meses congelado.',
    advertencia: 'No agregues sal, aceite ni condimentos. Asegúrate de que el salmón esté bien cocido.',
  },
  {
    id: 'r7',
    nombre: 'Caldo hidratante para gatos',
    especie: 'gato',
    tipo: 'bebida',
    tiempo: '45 min',
    dificultad: 'Muy fácil',
    emoji: '💧',
    descripcion: 'Ideal para gatos que beben poca agua. El aroma del pollo los atrae y mejora su hidratación.',
    ingredientes: [
      '300g de pollo (pechuga o muslo sin huesos)',
      '600ml de agua filtrada',
    ],
    pasos: [
      'Hierve el pollo en el agua a fuego medio por 40 minutos.',
      'Retira el pollo (puedes guardarlo para otra preparación).',
      'Cuela el caldo y déjalo enfriar completamente.',
      'Retira la grasa que se solidifica en la superficie.',
      'Sirve en pequeñas cantidades junto al agua fresca habitual.',
    ],
    conservacion: 'Hasta 4 días refrigerado.',
    advertencia: 'Nunca uses huesos pequeños ni condimentos. El caldo es un suplemento, no un reemplazo del agua.',
  },
];

/* ══ ESTADO ══ */
let recetasFiltro = 'todos';
let recetaAbierta = null;

/* ══ RENDER LISTA ══ */
function renderRecetas() {
  const filtered = recetas.filter(r =>
    recetasFiltro === 'todos' || r.especie === recetasFiltro
  );

  const html = filtered.map(r => `
    <div onclick="abrirReceta('${r.id}')"
      style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);cursor:pointer;display:flex;gap:14px;align-items:center;transition:box-shadow 0.2s;"
      onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'">
      <div style="font-size:40px;width:56px;height:56px;min-width:56px;display:flex;align-items:center;justify-content:center;background:var(--peach-light);border-radius:14px;">${r.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:4px;">${r.nombre}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px;">
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:${r.especie === 'perro' ? 'var(--purple-light)' : 'var(--mint-light)'};color:${r.especie === 'perro' ? 'var(--purple)' : 'var(--mint-dark)'};">${r.especie === 'perro' ? '🐕 Perro' : '🐈 Gato'}</span>
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--peach-light);color:#C0660A;">⏱ ${r.tiempo}</span>
          <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--bg);color:var(--text-muted);">${r.dificultad}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);line-height:1.4;">${r.descripcion}</div>
      </div>
      <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--text-hint);fill:none;stroke-width:2;stroke-linecap:round;flex-shrink:0;"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  `).join('');

  // Poblar todos los contenedores (page-recetas y csub-recetas en comunidad)
  ['recetasFeed', 'recetasFeedCom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

/* ══ ABRIR RECETA DETALLE ══ */
function abrirReceta(id) {
  const r = recetas.find(x => x.id === id);
  if (!r) return;

  const modal = document.getElementById('recetaModal');
  const body  = document.getElementById('recetaModalBody');

  body.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:white;padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${r.emoji} ${r.nombre}</div>
      <button onclick="cerrarReceta()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border-md);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;">✕</button>
    </div>
    <div style="padding:20px;">
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px;">
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:${r.especie === 'perro' ? 'var(--purple-light)' : 'var(--mint-light)'};color:${r.especie === 'perro' ? 'var(--purple)' : 'var(--mint-dark)'};">${r.especie === 'perro' ? '🐕 Para perros' : '🐈 Para gatos'}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:var(--peach-light);color:#C0660A;">⏱ ${r.tiempo}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:var(--bg);color:var(--text-muted);">${r.dificultad}</span>
      </div>

      <p style="font-size:14px;color:var(--text-muted);line-height:1.6;margin-bottom:20px;">${r.descripcion}</p>

      <div style="margin-bottom:20px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:10px;">🧾 Ingredientes</div>
        ${r.ingredientes.map(i => `
          <div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);">
            <span style="color:var(--mint);font-weight:700;margin-top:1px;">•</span>
            <span style="font-size:14px;color:var(--text);">${i}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom:20px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:10px;">👩‍🍳 Preparación</div>
        ${r.pasos.map((p, i) => `
          <div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--border);">
            <div style="width:24px;height:24px;min-width:24px;background:var(--purple);color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px;">${i+1}</div>
            <span style="font-size:13px;color:var(--text);line-height:1.6;">${p}</span>
          </div>
        `).join('')}
      </div>

      <div style="background:var(--mint-light);border-radius:var(--r-xs);padding:12px 14px;margin-bottom:${r.advertencia ? '12px' : '0'};">
        <div style="font-size:11px;font-weight:700;color:var(--mint-dark);margin-bottom:3px;">🧊 Conservación</div>
        <div style="font-size:13px;color:var(--mint-dark);">${r.conservacion}</div>
      </div>

      ${r.advertencia ? `
        <div style="background:#FFF3CD;border-radius:var(--r-xs);padding:12px 14px;border:1px solid #FFD93D;">
          <div style="font-size:11px;font-weight:700;color:#856404;margin-bottom:3px;">⚠️ Advertencia</div>
          <div style="font-size:13px;color:#856404;">${r.advertencia}</div>
        </div>
      ` : ''}
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarReceta() {
  const modal = document.getElementById('recetaModal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function setFiltroRecetas(el, val) {
  recetasFiltro = val;
  document.querySelectorAll('#sub-recetas .filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderRecetas();
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderRecetas);


// ==========================================
// ARCHIVO: js/fundaciones.js
// ==========================================

/* ══════════════════════════════════════
   FUNDACIONES — WUFLY
   Organizaciones de rescate animal
   ══════════════════════════════════════ */

const fundaciones = [
  {
    id: 'f1',
    nombre: 'Fundación Tierra de Animales',
    especie: 'todos',
    ciudad: 'Santiago',
    emoji: '🏡',
    descripcion: 'Una de las fundaciones de rescate animal más grandes de Chile. Trabajan con perros y gatos en situación de calle, ofreciendo refugio, atención veterinaria y adopción responsable.',
    mision: 'Rescatar, rehabilitar y encontrar un hogar para animales abandonados, promoviendo la tenencia responsable.',
    actividades: [
      'Rescate de animales en situación de calle',
      'Atención veterinaria gratuita a animales rescatados',
      'Proceso de adopción responsable con seguimiento',
      'Campañas de esterilización masiva',
      'Educación y concientización en colegios',
    ],
    comoAyudar: 'Puedes apadrinar un animal, donar alimento o insumos veterinarios, o postular como familia adoptante.',
    web: 'https://www.tierradeanimales.cl',
    instagram: '@tierradeanimales',
    whatsapp: null,
  },
  {
    id: 'f2',
    nombre: 'Fundación Equidad',
    especie: 'todos',
    ciudad: 'Santiago',
    emoji: '🤝',
    descripcion: 'Organización sin fines de lucro enfocada en la protección animal y el bienestar de animales domésticos en situación de vulnerabilidad en Chile.',
    mision: 'Promover la tenencia responsable, el respeto hacia los animales y el fin del maltrato y abandono.',
    actividades: [
      'Rescate de animales maltratados o abandonados',
      'Programa de familias de acogida temporal',
      'Ferias de adopción periódicas',
      'Asesoría legal en casos de maltrato animal',
      'Campañas de esterilización subsidiadas',
    ],
    comoAyudar: 'Hazte voluntario, conviértete en familia de acogida o realiza donaciones en su sitio web.',
    web: 'https://www.fundacionequidad.cl',
    instagram: '@fundacionequidad',
    whatsapp: null,
  },
  {
    id: 'f3',
    nombre: 'WWF Chile',
    especie: 'silvestre',
    ciudad: 'Nacional',
    emoji: '🐼',
    descripcion: 'Filial chilena del Fondo Mundial para la Naturaleza. Trabaja en la conservación de especies silvestres nativas y sus ecosistemas, con especial foco en fauna patagónica y marina.',
    mision: 'Conservar la naturaleza y reducir las amenazas más urgentes para la diversidad de la vida en la Tierra.',
    actividades: [
      'Conservación del huemul, puma y otras especies en peligro',
      'Protección de ecosistemas marinos en Patagonia',
      'Programas de educación ambiental',
      'Investigación y monitoreo de fauna silvestre',
      'Incidencia en políticas públicas medioambientales',
    ],
    comoAyudar: 'Puedes apadrinar una especie, donar mensualmente o participar como voluntario en campañas.',
    web: 'https://www.wwf.cl',
    instagram: '@wwfchile',
    whatsapp: null,
  },
  {
    id: 'f4',
    nombre: 'Red de Rescate Animal Chile',
    especie: 'todos',
    ciudad: 'Nacional',
    emoji: '🚨',
    descripcion: 'Red colaborativa de voluntarios a lo largo de Chile que coordinan rescates de emergencia, acogidas temporales y adopciones para animales en situación de riesgo.',
    mision: 'Articular una red solidaria que garantice atención rápida a animales en peligro en todo el territorio nacional.',
    actividades: [
      'Coordinación de rescates de emergencia 24/7',
      'Red de hogares de acogida temporal',
      'Difusión de animales en adopción en redes sociales',
      'Conexión entre veterinarios solidarios y animales rescatados',
      'Apoyo a dueños en crisis que deben entregar sus mascotas',
    ],
    comoAyudar: 'Únete como voluntario, ofrece tu hogar como acogida temporal o difunde animales en busca de hogar.',
    web: null,
    instagram: '@redrescateanimalchile',
    whatsapp: '+56 9 1234 5678',
  },
  {
    id: 'f5',
    nombre: 'Humane Society International',
    especie: 'todos',
    ciudad: 'Internacional',
    emoji: '🌍',
    descripcion: 'Una de las organizaciones de protección animal más grandes del mundo, con presencia en Chile. Trabajan contra el maltrato, el comercio ilegal de fauna y las granjas de producción intensiva.',
    mision: 'Crear un mundo donde los animales estén libres de crueldad, explotación y negligencia.',
    actividades: [
      'Campañas contra el maltrato y abandono de mascotas',
      'Oposición al comercio ilegal de fauna silvestre',
      'Rescate y reubicación de animales de granjas',
      'Presión legislativa para leyes de protección animal',
      'Educación sobre bienestar y tenencia responsable',
    ],
    comoAyudar: 'Dona, firma peticiones o participa en campañas de concientización desde su sitio web.',
    web: 'https://www.hsi.org/es',
    instagram: '@hsichile',
    whatsapp: null,
  },
];

/* ══ RENDER LISTA ══ */
function renderFundaciones() {
  const especieColor = {
    'todos':    { bg: 'var(--purple-light)', color: 'var(--purple)', label: '🐾 Perros y gatos' },
    'silvestre':{ bg: 'var(--mint-light)',   color: 'var(--mint-dark)', label: '🦁 Fauna silvestre' },
  };

  const html = fundaciones.map(f => {
    const ec = especieColor[f.especie] || especieColor['todos'];
    return `
      <div onclick="abrirFundacion('${f.id}')"
        style="background:var(--surface);border-radius:var(--r);border:1.5px solid var(--border);padding:16px;margin-bottom:12px;box-shadow:var(--shadow-sm);cursor:pointer;display:flex;gap:14px;align-items:center;transition:box-shadow 0.2s;"
        onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='var(--shadow-sm)'">
        <div style="font-size:40px;width:56px;height:56px;min-width:56px;display:flex;align-items:center;justify-content:center;background:var(--purple-light);border-radius:14px;">${f.emoji}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:4px;">${f.nombre}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px;">
            <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:${ec.bg};color:${ec.color};">${ec.label}</span>
            <span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:100px;background:var(--peach-light);color:#C0660A;">📍 ${f.ciudad}</span>
          </div>
          <div style="font-size:12px;color:var(--text-muted);line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${f.descripcion}</div>
        </div>
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--text-hint);fill:none;stroke-width:2;stroke-linecap:round;flex-shrink:0;"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `;
  }).join('');

  ['fundacionesFeed', 'fundacionesFeedCom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  });
}

/* ══ ABRIR DETALLE ══ */
function abrirFundacion(id) {
  const f = fundaciones.find(x => x.id === id);
  if (!f) return;

  const modal = document.getElementById('recetaModal');
  const body  = document.getElementById('recetaModalBody');
  if (!modal || !body) return;

  const especieColor = {
    'todos':    { bg: 'var(--purple-light)', color: 'var(--purple)', label: '🐾 Perros y gatos' },
    'silvestre':{ bg: 'var(--mint-light)',   color: 'var(--mint-dark)', label: '🦁 Fauna silvestre' },
  };
  const ec = especieColor[f.especie] || especieColor['todos'];

  const botonesContacto = [
    f.web ? `<a href="${f.web}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;background:var(--purple);color:white;border-radius:var(--r-xs);padding:13px;font-size:14px;font-weight:700;text-decoration:none;">🌐 Visitar sitio web</a>` : '',
    f.whatsapp ? `<a href="https://wa.me/${f.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#25D366;color:white;border-radius:var(--r-xs);padding:13px;font-size:14px;font-weight:700;text-decoration:none;"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:white;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Contactar por WhatsApp</a>` : '',
    f.instagram ? `<div style="text-align:center;font-size:12px;color:var(--text-muted);padding:4px 0;">📸 Instagram: <strong>${f.instagram}</strong></div>` : '',
  ].filter(Boolean).join('');

  body.innerHTML = `
    <div style="position:sticky;top:0;z-index:10;background:white;padding:16px 20px 12px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:18px;color:var(--text);">${f.emoji} ${f.nombre}</div>
      <button onclick="cerrarReceta()" style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--border-md);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;">✕</button>
    </div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:16px;">

      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:${ec.bg};color:${ec.color};">${ec.label}</span>
        <span style="font-size:11px;font-weight:700;padding:4px 10px;border-radius:100px;background:var(--peach-light);color:#C0660A;">📍 ${f.ciudad}</span>
      </div>

      <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">${f.descripcion}</p>

      <div style="background:var(--purple-light);border-radius:var(--r-xs);padding:12px 14px;">
        <div style="font-size:11px;font-weight:700;color:var(--purple);margin-bottom:4px;">🎯 Misión</div>
        <div style="font-size:13px;color:var(--text);line-height:1.6;">${f.mision}</div>
      </div>

      <div>
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:10px;">🐾 Qué hacen</div>
        ${f.actividades.map(a => `
          <div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid var(--border);">
            <span style="color:var(--purple);font-weight:700;margin-top:1px;">•</span>
            <span style="font-size:14px;color:var(--text);">${a}</span>
          </div>
        `).join('')}
      </div>

      <div style="background:var(--mint-light);border-radius:var(--r-xs);padding:12px 14px;">
        <div style="font-size:11px;font-weight:700;color:var(--mint-dark);margin-bottom:4px;">💚 ¿Cómo ayudar?</div>
        <div style="font-size:13px;color:var(--mint-dark);line-height:1.6;">${f.comoAyudar}</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;padding-bottom:8px;">
        ${botonesContacto}
      </div>

    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/* ══ INIT ══ */
document.addEventListener('DOMContentLoaded', renderFundaciones);


// ==========================================
// ARCHIVO: js/recordatorios.js
// ==========================================

/* ══════════════════════════════════════
   RECORDATORIOS DE SALUD — WUFLY
   Vacunas, desparasitación, controles
   ══════════════════════════════════════ */

const REC_KEY = 'wufly_recordatorios_v1';

const tipoConfig = {
  vacuna:          { emoji: '💉', color: '#7C4DCC', bg: '#F0EAFB', label: 'Vacuna' },
  desparasitacion: { emoji: '🐛', color: '#3DAF87', bg: '#E6F9F3', label: 'Desparasitación' },
  control:         { emoji: '🩺', color: '#2563EB', bg: '#EFF6FF', label: 'Control veterinario' },
  medicamento:     { emoji: '💊', color: '#D97706', bg: '#FEF3C7', label: 'Medicamento' },
  grooming:        { emoji: '✂️', color: '#EC4899', bg: '#FDF2F8', label: 'Grooming' },
  otro:            { emoji: '📌', color: '#6B7280', bg: '#F3F4F6', label: 'Otro' },
};

/* ── Storage ── */
function cargarRecordatorios() {
  try {
    const raw = localStorage.getItem(REC_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function guardarRecordatoriosStorage(lista) {
  try { localStorage.setItem(REC_KEY, JSON.stringify(lista)); } catch(e) {}
}

/* ── Render ── */
function renderRecordatorios() {
  const list = document.getElementById('recordatoriosList');
  if (!list) return;

  const lista = cargarRecordatorios().sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  if (lista.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
        <div style="font-size:48px;margin-bottom:12px;">📅</div>
        <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px;">Sin recordatorios aún</div>
        <div style="font-size:13px;line-height:1.5;">Agrega vacunas, desparasitaciones y controles para no olvidar nada importante.</div>
      </div>`;
    return;
  }

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  list.innerHTML = lista.map(r => {
    const cfg   = tipoConfig[r.tipo] || tipoConfig.otro;
    const fecha = new Date(r.fecha + 'T12:00:00');
    const diff  = Math.round((fecha - hoy) / 86400000);
    const pasado = diff < 0;

    let estadoBadge;
    if (diff < 0)       estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#FEE2E2;color:#DC2626;">Vencido hace ${Math.abs(diff)}d</span>`;
    else if (diff === 0) estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#FEF3C7;color:#D97706;">¡Hoy!</span>`;
    else if (diff <= 7)  estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#FEF3C7;color:#D97706;">En ${diff} días</span>`;
    else                 estadoBadge = `<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;background:#F0FFF4;color:#16A34A;">En ${diff} días</span>`;

    const fechaStr = fecha.toLocaleDateString('es-CL', { day:'numeric', month:'long', year:'numeric' });

    return `
    <div style="background:var(--surface);border-radius:var(--r);border:1.5px solid ${pasado ? '#FCA5A5' : 'var(--border)'};padding:14px;margin-bottom:10px;box-shadow:var(--shadow-sm);display:flex;gap:12px;align-items:flex-start;${pasado ? 'opacity:0.75;' : ''}">
      <div style="width:44px;height:44px;min-width:44px;background:${cfg.bg};border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;">${cfg.emoji}</div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:4px;">
          <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:15px;color:var(--text);">${escHTMLRec(r.descripcion)}</div>
          ${estadoBadge}
        </div>
        <div style="font-size:12px;font-weight:600;color:${cfg.color};margin-bottom:3px;">${cfg.label}</div>
        <div style="font-size:12px;color:var(--text-muted);">📅 ${fechaStr}</div>
        ${r.notas ? `<div style="font-size:12px;color:var(--text-hint);margin-top:4px;font-style:italic;">${escHTMLRec(r.notas)}</div>` : ''}
      </div>
      <button onclick="eliminarRecordatorio('${r.id}')"
        style="width:28px;height:28px;border-radius:50%;border:1.5px solid var(--border-md);background:var(--bg);cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--text-muted);font-size:14px;">×</button>
    </div>`;
  }).join('');
}

function escHTMLRec(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
}

/* ── Form ── */
function abrirFormRecordatorio() {
  const form = document.getElementById('formRecordatorio');
  form.style.display = 'block';
  // Fecha por defecto: mañana (los recordatorios son para el futuro)
  const manana = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  document.getElementById('recFecha').value = manana;
  form.scrollIntoView({ behavior: 'smooth' });
}

function cerrarFormRecordatorio() {
  document.getElementById('formRecordatorio').style.display = 'none';
  document.getElementById('recDescripcion').value = '';
  document.getElementById('recNotas').value = '';
}

function guardarRecordatorio() {
  const descripcion = document.getElementById('recDescripcion').value.trim();
  const fecha       = document.getElementById('recFecha').value;

  if (!descripcion) { alert('Por favor ingresa una descripción.'); return; }
  if (!fecha)        { alert('Por favor selecciona una fecha.'); return; }

  const nuevo = {
    id:          'rec_' + Date.now(),
    tipo:        document.getElementById('recTipo').value,
    descripcion,
    fecha,
    notas:       document.getElementById('recNotas').value.trim(),
    creado:      Date.now(),
  };

  const lista = cargarRecordatorios();
  lista.push(nuevo);
  guardarRecordatoriosStorage(lista);
  if (typeof guardarRecordatorioDB === 'function') guardarRecordatorioDB(nuevo);

  cerrarFormRecordatorio();
  renderRecordatorios();
  actualizarBadgeRecordatorios();
}

function eliminarRecordatorio(id) {
  const lista = cargarRecordatorios().filter(r => r.id !== id);
  guardarRecordatoriosStorage(lista);
  if (typeof eliminarRecordatorioDB === 'function') eliminarRecordatorioDB(id);
  renderRecordatorios();
  actualizarBadgeRecordatorios();
}

/* ── Badge en nav: si hay recordatorios próximos (≤7 días) mostrar punto ── */
function actualizarBadgeRecordatorios() {
  const hoy  = new Date(); hoy.setHours(0,0,0,0);
  const lista = cargarRecordatorios();
  const proximos = lista.filter(r => {
    const d = new Date(r.fecha + 'T12:00:00');
    const diff = Math.round((d - hoy) / 86400000);
    return diff >= 0 && diff <= 7;
  });
  const dot = document.getElementById('navDot');
  if (dot) dot.classList.toggle('show', proximos.length > 0);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderRecordatorios();
  actualizarBadgeRecordatorios();
});


// ==========================================
// ARCHIVO: js/perfil.js
// ==========================================

/* ══════════════════════════════════════
   PERFIL WUFLY — Card deslizable
   Modo lectura / modo edición
   ══════════════════════════════════════ */

const PERFIL_KEY = 'wufly_profile_v1';
let perfilModoEdicion = false;

const saludOpciones = [
  { val: 'Alergia alimentaria',   emoji: '🥣' },
  { val: 'Problemas digestivos',  emoji: '🫁' },
  { val: 'Diabetes',              emoji: '💉' },
  { val: 'Enfermedad renal',      emoji: '🫘' },
  { val: 'Problemas articulares', emoji: '🦴' },
  { val: 'Problemas de piel',     emoji: '🐾' },
  { val: 'Sobrepeso',             emoji: '⚖️' },
  { val: 'Saludable',             emoji: '✅' },
];

const especieEmoji = { perro: '🐕', gato: '🐈', otro: '🐾' };
const edadLabel = { cachorro:'Cachorro', joven:'Joven', adulto:'Adulto', senior:'Senior' };

/* ── Storage ── */
function cargarPerfilLocal() {
  try { const r = localStorage.getItem(PERFIL_KEY); return r ? JSON.parse(r) : {}; }
  catch { return {}; }
}

/* ── Activar modo edición ── */
function activarEdicion() {
  perfilModoEdicion = true;
  const p = cargarPerfilLocal();
  renderCardContenido(p, true);
}

/* ── Guardar y volver a modo lectura ── */
function guardarPerfilEdits() {
  const p = cargarPerfilLocal();
  p.nombre        = document.getElementById('editNombreDueno')?.value.trim()  || p.nombre  || '';
  p.nombreMascota = document.getElementById('editNombreMascota')?.value.trim() || p.nombreMascota || '';
  p.tipomascota   = document.getElementById('editEspecie')?.value  || p.tipomascota || 'perro';
  p.edadmascota   = document.getElementById('editEdad')?.value     || p.edadmascota || 'adulto';
  p.salud = [...document.querySelectorAll('#saludChipsEdit .salud-chip.selected')].map(c => c.dataset.val);
  localStorage.setItem(PERFIL_KEY, JSON.stringify(p));
  if (typeof guardarPerfilEnDB === 'function') guardarPerfilEnDB(p);

  perfilModoEdicion = false;
  renderPerfilUI(p);

  // Feedback en botón
  const btn = document.getElementById('btnGuardarPerfil');
  if (btn) {
    btn.textContent = '✓ Guardado';
    btn.style.background = 'var(--mint)';
    setTimeout(() => { btn.textContent = 'Guardar cambios'; btn.style.background = ''; }, 1800);
  }
}

/* ── Cancelar edición ── */
function cancelarEdicion() {
  perfilModoEdicion = false;
  renderPerfilUI(cargarPerfilLocal());
}

/* ── Render principal ── */
function renderPerfilUI(p) {
  if (!p) return;

  const esPremium = localStorage.getItem('wufly_premium') === '1';

  // Pill nombre mascota
  const pillNombre = document.getElementById('perfilMascotaNombre');
  if (pillNombre) pillNombre.textContent = p.nombreMascota || 'Mi mascota';

  // Nombre dueño
  const nombreDueno = document.getElementById('perfilNombreDueno');
  if (nombreDueno) {
    nombreDueno.textContent = p.nombre ? `Hola, ${p.nombre} 👋` : 'Hola 👋';
    nombreDueno.style.color = esPremium ? 'white' : '';
  }

  // Subtítulo
  const subtitulo = document.getElementById('perfilSubtitulo');
  if (subtitulo) {
    const nombre = p.nombreMascota || 'tu mascota';
    const especie = especieEmoji[p.tipomascota] || '🐾';
    const edad = edadLabel[p.edadmascota] || '';
    subtitulo.textContent = `${especie} ${nombre}${edad ? ' · ' + edad : ''}`;
    subtitulo.style.color = esPremium ? 'rgba(255,255,255,0.55)' : '';
  }

  // Badge especie
  const badge = document.getElementById('perfilEspecieBadge');
  if (badge) badge.textContent = especieEmoji[p.tipomascota] || '🐾';

  // Avatar inicial
  const initial = document.getElementById('perfilOwnerInitial');
  if (initial) initial.textContent = p.nombre ? p.nombre.charAt(0).toUpperCase() : '😊';

  // Fotos
  if (p.fotoMascota) {
    const img = document.getElementById('perfilMascotaImg');
    const ph  = document.getElementById('perfilMascotaPlaceholder');
    if (img) { img.src = p.fotoMascota; img.style.display = 'block'; }
    if (ph)  ph.style.display = 'none';
  }
  if (p.fotoDueno) {
    const img  = document.getElementById('perfilOwnerImg');
    const init = document.getElementById('perfilOwnerInitial');
    if (img)  { img.src = p.fotoDueno; img.style.display = 'block'; }
    if (init) init.style.display = 'none';
  }

  // Contenido card según modo
  renderCardContenido(p, perfilModoEdicion, esPremium);

  // Aplicar tema oscuro si es premium
  if (esPremium) _perfilAplicarPremium();
}

/* ── Tema oscuro Premium ── */
function _perfilAplicarPremium() {
  const hero = document.getElementById('perfilHero');
  const card = document.getElementById('perfilCard');

  // Hero oscuro
  if (hero) {
    hero.style.background = 'linear-gradient(160deg, #0a0015 0%, #1a0a3c 50%, #0D0520 100%)';
  }

  // Card oscura
  if (card) {
    card.style.background = '#0D0520';
    card.style.boxShadow  = '0 -4px 20px rgba(0,0,0,0.4)';
    // Botón cerrar sesión — estilo oscuro
    const btnSalir = card.querySelector('button[onclick="cerrarSesion()"]');
    if (btnSalir) {
      btnSalir.style.background  = 'rgba(220,38,38,0.12)';
      btnSalir.style.borderColor = 'rgba(252,165,165,0.3)';
    }
  }

  // Mostrar logo premium en header, ocultar badge/botón editar
  const derechaDefault = document.getElementById('perfilDerechaDefault');
  const derechaPremium = document.getElementById('perfilDerechaPremium');
  if (derechaDefault) derechaDefault.style.display = 'none';
  if (derechaPremium) derechaPremium.style.display = 'block';
}

/* ── Render contenido card (lectura o edición) ── */
function renderCardContenido(p, edicion, dark = false) {
  const wrap = document.getElementById('perfilCardContenido');
  if (!wrap) return;

  const sectionBg  = dark ? 'rgba(255,255,255,0.07)' : 'var(--bg)';
  const textColor  = dark ? 'white'                  : 'var(--text)';
  const mutedColor = dark ? 'rgba(255,255,255,0.45)' : 'var(--text-muted)';
  const inputBg    = dark ? 'rgba(255,255,255,0.06)' : 'white';
  const inputBorder= dark ? 'rgba(255,255,255,0.15)' : 'var(--border-md)';
  const inputColor = dark ? 'white'                  : 'var(--text)';

  if (edicion) {
    // ── MODO EDICIÓN ──
    wrap.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:14px;">

        <div style="background:${sectionBg};border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;">DUEÑO</div>
          <input type="text" id="editNombreDueno" value="${p.nombre || ''}" placeholder="Tu nombre..."
            style="border:1.5px solid ${inputBorder};border-radius:var(--r-xs);padding:10px 12px;font-size:14px;color:${inputColor};outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:${inputBg};">
        </div>

        <div style="background:${sectionBg};border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;">MASCOTA</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <div>
              <label style="font-size:11px;font-weight:600;color:${mutedColor};">NOMBRE</label>
              <input type="text" id="editNombreMascota" value="${p.nombreMascota || ''}" placeholder="Nombre..."
                style="width:100%;margin-top:4px;border:1.5px solid ${inputBorder};border-radius:var(--r-xs);padding:10px 12px;font-size:13px;color:${inputColor};outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:${inputBg};">
            </div>
            <div>
              <label style="font-size:11px;font-weight:600;color:${mutedColor};">ESPECIE</label>
              <select id="editEspecie"
                style="width:100%;margin-top:4px;border:1.5px solid ${inputBorder};border-radius:var(--r-xs);padding:10px 12px;font-size:13px;color:${inputColor};outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:${inputBg};">
                <option value="perro" ${p.tipomascota==='perro'?'selected':''}>🐕 Perro</option>
                <option value="gato"  ${p.tipomascota==='gato'?'selected':''}>🐈 Gato</option>
                <option value="otro"  ${p.tipomascota==='otro'?'selected':''}>🐾 Otro</option>
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:11px;font-weight:600;color:${mutedColor};">EDAD</label>
            <select id="editEdad"
              style="width:100%;margin-top:4px;border:1.5px solid ${inputBorder};border-radius:var(--r-xs);padding:10px 12px;font-size:13px;color:${inputColor};outline:none;font-family:'Plus Jakarta Sans',sans-serif;background:${inputBg};">
              <option value="cachorro" ${p.edadmascota==='cachorro'?'selected':''}>🍼 Cachorro — menos de 1 año</option>
              <option value="joven"    ${p.edadmascota==='joven'?'selected':''}>⚡ Joven — 1 a 3 años</option>
              <option value="adulto"   ${p.edadmascota==='adulto'?'selected':''}>🌟 Adulto — 3 a 8 años</option>
              <option value="senior"   ${p.edadmascota==='senior'?'selected':''}>🏅 Senior — más de 8 años</option>
            </select>
          </div>
        </div>

        <div style="background:${sectionBg};border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;">CONDICIONES DE SALUD</div>
          <div id="saludChipsEdit" style="display:flex;flex-wrap:wrap;gap:8px;">
            ${saludOpciones.map(s => {
              const sel = (p.salud || []).includes(s.val);
              return `<div class="salud-chip ${sel ? 'selected' : ''}" data-val="${s.val}" onclick="toggleSaludChip(this)"
                style="display:inline-flex;align-items:center;gap:5px;padding:7px 13px;border-radius:100px;font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;border:1.5px solid;
                ${sel ? 'background:#5DD6A8;color:#1a3a2a;border-color:#5DD6A8;' : `background:${inputBg};color:${mutedColor};border-color:${inputBorder};`}">
                ${s.emoji} ${s.val}
              </div>`;
            }).join('')}
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:4px;">
          <button class="btn-ghost" onclick="cancelarEdicion()" style="flex:1;${dark?'color:rgba(255,255,255,0.7);border-color:rgba(255,255,255,0.15);':''}">Cancelar</button>
          <button id="btnGuardarPerfil" class="btn-primary" onclick="guardarPerfilEdits()" style="flex:2;">Guardar cambios</button>
        </div>
      </div>`;

  } else {
    // ── MODO LECTURA ──
    const tieneData = p.nombre || p.nombreMascota;
    const salud = (p.salud || []).filter(s => s !== 'Saludable');
    const saludBg    = dark ? 'rgba(93,214,168,0.15)' : 'var(--mint-light)';
    const saludColor = dark ? '#5DD6A8'               : 'var(--mint-dark)';

    wrap.innerHTML = tieneData ? `
      <div style="display:flex;flex-direction:column;gap:12px;">

        <div style="background:${sectionBg};border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;">DUEÑO</div>
          <div style="font-size:15px;font-weight:600;color:${textColor};">${p.nombre || '—'}</div>
        </div>

        <div style="background:${sectionBg};border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:8px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;">MASCOTA</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:28px;">${especieEmoji[p.tipomascota] || '🐾'}</span>
            <div>
              <div style="font-family:'Funnel Display',sans-serif;font-size:18px;font-weight:700;color:${textColor};">${p.nombreMascota || '—'}</div>
              <div style="font-size:12px;color:${mutedColor};margin-top:1px;">${edadLabel[p.edadmascota] || ''}</div>
            </div>
          </div>
        </div>

        ${salud.length > 0 ? `
        <div style="background:${sectionBg};border-radius:14px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;margin-bottom:8px;">CONDICIONES DE SALUD</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">
            ${salud.map(s => {
              const op = saludOpciones.find(x => x.val === s);
              return `<span style="font-size:12px;font-weight:600;padding:5px 12px;border-radius:100px;background:${saludBg};color:${saludColor};">${op ? op.emoji : '•'} ${s}</span>`;
            }).join('')}
          </div>
        </div>` : `
        <div style="background:${sectionBg};border-radius:14px;padding:14px;">
          <div style="font-size:11px;font-weight:700;color:${mutedColor};letter-spacing:0.07em;margin-bottom:4px;">CONDICIONES DE SALUD</div>
          <div style="font-size:13px;color:${mutedColor};">✅ Sin condiciones especiales</div>
        </div>`}

      </div>` : `
      <div style="text-align:center;padding:20px;color:${mutedColor};">
        <div style="font-size:36px;margin-bottom:8px;">🐾</div>
        <div style="font-size:14px;font-weight:600;color:${textColor};margin-bottom:4px;">Completa tu perfil</div>
        <div style="font-size:12px;margin-bottom:16px;">La IA usará esta info para personalizar cada consulta</div>
        <button class="btn-primary" onclick="activarEdicion()">Completar perfil</button>
      </div>`;
  }
}

function toggleSaludChip(el) {
  el.classList.toggle('selected');
  const sel = el.classList.contains('selected');
  el.style.background  = sel ? '#5DD6A8' : 'white';
  el.style.color       = sel ? '#1a3a2a' : 'var(--text-muted)';
  el.style.borderColor = sel ? '#5DD6A8' : 'var(--border-md)';
}

/* ══════════════════════════════════
   FOTOS — comprimir + subir + guardar
   ══════════════════════════════════ */

/* Redimensiona y comprime una imagen a máx 900px, devuelve Blob */
function _comprimirImagen(file, maxW = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = ev => {
      const src = ev.target.result;
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        let { width, height } = image;
        if (width > maxW) { height = Math.round(height * maxW / width); width = maxW; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(blob => {
          if (!blob) { reject(new Error('canvas.toBlob falló')); return; }
          resolve(blob);
        }, 'image/jpeg', quality);
      };
      image.src = src;
    };
    reader.readAsDataURL(file);
  });
}

/* Toast simple de feedback */
function _fotoToast(msg, tipo = 'ok') {
  let t = document.getElementById('_fotoToast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_fotoToast';
    t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99999;padding:10px 20px;border-radius:100px;font-size:13px;font-weight:700;font-family:"Plus Jakarta Sans",sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.25);transition:opacity 0.4s;pointer-events:none;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = tipo === 'ok'  ? '#10B981' :
                        tipo === 'err' ? '#EF4444' : '#6366F1';
  t.style.color = 'white';
  t.style.opacity = '1';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3000);
}

/* Guarda dataURL en localStorage con manejo de cuota */
function _guardarFotoLocal(p) {
  try {
    localStorage.setItem(PERFIL_KEY, JSON.stringify(p));
  } catch (e) {
    // Cuota excedida — quitar fotos base64 y reintentar solo con URL
    const pMin = { ...p };
    if (pMin.fotoMascota?.startsWith('data:')) delete pMin.fotoMascota;
    if (pMin.fotoDueno?.startsWith('data:'))  delete pMin.fotoDueno;
    try { localStorage.setItem(PERFIL_KEY, JSON.stringify(pMin)); } catch {}
  }
}

/* Limpia el estado visual del elemento imagen (quita blur/opacidad) */
function _clearImgState(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.style.removeProperty('filter');
  el.style.removeProperty('opacity');
}

async function cargarFotoMascota(input) {
  const f = input.files[0]; if (!f) return;
  input.value = '';

  const p = cargarPerfilLocal();
  _fotoToast('Procesando foto…', 'info');

  // Ocultar placeholder y mostrar img
  const ph = document.getElementById('perfilMascotaPlaceholder');
  if (ph) ph.style.display = 'none';

  // Comprimir
  let blob;
  try { blob = await _comprimirImagen(f, 900, 0.82); }
  catch { blob = f; }

  // Preview local limpio e inmediato (sin blur)
  const localURL = URL.createObjectURL(blob);
  const imgPrev = document.getElementById('perfilMascotaImg');
  if (imgPrev) { imgPrev.src = localURL; imgPrev.style.display = 'block'; imgPrev.style.removeProperty('filter'); imgPrev.style.removeProperty('opacity'); }

  if (typeof currentUser !== 'undefined' && currentUser && typeof subirFotoStorage === 'function') {
    try {
      const blobFile = new File([blob], 'mascota.jpg', { type: 'image/jpeg' });
      const url = await subirFotoStorage(blobFile, 'mascota');
      // Actualizar con URL de Supabase (re-query por ID por si el DOM cambió)
      const imgFinal = document.getElementById('perfilMascotaImg');
      if (imgFinal) { imgFinal.src = url; imgFinal.style.display = 'block'; _clearImgState('perfilMascotaImg'); }
      p.fotoMascota = url;
      _guardarFotoLocal(p);
      if (typeof guardarPerfilEnDB === 'function') guardarPerfilEnDB(p);
      if (typeof renderHome === 'function') renderHome();
      _fotoToast('¡Foto guardada en la nube! 🐾', 'ok');
    } catch(e) {
      // Error subiendo a Supabase: mostrar foto con blob URL temporal, no guardar base64 en localStorage
      _fotoToast('No se pudo guardar en la nube. La foto se perderá al cerrar la app. 🔁', 'err');
      const imgFb = document.getElementById('perfilMascotaImg');
      if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilMascotaImg'); }
      if (typeof renderHome === 'function') renderHome();
    }
  } else {
    // Sin cuenta: foto visible solo en esta sesión (blob URL), no se guarda base64 en localStorage
    const imgFb = document.getElementById('perfilMascotaImg');
    if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilMascotaImg'); }
    if (typeof renderHome === 'function') renderHome();
    _fotoToast('Foto visible en esta sesión. Crea una cuenta para guardarla. 🔑', 'info');
  }
}

async function cargarFotoDueno(input) {
  const f = input.files[0]; if (!f) return;
  input.value = '';

  const p = cargarPerfilLocal();
  _fotoToast('Procesando foto…', 'info');

  const init = document.getElementById('perfilOwnerInitial');
  if (init) init.style.display = 'none';

  let blob;
  try { blob = await _comprimirImagen(f, 600, 0.85); }
  catch { blob = f; }

  const localURL = URL.createObjectURL(blob);
  const imgPrev = document.getElementById('perfilOwnerImg');
  if (imgPrev) { imgPrev.src = localURL; imgPrev.style.display = 'block'; imgPrev.style.removeProperty('filter'); imgPrev.style.removeProperty('opacity'); }

  if (typeof currentUser !== 'undefined' && currentUser && typeof subirFotoStorage === 'function') {
    try {
      const blobFile = new File([blob], 'dueno.jpg', { type: 'image/jpeg' });
      const url = await subirFotoStorage(blobFile, 'dueno');
      const imgFinal = document.getElementById('perfilOwnerImg');
      if (imgFinal) { imgFinal.src = url; imgFinal.style.display = 'block'; _clearImgState('perfilOwnerImg'); }
      p.fotoDueno = url;
      _guardarFotoLocal(p);
      if (typeof guardarPerfilEnDB === 'function') guardarPerfilEnDB(p);
      if (typeof renderTopbarAuth === 'function') renderTopbarAuth();
      _fotoToast('¡Foto de perfil guardada! 😊', 'ok');
    } catch(e) {
      // Error subiendo a Supabase: mostrar foto con blob URL temporal, no guardar base64 en localStorage
      _fotoToast('No se pudo guardar en la nube. La foto se perderá al cerrar la app. 🔁', 'err');
      const imgFb = document.getElementById('perfilOwnerImg');
      if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilOwnerImg'); }
      if (typeof renderTopbarAuth === 'function') renderTopbarAuth();
    }
  } else {
    // Sin cuenta: foto visible solo en esta sesión (blob URL), no se guarda base64 en localStorage
    const imgFb = document.getElementById('perfilOwnerImg');
    if (imgFb) { imgFb.style.display = 'block'; _clearImgState('perfilOwnerImg'); }
    if (typeof renderTopbarAuth === 'function') renderTopbarAuth();
    _fotoToast('Foto visible en esta sesión. Crea una cuenta para guardarla. 🔑', 'info');
  }
}

/* ── Nombre mascota en pill ── */
function editarNombreMascota() {
  if (!perfilModoEdicion) { activarEdicion(); return; }
  const pill = document.getElementById('perfilMascotaNombre');
  if (!pill) return;
  const nuevo = prompt('Nombre de tu mascota:', pill.textContent);
  if (nuevo?.trim()) { pill.textContent = nuevo.trim(); }
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  const p = cargarPerfilLocal();
  renderPerfilUI(p);
  if (typeof renderSeccionPaseador === 'function') renderSeccionPaseador();
});


// ==========================================
// ARCHIVO: js/pet-gallery.js
// ==========================================

/* ══════════════════════════════════════
   PET GALLERY — Wufly
   Galería de mascotas de la comunidad
   Muestra las últimas 16 fotos subidas
   ══════════════════════════════════════ */

const PET_GALLERY_LIMIT = 4;

/* ── Cargar últimas 16 fotos de mascotas desde Supabase ── */
async function cargarFotosMascotas() {
  const container = document.getElementById('pet-gallery-grid');
  if (!container) return;

  try {
    // Token de sesión si existe, si no usar clave anónima (galería pública para todos)
    // SUPABASE_REF y SUPABASE_ANON vienen de js/config.js
    const stored = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF}-auth-token`) || 'null');
    const token = stored?.access_token || SUPABASE_ANON;

    // Llamada REST directa — funciona con y sin sesión
    const url = `https://${SUPABASE_REF}.supabase.co/rest/v1/profiles?select=id,nombre_mascota,tipo_mascota,foto_mascota_url,updated_at&foto_mascota_url=not.is.null&order=updated_at.desc&limit=${PET_GALLERY_LIMIT}`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    console.log('PetGallery: fotos cargadas:', data?.length);

    if (!data || data.length === 0) {
      _ocultarGaleriaSection();
      return;
    }

    _renderGalleryGrid(container, data);

    const heroGrid = document.getElementById('hero-pet-grid');
    if (heroGrid) _renderGalleryGrid(heroGrid, data);
  } catch (err) {
    console.warn('PetGallery: no se pudo cargar:', err.message);
    _ocultarGaleriaSection();
  }
}

/* ── Ocultar la sección si no hay fotos ── */
function _ocultarGaleriaSection() {
  const section = document.getElementById('pet-gallery-section');
  if (section) section.style.display = 'none';
}

/* ── Render del carrusel ── */
function _renderGalleryGrid(container, mascotas) {
  const especieEmoji = { perro: '🐕', gato: '🐈' };
  container.innerHTML = mascotas.map((m, i) => {
    const emoji = especieEmoji[m.tipo_mascota] || '🐾';
    const nombre = m.nombre_mascota || 'Mascota';
    return `
      <div
        class="pet-thumb"
        onclick="_abrirFotoMascota('${_escapar(m.foto_mascota_url)}', '${_escapar(nombre)}', '${emoji}')"
        style="
          position:relative;
          border-radius:14px;
          overflow:hidden;
          aspect-ratio:1/1;
          cursor:pointer;
          border:3px solid #ffffff47;
          box-shadow:0 4px 16px rgba(92,47,168,0.18);
          transition:transform 0.15s, box-shadow 0.15s;
          animation:petThumbIn 0.35s ease both;
          animation-delay:${i * 30}ms;
          flex-shrink:0;
        "
        onmousedown="this.style.transform='scale(0.93)'"
        onmouseup="this.style.transform='scale(1)'"
        ontouchstart="this.style.transform='scale(0.93)'"
        ontouchend="this.style.transform='scale(1)'"
      >
        <img
          src="${_escapar(m.foto_mascota_url)}"
          alt="${_escapar(nombre)}"
          loading="lazy"
          style="
            width:100%;height:100%;
            object-fit:cover;
            display:block;
            transition:opacity 0.3s;
          "
          onerror="this.parentElement.querySelector('.pet-thumb-fallback').style.display='flex';this.style.display='none';"
        >
        <!-- Fallback emoji si la imagen falla -->
        <div class="pet-thumb-fallback" style="
          display:none;
          position:absolute;inset:0;
          align-items:center;justify-content:center;
          font-size:32px;
          background:linear-gradient(135deg,#EDE9FE,#DDD6FE);
        ">${emoji}</div>
        <!-- Badge nombre en hover/tap -->
        <div style="
          position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(transparent, rgba(30,10,70,0.72));
          padding:18px 6px 5px;
          pointer-events:none;
        ">
          <div style="
            font-size:9px;font-weight:700;
            color:rgba(255,255,255,0.92);
            text-align:center;
            white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            text-shadow:0 1px 4px rgba(0,0,0,0.4);
          ">${emoji} ${_escapar(nombre)}</div>
        </div>
      </div>
    `;
  }).join('');
}

/* ── Escapa comillas para evitar XSS en atributos onclick ── */
function _escapar(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/* ── Modal lightbox para ver la foto ampliada ── */
function _abrirFotoMascota(url, nombre, emoji) {
  // Eliminar modal anterior si existe
  const prev = document.getElementById('pet-modal-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pet-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.82);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
    animation:petModalIn 0.22s ease;
    backdrop-filter:blur(6px);
    -webkit-backdrop-filter:blur(6px);
  `;
  overlay.onclick = (e) => { if (e.target === overlay) _cerrarFotoMascota(); };

  overlay.innerHTML = `
    <div style="
      position:relative;
      max-width:380px;width:100%;
      border-radius:24px;
      overflow:hidden;
      background:#1a0a3c;
      box-shadow:0 24px 64px rgba(0,0,0,0.6);
      animation:petModalCardIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <!-- Foto principal -->
      <div style="position:relative;aspect-ratio:1/1;background:#2d1460;">
        <img
          src="${url}"
          alt="${nombre}"
          style="width:100%;height:100%;object-fit:cover;display:block;"
          onerror="this.style.display='none';document.getElementById('pet-modal-emoji').style.display='flex';"
        >
        <div id="pet-modal-emoji" style="
          display:none;position:absolute;inset:0;
          align-items:center;justify-content:center;
          font-size:72px;background:linear-gradient(135deg,#3b1680,#7C4DCC);
        ">${emoji}</div>
      </div>
      <!-- Pie con nombre -->
      <div style="
        padding:16px 20px 20px;
        display:flex;align-items:center;justify-content:space-between;
      ">
        <div>
          <div style="font-size:18px;font-weight:800;color:white;font-family:'Funnel Display',sans-serif;">
            ${emoji} ${nombre}
          </div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;">Comunidad Wufly 🐾</div>
        </div>
        <button
          onclick="_cerrarFotoMascota()"
          style="
            width:40px;height:40px;border-radius:50%;
            border:none;cursor:pointer;
            background:rgba(255,255,255,0.1);
            color:white;font-size:18px;
            display:flex;align-items:center;justify-content:center;
            transition:background 0.15s;
          "
          onmouseenter="this.style.background='rgba(255,255,255,0.2)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.1)'"
        >✕</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Cerrar con tecla Escape
  const escHandler = (e) => { if (e.key === 'Escape') { _cerrarFotoMascota(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}

function _cerrarFotoMascota() {
  const overlay = document.getElementById('pet-modal-overlay');
  if (!overlay) return;
  overlay.style.animation = 'petModalOut 0.18s ease forwards';
  setTimeout(() => overlay.remove(), 180);
}

/* ── CSS de animaciones (inyectado una sola vez) ── */
(function _inyectarCSSGaleria() {
  if (document.getElementById('pet-gallery-css')) return;
  const style = document.createElement('style');
  style.id = 'pet-gallery-css';
  style.textContent = `
    @keyframes petThumbIn {
      from { opacity:0; transform:scale(0.85); }
      to   { opacity:1; transform:scale(1); }
    }
    @keyframes petModalIn {
      from { opacity:0; }
      to   { opacity:1; }
    }
    @keyframes petModalCardIn {
      from { opacity:0; transform:scale(0.88) translateY(20px); }
      to   { opacity:1; transform:scale(1) translateY(0); }
    }
    @keyframes petModalOut {
      from { opacity:1; }
      to   { opacity:0; }
    }
    .pet-thumb:hover {
      transform: scale(1.04) !important;
      box-shadow: 0 6px 20px rgba(92,47,168,0.28) !important;
    }
  `;
  document.head.appendChild(style);
})();

// ==========================================
// ARCHIVO: js/foto-juntos.js
// ==========================================

/* ══════════════════════════════════════
   FOTO JUNTOS — Wufly
   IA une foto de mascota + selfie en
   una imagen mágica compartible
   ══════════════════════════════════════ */

const JUNTOS_WORKER_URL = 'https://wufly-push.pablo77tapia.workers.dev/api/juntar-fotos';
// SUPABASE_REF y SUPABASE_ANON vienen de js/config.js
const SUPABASE_REF_J  = SUPABASE_REF;
const SUPABASE_ANON_J = SUPABASE_ANON;

/* ── Estado interno ── */
let _jFotoMascota   = null;
let _jSelfie        = null;
let _jLugar         = 'beautiful beach in Patagonia';
let _jUrlPermanente = null; // URL ya subida a Supabase Storage (pre-upload en background)

const JUNTOS_LUGARES = [
  { label: '🏖️ Playa',     prompt: 'beautiful beach in Patagonia' },
  { label: '🏔️ Andes',     prompt: 'snowy Andes mountains at sunset' },
  { label: '🌌 Espacio',    prompt: 'outer space surrounded by stars and galaxies' },
  { label: '🌿 Bosque',     prompt: 'magical enchanted forest with glowing lights' },
  { label: '🏙️ Ciudad',    prompt: 'futuristic neon city skyline at night' },
];

/* ── Leer tipo de mascota del perfil ── */
function _juntosGetTipoPet() {
  try {
    const perfil = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
    const tipo = perfil.tipomascota || '';
    const map = { perro: 'dog', gato: 'cat', conejo: 'rabbit', hamster: 'hamster', ave: 'bird', pez: 'fish' };
    return map[tipo] || 'pet';
  } catch { return 'pet'; }
}

/* ── Abrir modal ── */
function abrirJuntos() {
  const existing = document.getElementById('juntos-modal');
  if (existing) existing.remove();
  _jFotoMascota   = null;
  _jSelfie        = null;
  _jLugar         = JUNTOS_LUGARES[0].prompt;
  _jUrlPermanente = null;

  // Bloquear scroll del home mientras el modal está abierto
  document.body.style.overflow = 'hidden';

  const modal = document.createElement('div');
  modal.id = 'juntos-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.6);display:flex;align-items:flex-end;justify-content:center;animation:fadeIn 0.2s ease;';

  modal.innerHTML = `
    <div style="background:white;border-radius:28px 28px 0 0;width:100%;max-width:480px;padding:20px 20px 36px;max-height:90vh;overflow-y:auto;">

      <!-- Handle -->
      <div style="width:40px;height:4px;border-radius:100px;background:#E5E7EB;margin:0 auto 16px;"></div>

      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
        <div>
          <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:20px;color:#1F0A4A;">✨ Juntos</div>
          <div style="font-size:11px;color:#9CA3AF;margin-top:1px;">Tu y tu mascota en un lugar mágico</div>
        </div>
        <button onclick="cerrarJuntos()" style="width:34px;height:34px;border-radius:50%;border:1.5px solid #E5E7EB;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <svg viewBox="0 0 24 24" style="width:13px;height:13px;stroke:#6B7280;fill:none;stroke-width:2.5;stroke-linecap:round;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Fotos: lado a lado -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">

        <!-- Mascota -->
        <div>
          <div style="font-size:10px;font-weight:700;color:#9CA3AF;letter-spacing:0.06em;margin-bottom:6px;">TU MASCOTA</div>
          <div id="juntos-z-mascota" onclick="document.getElementById('juntos-input-mascota').click()"
            style="aspect-ratio:1/1;border:2px dashed #DDD6FE;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#FAFAFA;transition:all 0.2s;overflow:hidden;position:relative;">
            <input type="file" id="juntos-input-mascota" accept="image/*" style="display:none;" onchange="juntosCargarFoto(this,'mascota')">
            <div id="juntos-ph-mascota" style="text-align:center;">
              <div style="font-size:28px;margin-bottom:4px;">🐾</div>
              <div style="font-size:11px;font-weight:600;color:#7C4DCC;">Subir foto</div>
            </div>
            <div id="juntos-prev-mascota" style="display:none;position:absolute;inset:0;"></div>
          </div>
        </div>

        <!-- Selfie -->
        <div>
          <div style="font-size:10px;font-weight:700;color:#9CA3AF;letter-spacing:0.06em;margin-bottom:6px;">TU SELFIE</div>
          <div id="juntos-z-selfie" onclick="document.getElementById('juntos-input-selfie').click()"
            style="aspect-ratio:1/1;border:2px dashed #DDD6FE;border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#FAFAFA;transition:all 0.2s;overflow:hidden;position:relative;">
            <input type="file" id="juntos-input-selfie" accept="image/*" style="display:none;" onchange="juntosCargarFoto(this,'selfie')">
            <div id="juntos-ph-selfie" style="text-align:center;">
              <div style="font-size:28px;margin-bottom:4px;">🤳</div>
              <div style="font-size:11px;font-weight:600;color:#7C4DCC;">Subir selfie</div>
            </div>
            <div id="juntos-prev-selfie" style="display:none;position:absolute;inset:0;"></div>
          </div>
        </div>
      </div>

      <!-- Lugar -->
      <div style="margin-bottom:16px;">
        <div style="font-size:10px;font-weight:700;color:#9CA3AF;letter-spacing:0.06em;margin-bottom:8px;">LUGAR</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;" id="juntos-lugares">
          ${JUNTOS_LUGARES.map((l, i) => `
            <button onclick="juntosElegirLugar(this,'${l.prompt}')"
              style="padding:6px 12px;border-radius:100px;border:1.5px solid ${i===0?'#7C4DCC':'#E5E7EB'};background:${i===0?'#EDE9FE':'white'};font-size:12px;font-weight:600;color:${i===0?'#7C4DCC':'#6B7280'};cursor:pointer;transition:all 0.15s;white-space:nowrap;">
              ${l.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Botón Juntar -->
      <button id="juntos-btn" onclick="juntosGenerar()"
        style="width:100%;padding:14px;border:none;border-radius:14px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 6px 20px rgba(92,47,168,0.4);display:flex;align-items:center;justify-content:center;gap:10px;opacity:0.45;pointer-events:none;transition:opacity 0.2s;">
        <span style="font-size:18px;">✨</span> Juntar con IA
      </button>

      <!-- Resultado -->
      <div id="juntos-resultado" style="display:none;margin-top:16px;"></div>

    </div>
  `;
  document.body.appendChild(modal);
}

/* ── Cerrar modal con animación slide-down + reload ── */
function cerrarJuntos(recargar = false) {
  const m = document.getElementById('juntos-modal');
  if (!m) return;
  const sheet = m.firstElementChild;
  if (sheet) {
    sheet.style.transition = 'transform 0.35s cubic-bezier(0.4,0,1,1)';
    sheet.style.transform  = 'translateY(110%)';
  }
  m.style.transition  = 'background 0.3s ease';
  m.style.background  = 'rgba(0,0,0,0)';
  setTimeout(() => {
    m.remove();
    document.body.style.overflow = '';
    if (recargar) {
      if (typeof renderHome === 'function') renderHome();
      if (typeof cargarCarruselJuntos === 'function') cargarCarruselJuntos();
    }
  }, 350);
}

/* ── Inyectar keyframes una sola vez ── */
(function _juntosInjectStyles() {
  if (document.getElementById('juntos-keyframes')) return;
  const s = document.createElement('style');
  s.id = 'juntos-keyframes';
  s.textContent = `
    @keyframes juntosFadeIn  { from { opacity:0 } to { opacity:1 } }
    @keyframes juntosFadeOut { from { opacity:1 } to { opacity:0 } }
    @keyframes juntosSpin    { to { transform:rotate(360deg) } }
  `;
  document.head.appendChild(s);
})();

/* ── Overlay negro de procesamiento ── */
function _juntosShowOverlay(texto) {
  let ov = document.getElementById('juntos-overlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'juntos-overlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:4000;background:rgba(0,0,0,0.75);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;animation:juntosFadeIn 0.2s ease;';
    document.body.appendChild(ov);
    // Loop sin parpadeo: reiniciar manualmente al terminar
    ov.addEventListener('click', () => {}, { once: true }); // dummy para activar listener scope
  }
  // Loop sin parpadeo: reiniciar 0.1s antes del final para evitar frame negro
  requestAnimationFrame(() => {
    const vid = document.getElementById('juntos-video-gen');
    if (vid) vid.addEventListener('timeupdate', function() {
      if (this.duration && this.currentTime >= this.duration - 0.1) {
        this.currentTime = 0;
      }
    });
  });
  ov.innerHTML = `
    <div style="width:110px;height:110px;border-radius:50%;overflow:hidden;flex-shrink:0;">
      <video id="juntos-video-gen" src="img/generando.mp4" autoplay muted playsinline
        style="width:100%;height:100%;object-fit:cover;display:block;"></video>
    </div>
    <div style="color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;letter-spacing:0.02em;">${texto}</div>
  `;
}

function _juntosHideOverlay() {
  const ov = document.getElementById('juntos-overlay');
  if (ov) { ov.style.animation = 'juntosFadeOut 0.2s ease forwards'; setTimeout(() => ov.remove(), 200); }
}

/* ── Elegir lugar ── */
function juntosElegirLugar(btn, prompt) {
  _jLugar = prompt;
  document.querySelectorAll('#juntos-lugares button').forEach(b => {
    b.style.borderColor = '#E5E7EB';
    b.style.background  = 'white';
    b.style.color       = '#6B7280';
  });
  btn.style.borderColor = '#7C4DCC';
  btn.style.background  = '#EDE9FE';
  btn.style.color       = '#7C4DCC';
}

/* ── Cargar y comprimir foto ── */
function juntosCargarFoto(input, tipo) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 800;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else       { w = Math.round(w * MAX / h); h = MAX; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const b64 = canvas.toDataURL('image/jpeg', 0.82);

      if (tipo === 'mascota') {
        _jFotoMascota = b64;
        _juntosSetPreview('juntos-prev-mascota', 'juntos-ph-mascota', 'juntos-z-mascota', b64);
      } else {
        _jSelfie = b64;
        _juntosSetPreview('juntos-prev-selfie', 'juntos-ph-selfie', 'juntos-z-selfie', b64);
      }
      _juntosCheckBtn();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function _juntosSetPreview(prevId, phId, zoneId, src) {
  const prev = document.getElementById(prevId);
  const ph   = document.getElementById(phId);
  const zone = document.getElementById(zoneId);
  if (!prev) return;
  prev.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;display:block;">`;
  prev.style.display    = 'block';
  ph.style.display      = 'none';
  zone.style.borderColor = '#A78BFA';
  zone.style.borderStyle = 'solid';
}

function _juntosCheckBtn() {
  const btn = document.getElementById('juntos-btn');
  if (!btn) return;
  const listo = _jFotoMascota && _jSelfie;
  btn.style.opacity       = listo ? '1'    : '0.45';
  btn.style.pointerEvents = listo ? 'auto' : 'none';
}

/* ── Fusionar selfie + mascota en un solo canvas ── */
function _juntosCrearCanvasCombinado(selfieB64, mascotaB64) {
  return new Promise((resolve) => {
    const imgA = new Image();
    const imgB = new Image();
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded < 2) return;
      const H  = 512;
      const wA = Math.round(imgA.width  * H / imgA.height);
      const wB = Math.round(imgB.width  * H / imgB.height);
      const canvas = document.createElement('canvas');
      canvas.width  = wA + wB;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(imgA, 0,  0, wA, H);
      ctx.drawImage(imgB, wA, 0, wB, H);
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth   = 3;
      ctx.beginPath(); ctx.moveTo(wA, 0); ctx.lineTo(wA, H); ctx.stroke();
      resolve(canvas.toDataURL('image/jpeg', 0.88));
    };
    imgA.onload = onLoad; imgB.onload = onLoad;
    imgA.src = selfieB64; imgB.src = mascotaB64;
  });
}

/* ── Llamar al Worker y mostrar resultado ── */
async function juntosGenerar() {
  const btn       = document.getElementById('juntos-btn');
  const resultado = document.getElementById('juntos-resultado');
  if (!_jFotoMascota || !_jSelfie) return;

  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.5';
  resultado.style.display = 'none';
  _juntosShowOverlay('Creando tu foto mágica…');

  try {
    // Paso 1 — enviar fotos y obtener request_id
    const res = await fetch(JUNTOS_WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        selfie:      _jSelfie,
        fotoMascota: _jFotoMascota,
        lugar:       _jLugar,
        tipoPet:     _juntosGetTipoPet(),
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { requestId, statusUrl, responseUrl } = await res.json();
    if (!requestId || !statusUrl || !responseUrl) throw new Error('Respuesta incompleta del Worker');

    // Paso 2 — polling usando las URLs exactas de fal.ai
    let imagenUrl = null;
    const JUNTOS_STATUS_URL = JUNTOS_WORKER_URL.replace('/api/juntar-fotos', '/api/juntar-status');
    const tiempoInicio = Date.now();
    let intento = 0;

    while (!imagenUrl && Date.now() - tiempoInicio < 90000) {
      await new Promise(r => setTimeout(r, intento < 3 ? 4000 : 5000));
      intento++;

      const puntos = '.'.repeat((intento % 3) + 1);
      _juntosShowOverlay(`Creando tu foto mágica${puntos}`);

      const poll = await fetch(
        `${JUNTOS_STATUS_URL}?id=${requestId}&statusUrl=${encodeURIComponent(statusUrl)}&responseUrl=${encodeURIComponent(responseUrl)}`
      );
      if (!poll.ok) continue;
      const pollData = await poll.json();

      if (pollData.status === 'COMPLETED' && pollData.imagenUrl) {
        imagenUrl = pollData.imagenUrl;
      } else if (pollData.status === 'FAILED') {
        throw new Error('Job fallido en fal.ai');
      }
    }

    if (!imagenUrl) throw new Error('Timeout esperando imagen');

    _juntosHideOverlay();
    btn.style.display = 'none'; // ocultar botón "Juntar"

    // Pre-subir a Supabase Storage en background (sin bloquear UI)
    // Así cuando el usuario presione "Publicar", la imagen ya está lista
    _jUrlPermanente = null;
    if (typeof currentUser !== 'undefined' && currentUser?.id) {
      _juntosSubirStorage(imagenUrl)
        .then(url => { _jUrlPermanente = url; })
        .catch(err => console.warn('juntos: pre-subida falló (se reintentará al publicar):', err));
    }

    resultado.style.display = 'block';
    resultado.innerHTML = `
      <!-- Imagen generada -->
      <div style="border-radius:18px;overflow:hidden;box-shadow:0 6px 24px rgba(92,47,168,0.2);">
        <img src="${imagenUrl}" alt="Foto Juntos IA" style="width:100%;display:block;">
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button id="juntos-btn-publicar" data-url="${imagenUrl.replace(/"/g,'&quot;')}"
          onclick="juntosPublicarEnWufly(this.dataset.url, this)"
          style="flex:1;padding:13px;border:none;border-radius:13px;background:linear-gradient(135deg,#5C2FA8,#9333EA);color:white;font-family:'Funnel Display',sans-serif;font-weight:700;font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          🐾 Publicar en Wufly
        </button>
        <button data-url="${imagenUrl.replace(/"/g,'&quot;')}"
          onclick="juntosCompartirexterno(this.dataset.url)" title="Compartir en redes"
          style="padding:13px 15px;border:1.5px solid #E5E7EB;border-radius:13px;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" style="width:17px;height:17px;stroke:#6B7280;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>
      </div>
    `;

  } catch (err) {
    console.error('juntosGenerar:', err);
    _juntosHideOverlay();
    btn.innerHTML       = '<span style="font-size:18px;">✨</span> Juntar con IA';
    btn.style.pointerEvents = 'auto';
    btn.style.opacity       = '1';
    btn.style.display       = '';
    resultado.style.display = 'block';
    resultado.innerHTML = `
      <div style="background:#FEF2F2;border:1.5px solid #FCA5A5;border-radius:12px;padding:12px;font-size:13px;color:#DC2626;">
        No se pudo generar la imagen. Intenta de nuevo.
      </div>`;
  }
}

/* ── Publicar en la comunidad Wufly ── */
async function juntosPublicarEnWufly(imagenUrl, btn) {
  btn.style.pointerEvents = 'none';
  btn.style.opacity = '0.6';
  _juntosShowOverlay('Publicando en Wufly…');

  const _restaurar = () => {
    _juntosHideOverlay();
    btn.innerHTML       = '🐾 Publicar en Wufly';
    btn.style.pointerEvents = 'auto';
    btn.style.opacity   = '1';
  };

  try {
    const guardado = await _juntosGuardarComunidad(imagenUrl);

    if (guardado) {
      _juntosHideOverlay();
      if (typeof cargarCarruselJuntos === 'function') cargarCarruselJuntos();
      // Botón queda en verde — usuario cierra manualmente
      btn.innerHTML        = '✓ Publicado';
      btn.style.background = 'linear-gradient(135deg,#059669,#10B981)';
      btn.style.opacity    = '1';
      btn.style.pointerEvents = 'none';
      // Botón cerrar ahora recarga la app
      const closeBtn = document.querySelector('#juntos-modal button[onclick="cerrarJuntos()"]');
      if (closeBtn) closeBtn.setAttribute('onclick', 'cerrarJuntos(true)');
    } else {
      _restaurar();
      _juntosToast('No se pudo publicar. ¿Estás con sesión iniciada?');
    }
  } catch (err) {
    console.error('juntosPublicarEnWufly error:', err);
    _restaurar();
    _juntosToast(`Error: ${err.message || 'Intenta de nuevo.'}`);
  }
}

/* ── Compartir en redes sociales (menú nativo) ── */
async function juntosCompartirexterno(imagenUrl) {
  if (navigator.share) {
    try {
      await navigator.share({ title: '¡Mira esto! 🐾✨', text: '¡Mira la foto que generé con Wufly!', url: imagenUrl });
      return;
    } catch {}
  }
  try {
    await navigator.clipboard.writeText(imagenUrl);
    _juntosToast('¡Enlace copiado!');
  } catch {}
}

/* ── Descargar imagen ── */
function juntosDescargar(imagenUrl) {
  const a = document.createElement('a');
  a.href = imagenUrl; a.download = 'wufly-juntos.jpg';
  a.target = '_blank'; a.rel = 'noopener'; a.click();
}

/* ── Comprimir imagen desde URL externa → Blob JPEG ── */
async function _juntosComprimirImagen(url, maxPx = 1080, calidad = 0.78) {
  // Descargar via worker para evitar CORS (el worker ya tiene acceso a fal.ai)
  const proxyUrl = `${JUNTOS_WORKER_URL.replace('/api/juntar-fotos', '/api/proxy-imagen')}?url=${encodeURIComponent(url)}`;
  const fetchRes  = await fetch(proxyUrl);
  if (!fetchRes.ok) throw new Error('No se pudo descargar la imagen para comprimir');
  const blob = await fetchRes.blob();

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      if (w > maxPx || h > maxPx) {
        if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
        else       { w = Math.round(w * maxPx / h); h = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('canvas.toBlob falló')), 'image/jpeg', calidad);
    };
    img.onerror = () => reject(new Error('Error al cargar imagen en canvas'));
    // FileReader es más robusto que createObjectURL: evita fallos de MIME y ciclo de vida del blob
    const reader = new FileReader();
    reader.onloadend = () => { img.src = reader.result; };
    reader.onerror = () => reject(new Error('Error al leer el blob de imagen'));
    reader.readAsDataURL(blob);
  });
}

/* ── Obtener token JWT del usuario ── */
function _juntosGetToken() {
  let token = SUPABASE_ANON_J;
  try {
    const v2 = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF_J}-auth-token`) || 'null');
    if (v2?.access_token) return v2.access_token;
    const v1 = JSON.parse(localStorage.getItem('supabase.auth.token') || 'null');
    if (v1?.currentSession?.access_token) return v1.currentSession.access_token;
  } catch {}
  return token;
}

/* ── Descargar, comprimir y subir imagen a Supabase Storage ── */
/* Retorna la URL pública permanente, o lanza error */
async function _juntosSubirStorage(imagenUrl) {
  if (typeof currentUser === 'undefined' || !currentUser?.id) throw new Error('Sin sesión');

  const headers = { 'apikey': SUPABASE_ANON_J, 'Authorization': `Bearer ${_juntosGetToken()}` };

  // 1 — Comprimir (con fallback si el canvas falla)
  let blob;
  try {
    blob = await _juntosComprimirImagen(imagenUrl);
  } catch (err) {
    console.warn('juntos: compresión falló, descargando sin comprimir:', err);
    const proxyUrl = `${JUNTOS_WORKER_URL.replace('/api/juntar-fotos', '/api/proxy-imagen')}?url=${encodeURIComponent(imagenUrl)}`;
    const raw = await fetch(proxyUrl);
    if (!raw.ok) throw new Error(`Proxy fallback (${raw.status})`);
    blob = await raw.blob();
    if (!blob.type.startsWith('image/')) throw new Error('El proxy no devolvió una imagen válida');
  }

  // 2 — Subir a Supabase Storage
  const fileName = `${currentUser.id}_${Date.now()}.jpg`;
  const uploadRes = await fetch(
    `https://${SUPABASE_REF_J}.supabase.co/storage/v1/object/fotos-juntos/${fileName}`,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'image/jpeg', 'x-upsert': 'true' },
      body: blob,
    }
  );
  if (!uploadRes.ok) {
    const detail = await uploadRes.text().catch(() => uploadRes.status);
    throw new Error(`Upload (${uploadRes.status}): ${detail}`);
  }

  return `https://${SUPABASE_REF_J}.supabase.co/storage/v1/object/public/fotos-juntos/${fileName}`;
}

/* ── Guardar URL en tabla fotos_juntos (ya asume imagen subida a Storage) ── */
async function _juntosGuardarComunidad(imagenUrlFalai) {
  if (typeof currentUser === 'undefined' || !currentUser?.id) {
    console.warn('fotos_juntos: no hay usuario logueado');
    return false;
  }

  const headers = { 'apikey': SUPABASE_ANON_J, 'Authorization': `Bearer ${_juntosGetToken()}` };

  // 1 — Usar URL pre-subida si ya está lista; si no, subir ahora como fallback
  let urlPermanente = _jUrlPermanente;
  if (!urlPermanente) {
    _juntosShowOverlay('Optimizando imagen…');
    urlPermanente = await _juntosSubirStorage(imagenUrlFalai);
  }

  // 2 — Guardar en tabla fotos_juntos
  _juntosShowOverlay('Subiendo a Wufly…');
  const insertRes = await fetch(
    `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos`,
    {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json', 'Prefer': 'return=minimal' },
      body: JSON.stringify({ imagen_url: urlPermanente, user_id: currentUser.id }),
    }
  );
  if (!insertRes.ok) {
    const detail = await insertRes.text().catch(() => insertRes.status);
    console.error('fotos_juntos insert error:', insertRes.status, detail);
    throw new Error(`Insert (${insertRes.status}): ${detail}`);
  }

  // 5 — Limpiar: mantener solo las 10 más recientes
  _juntosPurgarAntiguos(headers).catch(e => console.warn('purgar:', e));

  return true;
}

/* ── Borrar fotos más allá del límite de 10 (tabla + Storage) ── */
async function _juntosPurgarAntiguos(headers) {
  const MAX = 10;

  // Traer todas ordenadas por fecha desc
  const listRes = await fetch(
    `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos?select=id,imagen_url&order=created_at.desc`,
    { headers }
  );
  if (!listRes.ok) return;
  const todas = await listRes.json();
  if (!Array.isArray(todas) || todas.length <= MAX) return;

  const sobran = todas.slice(MAX); // todo lo que pase del top 10

  for (const f of sobran) {
    // Borrar de Storage (extraer nombre de archivo de la URL)
    try {
      const fileName = f.imagen_url.split('/fotos-juntos/').pop();
      if (fileName) {
        await fetch(
          `https://${SUPABASE_REF_J}.supabase.co/storage/v1/object/fotos-juntos/${fileName}`,
          { method: 'DELETE', headers }
        );
      }
    } catch {}

    // Borrar de la tabla
    await fetch(
      `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos?id=eq.${f.id}`,
      { method: 'DELETE', headers }
    );
  }
  console.log(`juntos: ${sobran.length} foto(s) antigua(s) purgada(s)`);
}

/* ── Toast liviano ── */
function _juntosToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:#1F0A4A;color:white;padding:10px 18px;border-radius:100px;font-size:13px;font-weight:600;z-index:9999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.3);animation:fadeIn 0.2s ease;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* ── Cargar carrusel de fotos juntos para el home ── */
async function cargarCarruselJuntos() {
  const track   = document.getElementById('juntos-track');
  const section = document.getElementById('juntos-carousel-section');
  if (!track) return;

  try {
    const stored = JSON.parse(localStorage.getItem(`sb-${SUPABASE_REF_J}-auth-token`) || 'null');
    const token  = stored?.access_token || SUPABASE_ANON_J;

    const res = await fetch(
      `https://${SUPABASE_REF_J}.supabase.co/rest/v1/fotos_juntos?select=imagen_url,created_at&order=created_at.desc&limit=10`,
      { headers: { 'apikey': SUPABASE_ANON_J, 'Authorization': `Bearer ${token}` } }
    );

    if (!res.ok) throw new Error();
    const data = await res.json();
    if (!data || data.length === 0) { section?.style.setProperty('display','none'); return; }

    track.innerHTML = data.map(f => `
      <div onclick="_abrirFotoJuntos('${f.imagen_url.replace(/'/g,"&#39;")}')"
        style="flex:0 0 44%;aspect-ratio:1/1;border-radius:18px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.18);flex-shrink:0;">
        <img src="${f.imagen_url}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
    `).join('');

    if (section) section.style.display = 'block';

  } catch {
    if (section) section.style.display = 'none';
  }
}

/* ── Abrir foto Juntos en modal (idéntico al de mascotas) ── */
function _abrirFotoJuntos(url) {
  const prev = document.getElementById('pet-modal-overlay');
  if (prev) prev.remove();

  const overlay = document.createElement('div');
  overlay.id = 'pet-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.82);
    display:flex;align-items:center;justify-content:center;
    padding:20px;
    animation:petModalIn 0.22s ease;
    backdrop-filter:blur(6px);
    -webkit-backdrop-filter:blur(6px);
  `;
  overlay.onclick = (e) => { if (e.target === overlay) _cerrarFotoJuntos(); };

  overlay.innerHTML = `
    <div style="
      position:relative;
      max-width:380px;width:100%;
      border-radius:24px;
      overflow:hidden;
      background:#1a0a3c;
      box-shadow:0 24px 64px rgba(0,0,0,0.6);
      animation:petModalCardIn 0.25s cubic-bezier(0.34,1.56,0.64,1);
    ">
      <div style="position:relative;aspect-ratio:1/1;background:#2d1460;">
        <img src="${url}" alt="Foto Juntos IA"
          style="width:100%;height:100%;object-fit:cover;display:block;">
      </div>
      <div style="padding:16px 20px 20px;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:18px;font-weight:800;color:white;font-family:'Funnel Display',sans-serif;">✨ Juntos — IA</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px;">Comunidad Wufly 🐾</div>
        </div>
        <button onclick="_cerrarFotoJuntos()"
          style="width:40px;height:40px;border-radius:50%;border:none;cursor:pointer;background:rgba(255,255,255,0.1);color:white;font-size:18px;display:flex;align-items:center;justify-content:center;"
          onmouseenter="this.style.background='rgba(255,255,255,0.2)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.1)'"
        >✕</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  const escHandler = (e) => { if (e.key === 'Escape') { _cerrarFotoJuntos(); document.removeEventListener('keydown', escHandler); } };
  document.addEventListener('keydown', escHandler);
}

function _cerrarFotoJuntos() {
  const overlay = document.getElementById('pet-modal-overlay');
  if (!overlay) return;
  overlay.style.animation = 'petModalOut 0.18s ease forwards';
  setTimeout(() => overlay.remove(), 180);
}


// ==========================================
// ARCHIVO: js/camera-capture.js
// ==========================================

/* ══════════════════════════════════════════════════════════════
   CAMERA CAPTURE - WUFLY
   Interfaz de cámara custom para fotos cuadradas y videos verticales
   Inspirada en CumpLand CameraCapture.jsx
   ══════════════════════════════════════════════════════════════ */

let _cameraStream = null;
let _cameraRecorder = null;
let _cameraChunks = [];
let _cameraTimer = null;
let _cameraSecondsLeft = 10;
let _cameraFacingMode = 'environment';
let _cameraType = 'video'; // 'video' | 'photo'
let _cameraOnComplete = null;
let _cameraOnClose = null;

const CAMERA_MAX_DURATION = 10; // segundos
const CAMERA_MIN_DURATION = 8;

/* ══ ABRIR CÁMARA ══ */
function openCamera(type = 'video', onComplete, onClose) {
  _cameraType = type;
  _cameraOnComplete = onComplete;
  _cameraOnClose = onClose;
  _cameraFacingMode = 'environment';
  _cameraSecondsLeft = CAMERA_MAX_DURATION;

  const overlay = document.createElement('div');
  overlay.id = 'cameraOverlay';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9999; display:flex; flex-direction:column;
    background:#000; color:white; overflow:hidden; height:100dvh;
  `;

  overlay.innerHTML = _buildCameraHTML(type);
  document.body.appendChild(overlay);

  _startCamera();
  _attachCameraEvents();
}

/* ══ CONSTRUIR HTML ══ */
function _buildCameraHTML(type) {
  const isVideo = type === 'video';

  return `
    <!-- Barra superior -->
    <div style="position:absolute;top:0;left:0;right:0;z-index:10;padding:16px 20px;
      display:flex;justify-content:space-between;align-items:center;
      background:linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);"
      class="safe-area-top">
      <button id="camCloseBtn" style="
        width:40px; height:40px; border-radius:50%; border:none;
        background:rgba(0,0,0,0.4); color:white; font-size:20px;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
      ">✕</button>

      ${isVideo ? `
      <div id="camCountdown" style="
        display:none; align-items:center; gap:8px;
        background:#DC2626; padding:6px 16px; border-radius:20px;
        font-size:13px; font-weight:700; animation:pulse 1s infinite;
      ">
        <span style="width:8px;height:8px;background:white;border-radius:50%;"></span>
        <span id="camCountdownText">0:10</span>
      </div>
      ` : '<div></div>'}

      <button id="camSwitchBtn" style="
        width:40px; height:40px; border-radius:50%; border:none;
        background:rgba(0,0,0,0.4); color:white; font-size:18px;
        cursor:pointer; display:flex; align-items:center; justify-content:center;
      ">🔄</button>
    </div>

    <!-- Visor de cámara -->
    <div id="camViewfinder" style="
      flex:1; position:relative; display:flex; align-items:center; justify-content:center;
      background:#000; overflow:hidden; padding-top:56px;
    ">
      <!-- Loading -->
      <div id="camLoading" style="
        position:absolute; inset:0; display:flex; flex-direction:column;
        align-items:center; justify-content:center; gap:12px; background:#0a0a0a;
      ">
        <div style="
          width:36px; height:36px; border:3px solid rgba(124,77,204,0.25);
          border-top-color:var(--purple); border-radius:50%;
          animation:spin 0.8s linear infinite;
        "></div>
        <p style="font-size:12px; color:#888;">Encendiendo cámara...</p>
      </div>

      <!-- Error -->
      <div id="camError" style="
        position:absolute; inset:0; display:none; flex-direction:column;
        align-items:center; justify-content:center; gap:16px; padding:24px;
        text-align:center; background:#0a0a0a;
      ">
        <div style="font-size:40px;">⚠️</div>
        <p style="font-size:13px; color:#ccc;">No se pudo acceder a la cámara. Verifica los permisos.</p>
        <button id="camFallbackBtn" style="
          font-size:12px; background:#1e1e1e; color:white; font-weight:700;
          padding:10px 16px; border-radius:12px; border:none; cursor:pointer;
        ">Usar selector de archivos</button>
      </div>

      <!-- Video element -->
      <video id="camVideo" autoplay playsinline muted style="
        width:100%; height:100%; object-fit:contain;
      "></video>

      <!-- Guía cuadrada para fotos -->
      ${!isVideo ? `
      <div id="camSquareGuide" style="
        position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
        width:min(85vw, 85vh); height:min(85vw, 85vh);
        border:2px solid rgba(255,255,255,0.3); border-radius:12px;
        pointer-events:none;
      "></div>
      ` : ''}

      <!-- Barra de progreso video -->
      ${isVideo ? `
      <div id="camProgressBar" style="
        position:absolute; bottom:16px; left:24px; right:24px;
        height:6px; background:rgba(255,255,255,0.2); border-radius:3px;
        overflow:hidden; display:none;
      ">
        <div id="camProgressFill" style="
          height:100%; background:#DC2626; border-radius:3px;
          transition:width 1s linear; width:0%;
        "></div>
      </div>
      ` : ''}
    </div>

    <!-- Panel inferior -->
    <div style="
      height:100px; background:#000; display:flex; align-items:center;
      justify-content:center; flex-shrink:0;
    " class="safe-area-bottom">
      ${isVideo ? `
      <!-- Botón grabar video -->
      <button id="camRecordBtn" style="
        width:68px; height:68px; border-radius:16px; border:4px solid white;
        background:#DC2626; cursor:pointer; display:flex;
        align-items:center; justify-content:center; transition:all 0.2s;
      ">
        <div id="camRecordIcon" style="
          width:28px; height:28px; background:#DC2626; border-radius:50%;
          border:2px solid white;
        "></div>
      </button>
      ` : `
      <!-- Botón foto -->
      <button id="camPhotoBtn" style="
        width:68px; height:68px; border-radius:50%; border:4px solid #555;
        background:white; cursor:pointer; display:flex;
        align-items:center; justify-content:center; transition:all 0.2s;
      ">
        <div style="
          width:56px; height:56px; background:white; border-radius:50%;
          border:1px solid #ddd;
        "></div>
      </button>
      `}
    </div>

    <style>
      @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
      @keyframes spin { to{transform:rotate(360deg)} }
    </style>
  `;
}

/* ══ INICIAR CÁMARA ══ */
async function _startCamera() {
  const video = document.getElementById('camVideo');
  const loading = document.getElementById('camLoading');
  const error = document.getElementById('camError');

  try {
    // Detener stream anterior
    _stopCamera();

    const constraints = {
      video: {
        facingMode: { ideal: _cameraFacingMode },
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: _cameraType === 'video'
    };

    _cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = _cameraStream;

    // Aplicar espejo si es cámara frontal
    if (_cameraFacingMode === 'user') {
      video.style.transform = 'scaleX(-1)';
    } else {
      video.style.transform = 'none';
    }

    loading.style.display = 'none';
    error.style.display = 'none';
  } catch (err) {
    console.error('Camera error:', err);
    loading.style.display = 'none';
    error.style.display = 'flex';
  }
}

/* ══ DETENER CÁMARA ══ */
function _stopCamera() {
  if (_cameraStream) {
    _cameraStream.getTracks().forEach(track => track.stop());
    _cameraStream = null;
  }
  if (_cameraTimer) {
    clearInterval(_cameraTimer);
    _cameraTimer = null;
  }
}

/* ══ EVENTOS ══ */
function _attachCameraEvents() {
  // Cerrar
  document.getElementById('camCloseBtn')?.addEventListener('click', _closeCamera);

  // Rotar cámara
  document.getElementById('camSwitchBtn')?.addEventListener('click', () => {
    _cameraFacingMode = _cameraFacingMode === 'environment' ? 'user' : 'environment';
    _startCamera();
  });

  // Fallback a selector de archivos
  document.getElementById('camFallbackBtn')?.addEventListener('click', () => {
    _closeCamera();
    _openFileFallback();
  });

  if (_cameraType === 'video') {
    // Grabar video
    document.getElementById('camRecordBtn')?.addEventListener('click', _toggleRecording);
  } else {
    // Tomar foto
    document.getElementById('camPhotoBtn')?.addEventListener('click', _takePhoto);
  }
}

/* ══ TOGGLE GRABACIÓN ══ */
function _toggleRecording() {
  if (_cameraRecorder && _cameraRecorder.state === 'recording') {
    _stopRecording();
  } else {
    _startRecording();
  }
}

/* ══ INICIAR GRABACIÓN ══ */
function _startRecording() {
  if (!_cameraStream) return;

  _cameraChunks = [];

  // Seleccionar codec compatible
  let options = { mimeType: 'video/webm;codecs=vp8,opus' };
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    options = { mimeType: 'video/webm' };
  }
  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    options = { mimeType: 'video/mp4' };
  }

  try {
    _cameraRecorder = new MediaRecorder(_cameraStream, options);

    _cameraRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        _cameraChunks.push(e.data);
      }
    };

    _cameraRecorder.onstop = () => {
      const blob = new Blob(_cameraChunks, { type: _cameraRecorder.mimeType || 'video/webm' });
      if (_cameraOnComplete) _cameraOnComplete(blob);
      _closeCamera();
    };

    _cameraRecorder.start();

    // UI: modo grabando
    const btn = document.getElementById('camRecordBtn');
    const icon = document.getElementById('camRecordIcon');
    const countdown = document.getElementById('camCountdown');
    const progress = document.getElementById('camProgressBar');

    if (btn) {
      btn.style.borderRadius = '50%';
      btn.style.background = '#DC2626';
    }
    if (icon) {
      icon.style.width = '22px';
      icon.style.height = '22px';
      icon.style.borderRadius = '4px';
      icon.style.background = 'white';
      icon.style.border = 'none';
    }
    if (countdown) countdown.style.display = 'flex';
    if (progress) progress.style.display = 'block';

    // Countdown
    _cameraSecondsLeft = CAMERA_MAX_DURATION;
    _updateCountdown();

    _cameraTimer = setInterval(() => {
      _cameraSecondsLeft--;
      _updateCountdown();

      // Actualizar barra de progreso
      const fill = document.getElementById('camProgressFill');
      if (fill) {
        const pct = ((CAMERA_MAX_DURATION - _cameraSecondsLeft) / CAMERA_MAX_DURATION) * 100;
        fill.style.width = pct + '%';
      }

      if (_cameraSecondsLeft <= 0) {
        _stopRecording();
      }
    }, 1000);

  } catch (err) {
    console.error('MediaRecorder error:', err);
    alert('Tu navegador no soporta grabación de video.');
  }
}

/* ══ DETENER GRABACIÓN ══ */
function _stopRecording() {
  if (_cameraRecorder && _cameraRecorder.state !== 'inactive') {
    _cameraRecorder.stop();
  }
  if (_cameraTimer) {
    clearInterval(_cameraTimer);
    _cameraTimer = null;
  }
}

/* ══ ACTUALIZAR COUNTDOWN ══ */
function _updateCountdown() {
  const text = document.getElementById('camCountdownText');
  if (text) {
    const secs = _cameraSecondsLeft;
    text.textContent = `0:${secs < 10 ? '0' + secs : secs}`;
  }
}

/* ══ TOMAR FOTO ══ */
function _takePhoto() {
  const video = document.getElementById('camVideo');
  if (!video || !_cameraStream) return;

  const canvas = document.createElement('canvas');
  const size = Math.min(video.videoWidth, video.videoHeight);
  canvas.width = 800;  // Salida cuadrada 800x800
  canvas.height = 800;

  const ctx = canvas.getContext('2d');

  // Recortar al centro (formato cuadrado)
  const srcX = (video.videoWidth - size) / 2;
  const srcY = (video.videoHeight - size) / 2;

  // Si es cámara frontal, voltear horizontalmente
  if (_cameraFacingMode === 'user') {
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(video, srcX, srcY, size, size, 0, 0, 800, 800);

  canvas.toBlob((blob) => {
    if (blob && _cameraOnComplete) {
      _cameraOnComplete(blob);
    }
    _closeCamera();
  }, 'image/jpeg', 0.7);
}

/* ══ CERRAR CÁMARA ══ */
function _closeCamera() {
  _stopCamera();
  _cameraRecorder = null;
  _cameraChunks = [];

  const overlay = document.getElementById('cameraOverlay');
  if (overlay) {
    overlay.remove();
  }

  if (_cameraOnClose) _cameraOnClose();
  _cameraOnComplete = null;
  _cameraOnClose = null;
}

/* ══ FALLBACK: SELECTOR DE ARCHIVOS ══ */
function _openFileFallback() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = _cameraType === 'video' ? 'video/*' : 'image/*';
  input.capture = 'environment';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file && _cameraOnComplete) {
      _cameraOnComplete(file);
    }
  };

  input.click();
}

/* ══ API PÚBLICA ══ */
window.openCamera = openCamera;


// ==========================================
// ARCHIVO: js/media-compress.js
// ==========================================

/* ══════════════════════════════════════════════════════════════
   MEDIA COMPRESS - WUFLY
   Compresión de video (vertical 9:16) y foto (cuadrada 1:1)
   Objetivo: videos ~500KB, fotos ~150KB
   ══════════════════════════════════════════════════════════════ */

const COMPRESS_VIDEO_MAX_SIZE = 600 * 1024;  // 600KB max
const COMPRESS_PHOTO_MAX_SIZE = 180 * 1024;  // 180KB max
const COMPRESS_VIDEO_BITRATE = 400000;        // 400kbps
const COMPRESS_PHOTO_QUALITY = 0.65;         // JPEG quality

/* ══ COMPRIMIR VIDEO ══ */
async function compressVideo(blob) {
  return new Promise(async (resolve) => {
    try {
      // Si ya es pequeño, retornar directo
      if (blob.size <= COMPRESS_VIDEO_MAX_SIZE) {
        resolve(blob);
        return;
      }

      // Crear video element para procesar
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;

      const url = URL.createObjectURL(blob);
      video.src = url;

      video.onloadedmetadata = async () => {
        // Canvas vertical 9:16 (720x1280)
        const canvas = document.createElement('canvas');
        const targetWidth = 720;
        const targetHeight = 1280;
        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');

        // MediaRecorder para re-comprimir
        const stream = canvas.captureStream(24);

        // Agregar audio si existe
        if (video.captureStream) {
          const originalStream = video.captureStream();
          const audioTracks = originalStream.getAudioTracks();
          audioTracks.forEach(track => stream.addTrack(track));
        }

        let options = { mimeType: 'video/webm;codecs=vp8', videoBitsPerSecond: COMPRESS_VIDEO_BITRATE };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'video/webm', videoBitsPerSecond: COMPRESS_VIDEO_BITRATE };
        }

        const recorder = new MediaRecorder(stream, options);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
          const compressed = new Blob(chunks, { type: 'video/webm' });
          URL.revokeObjectURL(url);

          // Si sigue siendo muy grande, reducir calidad
          if (compressed.size > COMPRESS_VIDEO_MAX_SIZE) {
            console.log(`Video comprimido: ${blob.size} → ${compressed.size} bytes`);
          }
          resolve(compressed);
        };

        recorder.start();

        // Dibujar frames del video al canvas
        const drawFrame = () => {
          if (video.ended || video.paused) return;

          // Calcular recorte centrado (mantener aspecto 9:16)
          const videoAspect = video.videoWidth / video.videoHeight;
          const targetAspect = targetWidth / targetHeight;

          let drawWidth, drawHeight, offsetX, offsetY;

          if (videoAspect > targetAspect) {
            // Video más ancho - recortar lados
            drawHeight = video.videoHeight;
            drawWidth = drawHeight * targetAspect;
            offsetX = (video.videoWidth - drawWidth) / 2;
            offsetY = 0;
          } else {
            // Video más alto - recortar arriba/abajo
            drawWidth = video.videoWidth;
            drawHeight = drawWidth / targetAspect;
            offsetX = 0;
            offsetY = (video.videoHeight - drawHeight) / 2;
          }

          ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight, 0, 0, targetWidth, targetHeight);

          if (!video.ended) {
            requestAnimationFrame(drawFrame);
          }
        };

        video.onplay = () => {
          drawFrame();
        };

        // Reproducir y grabar
        await video.play();

        // Detener después de la duración del video
        setTimeout(() => {
          video.pause();
          recorder.stop();
        }, video.duration * 1000);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(blob); // Retornar original si hay error
      };

    } catch (err) {
      console.error('Video compression error:', err);
      resolve(blob); // Retornar original si hay error
    }
  });
}

/* ══ COMPRIMIR FOTO ══ */
async function compressPhoto(blob) {
  return new Promise((resolve) => {
    try {
      // Si ya es pequeña, retornar directo
      if (blob.size <= COMPRESS_PHOTO_MAX_SIZE) {
        resolve(blob);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(blob);

      img.onload = () => {
        // Canvas cuadrado 800x800
        const canvas = document.createElement('canvas');
        const size = 800;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');

        // Recortar al centro (formato cuadrado)
        const imgAspect = img.width / img.height;
        let srcX, srcY, srcW, srcH;

        if (imgAspect > 1) {
          // Imagen más ancha - recortar lados
          srcH = img.height;
          srcW = srcH;
          srcX = (img.width - srcW) / 2;
          srcY = 0;
        } else {
          // Imagen más alta - recortar arriba/abajo
          srcW = img.width;
          srcH = srcW;
          srcX = 0;
          srcY = (img.height - srcH) / 2;
        }

        ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, size, size);

        canvas.toBlob((compressedBlob) => {
          URL.revokeObjectURL(url);

          if (compressedBlob) {
            console.log(`Foto comprimida: ${blob.size} → ${compressedBlob.size} bytes`);
            resolve(compressedBlob);
          } else {
            resolve(blob);
          }
        }, 'image/jpeg', COMPRESS_PHOTO_QUALITY);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(blob);
      };

      img.src = url;
    } catch (err) {
      console.error('Photo compression error:', err);
      resolve(blob);
    }
  });
}

/* ══ GENERAR THUMBNAIL ══ */
async function generateThumbnail(videoBlob) {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;

      const url = URL.createObjectURL(videoBlob);
      video.src = url;

      video.onloadeddata = () => {
        // Buscar frame a los 2 segundos
        video.currentTime = Math.min(2, video.duration * 0.25);
      };

      video.onseeked = () => {
        // Canvas cuadrado 200x200 para thumbnail
        const canvas = document.createElement('canvas');
        const size = 200;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d');

        // Recortar al centro
        const videoAspect = video.videoWidth / video.videoHeight;
        let srcX, srcY, srcW, srcH;

        if (videoAspect > 1) {
          srcH = video.videoHeight;
          srcW = srcH;
          srcX = (video.videoWidth - srcW) / 2;
          srcY = 0;
        } else {
          srcW = video.videoWidth;
          srcH = srcW;
          srcX = 0;
          srcY = (video.videoHeight - srcH) / 2;
        }

        ctx.drawImage(video, srcX, srcY, srcW, srcH, 0, 0, size, size);

        canvas.toBlob((thumbBlob) => {
          URL.revokeObjectURL(url);
          resolve(thumbBlob || videoBlob);
        }, 'image/jpeg', 0.6);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(videoBlob);
      };

    } catch (err) {
      console.error('Thumbnail generation error:', err);
      resolve(videoBlob);
    }
  });
}

/* ══ API PÚBLICA ══ */
window.compressVideo = compressVideo;
window.compressPhoto = compressPhoto;
window.generateThumbnail = generateThumbnail;


// ==========================================
// ARCHIVO: js/media.js
// ==========================================

/* ══════════════════════════════════════════════════════════════
   MEDIA - WUFLY
   Lógica principal: upload, galerías, shorts públicos
   ══════════════════════════════════════════════════════════════ */

/* ══ SUB-TABS DE MEDIA ══ */
function switchMediaTab(tab) {
  const subs = ['videos', 'fotos', 'galerias'];
  subs.forEach(s => {
    const el = document.getElementById('msub-' + s);
    if (el) el.style.display = s === tab ? 'block' : 'none';
    const btn = document.getElementById('mtab-' + s);
    if (btn) {
      btn.style.background = s === tab ? 'var(--purple)' : 'transparent';
      btn.style.color = s === tab ? 'white' : 'var(--text-muted)';
    }
  });

  // Renderizar contenido según tab
  if (tab === 'videos') renderMediaVideos();
  if (tab === 'fotos') renderMediaFotos();
  if (tab === 'galerias') renderMediaGalerias();
}

/* ══ RENDER VIDEOS PRIVADOS ══ */
async function renderMediaVideos() {
  const container = document.getElementById('msub-videos');
  if (!container || !currentUser) return;

  container.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="
        width:48px; height:48px; border-radius:50%; background:var(--purple-light);
        display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      ">
        <span style="font-size:24px;">🎬</span>
      </div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
        Crea tu primer video
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:16px;">
        Videos de 8-10 segundos estilo Reels.<br>Solo tú puedes verlos.
      </div>
      <button onclick="mediaCreateVideo()" class="btn-primary" style="
        padding:12px 24px; font-size:13px;
      ">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Grabar video
      </button>
    </div>
  `;

  // Cargar videos del usuario
  try {
    const { data: videos, error } = await db
      .from('media_videos')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (videos && videos.length > 0) {
      let html = `
        <div style="padding:0 2px 12px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">
            TUS VIDEOS (${videos.length})
          </div>
        </div>
      `;

      videos.forEach(v => {
        const fecha = new Date(v.created_at);
        const expira = new Date(v.expires_at);
        const horasRestantes = Math.max(0, Math.floor((expira - Date.now()) / (1000 * 60 * 60)));
        const sizeKB = Math.round(v.size_bytes / 1024);

        html += `
          <div style="
            background:var(--surface); border-radius:14px; border:1.5px solid var(--border-md);
            margin-bottom:10px; overflow:hidden;
          ">
            <div style="
              height:140px; background:linear-gradient(135deg,#1a1a2e,#16213e);
              display:flex; align-items:center; justify-content:center; position:relative;
            ">
              ${v.thumbnail_url ? `
                <img src="${_getMediaUrl(v.thumbnail_url)}" style="width:100%;height:100%;object-fit:cover;" alt="video">
              ` : `
                <span style="font-size:40px;">🎬</span>
              `}
              <div style="
                position:absolute; bottom:8px; right:8px;
                background:rgba(0,0,0,0.7); padding:4px 8px; border-radius:6px;
                font-size:11px; font-weight:600;
              ">
                ${v.duration || 10}s • ${sizeKB}KB
              </div>
              <div style="
                position:absolute; top:8px; right:8px;
                background:${horasRestantes > 0 ? 'rgba(220,38,38,0.9)' : 'rgba(100,100,100,0.9)'};
                padding:3px 8px; border-radius:6px; font-size:10px; font-weight:600;
              ">
                ${horasRestantes > 0 ? `⏱ ${horasRestantes}h restantes` : '⏱ Expirado'}
              </div>
            </div>
            <div style="padding:10px 12px; display:flex; justify-content:space-between; align-items:center;">
              <div style="font-size:11px; color:var(--text-muted);">
                ${fecha.toLocaleDateString('es-CL')} ${fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <button onclick="mediaDeleteVideo('${v.id}')" style="
                background:none; border:none; color:#DC2626; font-size:11px;
                font-weight:600; cursor:pointer; padding:4px 8px;
              ">Eliminar</button>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    }
  } catch (err) {
    console.error('Error loading videos:', err);
  }
}

/* ══ RENDER FOTOS PRIVADAS ══ */
async function renderMediaFotos() {
  const container = document.getElementById('msub-fotos');
  if (!container || !currentUser) return;

  container.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="
        width:48px; height:48px; border-radius:50%; background:var(--purple-light);
        display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      ">
        <span style="font-size:24px;">📸</span>
      </div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
        Tomar foto
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:16px;">
        Fotos cuadradas comprimidas.<br>Solo tú puedes verlas.
      </div>
      <button onclick="mediaCreatePhoto()" class="btn-primary" style="
        padding:12px 24px; font-size:13px;
      ">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        Tomar foto
      </button>
    </div>
  `;

  // Cargar fotos del usuario
  try {
    const { data: photos, error } = await db
      .from('media_photos')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (photos && photos.length > 0) {
      let html = `
        <div style="padding:0 2px 12px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">
            TUS FOTOS (${photos.length})
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:4px;padding:0 2px;">
      `;

      photos.forEach(p => {
        const sizeKB = Math.round(p.size_bytes / 1024);
        html += `
          <div style="
            aspect-ratio:1; border-radius:8px; overflow:hidden; position:relative;
            background:var(--surface); border:1px solid var(--border-md);
          ">
            <img src="${_getMediaUrl(p.photo_url)}" style="width:100%;height:100%;object-fit:cover;" alt="foto">
            <button onclick="mediaDeletePhoto('${p.id}')" style="
              position:absolute; top:4px; right:4px;
              width:20px; height:20px; border-radius:50%; border:none;
              background:rgba(0,0,0,0.6); color:white; font-size:10px;
              cursor:pointer; display:flex; align-items:center; justify-content:center;
            ">✕</button>
          </div>
        `;
      });

      html += '</div>';
      container.innerHTML = html;
    }
  } catch (err) {
    console.error('Error loading photos:', err);
  }
}

/* ══ RENDER GALERÍAS ══ */
async function renderMediaGalerias() {
  const container = document.getElementById('msub-galerias');
  if (!container || !currentUser) return;

  container.innerHTML = `
    <div style="text-align:center;padding:20px;">
      <div style="
        width:48px; height:48px; border-radius:50%; background:var(--purple-light);
        display:flex; align-items:center; justify-content:center; margin:0 auto 12px;
      ">
        <span style="font-size:24px;">🖼️</span>
      </div>
      <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:16px;color:var(--text);margin-bottom:6px;">
        Crear galería
      </div>
      <div style="font-size:12px;color:var(--text-muted);line-height:1.5;margin-bottom:16px;">
        Organiza tus fotos en galerías.<br>
        <em style="color:var(--purple);">Próximamente: galerías animadas para compartir</em>
      </div>
      <button onclick="mediaCreateGallery()" class="btn-primary" style="
        padding:12px 24px; font-size:13px;
      ">
        <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:white;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle;margin-right:6px;">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        Nueva galería
      </button>
    </div>
  `;

  // Cargar galerías del usuario
  try {
    const { data: galleries, error } = await db
      .from('media_galleries')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (galleries && galleries.length > 0) {
      let html = `
        <div style="padding:0 2px 12px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);letter-spacing:0.07em;margin-bottom:10px;">
            TUS GALERÍAS (${galleries.length})
          </div>
        </div>
      `;

      galleries.forEach(g => {
        const fecha = new Date(g.created_at);
        html += `
          <div style="
            background:var(--surface); border-radius:14px; border:1.5px solid var(--border-md);
            margin-bottom:10px; padding:14px; display:flex; gap:12px; align-items:center;
          ">
            <div style="
              width:56px; height:56px; border-radius:10px; background:var(--purple-light);
              display:flex; align-items:center; justify-content:center; flex-shrink:0;
            ">
              ${g.cover_url ? `
                <img src="${_getMediaUrl(g.cover_url)}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;" alt="">
              ` : `
                <span style="font-size:24px;">🖼️</span>
              `}
            </div>
            <div style="flex:1; min-width:0;">
              <div style="font-weight:700;font-size:14px;color:var(--text);margin-bottom:2px;">${g.name}</div>
              <div style="font-size:11px;color:var(--text-muted);">
                ${g.photo_count || 0} fotos • ${fecha.toLocaleDateString('es-CL')}
              </div>
            </div>
            <button onclick="mediaDeleteGallery('${g.id}')" style="
              background:none; border:none; color:#DC2626; font-size:11px;
              font-weight:600; cursor:pointer; padding:4px 8px;
            ">Eliminar</button>
          </div>
        `;
      });

      container.innerHTML = html;
    }
  } catch (err) {
    console.error('Error loading galleries:', err);
  }
}

/* ══ CREAR VIDEO ══ */
function mediaCreateVideo() {
  if (!currentUser) {
    abrirAuthModal('login');
    return;
  }

  openCamera('video', async (blob) => {
    // Mostrar loading
    _mediaShowLoading('Procesando video...');

    try {
      // Comprimir video
      const compressed = await compressVideo(blob);

      // Generar thumbnail
      const thumbnail = await generateThumbnail(compressed);

      // Subir video
      const videoPath = `${currentUser.id}/video_${Date.now()}.webm`;
      const { error: uploadErr1 } = await db.storage
        .from('media-videos')
        .upload(videoPath, compressed, { contentType: 'video/webm' });

      if (uploadErr1) throw uploadErr1;

      // Subir thumbnail
      const thumbPath = `${currentUser.id}/thumb_${Date.now()}.jpg`;
      const { error: uploadErr2 } = await db.storage
        .from('media-photos')
        .upload(thumbPath, thumbnail, { contentType: 'image/jpeg' });

      if (uploadErr2) throw uploadErr2;

      // Guardar en BD
      const { error: dbErr } = await db.from('media_videos').insert({
        user_id: currentUser.id,
        video_url: videoPath,
        thumbnail_url: thumbPath,
        duration: CAMERA_MAX_DURATION,
        size_bytes: compressed.size,
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
      });

      if (dbErr) throw dbErr;

      // Actualizar shorts públicos
      await _updatePublicShort(videoPath, thumbPath);

      _mediaHideLoading();
      _mediaShowToast('Video guardado ✓');

      // Refrescar lista
      renderMediaVideos();

    } catch (err) {
      console.error('Error uploading video:', err);
      _mediaHideLoading();
      _mediaShowToast('Error al guardar video', 'error');
    }
  });
}

/* ══ CREAR FOTO ══ */
function mediaCreatePhoto() {
  if (!currentUser) {
    abrirAuthModal('login');
    return;
  }

  openCamera('photo', async (blob) => {
    _mediaShowLoading('Procesando foto...');

    try {
      // Comprimir foto
      const compressed = await compressPhoto(blob);

      // Subir foto
      const photoPath = `${currentUser.id}/photo_${Date.now()}.jpg`;
      const { error: uploadErr } = await db.storage
        .from('media-photos')
        .upload(photoPath, compressed, { contentType: 'image/jpeg' });

      if (uploadErr) throw uploadErr;

      // Guardar en BD
      const { error: dbErr } = await db.from('media_photos').insert({
        user_id: currentUser.id,
        photo_url: photoPath,
        size_bytes: compressed.size
      });

      if (dbErr) throw dbErr;

      _mediaHideLoading();
      _mediaShowToast('Foto guardada ✓');

      // Refrescar lista
      renderMediaFotos();

    } catch (err) {
      console.error('Error uploading photo:', err);
      _mediaHideLoading();
      _mediaShowToast('Error al guardar foto', 'error');
    }
  });
}

/* ══ CREAR GALERÍA ══ */
async function mediaCreateGallery() {
  if (!currentUser) {
    abrirAuthModal('login');
    return;
  }

  const name = prompt('Nombre de la galería:');
  if (!name || name.trim().length < 2) return;

  try {
    const { error } = await db.from('media_galleries').insert({
      user_id: currentUser.id,
      name: name.trim()
    });

    if (error) throw error;

    _mediaShowToast('Galería creada ✓');
    renderMediaGalerias();
  } catch (err) {
    console.error('Error creating gallery:', err);
    _mediaShowToast('Error al crear galería', 'error');
  }
}

/* ══ ACTUALIZAR SHORTS PÚBLICOS ══ */
async function _updatePublicShort(videoPath, thumbPath) {
  try {
    // Obtener perfil del usuario
    let petName = '';
    let userName = '';
    try {
      const profile = JSON.parse(localStorage.getItem('wufly_profile_v1') || '{}');
      petName = profile.nombreMascota || '';
      userName = profile.nombre || currentUser.email.split('@')[0];
    } catch {}

    // Verificar si ya tiene short público
    const { data: existing } = await db
      .from('shorts_public')
      .select('video_url, thumbnail_url')
      .eq('user_id', currentUser.id)
      .single();

    if (existing) {
      // Eliminar video anterior de storage
      try {
        await db.storage.from('shorts-public').remove([existing.video_url]);
      } catch {}

      // Actualizar registro
      await db.from('shorts_public').update({
        video_url: videoPath,
        thumbnail_url: thumbPath,
        pet_name: petName,
        user_name: userName,
        created_at: new Date().toISOString()
      }).eq('user_id', currentUser.id);
    } else {
      // Crear nuevo
      await db.from('shorts_public').insert({
        user_id: currentUser.id,
        video_url: videoPath,
        thumbnail_url: thumbPath,
        pet_name: petName,
        user_name: userName
      });
    }
  } catch (err) {
    console.error('Error updating public short:', err);
  }
}

/* ══ ELIMINAR VIDEO ══ */
async function mediaDeleteVideo(id) {
  if (!confirm('¿Eliminar este video?')) return;

  try {
    // Obtener datos del video
    const { data: video } = await db
      .from('media_videos')
      .select('video_url, thumbnail_url')
      .eq('id', id)
      .single();

    if (video) {
      // Eliminar de storage
      try {
        await db.storage.from('media-videos').remove([video.video_url]);
        if (video.thumbnail_url) {
          await db.storage.from('media-photos').remove([video.thumbnail_url]);
        }
      } catch {}
    }

    // Eliminar de BD
    await db.from('media_videos').delete().eq('id', id);

    _mediaShowToast('Video eliminado');
    renderMediaVideos();
  } catch (err) {
    console.error('Error deleting video:', err);
  }
}

/* ══ ELIMINAR FOTO ══ */
async function mediaDeletePhoto(id) {
  if (!confirm('¿Eliminar esta foto?')) return;

  try {
    const { data: photo } = await db
      .from('media_photos')
      .select('photo_url')
      .eq('id', id)
      .single();

    if (photo) {
      try {
        await db.storage.from('media-photos').remove([photo.photo_url]);
      } catch {}
    }

    await db.from('media_photos').delete().eq('id', id);

    _mediaShowToast('Foto eliminada');
    renderMediaFotos();
  } catch (err) {
    console.error('Error deleting photo:', err);
  }
}

/* ══ ELIMINAR GALERÍA ══ */
async function mediaDeleteGallery(id) {
  if (!confirm('¿Eliminar esta galería? Las fotos no se eliminarán.')) return;

  try {
    await db.from('media_galleries').delete().eq('id', id);
    _mediaShowToast('Galería eliminada');
    renderMediaGalerias();
  } catch (err) {
    console.error('Error deleting gallery:', err);
  }
}

/* ══ UTILS ══ */
function _getMediaUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  const ref = SUPABASE_URL.replace('https://', '').split('.')[0];

  // Determinar bucket
  let bucket = 'media-photos';
  if (path.includes('video_') || path.includes('thumb_')) {
    bucket = path.includes('video_') ? 'media-videos' : 'media-photos';
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

function _mediaShowLoading(text) {
  const el = document.getElementById('mediaLoading');
  if (el) {
    el.querySelector('p').textContent = text;
    el.style.display = 'flex';
  }
}

function _mediaHideLoading() {
  const el = document.getElementById('mediaLoading');
  if (el) el.style.display = 'none';
}

function _mediaShowToast(msg, type = 'ok') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:100px; left:50%; transform:translateX(-50%);
    background:${type === 'ok' ? 'var(--purple)' : '#DC2626'};
    color:white; padding:12px 24px; border-radius:12px;
    font-size:13px; font-weight:600; z-index:10000;
    animation:slideUp 0.3s ease;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}


// ==========================================
// ARCHIVO: js/home.js
// ==========================================

/* ══════════════════════════════════════
   HOME — Wufly
   Página de inicio personalizada
   ══════════════════════════════════════ */

function renderHome() {
  const el = document.getElementById('page-home');
  if (!el) return;

  /* ── Leer perfil ── */
  let perfil = {};
  try {
    const raw = localStorage.getItem('wufly_profile_v1');
    if (raw) perfil = JSON.parse(raw);
  } catch {}

  /* ── Saludo según hora ── */
  const hora = new Date().getHours();
  let saludo = 'Buenos días';
  if (hora >= 12 && hora < 20) saludo = 'Buenas tardes';
  else if (hora >= 20) saludo = 'Buenas noches';

  /* ── Nombre del dueño ── */
  const _emailGuardado = localStorage.getItem('wufly_session_email') || '';
  const _nombreFallback = perfil.nombre || perfil.name || (_emailGuardado ? _emailGuardado.split('@')[0] : '');
  const nombre = _nombreFallback ? `, ${_nombreFallback}` : '';

  /* ── Nombre y emoji de la mascota ── */
  const nombreMascota = perfil.nombreMascota || '';
  const tipoEmoji = { perro: '🐕', gato: '🐈' }[perfil.tipomascota] || '🐾';

  /* ── Hero: foto de fondo o emoji según perfil ── */
  const heroFoto = perfil.fotoMascota || '';
  const heroMediaEmoji = `<div style="font-size:80px;line-height:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.3));">${tipoEmoji}</div>`;

  /* ── Subtítulo hero ── */
  const subtitulo = nombreMascota
    ? `<div style="font-size:14px;color:rgba(255,255,255,0.9);margin-top:5px;font-weight:600;text-shadow:0 1px 6px rgba(0,0,0,0.35);">${tipoEmoji} ${nombreMascota}</div>`
    : `<div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:5px;text-shadow:0 1px 6px rgba(0,0,0,0.3);">Tu app de bienestar animal</div>`;

  /* ── Tips rotativos del Dr. Wufly ── */
  const tips = [
    'Asegúrate de que tu mascota siempre tenga agua fresca disponible. La hidratación es clave para su salud.',
    'Los perros necesitan al menos 30 minutos de ejercicio diario. Incluso un paseo corto mejora su bienestar.',
    'Cepilla los dientes de tu mascota 2-3 veces por semana para prevenir enfermedades periodontales.',
    'Las revisiones veterinarias anuales detectan problemas de salud antes de que se agraven.',
    'Nunca des chocolate, uvas, cebolla ni ajo a tu perro o gato — son tóxicos para ellos.',
    'Desparasita a tu mascota cada 3 meses para protegerla de parásitos internos y externos.',
    'El juego mental (juguetes de rompecabezas) cansa tanto como el ejercicio físico y reduce la ansiedad.',
  ];
  const tipIndex = new Date().getDay(); // 0-6 según día de semana
  const tipHoy = tips[tipIndex];

  const _avatarHome = '';

  /* ── Render ── */
  el.innerHTML = `
    <div style="padding-bottom:8px;">

      <!-- HERO con saludo -->
      <div style="
        border-radius:0 0 38px 38px;
        min-height:430px;
        padding:0;
        text-align:center;
        margin-bottom:40px;
        position:relative;
        overflow:hidden;
        background:#4C1D95;
      ">
        <!-- Video de fondo -->
        <video id="hero-video" autoplay muted loop playsinline
          style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;opacity:0;transition:opacity 1s ease;"
          poster="">
          <source src="/img/wufly-home.mp4" type="video/mp4">
        </video>

        <!-- Spinner de carga del video -->
        <div id="hero-video-spinner" style="position:absolute;bottom:18px;left:50%;transform:translateX(-50%);z-index:4;display:flex;align-items:center;gap:6px;transition:opacity 0.5s ease;">
          <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.85);animation:wufly-bounce 1.1s ease-in-out infinite;"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.85);animation:wufly-bounce 1.1s ease-in-out 0.2s infinite;"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.85);animation:wufly-bounce 1.1s ease-in-out 0.4s infinite;"></div>
        </div>

        <!-- Overlay de color -->
        <div style="position:absolute;inset:0;background:linear-gradient(to bottom, rgba(30,10,70,0.25) 0%, rgba(76,29,149,0.65) 60%, rgba(50,10,100,0.85) 100%);z-index:2;border-radius:0 0 28px 28px;"></div>

        <!-- URGENTE — deslizable desde la izquierda como una sola unidad -->
        <div id="urgente-widget" style="position:absolute;left:0;top:51%;z-index:10;display:none;transform:translateY(-50%) translateX(calc(-100% + 26px));transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);">
          <div style="display:flex;align-items:stretch;background:rgba(255,255,255,0.70);border-radius:0 20px 20px 0;box-shadow:4px 4px 28px rgba(0,0,0,0.25);overflow:hidden;">
            <!-- Contenido — toca para abrir link -->
            <div onclick="abrirUrgenteLink()" style="padding:16px 12px 16px 18px;width:350px;cursor:pointer;text-align: left;">
              <div id="urgente-fecha" style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;color:#4C1D95;margin-bottom:8px;line-height:1.2;"></div>
              <div id="urgente-desc" style="font-size:13px;color:#1F2937;line-height:16px;"></div>
            </div>
            <!-- URGENTE label — toca para abrir/cerrar -->
            <div onclick="toggleUrgente()" style="width:26px;display:flex;align-items:center;justify-content:center;padding:10px 0;border-left:1px solid rgba(0,0,0,0.07);cursor:pointer;flex-shrink:0;">
              <span style="writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);font-size:16px;font-weight:800;color:#3b1465;letter-spacing:0em;font-family:'Funnel Display',sans-serif;white-space:nowrap;">URGENTE</span>
            </div>
          </div>
        </div>

        <!-- Contenido centrado verticalmente -->
        <div style="position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:482px;padding:0 20px 28px;">
          ${_avatarHome}
          ${heroFoto
            ? `<div style="width:82px;display:none;height:82px;border-radius:50%;overflow:hidden;border:3px solid rgba(255,255,255,0.85);box-shadow:0 4px 16px rgba(0,0,0,0.35);margin-bottom:10px;"><img src="${heroFoto}" style="width:100%;height:100%;object-fit:cover;" alt="mascota"></div>`: ''}
          <!-- Últimos registrados sobre el video -->
          <div style="width:100%;padding:0 4px;">
            <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.6);letter-spacing:0.08em;margin-bottom:8px;text-align:right;">ÚLTIMOS REGISTRADOS</div>
            <div id="hero-pet-grid" style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:100%;">
              <div style="aspect-ratio:1/1;border-radius:14px;background:rgba(255,255,255,0.15);border:1px solid #fff;animation:shimmer 1.4s infinite;"></div>
              <div style="aspect-ratio:1/1;border-radius:14px;background:rgba(255,255,255,0.15);border:1px solid #fff;animation:shimmer 1.4s 0.1s infinite;"></div>
              <div style="aspect-ratio:1/1;border-radius:14px;background:rgba(255,255,255,0.15);border:1px solid #fff;animation:shimmer 1.4s 0.2s infinite;"></div>
              <div style="aspect-ratio:1/1;border-radius:14px;background:rgba(255,255,255,0.15);border:1px solid #fff;animation:shimmer 1.4s 0.3s infinite;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ACCESO RÁPIDO — Stack drag interactivo -->
      <div style="padding:0 16px;margin-top:10px;">
        <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;margin-bottom:12px;"></div>
        <div id="card-stack" style="position:relative;height:215px;touch-action:none;"></div>
      </div>

      


      <!-- GALERÍA DE MASCOTAS DE LA COMUNIDAD -->
      <div id="pet-gallery-section" style="display:none;margin-bottom:24px;margin-top:-7px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ ÚLTIMOS REGISTRADOS</div>
          <div style="font-size:11px;font-weight:600;color:var(--purple);">Comunidad Wufly</div>
        </div>
        <div
          id="pet-gallery-grid"
          style="
            display:grid;
            grid-template-columns:repeat(4, 1fr);
            gap:8px;
            padding:0 16px;
          "
        >
          <!-- Skeletons iniciales -->
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.1s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.2s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.3s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.4s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.5s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.6s infinite;"></div>
          <div style="aspect-ratio:1/1;border-radius:14px;background:linear-gradient(110deg,#EDE9FE 30%,#DDD6FE 50%,#EDE9FE 70%);background-size:200% 100%;animation:shimmer 1.4s 0.7s infinite;"></div>
        </div>
      </div>

      <!-- SECCIÓN JUNTOS IA -->
      <div style="margin:0 16px 24px;">
        <!-- Card principal -->
        <div style="
          border-radius:22px;
          overflow:hidden;
          background:linear-gradient(135deg,#3B0764,#6D28D9,#9333EA);
          box-shadow:0 8px 28px rgba(109,40,217,0.38);
          padding:22px 18px 20px;
          position:relative;
          min-height:180px;
        ">
          <!-- Imagen de fondo con blend mode screen -->
          <div style="position:absolute;inset:0;background-image:url('img/bg-juntos.png');background-size:contain;background-repeat:no-repeat;background-position:right center;mix-blend-mode:screen;opacity:0.9;pointer-events:none;"></div>

          <div style="position:relative;z-index:1;max-width:55%;">
            <div style="font-size:28px;margin-bottom:8px;">✨</div>
            <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:20px;color:white;line-height:1.2;margin-bottom:6px;">
              Juntos — IA
            </div>
            <div style="font-size:13px;color:rgba(255,255,255,0.9);line-height:1.5;margin-bottom:18px;">
              Toma una foto de tu mascota y una selfie.<br>La IA los une en un lugar mágico.
            </div>
            <button onclick="abrirJuntos()"
              style="padding:13px 20px;border:none;border-radius:14px;background:white;color:#6D28D9;font-family:'Funnel Display',sans-serif;font-weight:800;font-size:15px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.25);display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:transform 0.15s;white-space:nowrap;"
              onmousedown="this.style.transform='scale(0.97)'" onmouseup="this.style.transform='scale(1)'"
              ontouchstart="this.style.transform='scale(0.97)'" ontouchend="this.style.transform='scale(1)'">
              <span style="font-size:20px;"></span>Crear mi foto con IA
            </button>
          </div>
        </div>

      </div>

      <!-- CARRUSEL FOTOS JUNTOS -->
      <div id="juntos-carousel-section" style="display:none;margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:10px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ MOMENTOS DE LA COMUNIDAD</div>
        </div>
        <div style="overflow:hidden;padding:4px 0 10px;">
          <div id="juntos-track"
            style="display:flex;gap:12px;padding:0 16px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;">
          </div>
        </div>
      </div>



<!-- CAROUSEL VIDEOS -->
      <div style="margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0 16px;margin-bottom:10px;">
          <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:0.07em;">▶️ SHORTS MASCOTAS</div>
          <span style="font-size:12px;font-weight:700;color:var(--purple);font-family:'Plus Jakarta Sans',sans-serif;">Canales Destacados</span>
        </div>
        <div id="clinicas-clip" style="overflow:hidden;">
          <div id="clinicas-track"
            style="display:flex;gap:12px;padding:4px 0 12px 16px;will-change:transform;transition:transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94);">
            <!-- Shorts se cargan dinámicamente -->
          </div>
        </div>
        <div id="carousel-dots" style="display:flex;justify-content:center;gap:5px;margin-top:6px;">
          ${[0,1,2].map((i) => `<div class="cdot cdot-page" data-page="${i}" style="width:${i===0?'20px':'6px'};height:6px;border-radius:100px;background:${i===0?'var(--purple)':'#D1D5DB'};transition:all 0.3s;"></div>`).join('')}
        </div>
      </div>


      <!-- BANNER TIP DEL DÍA — imagen: img/banner-tip.jpg | link: onclick abajo -->
      <div style="margin:0 16px 24px;border-radius:16px;overflow:hidden;box-shadow:0 2px 10px rgba(59,130,246,0.15);cursor:pointer;"
        onclick="window.open('https://www.superzoo.cl/tiendas?showMap=true&horizontalView=true&isForm=true', '_blank')">
        <img src="img/banner-tip.jpg" alt="Tip del día"
          style="width:100%;display:block;object-fit:cover;">
      </div>

    </div>
  `;

  // Cargar Shorts dinámicos y luego inicializar dots (una sola vez, tras cargar datos)
  _cargarShorts().then(() => setTimeout(_initCarouselDots, 50));
  setTimeout(_initCardStack, 80);

  // Forzar play del video hero (iOS ignora autoplay en elementos creados con innerHTML)
  setTimeout(() => {
    const v = el.querySelector('#hero-video');
    const spinner = el.querySelector('#hero-video-spinner');
    if (!v) return;
    const fadeIn = () => {
      v.style.opacity = '1';
      if (spinner) { spinner.style.opacity = '0'; setTimeout(() => { spinner.style.display = 'none'; }, 500); }
    };
    if (v.readyState >= 3) {
      fadeIn();
    } else {
      v.addEventListener('canplay', fadeIn, { once: true });
    }
    v.play().catch(() => {});
  }, 100);

// Cargar galería en idle para no bloquear el render inicial
  if (typeof cargarFotosMascotas === 'function') {
    const _cargarGaleria = () => {
      cargarFotosMascotas();
      if (typeof cargarCarruselJuntos === 'function') cargarCarruselJuntos();
    };
    if (window.requestIdleCallback) requestIdleCallback(_cargarGaleria, { timeout: 2000 });
    else setTimeout(_cargarGaleria, 200);
  }

  // Viñeta URGENTE
  setTimeout(cargarUrgentePanel, 500);

  // Detectar región y recargar clínicas/tiendas si corresponde
  Promise.all([
    typeof _detectarRegionYCargarClinicas === 'function' ? _detectarRegionYCargarClinicas() : Promise.resolve(null),
    typeof _detectarRegionYCargarTiendas  === 'function' ? _detectarRegionYCargarTiendas()  : Promise.resolve(null),
  ]).then(([clinicas, tiendas]) => {
    // Solo renderizar si hay datos (null = permiso negado, el banner ya se mostró)
    if (clinicas !== null && typeof renderClinicas === 'function') renderClinicas();
    if (tiendas  !== null && typeof renderTiendas  === 'function') renderTiendas();
  });
}

/* ── Shorts dinámicos desde 3 canales YouTube ── */
let _shortsData = [];

async function _cargarShorts() {
  const track = document.getElementById('clinicas-track');
  if (!track) return;

  try {
    const res = await fetch('https://wufly-push.pablo77tapia.workers.dev/api/shorts');
    if (!res.ok) throw new Error();
    _shortsData = await res.json();
  } catch {
    // Fallback silencioso — el track queda vacío o con skeleton
    return;
  }

  if (!_shortsData.length) return;

  track.innerHTML = _shortsData.map(v => {
    const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
    return `
    <div onclick="abrirShort('${v.videoId}')"
      style="flex:0 0 30%;min-width:110px;border-radius:14px;overflow:hidden;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,0.22);position:relative;aspect-ratio:9/16;background:#1a0a3c;">
      <img src="${thumb}" alt="${v.titulo.replace(/"/g,'')}"
        onerror="this.src='https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg'"
        style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;">
      <!-- Overlay -->
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0) 40%,rgba(0,0,0,0.78) 100%);pointer-events:none;"></div>
      <!-- Badge Shorts -->
      <div style="position:absolute;top:10px;left:10px;background:#FF0000;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:800;color:white;letter-spacing:0.05em;">▶ SHORT</div>
      <!-- Play -->
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;background:rgba(255,255,255,0.90);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.3);">
        <svg viewBox="0 0 24 24" style="width:20px;height:20px;fill:#5C2FA8;margin-left:3px;"><polygon points="5,3 19,12 5,21"/></svg>
      </div>
      <!-- Info pie -->
      <div style="position:absolute;bottom:10px;left:10px;right:10px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:700;font-size:13px;color:white;line-height:1.3;text-shadow:0 1px 4px rgba(0,0,0,0.5);margin-bottom:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${v.titulo}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.7);">📺 ${v.canal}</div>
      </div>
    </div>
  `;}).join('');

}

let _shortIdx = 0;

function abrirShort(id) {
  _shortIdx = _shortsData.findIndex(v => v.videoId === id);
  if (_shortIdx < 0) _shortIdx = 0;
  _renderShortModal();
}

function _renderShortModal() {
  const v = _shortsData[_shortIdx];
  if (!v) return;

  const prev = document.getElementById('yt-modal-overlay');
  if (prev) prev.remove();

  const total = _shortsData.length;
  const overlay = document.createElement('div');
  overlay.id = 'yt-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(0,0,0,0.95);
    display:flex;align-items:center;justify-content:center;
    overflow:hidden;
  `;

  overlay.innerHTML = `
    <!-- Botón cerrar — bajado para evitar notch/batería iPhone -->
    <button onclick="document.getElementById('yt-modal-overlay').remove()"
      style="position:absolute;top:56px;right:16px;width:44px;height:44px;border-radius:50%;border:none;background:rgba(255,255,255,0.15);color:white;font-size:18px;cursor:pointer;z-index:10;display:flex;align-items:center;justify-content:center;">✕</button>

    <!-- Contador -->
    <div style="position:absolute;top:62px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.4);font-size:12px;font-weight:600;z-index:10;">${_shortIdx + 1} / ${total}</div>

    <!-- Contenedor deslizable -->
    <div id="short-slider" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;will-change:transform;">
      <div style="width:min(308px, 79vw);position:relative;">
        <div style="position:relative;aspect-ratio:9/16;border-radius:20px;overflow:hidden;background:#111;box-shadow:0 20px 60px rgba(0,0,0,0.8);">
          <!-- Skeleton loading -->
          <div id="short-skeleton" style="position:absolute;inset:0;z-index:3;background:linear-gradient(135deg,#1a1a2e,#16213e);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">
            <div style="width:52px;height:52px;border:3px solid rgba(255,255,255,0.1);border-top-color:rgba(255,255,255,0.6);border-radius:50%;animation:adminSpin 0.8s linear infinite;"></div>
            <div style="width:60%;height:8px;border-radius:99px;background:rgba(255,255,255,0.08);"></div>
            <div style="width:40%;height:8px;border-radius:99px;background:rgba(255,255,255,0.05);"></div>
          </div>
          <iframe id="short-iframe"
            src="https://www.youtube.com/embed/${v.videoId}?autoplay=1&mute=1&playsinline=1&rel=0"
            frameborder="0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowfullscreen
            onload="document.getElementById('short-skeleton')?.remove()"
            style="position:absolute;inset:0;width:100%;height:100%;z-index:2;"></iframe>
          <!-- Franjas laterales para swipe (no bloquean el centro del video) -->
          <div id="short-swipe-layer" style="position:absolute;inset:0;z-index:5;pointer-events:none;">
            <div style="position:absolute;left:0;top:0;width:18%;height:100%;pointer-events:auto;"></div>
            <div style="position:absolute;right:0;top:0;width:18%;height:100%;pointer-events:auto;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  // Swipe con animación fluida — funciona sobre el iframe y el overlay
  let _tx = 0, _startX = 0, _startY = 0, _dragging = false, _isSwiping = false;
  const slider = () => overlay.querySelector('#short-slider');

  const onStart = e => {
    _startX = e.touches[0].clientX;
    _startY = e.touches[0].clientY;
    _tx = 0; _dragging = true; _isSwiping = false;
    const s = slider(); if (s) s.style.transition = 'none';
  };
  const onMove = e => {
    if (!_dragging) return;
    const dx = e.touches[0].clientX - _startX;
    const dy = e.touches[0].clientY - _startY;
    if (!_isSwiping && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) _isSwiping = true;
    if (!_isSwiping) return;
    _tx = dx;
    const s = slider(); if (s) s.style.transform = `translateX(${_tx * 0.4}px)`;
  };
  const onEnd = () => {
    _dragging = false;
    const s = slider(); if (!s) return;
    if (_isSwiping && Math.abs(_tx) > 60) {
      const dir = _tx < 0 ? 1 : -1;
      const next = _shortIdx + dir;
      if (next >= 0 && next < total) {
        s.style.transition = 'transform 0.22s ease';
        s.style.transform = `translateX(${dir < 0 ? '100%' : '-100%'})`;
        setTimeout(() => { _shortIdx = next; _renderShortModal(); }, 200);
        return;
      }
    }
    s.style.transition = 'transform 0.3s ease';
    s.style.transform = 'translateX(0)';
  };

  // Escuchar en overlay y en la capa sobre el iframe
  [overlay, overlay.querySelector('#short-swipe-layer')].forEach(el => {
    if (!el) return;
    el.addEventListener('touchstart', onStart, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onEnd, { passive: true });
  });

  document.body.appendChild(overlay);
}

function _navShort(dir) {
  const next = _shortIdx + dir;
  if (next < 0 || next >= _shortsData.length) return;
  _shortIdx = next;
  _renderShortModal();
}

// Mantener función por compatibilidad
function abrirVideoYoutube(id) { abrirShort(id); }

/* ── Carousel: CSS transform + swipe táctil ── */
let _carouselIdx = 0;
let _touchStartX = 0;
let _touchStartY = 0;
let _swipeLocked  = false;
let _carouselAbort = null; // controla listeners acumulados entre rerenders

/* Mueve el track al slide idx usando CSS transition */
const SHORTS_PER_PAGE = 3;

function _goToSlide(pageIdx) {
  const track = document.getElementById('clinicas-track');
  if (!track) return;
  const card = track.querySelector('div');
  if (!card) return;
  const step = card.offsetWidth + 12;
  track.style.transform = `translateX(-${pageIdx * SHORTS_PER_PAGE * step}px)`;
  _carouselIdx = pageIdx;
  _updateDots(pageIdx);
}

function _updateDots(pageIdx) {
  document.querySelectorAll('.cdot').forEach((d, i) => {
    const active = i === pageIdx;
    d.style.width      = active ? '20px' : '6px';
    d.style.background = active ? 'var(--purple)' : '#D1D5DB';
  });
}

/*
  Listeners en el CLIP (overflow:hidden), no en el track.
  El clip nunca se mueve, así su área de touch siempre está visible.
*/
function _initCarouselDots() {
  const clip  = document.getElementById('clinicas-clip');
  if (!clip) return;
  const totalPages = Math.ceil((_shortsData.length || 9) / SHORTS_PER_PAGE);
  _carouselIdx = 0;

  // Cancelar listeners previos para evitar acumulación entre rerenders
  if (_carouselAbort) _carouselAbort.abort();
  _carouselAbort = new AbortController();
  const sig = { signal: _carouselAbort.signal, passive: true };

  clip.addEventListener('touchstart', e => {
    _touchStartX = e.touches[0].clientX;
    _touchStartY = e.touches[0].clientY;
    _swipeLocked  = false;
  }, sig);

  clip.addEventListener('touchmove', e => {
    const dx = Math.abs(e.touches[0].clientX - _touchStartX);
    const dy = Math.abs(e.touches[0].clientY - _touchStartY);
    if (!_swipeLocked && dx > dy && dx > 8) _swipeLocked = true;
  }, sig);

  clip.addEventListener('touchend', e => {
    if (!_swipeLocked) return;
    const dx = e.changedTouches[0].clientX - _touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) _carouselIdx = Math.min(_carouselIdx + 1, totalPages - 1);
      else        _carouselIdx = Math.max(_carouselIdx - 1, 0);
      _goToSlide(_carouselIdx);
    }
    _swipeLocked = false;
  }, sig);
}


/* ══════════════════════════════════════
   ACCESO RÁPIDO — Stack drag interactivo
   ══════════════════════════════════════ */

const STACK_CARDS = [
  { label:'Servicios',  sub:'Veterinarias y tiendas',         img:'img/card-vets.jpg',       nav: () => switchTab('restaurantes'),                                              grad:'#3b1465' },
  { label:'Adoptar',        sub:'Mascotas que buscan hogar',       img:'img/card-adoptar.jpg',    nav: () => { switchComunidadTab('adoptar'); switchTab('comunidad'); },              grad:'#1a0a3c' },
  { label:'Tiendas',        sub:'Productos para tu mascota',       img:'img/card-grooming.jpg',   nav: () => switchTab('restaurantes'),                                              grad:'#3d1278' },
];

function _navFrontCard() {
  const card = STACK_CARDS[_stackOrder[0]];
  if (card) card.nav();
}

let _stackOrder  = []; // índices de cards, [0] = frente
let _stackEls    = [];
let _dragActive  = false;
let _dragStartY  = 0;
let _dragCurrY   = 0;
let _dragVel     = 0;
let _dragPrevY   = 0;

function _initCardStack() {
  const container = document.getElementById('card-stack');
  if (!container) return;
  container.innerHTML = '';
  _stackEls = [];
  _stackOrder = STACK_CARDS.map((_, i) => i);

  STACK_CARDS.forEach((c, i) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;left:0;right:0;
      height:185px;border-radius:22px;
      background:${c.grad};
      box-shadow:0 8px 32px rgba(0,0,0,0.35);
      overflow:hidden;
      will-change:transform,opacity;
      cursor:grab;
      user-select:none;
      -webkit-user-select:none;
      touch-action:none;
    `;
    el.innerHTML = `
      <!-- Imagen de fondo (derecha) -->
      <img src="${c.img}" alt="${c.label}"
        style="position:absolute;top:0;right:0;width:68%;height:100%;object-fit:cover;object-position:center;"
        onerror="this.style.display='none'">

      <!-- Degradado lateral: color sólido izquierda → transparente derecha -->
      <div style="position:absolute;inset:0;background:linear-gradient(to right, ${c.grad} 32%, ${c.grad}cc 50%, transparent 75%);"></div>

      <!-- Degradado inferior: oscurece para legibilidad del texto -->
      <div style="position:absolute;inset:0;background:linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%);"></div>

      <!-- Flecha (esquina superior izquierda) -->
      <div class="stack-arrow-btn" style="position:absolute;top:14px;left:14px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(4px);">
        <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:white;fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </div>

      <!-- Texto (parte inferior) -->
      <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 18px;">
        <div style="font-family:'Funnel Display',sans-serif;font-weight:800;font-size:21px;color:white;line-height:1.15;text-shadow:0 1px 6px rgba(0,0,0,0.3);">${c.label}</div>
        <div style="font-size:12px;color:rgba(255,255,255,0.75);margin-top:3px;">${c.sub}</div>
      </div>
    `;

    // Flecha: navega directamente (solo la card del frente)
    const arrowBtn = el.querySelector('.stack-arrow-btn');
    const _arrowNav = (e) => { e.stopPropagation(); if (_stackOrder[0] === i) c.nav(); };
    arrowBtn.addEventListener('touchend', _arrowNav, { passive: true });
    arrowBtn.addEventListener('click',    _arrowNav);

    container.appendChild(el);
    _stackEls.push(el);
  });

  _renderStack(false);
  _attachDrag();
}

function _stackTransform(pos, dy) {
  const scale      = 1 - pos * 0.06;
  const translateY = pos * -12 + (pos === 0 ? dy : Math.max(0, dy * 0.15 * (1 - pos * 0.4)));
  const opacity    = pos >= 4 ? 0 : 1 - pos * 0.08;
  // Rotación alternada: pos1 → -2°, pos2 → +2.5°, pos3 → -1.5°
  const rotations  = [0, -2, 2.5, -1.5, 1];
  const rotateZ    = rotations[pos] || 0;
  return { scale, translateY, opacity, rotateZ };
}

function _renderStack(animate, dy = 0) {
  _stackOrder.forEach((cardIdx, pos) => {
    const el = _stackEls[cardIdx];
    const { scale, translateY, opacity, rotateZ } = _stackTransform(pos, dy);
    if (animate) {
      el.style.transition = 'transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.35s ease';
    } else {
      el.style.transition = pos === 0 ? 'none' : 'transform 0.45s cubic-bezier(0.34,1.2,0.64,1), opacity 0.35s ease';
    }
    el.style.transform = `translateY(${translateY}px) scale(${scale}) rotate(${rotateZ}deg)`;
    el.style.opacity   = opacity;
    el.style.zIndex    = 100 - pos;
  });
}

function _attachDrag() {
  const container = document.getElementById('card-stack');
  if (!container) return;

  /* ── Lógica compartida start / move / end ── */
  function _onStart(y) {
    if (_stackOrder.length === 0) return;
    const frontEl = _stackEls[_stackOrder[0]];
    _dragActive = true;
    _dragStartY = y;
    _dragCurrY  = 0;
    _dragPrevY  = y;
    _dragVel    = 0;
    frontEl.style.transition = 'none';
    frontEl.style.cursor = 'grabbing';
  }

  function _onMove(y) {
    if (!_dragActive) return;
    _dragVel   = y - _dragPrevY;
    _dragPrevY = y;
    _dragCurrY = y - _dragStartY;
    if (_dragCurrY < 0) _dragCurrY = _dragCurrY * 0.2;
    _renderStack(false, _dragCurrY);
  }

  function _onEnd() {
    if (!_dragActive) return;
    _dragActive = false;
    const frontEl = _stackEls[_stackOrder[0]];
    frontEl.style.cursor = 'grab';

    const THRESHOLD = 60;
    if (_dragCurrY > THRESHOLD || _dragVel > 8) {
      frontEl.style.transition = 'transform 0.4s cubic-bezier(0.4,0,1,1), opacity 0.3s ease';
      frontEl.style.transform  = `translateY(320px) scale(0.85)`;
      frontEl.style.opacity    = '0';
      setTimeout(() => {
        const dismissed = _stackOrder.shift();
        _stackOrder.push(dismissed);
        _renderStack(true, 0);
      }, 380);
    } else {
      _renderStack(true, 0);
    }
    _dragCurrY = 0;
  }

  /* ── Touch ── */
  let _tStartY = 0;
  container.addEventListener('touchstart', e => {
    if (!e.target.closest('#card-stack')) return;
    _tStartY = e.touches[0].clientY;
    _onStart(_tStartY);
  }, { passive: true });

  container.addEventListener('touchmove', e => {
    _onMove(e.touches[0].clientY);
  }, { passive: true });

  container.addEventListener('touchend', e => {
    if (e.target.closest('.stack-arrow-btn')) { _onEnd(); return; } // flecha ya navega sola
    const wasTap = Math.abs(e.changedTouches[0].clientY - _tStartY) < 10;
    _onEnd();
    if (wasTap) _navFrontCard();
  }, { passive: true });

  /* ── Mouse (desktop) ── */
  container.addEventListener('mousedown', e => {
    if (!e.target.closest('#card-stack')) return;
    if (e.target.closest('.stack-arrow-btn')) return; // flecha ya navega sola
    e.preventDefault();
    const startY = e.clientY;
    _onStart(startY);

    const onMouseMove = e => _onMove(e.clientY);
    const onMouseUp   = e => {
      const wasTap = Math.abs(e.clientY - startY) < 8;
      _onEnd();
      if (wasTap) _navFrontCard();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup',   onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup',   onMouseUp);
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderHome(); // renderHome() ya llama _initCarouselDots internamente
});



/* ══════════════════════════════════════
   URGENTE — viñeta lateral hero
   Último perdido del agente IA
   ══════════════════════════════════════ */

let _urgenteLink = '';
let _urgenteOpen = false;

function toggleUrgente() {
  _urgenteOpen = !_urgenteOpen;
  const widget = document.getElementById('urgente-widget');
  if (!widget) return;
  widget.style.transform = _urgenteOpen
    ? 'translateY(-50%) translateX(0)'
    : 'translateY(-50%) translateX(calc(-100% + 26px))';
}

function abrirUrgenteLink() {
  if (_urgenteLink) window.open(_urgenteLink, '_blank', 'noopener');
}

async function cargarUrgentePanel() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/perdidos?select=id,descripcion,fecha_extravio,created_at,link&user_id=is.null&order=created_at.desc&limit=1`,
      { headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` } }
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    const p = Array.isArray(data) && data.length ? data[0] : null;
    if (!p || !p.descripcion) return;

    _urgenteLink = p.link || '';

    const dias  = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const raw   = p.fecha_extravio || p.created_at;
    let fechaStr = '';
    if (raw) {
      const d = new Date(raw);
      fechaStr = `${dias[d.getDay()]} ${d.getDate()} de ${meses[d.getMonth()]}`;
    }

    const fechaEl = document.getElementById('urgente-fecha');
    const descEl  = document.getElementById('urgente-desc');
    if (fechaEl) fechaEl.textContent = fechaStr;
    if (descEl)  descEl.textContent  = p.descripcion;

    const widget = document.getElementById('urgente-widget');
    if (widget) widget.style.display = 'flex';

  } catch {
    // Sin datos — widget permanece oculto
  }
}
