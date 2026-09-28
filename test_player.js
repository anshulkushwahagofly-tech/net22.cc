const fs = require('fs');

async function checkPlayer() {
    try {
        const r = await fetch('https://net27.cc/watch-tmdb/1423191?type=movie');
        const t = await r.text();
        const s = t.match(/<script type="module" src="([^"]+)"/);
        if (s) {
            console.log("Module URL:", s[1]);
            const r2 = await fetch('https://net27.cc' + s[1]);
            const t2 = await r2.text();
            console.log(t2.substring(0, 1000));
        } else {
            console.log("No module script found");
        }
    } catch(e) {
        console.error(e);
    }
}
checkPlayer();
