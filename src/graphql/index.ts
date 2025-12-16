import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { startStandaloneServer } from "@apollo/server/standalone";
import { context } from "../context";
import { config } from "../config/index.js";
import { connectDB } from "../db/client";

export async function startGraphQLServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: context,
    listen: { port: config.port },
  });

  await connectDB();

  console.log("Database connection has been established successfully");
  console.log(`🚀 Server ready at: ${url}`);
}
