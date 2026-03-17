const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../src/data/products.ts');
let content = fs.readFileSync(productsFilePath, 'utf8');

// Add 'slug: string;' to Product interface if not exists
if (!content.includes('slug: string;')) {
    content = content.replace(
        'id: string;',
        'id: string;\n    slug: string;'
    );
}

// Extract allProducts array string
const allProductsRegex = /export const allProducts: Product\[\] = (\[[\s\S]*\]);/;
const match = content.match(allProductsRegex);

if (match) {
    let allProducts = eval(match[1]); // It's safe to eval since we control the file
    let seenSlugs = new Set();
    
    function createSlug(name, category, subcategory) {
        let base = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (base.length < 3 || base === 'general') {
             base = `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}--${base}`;
        }
        let slug = base;
        let counter = 1;
        while (seenSlugs.has(slug)) {
            slug = `${base}-${counter}`;
            counter++;
        }
        seenSlugs.add(slug);
        return slug;
    }

    allProducts.forEach(p => {
        if (!p.slug) {
            p.slug = createSlug(p.name, p.category, p.subcategory);
        }
    });

    const newAllProductsStr = JSON.stringify(allProducts, null, 4);
    content = content.replace(match[1], newAllProductsStr);
    
    fs.writeFileSync(productsFilePath, content, 'utf8');
    
    // Also save a JSON map of old ID to new slug for Next.js redirects
    const redirectsMap = allProducts.map(p => ({
        source: `/product/${p.id}`,
        destination: `/product/${p.slug}`,
        permanent: true
    }));
    fs.writeFileSync(path.join(__dirname, 'redirects.json'), JSON.stringify(redirectsMap, null, 2), 'utf8');
    console.log('Successfully updated products.ts with slugs and created redirects map.');
} else {
    console.error('Failed to find allProducts array.');
}
