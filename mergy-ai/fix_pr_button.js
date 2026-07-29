const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const target = `<button 
                       onClick={() => handleCreatePR()} 
                       disabled={isCreatingPR}
                       className="h-10 px-5 rounded-full bg-green-400/10 hover:bg-green-400/20 text-green-400 border border-green-400/20 text-sm font-medium transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                     >
                       {isCreatingPR ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitPullRequest className="w-4 h-4" />} Fork to Your Account
                     </button>`;

const replacement = `<div className="flex flex-col sm:flex-row gap-3">
                       <button 
                         onClick={() => handleCreatePR()} 
                         disabled={isCreatingPR}
                         className="h-10 px-5 rounded-full bg-green-400/10 hover:bg-green-400/20 text-green-400 border border-green-400/20 text-sm font-medium transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                       >
                         {isCreatingPR ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitPullRequest className="w-4 h-4" />} Fork to Your Account
                       </button>
                       <button 
                         onClick={() => handleSubmitPR()} 
                         className="h-10 px-5 rounded-full bg-blue-500 hover:bg-blue-600 text-white border border-blue-500/20 text-sm font-medium transition-all flex items-center justify-center gap-2 shrink-0"
                       >
                         <GitPullRequest className="w-4 h-4" /> Submit Pull Request
                       </button>
                     </div>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('app/page.tsx', code);
  console.log("Success: Replaced PR button");
} else {
  console.log("Error: Target not found");
}
