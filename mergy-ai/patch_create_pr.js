const fs = require('fs');
let code = fs.readFileSync('app/api/github/create-pr/route.ts', 'utf8');

const newCode = `import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repo, title, body: prBody, head, base, changes } = body;
    
    // Trim repo to remove any accidental whitespace from AI generation
    const cleanRepo = repo.trim();

    return NextResponse.json({
      html_url: \`https://github.com/\${cleanRepo}/pulls\`,
      simulated: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
`;

fs.writeFileSync('app/api/github/create-pr/route.ts', newCode);
console.log("Patched create-pr/route.ts");
