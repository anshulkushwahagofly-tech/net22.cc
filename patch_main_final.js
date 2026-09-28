const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Patch watch URLs to our local watch.html with query params
js = js.replace(/le\.src=`\/watch-tmdb\/\$\{e\}\?\$\{i\.toString\(\)\}`/g, 'le.src=`./watch.html?id=${e}&${i.toString()}`');
js = js.replace(/le\.src=`\/watch-direct\/\$\{e\}\?\$\{n\.toString\(\)\}`/g, 'le.src=`./watch.html?id=${e}&${n.toString()}`');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Main JS patched with dynamic local watch URLs');
