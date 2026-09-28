const fs = require('fs');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// The original unpatched code was:
// le.src=`/watch-tmdb/${e}?${i.toString()}`

// Replace our previous patch (`./watch.html...`) with vidsrc.cc embed!
// For Qt (movies/tv):
js = js.replace(/le\.src=`\.\/watch\.html\?id=\$\{e\}&\$\{i\.toString\(\)\}`/g, 
                'le.src=(a && s) ? `https://vidsrc.cc/v2/embed/tv/${e}/${a}/${s}` : `https://vidsrc.cc/v2/embed/movie/${e}`');
                
// For Gt (direct watch):
js = js.replace(/le\.src=`\.\/watch\.html\?id=\$\{e\}&\$\{n\.toString\(\)\}`/g, 
                'le.src=`https://vidsrc.cc/v2/embed/movie/${e}`');

fs.writeFileSync(jsPath, js, 'utf8');
console.log('Patched main JS to use vidsrc.cc embed');
