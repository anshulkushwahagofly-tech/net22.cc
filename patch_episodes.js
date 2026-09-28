const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Replace the season fetch with a fake dynamic episode generator
js = js.replace(/const F=await\(await X\(`\/api\/catalog\/season\/\$\{t\}\/\$\{c\}`\)\)\.json\(\);/,
'const F={ok:true,episodes:Array.from({length:10},(_,i)=>({episode:i+1,name:"Episode "+(i+1),overview:"Enjoy episode "+(i+1),still:e.backdrop||e.poster||""}))};');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched JS to generate dynamic fake episodes');
