// src/config/index.ts
import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 8081),

  databaseUrl: required("DATABASE_URL"),

  supabase: {
    url: required("SUPABASE_URL"),
    anonKey: required("SUPABASE_ANON_KEY"),
    serviceKey: required("SUPABASE_SERVICE_KEY"),
  },

  nodemailer: {
    host: required("SMTP_HOST"),
    port: Number(required("SMTP_PORT")),
    auth: {
      user: required("SMTP_USER"),
      pass: required("SMTP_PASS"),
    },
  },
};
