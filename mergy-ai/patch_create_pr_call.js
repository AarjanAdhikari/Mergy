const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  'const res = await fetch("/api/github/create-pr", {',
  'const res = await fetch("/api/github/fork", {'
);

fs.writeFileSync('app/page.tsx', code);
console.log("Patched handleCreatePR to use /fork");
