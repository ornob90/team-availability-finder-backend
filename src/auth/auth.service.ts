import { prisma } from "../db/client";
import { createActivationToken } from "../tokens/activation.service";
import { supabaseAdmin } from "./supabase";

export async function registerUser(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    console.dir(error, { depth: null });

    if (error?.code === "email_exists") {
      throw new Error("Email already exists");
    }

    if (error?.code === "phone_exists") {
      throw new Error("Phone number already exists");
    }

    throw new Error("Failed to create auth user");
  }

  const user = await prisma.user.create({
    data: {
      id: data.user.id,
      email,
      isActive: false,
    },
  });

  await createActivationToken(user.id, user.email);

  return true;
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    throw new Error("Failed to login user");
  }

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    user: {
      id: data.user.id,
      email: data.user.email,
    },
  };
}
