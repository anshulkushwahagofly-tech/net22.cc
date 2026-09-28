const fs = require('fs');
const path = require('path');

const curatedDir = 'api/catalog/curated';
const files = fs.readdirSync(curatedDir);
let allMovies = {};

function addMovie(item) {
    if (!item || !item.tmdbId) return;
    const id = String(item.tmdbId);
    if (!allMovies[id]) {
        let movieObj = {
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
        
        // Add fake seasons for TV shows!
        if (movieObj.type === "tv") {
            movieObj.seasons = [
                { season: 1, episodeCount: 10 },
                { season: 2, episodeCount: 10 }
            ];
            movieObj.initialSeason = 1;
        }
        
        allMovies[id] = movieObj;
    }
}

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

const searchData = JSON.parse(fs.readFileSync('api/catalog/search.json', 'utf8'));
if (searchData.items) searchData.items.forEach(addMovie);

const heroPaths = ['api/catalog/hero.json', 'api/catalog/hero_kdrama.json'];
for (const hp of heroPaths) {
    if (fs.existsSync(hp)) {
        const hData = JSON.parse(fs.readFileSync(hp, 'utf8'));
        if (hData.hero && Array.isArray(hData.hero)) hData.hero.forEach(addMovie);
    }
}

fs.writeFileSync('api/catalog/title/all_movies.json', JSON.stringify(allMovies), 'utf8');
console.log('Updated all_movies.json with fake seasons for TV shows.');
