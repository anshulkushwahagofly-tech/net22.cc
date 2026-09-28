const fs = require('fs');
let html = fs.readFileSync('watch.html', 'utf8');
html = html.replace(/<script type="module" src="\/_astro\/_tmdbId_[^"]+"><\/script>/, '<script type="module" src="./player.js"></script>');
fs.writeFileSync('watch.html', html, 'utf8');
console.log('Patched watch.html');
