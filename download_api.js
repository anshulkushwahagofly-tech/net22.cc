const fs = require('fs');
const path = require('path');

const baseUrl = 'https://net27.cc';

async function downloadApi(endpoint, localFilename) {
    console.log("Downloading " + endpoint + " to " + localFilename + "...");
    const localPath = path.join(__dirname, localFilename);
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        const response = await fetch(baseUrl + endpoint);
        const data = await response.text();
        fs.writeFileSync(localPath, data, 'utf8');
        console.log("Saved " + localFilename);
    } catch (e) {
        console.error('Error downloading', endpoint, e);
    }
}

async function run() {
    await downloadApi('/api/catalog/curated/trending', 'api/catalog/curated/trending.json');
    await downloadApi('/api/catalog/curated/KDrama', 'api/catalog/curated/KDrama.json');
    await downloadApi('/api/catalog/curated/LatestRelease', 'api/catalog/curated/LatestRelease.json');
    await downloadApi('/api/catalog/curated/Kids', 'api/catalog/curated/Kids.json');
    await downloadApi('/api/catalog/hero', 'api/catalog/hero.json');
    await downloadApi('/api/catalog/hero?type=tv&country=KR', 'api/catalog/hero_kdrama.json');
    await downloadApi('/api/catalog/discover?type=movie&genre=10751&sort=popularity', 'api/catalog/discover_kids.json');
}

run();
