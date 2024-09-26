import express from "express";
import { Request, Response, NextFunction } from "express";
import { generateRandomCategory } from "../../utils/generate-category";
import categorySchema from "../../schemas/category-schema";
import { AppError } from "../../middlewares/error-handler";
import sqlite3 from "sqlite3";

const router = express.Router();

// Function to close the database connection safely
const closeDatabase: (db: sqlite3.Database, next: NextFunction) => void = (
  db,
  next
) => {
  db.close((err: Error | null) => {
    if (err) {
      return next(new AppError(err.message, 500, "DatabaseCloseError"));
    }
  });
};

// Get all categorys
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    db.all(
      "SELECT category.id, category.title FROM category",
      [],
      (err: Error | null, rows: any[]) => {
        if (err) {
          return next(new AppError(err.message, 500, "DatabaseError"));
        }
        res.send(rows);
      }
    );
  } catch (err) {
    next(err);
  } finally {
    closeDatabase(db, next);
  }
});

// Post a new category
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    // Generate a random category
    const categoryData = Object.keys(req.body).length ? req.body : generateRandomCategory();

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
    const { title } = categoryData;

    // Insert tge new category into SQLite
    const result = new Promise<{ lastID: number }>((resolve, reject) => {
      db.run(`INSERT INTO category (title) VALUES (?)`, [title], function (err) {
        if (err) {
          return reject(err);
        }
        // `this.lastID` content ID in new line
        resolve({ lastID: this.lastID });
      });
    });

    // Responde with the created category and a 201 status
    res.status(201).json({
      id: result, // result.lastId
      title,
    });
  } catch (err) {
    next(err);
  } finally {
    closeDatabase(db, next);
  }
});

// Update an category by id
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    // Open Database
    const db = new sqlite3.Database("./src/database/good_corner.sqlite");

    try {
      const id = Number(req.params.id);

      // Generate Random inforamtion
      const randomcategory = generateRandomCategory();

      // Merges random data and data sent by the user
      const categoryData = {
        ...randomcategory, // random default values
        ...req.body, // overwrites with user-supplied values
      };

      // Validate the provider category fields (allow partial updates)
      const { error } = categorySchema.validate(categoryData, {
        allowUnknown: true,
        skipFunctions: true,
      });

      if (error) {
        throw new AppError(error.details[0].message, 400, "ValidationError");
      }

      // Construct SQL query dynamically based on fields provided
      let sqlQuery = "UPDATE category SET ";
      const params: any[] = [];

      const bodyKeys: string[] = Object.keys(categoryData);

      // Loop over request body
      bodyKeys.forEach((key, index) => {
        if (!["id", "createdAt"].includes(key)) {
          sqlQuery += `${key} = ?`;
          if (index < bodyKeys.length - 1) {
            sqlQuery += ", ";
          }
          params.push(categoryData[key]);
        }
      });

      // Ensure there something to updAATE
      if (params.length === 0) {
        return next(
          new AppError(
            "No valid fields provided to upgrcategorye",
            400,
            "ValidatError"
          )
        );
      }

      //.Remove any trailing comma and space before categoryding WHERE clause
      sqlQuery = sqlQuery.trim().replace(/,\s*$/, "");

      // Apprend the ID to the params for WHERE clause
      sqlQuery += " WHERE id = ?";
      params.push(id);

      // Run the update query
      await new Promise<void>((resolve, reject) => {
        db.run(sqlQuery, params, function (err) {
          if (err) {
            return reject(new AppError(err.message, 500, "DatabaseError"));
          }
          if (this.changes === 0) {
            return reject(new AppError("category not found", 404, "NotFoundError"));
          }
          resolve();
        });
      });

      res.send({ message: "category updated successfully", categoryData });
    } catch (err) {
      next(err);
    } finally {
      closeDatabase(db, next);
    }
  }
);

// Update an category by id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    const id = Number(req.params.id);

    // Generate random informaTion
    const randomcategory = generateRandomCategory();

    // Merges random data and data sent by the user
    const categoryData = {
      ...randomcategory, // random default values
      ...req.body, // overwrites with user-supplied values
    };

    // Validate the updated category
    const { error } = categorySchema.validate(categoryData);
    if (error) {
      throw new AppError(error.details[0].message, 400, "ValidateError");
    }

    // Extract updated fields from the request
    const { title } = categoryData;

    // Update the category in SQLite
    const result = await new Promise<{ changes: number }>((resolve, reject) => {
      db.run(`UPDATE category SET title = ? WHERE id = ?`, [title, id], function (err) {
        if (err) {
          return reject(err);
        }
        // `this.lastID` content ID in new line
        resolve({ changes: this.changes });
      });
    });

    if (result.changes === 0) {
      return next(new AppError("category not found", 404, "NotFoundError"));
    }

    res.send({ message: "category updated successfully", categoryData });
  } catch (err) {
    next(err);
  } finally {
    closeDatabase(db, next);
  }
});

// Delete an category by id
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    const id = Number(req.params.id);

    db.run("DELETE FROM category WHERE id = ?", [id], function (err) {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseError"));
      }
      if (this.changes === 0) {
        return next(new AppError("category not found", 404, "NotFoundError"));
      }
      res.status(204).send({ message: "Ad Delete successfully"});
    });
  } catch (err) {
    next(err);
  } finally {
    closeDatabase(db, next);
  }
});

export default router;
