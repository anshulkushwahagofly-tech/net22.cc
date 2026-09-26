const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The code has: `/api/catalog/search-hybrid?q=${encodeURIComponent(e)}`
// We will replace `/api/catalog/search-hybrid?q=\$\{encodeURIComponent\(e\)\}` with `./api/catalog/curated/trending.json`
// But in JS it might be minified. Let's just use a broader regex.
js = js.replace(/\/api\/catalog\/search-hybrid\?q=\$\{[^\}]+\}/g, './api/catalog/curated/trending.json');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched JS search endpoint');
