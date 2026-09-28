const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The emoji might have been garbled. We will just use regex to replace whatever is in the H3 tag.
html = html.replace(/<h3 class="text-2xl font-bold text-white mb-2">.*?<\/h3>/, '<h3 class="text-2xl font-bold text-white mb-2">AK Anshuu</h3>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed H3 tag');
