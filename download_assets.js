const fs = require('fs');
const https = require('https');
const path = require('path');

const baseUrl = 'https://net27.cc';

// Helper to download a file
function downloadFile(url, outputPath) {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(outputPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error("Failed to download " + url + ", status code: " + res.statusCode));
                return;
            }
            const file = fs.createWriteStream(outputPath);
            res.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(outputPath, () => reject(err));
        });
    });
}

async function cloneSite() {
    console.log('Downloading HTML...');
    let html = fs.readFileSync('index.html', 'utf8');

    const assetsToDownload = [
        '/_astro/Layout.CUFJSlML.css',
        '/_astro/index.P3dZcbru.css',
        '/_astro/index.astro_astro_type_script_index_0_lang.DI15MgJt.js'
    ];

    for (const asset of assetsToDownload) {
        const assetUrl = baseUrl + asset;
        const localPath = path.join(__dirname, asset.substring(1));
        console.log("Downloading " + assetUrl + " to " + localPath + "...");
        try {
            await downloadFile(assetUrl, localPath);
            const regex = new RegExp(asset.replace(/\\./g, '\\.'), 'g');
            html = html.replace(regex, '.' + asset);
            console.log("Downloaded and updated path for " + asset);
        } catch (err) {
            console.error(err);
        }
    }

    html = html.replace(/href="\/icons\//g, 'href="./icons/');
    html = html.replace(/href="\/manifest\.json"/g, 'href="./manifest.json"');
    html = html.replace(/href="\/apple-touch-icon\.png"/g, 'href="./apple-touch-icon.png"');

    // Also fix any root-relative image tags
    html = html.replace(/src="\//g, 'src="./');

    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Done cloning assets and updating HTML!');
}

cloneSite();
