const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const targetRegex = /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" title="Compliance monitors update as files are secured\.">[\s\S]*?(?=<\/div>\n              <\/div>\n\n              \{\/\* Vulnerability Trend Graph \*\/)/;

const replacement = `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" title="Compliance monitors update as files are secured.">
                  {(repoData?.riskFiles || []).slice(0, 4).map((file: any, idx: number) => {
                    const isSecured = !!fixedFiles[file.name];
                    return (
                      <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] transition-colors flex items-center justify-between gap-3 cursor-default">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-mono text-neutral-500 mb-1 truncate" title={file.vulnType || 'Security Vulnerability'}>{file.vulnType || 'Security Vulnerability'}</p>
                          <p className="text-sm font-semibold text-white truncate">
                            {isSecured ? "Secured & Verified" : "1 Risk Detected"}
                          </p>
                        </div>
                        <span className={\`w-2.5 h-2.5 rounded-full shrink-0 \${isSecured ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]"}\`} />
                      </div>
                    );
                  })}
                  {(!repoData?.riskFiles || repoData.riskFiles.length === 0) && (
                    <div className="col-span-full text-center py-4 text-neutral-500 font-mono text-xs">
                      All compliance checks passed initially.
                    </div>
                  )}
                </div>`;

if (targetRegex.test(code)) {
  code = code.replace(targetRegex, replacement);
  fs.writeFileSync('app/page.tsx', code);
  console.log("Success: Replaced checklist");
} else {
  console.log("Error: Target not found");
}
