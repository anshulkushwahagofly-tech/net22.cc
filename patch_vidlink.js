const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The file currently has vidsrc.cc links. We replace them with vidlink.pro!
js = js.replace(/https:\/\/vidsrc\.cc\/v2\/embed\/tv\/\$\{e\}\/\$\{a\}\/\$\{s\}/g, 'https://vidlink.pro/tv/${e}/${a}/${s}');
js = js.replace(/https:\/\/vidsrc\.cc\/v2\/embed\/movie\/\$\{e\}/g, 'https://vidlink.pro/movie/${e}');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to use vidlink.pro embed');
