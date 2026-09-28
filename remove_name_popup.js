const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace "AK Anshuu" with "Welcome!"
html = html.replace(/<h3 class="text-2xl font-bold text-white mb-2">AK Anshuu<\/h3>/, '<h3 class="text-2xl font-bold text-white mb-2">Welcome!<\/h3>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed Anshuu name from popup');
