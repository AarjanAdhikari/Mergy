const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const target = `        </footer>
</div>
  );
}`;

const replacement = `        </footer>

        {showPRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <GitPullRequest className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center mb-2">Pull Request Created!</h3>
              <p className="text-neutral-400 text-center mb-8 text-sm">
                Your AI-remediated code has been packaged into a pull request and submitted. 
              </p>
              <div className="flex justify-center">
                <button 
                  onClick={() => setShowPRModal(false)}
                  className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors w-full"
                >
                  Back to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
</div>
  );
}`;

if (code.includes(target) && !code.includes('Pull Request Created!')) {
  code = code.replace(target, replacement);
  fs.writeFileSync('app/page.tsx', code);
  console.log("Success: Added modal");
} else {
  console.log("Error: Target not found or already added");
}
