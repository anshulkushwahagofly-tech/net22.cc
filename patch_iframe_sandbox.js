const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add sandbox attribute to the iframe
html = html.replace(/<iframe id="watch-modal-iframe" class="w-full h-full border-0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="no-referrer"><\/iframe>/, 
'<iframe id="watch-modal-iframe" class="w-full h-full border-0" sandbox="allow-scripts allow-same-origin allow-forms allow-presentation" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="no-referrer"></iframe>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Patched index.html with iframe sandbox');
