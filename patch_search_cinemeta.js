const fs = require('fs');
const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The first search logic (Main page search)
const originalSearch1 = /const s=\(await\(await X\(`\.\/api\/catalog\/search\.json`\)\)\.json\(\)\)\.items\|\|\[\];/;
const newSearch1 = `const _cinemeta=await(await fetch(\`https://v3-cinemeta.strem.io/catalog/movie/top/search=\${encodeURIComponent(e)}.json\`)).json();const s=(_cinemeta.metas||[]).map(m=>({tmdbId:m.id,type:m.type||"movie",title:m.name,poster:m.poster,backdrop:m.background,year:m.releaseInfo}));`;

// The second search logic (Overlay search)
const originalSearch2 = /const s=await\(await fetch\(`\.\/api\/catalog\/search\.json`\)\)\.json\(\);if\(t!==me\)return;const n=\(s\.items\|\|\[\]\)\.slice\(0,16\);/;
const newSearch2 = `const _cinemeta=await(await fetch(\`https://v3-cinemeta.strem.io/catalog/movie/top/search=\${encodeURIComponent(e)}.json\`)).json();if(t!==me)return;const s={items:(_cinemeta.metas||[]).map(m=>({tmdbId:m.id,type:m.type||"movie",title:m.name,poster:m.poster,backdrop:m.background,year:m.releaseInfo}))};const n=(s.items||[]).slice(0,16);`;

js = js.replace(originalSearch1, newSearch1);
js = js.replace(originalSearch2, newSearch2);

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched JS to use Cinemeta for search');
