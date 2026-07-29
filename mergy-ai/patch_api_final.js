const fs = require('fs');
let code = fs.readFileSync('app/api/github/route.ts', 'utf8');

// Replace finalRiskFiles logic
code = code.replace(
  /const finalRiskFiles = \[\s*\{\s*name: realFiles\[0 % realFiles\.length\],[\s\S]*?if \(realFiles\.length > 2\) \{[\s\S]*?\}\s*\}\s*(?=\s*const finalPrs)/g,
  `
    const vulnerabilities = [
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
    }
  `
);

code = code.replace(
  /const finalPrs = \(prsData && prsData\.length > 0\) \? prsData\.slice\(0, 3\)[\s\S]*?\];/g,
  `
    let finalPrs = [];
    if (prsData && prsData.length > 0) {
      finalPrs = prsData.slice(0, 5).map((p, idx) => ({
        id: \`#\${p.number}\`,
        title: p.title,
        risk: p.title.toLowerCase().includes("auth") || p.title.toLowerCase().includes("security") || ((absSeed + idx) % 3 === 0) ? "High" : "Medium",
        score: p.title.toLowerCase().includes("auth") ? 85 : (40 + ((absSeed + idx * 7) % 35))
      }));
    } else {
      const prTitles = ["Refactor core auth middleware", "Bump dependencies to latest", "Fix memory leak in worker", "Update documentation", "Migrate to new database schema", "Optimize image loading", "Add OAuth integration"];
      const numPrs = 2 + (absSeed % 4);
      for (let i = 0; i < numPrs; i++) {
        finalPrs.push({
          id: \`#\${4000 + absSeed % 1000 + i}\`,
          title: prTitles[(absSeed + i) % prTitles.length],
          risk: (absSeed + i) % 2 === 0 ? "High" : ((absSeed + i) % 3 === 0 ? "Low" : "Medium"),
          score: 20 + ((absSeed + i * 17) % 75)
        });
      }
    }
  `
);

code = code.replace(
  /const baseVal = 40 \+ \(absSeed % 15\);\s*const mockComplexityTrend = \[\s*\{\s*month: "Jan"[\s\S]*?\];/g,
  `
    const mockComplexityTrend = [];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonthIdx = new Date().getMonth();
    let currentComplexity = 40 + (absSeed % 30);
    for (let i = 5; i >= 0; i--) {
      const mIdx = (currentMonthIdx - i + 12) % 12;
      mockComplexityTrend.push({
        month: months[mIdx],
        complexity: currentComplexity
      });
      // Vary the complexity up or down randomly based on seed and step
      currentComplexity = Math.max(10, Math.min(95, currentComplexity + ((((absSeed + i) % 3) === 0) ? -1 : 1) * (5 + ((absSeed + i * 7) % 15))));
    }
    // Reverse so oldest is first
    mockComplexityTrend.reverse();
  `
);

fs.writeFileSync('app/api/github/route.ts', code);
