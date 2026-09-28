const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

const originalYe = /async function ye\(e,t,a=0\)\{try\{const s=await X\(`\.\/api\/catalog\/title\/fallback\.json`\);if\(!s\.ok\)throw new Error\("status "\+s\.status\);const n=await s\.json\(\);ea\(n,e,t\)\}/;

const newYe = `async function ye(e,t,a=0){try{const s=await X(\`./api/catalog/title/all_movies.json\`);if(!s.ok)throw new Error("status "+s.status);const all=await s.json();let n=all[e];if(!n){n={ok:true,type:t,title:"Unknown Title",tagline:"",overview:"Details not available.",poster:"",backdrop:"",year:"",rating:0,genres:[],catalog:{streamable:true,subjectId:e}};}ea(n,e,t)}`;

js = js.replace(originalYe, newYe);

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched ye() to use all_movies.json');
