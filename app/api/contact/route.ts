import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const maxLength = (value: unknown, n: number) => typeof value === "string" ? value.trim().slice(0, n) : "";
const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const serviceOptions = new Set(["Grand ménage", "Nettoyage de déménagement", "Entretien de locations", "Autre demande"]);

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  // A simple honeypot suppresses most bot traffic without adding a CAPTCHA to the UI.
  if (maxLength(body.website, 250)) return NextResponse.json({ ok: true });

  const name = maxLength(body.name, 100);
  const email = maxLength(body.email, 200);
  const phone = maxLength(body.phone, 60);
  const service = maxLength(body.service, 70);
  const message = maxLength(body.message, 2500);
  if (!name || !validEmail(email) || !serviceOptions.has(service)) {
    return NextResponse.json({ error: "Please provide your name, a valid email, and a service." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: "Online inquiries aren't configured yet. Please contact us by email instead.", code: "NOT_CONFIGURED" }, { status: 503 });
  }
  // Use text only: user input is never interpreted as HTML.
  const text = ["Nouvelle demande de nettoyage HYB Prévention demande de renseignements", `Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "Not provided"}`, `Service: ${service}`, "", "Message:", message || "Not provided"].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Demande de nettoyage HYB — ${service}`, text }),
      cache: "no-store",
    });
    if (!response.ok) return NextResponse.json({ error: "Couldn't send your message. Please try our email address." }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "A connection error occurred. Please try email instead." }, { status: 502 });
  }
}
