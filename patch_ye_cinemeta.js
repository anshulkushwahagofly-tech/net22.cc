const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

const originalYe = /async function ye\(e,t,a=0\)\{try\{const s=await X\(`\.\/api\/catalog\/title\/all_movies\.json`\);if\(!s\.ok\)throw new Error\("status "\+s\.status\);const all=await s\.json\(\);let n=all\[e\];if\(!n\)\{n=\{ok:true,type:t,title:"Unknown Title",tagline:"",overview:"Details not available\.",poster:"",backdrop:"",year:"",rating:0,genres:\[\],catalog:\{streamable:true,subjectId:e\}\};\}/;

const newYe = `async function ye(e,t,a=0){try{let n;if(String(e).startsWith("tt")){const cRes=await fetch(\`https://v3-cinemeta.strem.io/meta/\${t}/\${e}.json\`);const cData=await cRes.json();const m=cData.meta;n={ok:true,type:t,title:m.name,tagline:"",overview:m.description||"",poster:m.poster,backdrop:m.background,year:m.releaseInfo,rating:0,genres:m.genres?m.genres.map(g=>({name:g})):[],catalog:{streamable:true,subjectId:e}};}else{const s=await X(\`./api/catalog/title/all_movies.json\`);if(!s.ok)throw new Error("status "+s.status);const all=await s.json();n=all[e];if(!n){n={ok:true,type:t,title:"Unknown Title",tagline:"",overview:"Details not available.",poster:"",backdrop:"",year:"",rating:0,genres:[],catalog:{streamable:true,subjectId:e}};}}`;

js = js.replace(originalYe, newYe);

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched ye() to fetch from Cinemeta if imdb_id is provided');
