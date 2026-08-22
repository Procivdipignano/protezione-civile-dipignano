import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider");

  if (provider !== "github") {
    return NextResponse.json({ error: "Provider non supportato" }, { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.protezioneciviledipignano.it";
  const redirectUri = `${site}/api/callback`;

  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", clientId!);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "repo,user");

  return NextResponse.redirect(url.toString());
}
