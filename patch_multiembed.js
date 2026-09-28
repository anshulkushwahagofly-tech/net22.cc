const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

js = js.replace(/https:\/\/vidlink\.pro\/tv\/\$\{e\}\/\$\{a\}\/\$\{s\}/g, 'https://multiembed.mov/?video_id=${e}&tmdb=1&s=${a}&e=${s}');
js = js.replace(/https:\/\/vidlink\.pro\/movie\/\$\{e\}/g, 'https://multiembed.mov/?video_id=${e}&tmdb=1');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to use multiembed.mov embed');
