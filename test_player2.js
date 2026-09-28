const fs = require('fs');

async function testPlayer() {
    try {
        const r = await fetch('https://net27.cc/watch-tmdb/1423191?type=movie');
        const text = await r.text();
        console.log("Player page size:", text.length);
        
        // Find streams API call in JS if possible
        const jsMatches = text.match(/<script type="module" src="([^"]+)"/);
        if (jsMatches) {
            const jsCode = await (await fetch('https://net27.cc' + jsMatches[1])).text();
            console.log("JS size:", jsCode.length);
            // Look for api/catalog/streams or similar
            const apis = jsCode.match(/\/api\/[^`'"]+/g);
            console.log("Found API endpoints in player JS:", [...new Set(apis)]);
        }
    } catch(e) {
        console.error(e);
    }
}
testPlayer();
