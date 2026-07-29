const fs = require('fs');
let code = fs.readFileSync('app/api/github/route.ts', 'utf8');

code = code.replace(
  'finalPrs = prsData.slice(0, 5).map((p, idx) => ({',
  'finalPrs = prsData.slice(0, 5).map((p: any, idx: number) => ({'
);

fs.writeFileSync('app/api/github/route.ts', code);
console.log("Fixed type error");
