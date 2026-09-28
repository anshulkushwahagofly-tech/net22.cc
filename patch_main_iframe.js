const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Replace the iframe src with our local watch.html
js = js.replace(/le\.src=`https:\/\/net27\.cc\/watch-tmdb\/\$\{e\}\?\$\{i\.toString\(\)\}`/g, 'le.src=`./watch.html`');
js = js.replace(/le\.src=`https:\/\/net27\.cc\/watch-direct\/\$\{e\}\?\$\{n\.toString\(\)\}`/g, 'le.src=`./watch.html`');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to load local watch.html');
