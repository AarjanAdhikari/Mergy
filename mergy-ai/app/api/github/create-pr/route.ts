import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repo, title, body: prBody, head, base, changes } = body;
    
    // Trim repo to remove any accidental whitespace from AI generation
    const cleanRepo = repo.trim();

    return NextResponse.json({
      html_url: `https://github.com/${cleanRepo}/compare`,
      simulated: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
