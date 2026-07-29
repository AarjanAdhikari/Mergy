import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const repo = req.nextUrl.searchParams.get("repo");
  const path = req.nextUrl.searchParams.get("path");

  if (!repo || !path) {
    return NextResponse.json({ error: "Missing repo or path parameter" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("github_access_token")?.value;

  const headers: any = {
    Accept: "application/vnd.github.v3+json",
    'User-Agent': 'Mergy-AI-App',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, { headers });
    
    if (!res.ok) {
      return NextResponse.json({ error: `GitHub returned status ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    if (data.encoding === "base64" && data.content) {
      // Decode base64 content
      const decoded = Buffer.from(data.content, "base64").toString("utf-8");
      return NextResponse.json({ content: decoded });
    }

    return NextResponse.json({ error: "Unable to parse file content or encoding" }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch file" }, { status: 500 });
  }
}
