const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The file currently has vidlink.pro links. We replace them with embed.su!
js = js.replace(/https:\/\/vidlink\.pro\/tv\/\$\{e\}\/\$\{a\}\/\$\{s\}/g, 'https://embed.su/embed/tv/${e}/${a}/${s}');
js = js.replace(/https:\/\/vidlink\.pro\/movie\/\$\{e\}/g, 'https://embed.su/embed/movie/${e}');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to use embed.su embed');
