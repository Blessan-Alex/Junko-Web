
const fs = require('fs');
const path = require('path');

const productsDir = path.join(process.cwd(), 'public', 'products');
const imageMap = {};

function scanDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else {
            // Key: filename (e.g., '80800RL.jpg')
            // Value: relative path suitable for src (e.g., '/products/Nested/80800RL.jpg')
            // Note: We need to normalize windows paths to forward slashes
            const relativePath = '/products' + fullPath.replace(productsDir, '').replace(/\\/g, '/');
            imageMap[file] = relativePath;
        }
    }
}

try {
    console.log("Scanning public/products...");
    scanDir(productsDir);
    const count = Object.keys(imageMap).length;
    console.log(`Found ${count} images.`);

    const productsFile = path.join(process.cwd(), 'src', 'data', 'products.ts');
    let content = fs.readFileSync(productsFile, 'utf8');
    let replacedCount = 0;

    // Regex to match: image: '/products/FILENAME'
    // We want to capture the filename
    const Regex = /image:\s*['"]\/products\/([^'"]+)['"]/g;

    const newContent = content.replace(Regex, (match, filename) => {
        // Check if we have a mapping for this filename
        if (imageMap[filename]) {
            replacedCount++;
            return `image: '${imageMap[filename]}'`;
        }

        // Try decoding URI component just in case
        try {
            const decoded = decodeURIComponent(filename);
            if (imageMap[decoded]) {
                replacedCount++;
                return `image: '${imageMap[decoded]}'`;
            }
        } catch (e) { }

        console.warn(`Warning: No image found for ${filename}`);
        return match;
    });

    fs.writeFileSync(productsFile, newContent);
    console.log(`Successfully updated ${replacedCount} image paths in products.ts`);

} catch (error) {
    console.error('Error:', error);
}
