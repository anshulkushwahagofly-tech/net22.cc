const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Inject popup show logic into Ie and Gt functions right before setting le.src
js = js.replace(/le\.src=\(a && s\)/g, 'document.getElementById("custom-welcome-popup").style.display="flex", le.src=(a && s)');
js = js.replace(/le\.src=\`https:\/\/vidlink\.pro\/movie\/\$\{e\}\`/g, 'document.getElementById("custom-welcome-popup").style.display="flex", le.src=`https://vidlink.pro/movie/${e}`');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched JS to show custom popup');
