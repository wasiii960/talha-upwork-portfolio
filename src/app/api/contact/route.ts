import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const botcheck = body?.botcheck;

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (botcheck) {
    return NextResponse.json({ success: true });
  }

  const origin = request.headers.get("origin") ?? `https://${request.headers.get("host") ?? "localhost"}`;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Origin: origin,
      Referer: origin,
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New project inquiry from ${name}`,
      name,
      email,
      message,
    }),
  });

  const responseText = await response.text();
  let result: { success?: boolean; message?: string };
  try {
    result = JSON.parse(responseText);
  } catch {
    result = { success: false, message: "Non-JSON response from Web3Forms" };
  }

  if (!response.ok || !result.success) {
    console.error("Web3Forms submission failed", {
      status: response.status,
      body: responseText.slice(0, 500),
    });
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
