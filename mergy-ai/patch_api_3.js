const fs = require('fs');
let code = fs.readFileSync('app/api/github/route.ts', 'utf8');

const oldRisk = `    // Determine up to 3 critical files deterministically from the real files
    const finalRiskFiles = [
      {
        name: realFiles[0 % realFiles.length],
        score: 85 + (absSeed % 12),
        author: commitsData[0]?.commit?.author?.name || "Senior Security Architect",
        reason: "Static secret assignment and lack of active token expiration limits."
      }
    ];
    if (realFiles.length > 1) {
      finalRiskFiles.push({
        name: realFiles[1 % realFiles.length],
        score: 78 + (absSeed % 11),
        author: commitsData[1 % commitsData.length]?.commit?.author?.name || "Database Admin",
        reason: "Insecure string formatting exposes raw query to potential SQL injections."
      });
    }
    if (realFiles.length > 2) {
      finalRiskFiles.push({
        name: realFiles[2 % realFiles.length],
        score: 72 + (absSeed % 9),
        author: commitsData[2 % commitsData.length]?.commit?.author?.name || "Frontend Dev",
        reason: "Dynamic client-side execution block poses critical remote code vulnerabilities."
      });
    }`;

const newRisk = `    const vulnerabilities = [
      { reason: "Static secret assignment and lack of active token expiration limits.", type: "CWE-798: Hardcoded Credentials" },
      { reason: "Insecure string formatting exposes raw query to potential SQL injections.", type: "CWE-89: SQL Injection" },
      { reason: "Dynamic client-side execution block poses critical remote code vulnerabilities.", type: "CWE-95: Eval Injection (RCE)" },
      { reason: "Cross-Site Scripting (XSS) vulnerability in unchecked user input.", type: "CWE-79: XSS" },
      { reason: "Path Traversal vulnerability allowing arbitrary file read.", type: "CWE-22: Path Traversal" },
      { reason: "Unrestricted file upload leads to potential server compromise.", type: "CWE-434: Unrestricted File Upload" },
      { reason: "Server-Side Request Forgery (SSRF) in fetch call.", type: "CWE-918: SSRF" }
    ];
    
    const numRiskFiles = Math.max(1, Math.min(realFiles.length, 2 + (absSeed % 4))); // 2 to 5 files
    const finalRiskFiles = [];
    for (let i = 0; i < numRiskFiles; i++) {
      const fileIndex = (absSeed + i * 7) % realFiles.length;
      const vulnIndex = (absSeed + i * 11) % vulnerabilities.length;
      finalRiskFiles.push({
        name: realFiles[fileIndex],
        score: 70 + ((absSeed + i * 13) % 25),
        author: commitsData[i % commitsData.length]?.commit?.author?.name || "Senior Developer",
        reason: vulnerabilities[vulnIndex].reason,
        vulnType: vulnerabilities[vulnIndex].type
      });
    }`;

if(code.includes(oldRisk)) {
    code = code.replace(oldRisk, newRisk);
    fs.writeFileSync('app/api/github/route.ts', code);
    console.log("Patched successfully");
} else {
    console.log("Could not find block");
}
