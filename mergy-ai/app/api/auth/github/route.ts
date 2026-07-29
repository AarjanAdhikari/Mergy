import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  
  // Detect if credentials are unset or are default placeholders
  const isDemoMode = !clientId || 
                     clientId === "YOUR_GITHUB_CLIENT_ID" || 
                     !clientSecret || 
                     clientSecret === "YOUR_GITHUB_CLIENT_SECRET";

  // Dynamic origin detection with proxy header awareness
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "localhost:3000";
  const origin = process.env.APP_URL || `${proto}://${host}`;
  
  if (isDemoMode) {
    // Seamlessly bypass GitHub auth screen and redirect straight to callback with demo state
    const demoAuthUrl = `${origin}/api/auth/github/callback?code=demo_code`;
    return NextResponse.json({ url: demoAuthUrl });
  }

  const redirectUri = `${origin}/api/auth/github/callback`;

  const params = new URLSearchParams({
    client_id: clientId!,
    redirect_uri: redirectUri,
    scope: "repo read:user", // we need repo scope to read repos, and read:user for user info
  });

  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return NextResponse.json({ url: authUrl });
}
