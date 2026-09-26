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

async function cloneIcons() {
    const assets = [
        '/icons/icon-32.png',
        '/icons/icon-16.png',
        '/icons/icon-192.png',
        '/icons/icon-180.png',
        '/apple-touch-icon.png',
        '/manifest.json'
    ];

    for (const asset of assets) {
        const assetUrl = baseUrl + asset;
        const localPath = path.join(__dirname, asset.substring(1));
        console.log("Downloading " + assetUrl + "...");
        try {
            await downloadFile(assetUrl, localPath);
        } catch (err) {
            console.error(err);
        }
    }
}

cloneIcons();
