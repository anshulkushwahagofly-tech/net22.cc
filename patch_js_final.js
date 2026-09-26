const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Patch the curated endpoints (trending, LatestRelease, Kids, etc)
js = js.replace(/\/api\/catalog\/curated\/\$\{encodeURIComponent\(e\)\}/g, './api/catalog/curated/${encodeURIComponent(e)}.json');

// 2. Patch the hero endpoints
js = js.replace(/\/api\/catalog\/hero\?type=tv&country=KR/g, './api/catalog/hero_kdrama.json');
js = js.replace(/\/api\/catalog\/hero/g, './api/catalog/hero.json');

// 3. Patch discover kids endpoint
js = js.replace(/\/api\/catalog\/discover\?type=movie&genre=10751&sort=popularity\$\{l\}/g, './api/catalog/discover_kids.json');

// 4. Patch search API
js = js.replace(/\/api\/catalog\/search-hybrid\?q=\$\{[^\}]+\}/g, './api/catalog/search.json');

// 5. Patch title/rail endpoints (these are dynamic, we'll fall back to the generic title fallback to avoid errors when clicking a movie)
js = js.replace(/\/api\/catalog\/title\/\$\{t\}\/\$\{e\}/g, './api/catalog/title/fallback.json');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('JS fully patched for static deployment');
