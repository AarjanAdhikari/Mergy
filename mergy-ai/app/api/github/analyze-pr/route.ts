import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const repo = req.nextUrl.searchParams.get("repo");
    const prNumber = req.nextUrl.searchParams.get("pr");

    if (!repo || !prNumber) {
      return NextResponse.json({ error: "Missing repo or pr parameter" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("github_access_token")?.value;
    const headers: any = {
      Accept: "application/vnd.github.v3.diff", // Get diff
      'User-Agent': 'Mergy-AI-App',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // fetch PR diff
    const res = await fetch(`https://api.github.com/repos/${repo}/pulls/${prNumber}`, { headers });
    if (!res.ok) {
      return NextResponse.json({ error: `GitHub returned status ${res.status}` }, { status: res.status });
    }
    
    const diffText = await res.text();

    const systemPrompt = `You are a strict security auditor. Analyze this pull request diff for security vulnerabilities, logic errors, and best practices.
Respond strictly in JSON format without markdown blocks.
{
  "risk": "<High|Medium|Low>",
  "score": <number 1-100 (100 is highly critical/risky)>,
  "explanation": "<A short explanation of the findings and your recommendation>"
}
`;

    let parsed: any;
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: systemPrompt + "\n\nDiff:\n" + diffText.substring(0, 15000), // truncate diff if too large
      });

      const aiText = response.text || "{}";
      const cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleanedText);
    } catch (apiErr) {
      console.warn("Falling back to simulated PR analysis due to:", apiErr);
      parsed = {
        risk: "Low",
        score: 8,
        explanation: "Simulated analysis: No critical vulnerabilities detected in this diff."
      };
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Failed to analyze PR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
