import { prisma } from "../db/client";
import crypto from "crypto";
import { sendEmail } from "../email/email.service";
import { activationEmailTemplate } from "../email/templates/activation";

export async function createActivationToken(userId: string, email: string) {
  const token = crypto.randomBytes(32).toString("hex");

  await prisma.accountActivationToken.create({
    data: {
      userId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  });

  const activationLink = `${process.env.APP_URL}/activate?token=${token}`;

  const emailTemplate = activationEmailTemplate({
    activationLink,
  });

  await sendEmail({
    to: email,
    subject: emailTemplate.subject,
    html: emailTemplate.html,
    text: emailTemplate.text,
  });

  return true;
}

export async function activateAccount(token: string) {
  const record = await prisma.accountActivationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record) {
    throw new Error("Invalid activation token");
  }

  if (record.usedAt) {
    throw new Error("Activation token already used");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("Activation token expired");
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { isActive: true },
    }),
    prisma.accountActivationToken.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  ]);

  return true;
}
