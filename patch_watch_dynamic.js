const fs = require('fs');

let html = fs.readFileSync('watch.html', 'utf8');

// Insert a script before the player script to parse query parameters and update #player-config
const dynamicConfigScript = `
<script>
  (function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tmdbid = urlParams.get('id') || '1423191';
    const type = urlParams.get('type') || 'movie';
    const se = urlParams.get('se');
    const ep = urlParams.get('ep');
    
    document.addEventListener('DOMContentLoaded', () => {
      const config = document.getElementById('player-config');
      if (config) {
        config.setAttribute('data-tmdbid', tmdbid);
        config.setAttribute('data-type', type);
        if (se) config.setAttribute('data-initial-se', se);
        if (ep) config.setAttribute('data-initial-ep', ep);
      }
    });
  })();
</script>
`;

html = html.replace(/<script type="module"/, dynamicConfigScript + '\n<script type="module"');
fs.writeFileSync('watch.html', html, 'utf8');
console.log('Patched watch.html with dynamic config script');
