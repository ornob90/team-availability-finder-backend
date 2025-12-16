// src/email/email.service.ts
import { mailer } from "./email.client";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  console.dir({ to, subject, html, text }, { depth: null });

  await mailer.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}
