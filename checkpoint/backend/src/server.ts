import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./database/config";
import { CountryResolver } from "./resolver/CountryResolver";

dotenv.config(); // Load environment variables from .env file

(async () => {
  try {
    // Initialize the data source (e.g., connect to a database)
    await dataSource.initialize();
    console.log("🔗 Base de données connectée");

    // Create schema with resolvers
    const schema = await buildSchema({
      resolvers: [
        CountryResolver,
        /*, other resolvers */
      ],
    });

    //Create instance of ApolloServer with the schema
    const server = new ApolloServer({
      schema,
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(process.env.APP_PORT) || 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("🚨 Error during initialization:", error);
  }
})();
