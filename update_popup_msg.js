const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace "Welcome, Anshul!" with "AK Anshuu"
html = html.replace(/Welcome, Anshul! 🎉/g, 'AK Anshuu 🎉');

// Ensure the welcome message below is updated
html = html.replace(/Enjoy your favorite movies and shows! Please close this popup to start streaming the video./g, 
'Welcome to our premium streaming platform! Enjoy your favorite movies and shows. Please close this popup to start streaming the video.');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated popup name and message');
