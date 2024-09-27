import express from "express";
import dotenv from "dotenv";
import adRoutes from "./routes/ad-routes/ad-routes";
import categoryRoutes from "./routes/category-routes/category-routes";
import tagRoutes from "./routes/tag-routes/tag-routes";
import errorHandler from "./middlewares/error-handler";
import "reflect-metadata";
import { dataSource } from "./database/datasource";

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use("/ads", adRoutes);
app.use("/category", categoryRoutes);
app.use("/tag", tagRoutes);
app.use(errorHandler);

// Function to initialize the application
async function initialize() {
  try {
    // Initialize the data source (e.g., connect to a database)
    await dataSource.initialize();

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    // Handle any initialization errors
    console.error("Error during initialization:", error);
  }
}

// Call the initialize function to start the application
initialize();
