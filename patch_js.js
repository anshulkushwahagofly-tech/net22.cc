const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Replace API endpoints with static local json files
js = js.replace(/\/api\/catalog\/curated\/\$\{encodeURIComponent\(e\)\}/g, './api/catalog/curated/${encodeURIComponent(e)}.json');
js = js.replace(/\/api\/catalog\/hero\?type=tv&country=KR/g, './api/catalog/hero_kdrama.json');
js = js.replace(/\/api\/catalog\/hero/g, './api/catalog/hero.json');
js = js.replace(/\/api\/catalog\/discover\?type=movie&genre=10751&sort=popularity\$\{l\}/g, './api/catalog/discover_kids.json');

// For any other dynamic /api/catalog/ calls, just redirect them to a known json to avoid errors
js = js.replace(/\/api\/catalog\/title\/\$\{t\}\/\$\{e\}/g, './api/catalog/curated/trending.json');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched JS to use static API files');
