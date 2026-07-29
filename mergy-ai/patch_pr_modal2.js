const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const target1 = `<h4 className="text-sm font-semibold text-neutral-300 mb-1">Risk Explanation & Diagnostics</h4>`;
const replace1 = `<h4 className="text-sm font-semibold text-neutral-300 mb-1">Risk Explanation & Diagnostics</h4>
                    <p className="text-xs text-blue-400 font-mono mb-2 bg-blue-400/10 p-2 rounded-lg border border-blue-400/20">
                      <strong>AI Audit Pipeline:</strong> Running the simulation tests the PR in a sandboxed CI/CD environment, checks dependency boundaries, and predicts regression risks. A successful simulation guarantees code safety before merging.
                    </p>`;

const target2 = `<Activity className="w-4 h-4" /> Simulate Merge Pipeline`;
const replace2 = `<Activity className="w-4 h-4" /> Run AI Security Audit Pipeline`;

if(code.includes(target1) && code.includes(target2)) {
    code = code.replace(target1, replace1);
    code = code.replace(target2, replace2);
    fs.writeFileSync('app/page.tsx', code);
    console.log("Patched successfully");
} else {
    console.log("Not found");
}
