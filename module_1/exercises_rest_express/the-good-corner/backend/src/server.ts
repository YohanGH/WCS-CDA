import dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./database/config/datasource";
import { CategoryResolver } from "./graphql/resolvers/category-resolver";
import { TagResolver } from "./graphql/resolvers/tag-resolver";
import { AdResolver } from "./graphql/resolvers/ad-resolver";
import { AppError } from "./middlewares/error-handler";
import { GraphQLFormattedError } from "graphql";

dotenv.config(); // Load environment variables from .env file

(async () => {
  try {
    // Initialize the data source (e.g., connect to a database)
    await dataSource.initialize();

    // Create schema with resolvers
    const schema = await buildSchema({
      resolvers: [
        CategoryResolver,
        TagResolver,
        AdResolver,
        /*, other resolvers */
      ],
      validate: true, // Activate validation for input fields
    });

    //Create instance of ApolloServer with the schema
    const server = new ApolloServer({
      schema,
      formatError: (
        formattedError: GraphQLFormattedError,
        error: unknown
      ): GraphQLFormattedError => {
        // Check if the error is an instance of AppError
        if (error instanceof AppError) {
          // Customize the format
          return {
            message: error.message,
            extensions: {
              code: error.errorType || "INTERNAL_SERVER_ERROR",
              statusCode: error.statusCode,
              additionalInfo: error.additionalInfo,
            },
          };
        }

        // Manage validation errors (class-validator)
        if (Array.isArray((error as any).validationErrors)) {
          return {
            message: "Erreur de validation",
            extensions: {
              code: "BAD_USER_INPUT",
              validationErrors: (error as any).validationErrors,
            },
          };
        }

        // For other errors, you can handle them differently
        return formattedError;
      },
    });

    // Start the server
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(process.env.APP_PORT) || 4000 },
      context: async ({ req }) => {
        // TODO:  Add properties to the context here, like the authenticated user
        return {};
      },
    });

    console.log(`🚀  Server ready at: ${url}`);
  } catch (error) {
    console.error("🚨 Error during initialization:", error);
  }
})();
