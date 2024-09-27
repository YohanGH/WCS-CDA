import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateRandomTag } from "../../utils/generate-tag";
import tagSchema from "../../schemas/tag-schema";
import { AppError } from "../../middlewares/error-handler";
import { Tag } from "../../database/entities/tag";

const router = express.Router();

// Get all Tags
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.find();

    if (!tags || tags.length === 0) {
      return next(new AppError("No tags found", 404, "NotFoundError"));
    }

    res.send(tags);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Post a new Tag
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Generate a random Tag
    const tagData = Object.keys(req.body).length
      ? req.body
      : generateRandomTag();

    // Validate tha Tag using Joi schema
    const { error } = tagSchema.validate(tagData);
    if (error) {
      throw new AppError(
        error.details[0].message,
        400,
        "ValidationError",
        "Invalid Tag data provided"
      );
    }

    // Create a new object with request body data
    const newTag = Tag.create({
      title: tagData.title,
    });

    // Insert tge new Tag into SQLite
    await newTag.save();

    // Responde with the created Tag and a 201 status
    res.status(201).json({
      id: newTag.id,
      title: newTag.title,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Update an Tag by id
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const tag = await Tag.findOne({ where: { id } });

      if (!tag) {
        return next(new AppError("Tag not found", 404, "NotFoundError"));
      }

      // Merges random data and data sent by the user
      const tagData = {
        ...generateRandomTag(), // random default values
        ...req.body, // overwrites with user-supplied values
      };

      // Validate the provider Tag fields (allow partial updates)
      const { error } = tagSchema.validate(tagData, {
        allowUnknown: true, // Allows additional properties not defined in the schema
        skipFunctions: true, // Skips validation for function properties
      });

      if (error) {
        throw new AppError(error.details[0].message, 400, "ValidationError");
      }

      tag.title = tagData.title;

      res.send({ message: "Tag updated successfully", tagData });
    } catch (err: unknown) {
      if (err instanceof Error) {
        next(new AppError(err.message, 500, "DatabaseError"));
      } else {
        next(new AppError("An unknown error occurred", 500, "DatabaseError"));
      }
    }
  }
);

// Update an Tag by id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const tag = await Tag.findOne({ where: { id } });

    // Merges random data and data sent by the user
    const tagData = {
      ...generateRandomTag(), // random default values
      ...req.body, // overwrites with user-supplied values
    };

    // Validate the updated Tag
    const { error } = tagSchema.validate(tagData);
    if (error) {
      throw new AppError(error.details[0].message, 400, "ValidateError");
    }

    if (tag) {
      tag.title = tagData.title;
      await tag.save();
    } else {
      // Handle the case where Tag is null (e.g., throw an error or return a response)
      throw new Error("Tag not found");
    }

    res.send({ message: "Tag updated successfully", tagData });
  } catch (err) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Delete an Tag by id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const deleteResult = await Tag.delete({ id });

      // Check if the Tag existed and has been deleted
      if (deleteResult.affected === 0) {
        return next(new AppError("Tag not found", 404, "NotFoundError"));
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
