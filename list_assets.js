const fs = require('fs');
const https = require('https');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');

console.log('HTML Size:', html.length);

// Extract CSS links
const linkRegex = /<link[^>]+href="([^"]+)"[^>]*>/gi;
let match;
while ((match = linkRegex.exec(html)) !== null) {
    console.log('Found link:', match[1]);
}

// Extract JS scripts
const scriptRegex = /<script[^>]+src="([^"]+)"[^>]*>/gi;
while ((match = scriptRegex.exec(html)) !== null) {
    console.log('Found script:', match[1]);
}
