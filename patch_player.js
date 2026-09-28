const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Patch watch-tmdb
js = js.replace(/le\.src=`\/watch-tmdb\/\$\{e\}\?\$\{i\.toString\(\)\}`/g, 'le.src=`https://net27.cc/watch-tmdb/${e}?${i.toString()}`');
// Patch watch-direct
js = js.replace(/le\.src=`\/watch-direct\/\$\{e\}\?\$\{n\.toString\(\)\}`/g, 'le.src=`https://net27.cc/watch-direct/${e}?${n.toString()}`');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched JS to use external player iframe');
