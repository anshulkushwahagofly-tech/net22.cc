const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Replace vidlink with 2embed!
js = js.replace(/https:\/\/vidlink\.pro\/tv\/\$\{e\}\/\$\{a\}\/\$\{s\}/g, 'https://www.2embed.cc/embedtv/${e}&s=${a}&e=${s}');
js = js.replace(/https:\/\/vidlink\.pro\/movie\/\$\{e==="1423191"\?"27205":e\}/g, 'https://www.2embed.cc/embed/${e==="1423191"?"27205":e}');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to use 2embed.cc');
