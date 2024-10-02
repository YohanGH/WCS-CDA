import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateRandomAd } from "../../utils/generate-ad";
import adSchema from "../../schemas/ad-schema";
import { AppError } from "../../middlewares/error-handler";
import { Ad } from "../../database/entities/ad";

const router = express.Router();

// Get all ads
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ads = await Ad.find({
      relations: {
        tags: true,
      },
    });

    if (!ads || ads.length === 0) {
      return next(new AppError("No ad found", 404, "NotFoundError"));
    }

    res.status(200).send(ads);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Generate a random ad
    const adData = Object.keys(req.body).length ? req.body : generateRandomAd();

    // Validate tha ad using Joi schema
    const { error } = adSchema.validate(adData);
    if (error) {
      throw new AppError(
        error.details[0].message,
        400,
        "ValidationError",
        "Invalid ad data provided"
      );
    }

    // Create and save the new ad
    const newAd = Ad.create(adData);
    await newAd.save();

    // Responde with the created ad and a 201 status
    res.status(201).json(newAd);
  } catch (err) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Update an ad by id
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const ad = await Ad.findOne({ where: { id } });

      // Merges random data and data sent by the user
      const adData = {
        ...generateRandomAd(), // random default values
        ...req.body, // overwrites with user-supplied values
      };

      // Validate the provider ad fields (allow partial updates)
      const { error } = adSchema.validate(adData, {
        allowUnknown: true, // Allows additional properties not defined in the schema
        skipFunctions: true, // Skips validation for function properties
      });

      if (error) {
        throw new AppError(error.details[0].message, 400, "ValidationError");
      }

      if (ad) {
        ad.title = adData.title;
      } else {
        // Handle the case where 'ad' is null
        throw new Error("Ad not found");
      }

      res.send({ message: "Ad updated successfully", adData });
    } catch (err) {
      if (err instanceof Error) {
        next(new AppError(err.message, 500, "DatabaseError"));
      } else {
        next(new AppError("An unknown error occurred", 500, "DatabaseError"));
      }
    }
  }
);

// Update an ad by id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOne({ where: { id } });

    // Merges random data and data sent by the user
    const adData = {
      ...generateRandomAd(), // random default values
      ...req.body, // overwrites with user-supplied values
    };

    // Validate the updated ad
    const { error } = adSchema.validate(adData);
    if (error) {
      throw new AppError(error.details[0].message, 400, "ValidateError");
    }

    if (ad) {
      ad.title = adData.title;
      await ad.save();
    } else {
      // Handle the case where ad is null (e.g., throw an error or return a response)
      throw new Error("Ad not found");
    }

    res.send({ message: "Ad updated successfully", adData });
  } catch (err) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Delete an ad by id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const deleteResult = await Ad.delete({ id });

      // Check if the ad existed and has been deleted
      if (deleteResult.affected === 0) {
        return next(new AppError("Ad not found", 404, "NotFoundError"));
      }

      res.status(204).send({ message: "Ad Delete successfully", deleteResult });
    } catch (err: unknown) {
      if (err instanceof Error) {
        next(new AppError(err.message, 500, "DatabaseError"));
      } else {
        next(new AppError("An unknown error occurred", 500, "DatabaseError"));
      }
    }
  }
);

export default router;
