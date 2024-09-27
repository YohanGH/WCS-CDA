import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateRandomCategory } from "../../utils/generate-category";
import categorySchema from "../../schemas/category-schema";
import { AppError } from "../../middlewares/error-handler";
import { Category } from "../../database/entities/category";

const router = express.Router();

// Get all categorys
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return next(new AppError("No categories found", 404, "NotFoundError"));
    }

    res.send(categories);
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Post a new category
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Generate a random category
    const categoryData = Object.keys(req.body).length
      ? req.body
      : generateRandomCategory();

    // Validate tha category using Joi schema
    const { error } = categorySchema.validate(categoryData);
    if (error) {
      throw new AppError(
        error.details[0].message,
        400,
        "ValidationError",
        "Invalid category data provided"
      );
    }

    // Create a new object with request body data
    const newCategory = Category.create({
      title: categoryData.title,
    });

    // Insert tge new category into SQLite
    await newCategory.save();

    // Responde with the created category and a 201 status
    res.status(201).json({
      id: newCategory.id,
      title: newCategory.title,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Update an category by id
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const category = await Category.findOne({ where: { id } });

      if (!category) {
        return next(new AppError("Category not found", 404, "NotFoundError"));
      }

      // Merges random data and data sent by the user
      const categoryData = {
        ...generateRandomCategory(), // random default values
        ...req.body, // overwrites with user-supplied values
      };

      // Validate the provider category fields (allow partial updates)
      const { error } = categorySchema.validate(categoryData, {
        allowUnknown: true, // Allows additional properties not defined in the schema
        skipFunctions: true, // Skips validation for function properties
      });

      if (error) {
        throw new AppError(error.details[0].message, 400, "ValidationError");
      }

      category.title = categoryData.title;

      res.send({ message: "Category updated successfully", categoryData });
    } catch (err: unknown) {
      if (err instanceof Error) {
        next(new AppError(err.message, 500, "DatabaseError"));
      } else {
        next(new AppError("An unknown error occurred", 500, "DatabaseError"));
      }
    }
  }
);

// Update an category by id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const category = await Category.findOne({ where: { id } });

    // Merges random data and data sent by the user
    const categoryData = {
      ...generateRandomCategory(), // random default values
      ...req.body, // overwrites with user-supplied values
    };

    // Validate the updated category
    const { error } = categorySchema.validate(categoryData);
    if (error) {
      throw new AppError(error.details[0].message, 400, "ValidateError");
    }

    if (category) {
      category.title = categoryData.title;
      await category.save();
    } else {
      // Handle the case where category is null (e.g., throw an error or return a response)
      throw new Error("Category not found");
    }

    res.send({ message: "category updated successfully", categoryData });
  } catch (err) {
    if (err instanceof Error) {
      next(new AppError(err.message, 500, "DatabaseError"));
    } else {
      next(new AppError("An unknown error occurred", 500, "DatabaseError"));
    }
  }
});

// Delete an category by id
router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      const deleteResult = await Category.delete({ id });

      // Check if the category existed and has been deleted
      if (deleteResult.affected === 0) {
        return next(new AppError("Category not found", 404, "NotFoundError"));
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
