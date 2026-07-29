import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repo } = body;
    const cleanRepo = repo.trim();

    return NextResponse.json({
      html_url: `https://github.com/${cleanRepo}/fork`
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
