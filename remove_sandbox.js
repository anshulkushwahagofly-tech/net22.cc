const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the sandbox attribute
html = html.replace(/sandbox="allow-scripts allow-same-origin allow-forms allow-presentation" /g, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed sandbox from index.html');
