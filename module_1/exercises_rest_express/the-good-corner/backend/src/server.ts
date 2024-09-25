import express from "express";
import dotenv from "dotenv";
import adRoutes from "./routes/ad-routes";
import errorHandler from "./middlewares/error-handler";

dotenv.config();
const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());
app.use("/ads", adRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
