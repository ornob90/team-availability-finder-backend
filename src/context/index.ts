import type { ContextFunction } from "@apollo/server";
import { prisma } from "../db/client";
import { supabaseAdmin } from "../auth/supabase";
import type { IncomingMessage } from "http";

type StandaloneContextArgs = {
  req: IncomingMessage;
};

export interface GraphQLContext {
  prisma: typeof prisma;
  user: {
    id: string;
    email: string;
  } | null;
}

export const context: ContextFunction<
  [StandaloneContextArgs],
  GraphQLContext
> = async ({ req }) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace("Bearer ", "");

  let user = null;

  if (token) {
    const { data } = await supabaseAdmin.auth.getUser(token);

    if (data.user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: data.user.id },
      });

      if (dbUser?.isActive) {
        user = {
          id: dbUser.id,
          email: dbUser.email,
        };
      }
    }
  }

  return { prisma, user };
};
