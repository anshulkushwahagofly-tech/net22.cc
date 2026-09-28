const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The file currently has multiembed.mov links. We replace them back to vidlink.pro!
js = js.replace(/https:\/\/multiembed\.mov\/\?video_id=\$\{e\}&tmdb=1&s=\$\{a\}&e=\$\{s\}/g, 'https://vidlink.pro/tv/${e}/${a}/${s}');
js = js.replace(/https:\/\/multiembed\.mov\/\?video_id=\$\{e\}&tmdb=1/g, 'https://vidlink.pro/movie/${e==="1423191"?"27205":e}');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to use vidlink.pro embed and hack Resident Evil');
