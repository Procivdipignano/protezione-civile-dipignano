import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new NextResponse(postMessage("error", "github", "Codice mancante"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await res.json();

  if (data.error || !data.access_token) {
    return new NextResponse(postMessage("error", "github", data.error ?? "Errore sconosciuto"), {
      headers: { "Content-Type": "text/html" },
    });
  }

  const token = JSON.stringify({ token: data.access_token, provider: "github" });
  return new NextResponse(postMessage("success", "github", token), {
    headers: { "Content-Type": "text/html" },
  });
}

function postMessage(status: "success" | "error", provider: string, content: string) {
  const msg = `authorization:${provider}:${status}:${content}`;
  return `<!doctype html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(${JSON.stringify(msg)}, e.origin);
        window.close();
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:${provider}", "*");
    })();
  </script></body></html>`;
}
