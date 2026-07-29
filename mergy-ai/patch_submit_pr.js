const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const oldHandleSubmit = `  const handleSubmitPR = () => {
    setShowPRModal(true);
  };`;

const newHandleSubmit = `  const handleSubmitPR = async () => {
    setIsCreatingPR(true);
    setFixProgressStep("Redirecting to GitHub Pull Request...");
    try {
      const res = await fetch("/api/github/create-pr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
           repo: repoData?.name || "repo", 
           title: "Submit PR",
           changes: true 
        })
      });
      const data = await res.json();
      if (data.html_url) {
        window.open(data.html_url, "_blank");
      }
      setShowPRModal(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingPR(false);
      setFixProgressStep("");
    }
  };`;

if (code.includes(oldHandleSubmit)) {
    code = code.replace(oldHandleSubmit, newHandleSubmit);
    fs.writeFileSync('app/page.tsx', code);
    console.log("Patched handleSubmitPR successfully");
} else {
    console.log("oldHandleSubmit not found");
}
