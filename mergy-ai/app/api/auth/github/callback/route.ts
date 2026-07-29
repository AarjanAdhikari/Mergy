import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return NextResponse.json({ error: data.error_description }, { status: 400 });
    }

    const accessToken = data.access_token;

    // Send the token back to the main window via postMessage
    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Authenticating...</title>
          <script>
            if (window.opener) {
              window.opener.postMessage(
                { type: 'github-auth-success', token: '${accessToken}' },
                window.location.origin
              );
              window.close();
            } else {
              document.write('Authentication successful! You can close this tab.');
            }
          </script>
        </head>
        <body style="background-color: black; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif;">
          <h2>Authenticating...</h2>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error in GitHub callback:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
