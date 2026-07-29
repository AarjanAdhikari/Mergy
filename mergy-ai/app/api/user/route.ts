import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("github_access_token")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  if (token === "demo_access_token") {
    return NextResponse.json({
      user: {
        login: "Mergy_Eng",
        name: "Mergy Developer",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
        html_url: "https://github.com"
      }
    });
  }

  try {
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!userRes.ok) {
      // Token might be invalid
      return NextResponse.json({ user: null });
    }

    const userData = await userRes.json();
    return NextResponse.json({ user: userData });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("github_access_token");
  return NextResponse.json({ success: true });
}
