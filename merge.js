const fs = require('fs');

let responsiveCss = fs.readFileSync('responsive.css', 'utf8');

// 1. Add !important to all properties inside @media blocks
responsiveCss = responsiveCss.replace(/@media\s*\([^\{]+\)\s*\{([\s\S]*?)\n\}/g, (match, innerBlock) => {
    // Only process standard @media(max-width) blocks, not prefers-reduced-motion
    if (match.includes('prefers-reduced-motion')) return match;
    
    let newInner = innerBlock.replace(/([a-zA-Z\-]+)\s*:\s*([^;}]+)(;?)/g, (m, prop, val, semi) => {
        if (val.includes('!important')) return m;
        return `${prop}: ${val.trim()} !important${semi || ';'}`;
    });
    return match.replace(innerBlock, newInner);
});

// 2. Inject the .pkg-card fixes into @media(max-width:820px)
const pkgFixes = `
  .pkg-card {
    flex-direction: column !important;
    height: auto !important;
    padding: 24px 16px !important;
    gap: 20px !important;
    border-radius: 30px !important;
  }
  .pkg-stops {
    flex-wrap: wrap !important;
    justify-content: center !important;
    overflow: visible !important;
  }
  .pkg-price {
    width: 100% !important;
  }
`;
responsiveCss = responsiveCss.replace(/@media\(max-width:820px\)\s*\{([\s\S]*?)\n\}/, (match, inner) => {
    // If it already has .pkg-card, skip adding it again
    if (inner.includes('.pkg-card')) return match;
    return match.replace(inner, inner + pkgFixes);
});

// 3. Read index.html
let html = fs.readFileSync('index.html', 'utf8');

// 4. Remove the <link rel="stylesheet" href="responsive.css">
html = html.replace(/<link rel="stylesheet" href="responsive\.css">\s*/g, '');

// 5. Replace the existing <style>...</style> block with the new one
// First, find and remove all existing <style> blocks
html = html.replace(/<style>[\s\S]*?<\/style>\s*/g, '');

// Now insert the new <style> block right before </head>
html = html.replace('</head>', `<style>\n${responsiveCss}\n</style>\n</head>`);

// Write it back
fs.writeFileSync('index.html', html);
console.log('Successfully merged responsive.css into index.html');
