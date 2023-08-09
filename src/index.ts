import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import cookieParser from "cookie-parser";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/index.js";
import resolvers from "./graphql/resolvers/user.js";

const app = express();
const httpServer = http.createServer(app);

const typeDefs = readFileSync("src/graphql/schemas/user.graphql", {
  encoding: "utf-8",
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  cors(),
  cookieParser(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ req, res }),
  })
);
dotenv.config();

const port = process.env.PORT;

connectDB().then(() =>
  httpServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  )
);
