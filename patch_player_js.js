const fs = require('fs');

let playerJs = fs.readFileSync('player.js', 'utf8');

// Patch all imports to use absolute URLs
playerJs = playerJs.replace(/from"\.\//g, 'from"https://net27.cc/_astro/');
playerJs = playerJs.replace(/import\("\.\//g, 'import("https://net27.cc/_astro/');

// Patch all fetch API calls to net27.cc
playerJs = playerJs.replace(/\/api\//g, 'https://net27.cc/api/');

fs.writeFileSync('player.js', playerJs, 'utf8');
console.log('Patched player.js successfully');
