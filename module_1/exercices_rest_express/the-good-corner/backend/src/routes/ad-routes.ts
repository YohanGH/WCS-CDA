import express from "express";
import { Request, Response, NextFunction } from "express";
import { ads, lastId, generateRandomAd } from "../utils/generate-ad";
import adSchema from "../schemas/ad-schema";
import { AppError } from "../middlewares/error-handler";

const router = express.Router();

// Get all ads
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(ads);
  } catch (err) {
    next(err);
  }
});

// Post a new ad
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = adSchema.validate(req.body);
    if (error) {
      throw new AppError(
        error.details[0].message,
        400,
        "ValidationError",
        "Invalid ad data provided"
      );
    }

    const localLastId = lastId + 1;

    const newAd = {
      ...generateRandomAd(localLastId),
      ...req.body,
    };

    ads.push(newAd);
    res.status(201).json(newAd);
  } catch (err) {
    next(err);
  }
});

// Update an ad by id
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const adIndex = ads.findIndex((ad) => ad.id === id);
    if (adIndex === -1)
      throw new AppError(
        "Ad not found",
        404,
        "NotFoundError",
        "No ad found with this ID"
      );

    ads[adIndex] = { ...ads[adIndex], ...req.body };
    res.json(ads[adIndex]);
  } catch (err) {
    next(err);
  }
});

// Delete an ad by id
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const adIndex = ads.findIndex((ad) => ad.id === id);
    if (adIndex === -1)
      throw new AppError(
        "Ad not found",
        404,
        "NotFoundError",
        "No ad found with this ID"
      );

    ads.splice(adIndex, 1);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
