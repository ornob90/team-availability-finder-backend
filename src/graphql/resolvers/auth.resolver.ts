import { loginUser, registerUser } from "../../auth/auth.service";
import type { GraphQLContext } from "../../context";
import { activateAccount } from "../../tokens/activation.service";

export const authResolvers = {
  Query: {
    me: (_: any, __: any, ctx: GraphQLContext) => {
      return ctx.user;
    },
  },
  Mutation: {
    register: async (_: unknown, args: { email: string; password: string }) => {
      await registerUser(args.email, args.password);
      return true;
    },

    activate: async (_: unknown, args: { token: string }) => {
      await activateAccount(args.token);
      return true;
    },

    login: async (_: unknown, args: { email: string; password: string }) => {
      return await loginUser(args.email, args.password);
    },
  },
};
