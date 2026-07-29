const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

code = code.replace(
  /<div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">/,
  '<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">'
);

code = code.replace(
  /<button onClick=\{\(\) => setSelectedRiskFile\(null\)\} className="px-6 py-2.5 rounded-full bg-white\/10 text-white font-medium text-sm hover:bg-white\/20 transition-all shrink-0"/,
  '<button onClick={() => setSelectedRiskFile(null)} className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 text-white font-medium text-sm hover:bg-white/20 transition-all shrink-0"'
);

code = code.replace(
  /className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"/,
  'className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"'
);

code = code.replace(
  /className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-all flex items-center gap-2 disabled:opacity-50 shrink-0"/,
  'className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"'
);

fs.writeFileSync('app/page.tsx', code);
