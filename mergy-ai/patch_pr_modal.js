const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const targetModal = `<h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>Pull Request {selectedPr.id}</span>
                  <span className={\`text-xs font-mono px-3 py-1 rounded-full \${
                    selectedPr.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                    selectedPr.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }\`}>
                    {selectedPr.risk} Risk
                  </span>
                </h3>`;

const replacementModal = `<h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>Pull Request {selectedPr.id}</span>
                  <span className={\`text-xs font-mono px-3 py-1 rounded-full \${
                    selectedPr.risk === 'High' ? 'bg-red-500/20 text-red-400' :
                    selectedPr.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }\`}>
                    {selectedPr.risk} Risk
                  </span>
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Running an AI pipeline audit will execute static analysis and dependency resolution in a sandboxed environment to ensure code compliance before merging.
                </p>`;

if (code.includes('<h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">') && !code.includes('Running an AI pipeline audit')) {
    code = code.replace(targetModal, replacementModal);
    fs.writeFileSync('app/page.tsx', code);
    console.log("Patched PR modal to explain pipeline benefits");
} else {
    console.log("Could not find PR modal or already patched");
}
