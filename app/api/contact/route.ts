import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { nome, email, messaggio } = await req.json();

  if (!nome || !email || !messaggio) {
    return NextResponse.json({ error: "Campi mancanti" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Sito Protezione Civile Dipignano" <${process.env.GMAIL_USER}>`,
    to: "protezionecivile.dipignano@gmail.com",
    replyTo: email,
    subject: `Messaggio dal sito — ${nome}`,
    text: `Nome: ${nome}\nEmail: ${email}\n\n${messaggio}`,
    html: `<p><strong>Nome:</strong> ${nome}</p><p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p><hr/><p>${messaggio.replace(/\n/g, "<br/>")}</p>`,
  });

  return NextResponse.json({ ok: true });
}
