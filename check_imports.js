const fs = require('fs');
const text = fs.readFileSync('player.js', 'utf8');
const matches = text.match(/import\s*\{[^}]+\}\s*from\s*"[^"]+"/g);
console.log(matches ? matches.slice(0, 10) : 'none');
