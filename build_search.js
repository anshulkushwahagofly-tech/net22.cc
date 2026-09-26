const fs = require('fs');
const path = require('path');

// Read trending.json
const trendingData = JSON.parse(fs.readFileSync('api/catalog/curated/trending.json', 'utf8'));

// The search endpoint expects { items: [...] }
// We'll just grab the 'hero' items and maybe the first rail's items to make a big list
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

// Now repatch the JS to use search.json instead of trending.json for searches
const jsPath = '_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js';
let js = fs.readFileSync(jsPath, 'utf8');

js = js.replace(/\.\/api\/catalog\/curated\/trending\.json/g, (match, offset, string) => {
    // Only replace it if it was for the search-hybrid replacement (we can just replace all instances where it was search-hybrid, but we already replaced it!)
    // Wait, let's just use the exact regex again on the original file if we can.
    return match;
});

// To be safe, I'll just restore the original JS and apply BOTH patches perfectly.
