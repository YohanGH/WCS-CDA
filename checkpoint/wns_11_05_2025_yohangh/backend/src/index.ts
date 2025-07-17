import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { db } from "./db";
import schemaPromise from "./schema";

const port = process.env.SERVER_PORT || 4000;

const allowedOrigins =
  process.env.CORS_ALLOWED_ORIGINS || "http://localhost:3000";

schemaPromise.then(async (schema) => {
  await db.initialize();
  const app = express();
  const httpServer = http.createServer(app);
  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];
  const server = new ApolloServer({ schema, plugins });
  await server.start();
  const corsConfig = { origin: allowedOrigins.split(","), credentials: true };
  app.use(cors<cors.CorsRequest>(corsConfig));
  const context = async ({ req, res }: any) => ({ req, res });
  const expressMW = expressMiddleware(server, { context });
  app.use(express.json(), expressMW);
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
});
