const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

// The first fetch is in handleSubmitPR. It should be create-pr.
// The second fetch is in handleCreatePR. It should be fork.

// Let's replace both with unique placeholders based on function name
code = code.replace(/const handleSubmitPR = async \(\) => \{[\s\S]*?const res = await fetch\("\/api\/github\/fork"/, (match) => {
    return match.replace('/api/github/fork', '/api/github/create-pr');
});

code = code.replace(/const handleCreatePR = async \(fileName\?: string\) => \{[\s\S]*?const res = await fetch\("\/api\/github\/create-pr"/, (match) => {
    return match.replace('/api/github/create-pr', '/api/github/fork');
});

fs.writeFileSync('app/page.tsx', code);
console.log("Swapped fetch URLs");
