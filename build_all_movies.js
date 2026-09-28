const fs = require('fs');
const path = require('path');

const curatedDir = 'api/catalog/curated';
const files = fs.readdirSync(curatedDir);
let allMovies = {};

function addMovie(item) {
    if (!item || !item.tmdbId) return;
    const id = String(item.tmdbId);
    if (!allMovies[id]) {
        allMovies[id] = {
            ok: true,
            type: item.type || "movie",
            title: item.title,
            tagline: "",
            overview: item.overview || "Overview not available.",
            poster: item.poster || item.backdrop,
            backdrop: item.backdrop || item.poster,
            year: item.year || "",
            rating: item.rating || 0,
            genres: [],
            catalog: {
                streamable: true,
                subjectId: id
            }
        };
    }
}

// Read all curated files
for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const data = JSON.parse(fs.readFileSync(path.join(curatedDir, file), 'utf8'));
    if (data.hero && Array.isArray(data.hero)) data.hero.forEach(addMovie);
    if (data.rails && Array.isArray(data.rails)) {
        data.rails.forEach(rail => {
            if (rail.items) rail.items.forEach(addMovie);
        });
    }
}

// Read search.json
const searchData = JSON.parse(fs.readFileSync('api/catalog/search.json', 'utf8'));
if (searchData.items) searchData.items.forEach(addMovie);

// Read heroes
const heroPaths = ['api/catalog/hero.json', 'api/catalog/hero_kdrama.json'];
for (const hp of heroPaths) {
    if (fs.existsSync(hp)) {
        const hData = JSON.parse(fs.readFileSync(hp, 'utf8'));
        if (hData.hero && Array.isArray(hData.hero)) hData.hero.forEach(addMovie);
    }
}

// Read discover
const discoverPath = 'api/catalog/discover_kids.json';
if (fs.existsSync(discoverPath)) {
    const dData = JSON.parse(fs.readFileSync(discoverPath, 'utf8'));
    if (dData.items) dData.items.forEach(addMovie);
}

fs.writeFileSync('api/catalog/title/all_movies.json', JSON.stringify(allMovies), 'utf8');
console.log('Created all_movies.json with ' + Object.keys(allMovies).length + ' movies.');
