import express from "express";
import type { Request, Response } from "express";
import { faker } from '@faker-js/faker';

// Load environment variables from .env file
require("dotenv").config();

// Type definition for Ad
type Ad = {
  id: number;
  title: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  createdAt: string;
};

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Port configuration
const port = process.env.APP_PORT;

// Function to generate random ads
const generateRandomAd = (id: number): Ad => ({
  id,
  title: faker.commerce.productName(),
  description: faker.lorem.sentence(),
  owner: faker.internet.email(),
  price: parseFloat(faker.commerce.price()),
  picture: faker.image.avatar(),
  location: faker.address.city(),
  createdAt: new Date().toISOString(),
})

// Generate an array of random ads
const ads: Ad[] = Array.from({ length: 10 }, (_, i) => generateRandomAd(i + 1));

// Route to get all ads
app.get("/ads", (req: Request, res: Response) => {
  res.send(ads);
});

// Initialize with the last used id
let lastId = 2;

// Route to post a new ad
app.post("/ads", (req: Request, res: Response) => {
  const newAd: Ad = {
    id: ++lastId,
    ...req.body,
    createAt: new Date().toISOString(),
  };
  ads.push(newAd);
  res.status(201).send(newAd);
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
