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
const port = process.env.APP_PORT || 3000;

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
// Initialize with the last used id
let lastId = ads.length;

// Custom Error Class
class AppError extends Error {
  status: number;
  isOperational: boolean;

  constructor( message: string, status: number, isOperational: boolean = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor)
  }
}

// Route to get all ads
app.get("/ads", (req: Request, res: Response, next: any) => {
  try {
    res.json(ads);
  } catch (err) {
    next(err);
  }
});

// Route to post a new ad
app.post("/ads", (req: Request, res: Response, next: any) => {
  try {
    const id = ++lastId;

    if (!req.body.title || !req.body.price) {
      throw new AppError('title and prince are required', 400);
    }

    const newAd: Ad = {
     ...generateRandomAd(id),
     ...req.body,
    }

    ads.push(newAd);
    res.status(201).send(newAd);
  } catch (err) {
    next(err);
  }
});

// Route to update an ad by id
app.put("/ads/:id", (req: Request, res: Response, next: any) => {
  const id = Number(req.params.id)
  const values = req.body;
  let adIndex = -1;

  for (let i = 0; i < ads.length; i++) {
    if (ads[i].id === id) {
      adIndex = i;
      break;
    }
  }

  if (adIndex === -1) {
    throw new AppError('Ad not found', 404);
  }

  ads[adIndex] = { ...ads[adIndex], ...values };
  res.send(ads[adIndex]);
})

// Route to delete an ad by id
app.delete("/ads/:id", (req: Request, res: Response, next: any) => {
  try {
  const id = Number(req.params.id);
  let adIndex = -1;

  for (let i = 0; i < ads.length; i++) {
    if (ads[i].id === id) {
      adIndex = i;
      break;
    }
  }

  if (adIndex === -1) {
    return res.status(404).send({ message: "Ad not found" });
  }

  ads.splice(adIndex, 1)
  res.send(ads[adIndex]);
} catch (err) {
  next(err);
}
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
