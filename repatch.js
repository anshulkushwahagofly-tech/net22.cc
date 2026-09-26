const fs = require('fs');

// Read trending.json
const trendingData = JSON.parse(fs.readFileSync('api/catalog/curated/trending.json', 'utf8'));

let searchItems = [];
if (trendingData.hero) {
    searchItems = searchItems.concat(trendingData.hero);
}
if (trendingData.rails && trendingData.rails[0] && trendingData.rails[0].items) {
    searchItems = searchItems.concat(trendingData.rails[0].items);
}

const searchJson = {
    ok: true,
    items: searchItems
};

fs.writeFileSync('api/catalog/search.json', JSON.stringify(searchJson), 'utf8');

const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

// Replace the previous patch with the new search.json
js = js.replace(/\.\/api\/catalog\/curated\/trending\.json/g, (match, offset, str) => {
    // Only replace it if it's inside the search function!
    // The search function has: `try{const s=(await(await X(..`
    // Actually, earlier we replaced ALL /api/catalog/title/... with trending.json, AND /api/catalog/search-hybrid... with trending.json.
    // It's easier to just do a `git checkout` on the JS file, and repatch.
    return match;
});

