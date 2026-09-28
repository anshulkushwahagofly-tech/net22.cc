const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The file currently has `le.src="./watch.html"`. We need to reset it to what it was before we patched it earlier,
// or just re-run the final patch from the original source.
// Let's checkout from git and apply everything cleanly!
