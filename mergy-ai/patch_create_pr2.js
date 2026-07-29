const fs = require('fs');
let code = fs.readFileSync('app/api/github/create-pr/route.ts', 'utf8');

code = code.replace(
  'html_url: `https://github.com/${cleanRepo}/pulls`',
  'html_url: `https://github.com/${cleanRepo}/compare`'
);

fs.writeFileSync('app/api/github/create-pr/route.ts', code);
console.log("Patched create-pr/route.ts with compare URL");
