import { startGraphQLServer } from "./graphql/index.js";

startGraphQLServer().catch((error) => {
  process.exit(1);
});


process.on("uncaughtException", (error) => {
  console.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error(error);
  process.exit(1);
});

process.on("SIGINT", () => {
  process.exit(0);
});