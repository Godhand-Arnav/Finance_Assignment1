const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/notebook.css', 'utf8');
const engine = fs.readFileSync('js/engine.js', 'utf8');
const app = fs.readFileSync('js/app.js', 'utf8');

// Replace external links with inline content
let bundle = index.replace(
  '<link rel="stylesheet" href="css/notebook.css">',
  `<style>\n${css}\n</style>`
);

bundle = bundle.replace(
  '<script src="js/engine.js"></script>',
  `<script>\n${engine}\n</script>`
);

bundle = bundle.replace(
  '<script src="js/app.js"></script>',
  `<script>\n${app}\n</script>`
);

fs.writeFileSync('FinSight.html', bundle);
console.log('Successfully created standalone FinSight.html');
