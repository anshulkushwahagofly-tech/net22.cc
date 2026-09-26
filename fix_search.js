const fs = require('fs');

const searchJsonPath = 'api/catalog/search.json';
const searchJson = JSON.parse(fs.readFileSync(searchJsonPath, 'utf8'));

// Copy backdrop to poster for all items
searchJson.items.forEach(item => {
    if (!item.poster && item.backdrop) {
        item.poster = item.backdrop;
    }
});

fs.writeFileSync(searchJsonPath, JSON.stringify(searchJson), 'utf8');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Replace the trending.json fallback for title API with the fallback.json
js = js.replace(/\.\/api\/catalog\/curated\/trending\.json/g, (match, offset, str) => {
    // We only want to replace the one used in `ye` function
    // In `patch_js_final.js` we did:
    // js.replace(/\/api\/catalog\/title\/\$\{t\}\/\$\{e\}/g, './api/catalog/curated/trending.json');
    // We'll just replace the literal string back. Wait, let's just do a git checkout and patch properly again.
    return match;
});

console.log('Fixed search.json posters');
