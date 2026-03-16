
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
            // Store relative path from 'public'
            // key is filename for lookup
            const relativePath = fullPath.replace(path.join(process.cwd(), 'public'), '').replace(/\\/g, '/');
            imageMap[file] = relativePath;
        }
    }
}

try {
    scanDir(productsDir);
    console.log(JSON.stringify(imageMap, null, 2));
} catch (error) {
    console.error('Error scanning directory:', error);
}
