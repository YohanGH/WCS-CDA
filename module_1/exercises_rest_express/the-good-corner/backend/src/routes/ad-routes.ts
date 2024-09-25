import express from "express";
import { Request, Response, NextFunction } from "express";
import { ads, generateRandomAd } from "../utils/generate-ad";
import adSchema from "../schemas/ad-schema";
import { AppError } from "../middlewares/error-handler";
import sqlite3 from "sqlite3";

const router = express.Router();

// Get all ads
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    db.all("SELECT * FROM ad", [], (err: Error | null, rows: any[]) => {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseError"));
      }
      res.send(rows);
    });
  } catch (err) {
    next(err);
  } finally {
    // close the database connection after the query is done
    db.close((err: Error | null) => {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseCloseError"));
      }
    });
  }
});

// Post a new ad
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    // Validate tha ad using Joi schema
    const { error } = adSchema.validate(req.body);
    if (error) {
      throw new AppError(
        error.details[0].message,
        400,
        "ValidationError",
        "Invalid ad data provided"
      );
    }

    // Create a new object with request body data
    const { title, description, price, owner, picture, location, createdAt } =
      req.body;

    // Insert tge new ad into SQLite
    const result = new Promise<{ lastID: number }>((resolve, reject) => {
      db.run(
        `INSERT INTO ad (title, description, price, owner, picture, location, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [title, description, price, owner, picture, location, createdAt],
        function (err) {
          if (err) {
            return reject(err);
          }
          // `this.lastID` content ID in new line
          resolve({ lastID: this.lastID });
        }
      );
    });

    // Responde with the created ad and a 201 status
    res.status(201).json({
      id: result, // result.lastId
      title,
      description,
      price,
      owner,
      picture,
      location,
      createdAt,
    });
  } catch (err) {
    next(err);
  } finally {
    // close the database connection after the query is done
    db.close((err: Error | null) => {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseCloseError"));
      }
    });
  }
});

// Update an ad by id
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    const id = Number(req.params.id);
    // Validate the provider ad fields (allow partial updates)
    const { error } = adSchema.validate(req.body, {
      allowUnknown: true,
      skipFunctions: true,
    });
    if (error) {
      throw new AppError(error.details[0].message, 400, "ValidationError");
    }

    // Construct SQL query dynamically based on fields provided
    let sqlQuery = "UPDATE ad SET ";
    const params: any[] = [];

    const bodyKeys: string[] = Object.keys(req.body);

    // Loop over request body
    bodyKeys.forEach((key, index) => {
      if (!["id", "createdAt"].includes(key)) {
        sqlQuery += `${key} = ?`;
        if (index < bodyKeys.length - 1) {
          sqlQuery += ", ";
        }
        params.push(req.body[key]);
      }
    });

    // Ensure there something to updAATE
    if (params.length === 0) {
      return next(new AppError("No valid fields provided to upgrade", 400, "ValidatError"));
    }

    //.Remove any trailing comma and space before adding WHERE clause
    sqlQuery = sqlQuery.trim().replace(/,\s*$/, "");

    // Apprend the ID to the params for WHERE clause
    sqlQuery += " WHERE id = ?";
    params.push(id);

    console.log("ICI ==> ", sqlQuery)

    // Run the update query
    await new Promise<void>((resolve, reject) => { 
      db.run(sqlQuery, params, function (err) {
        if (err) {
          return reject(new AppError(err.message, 500, "DatabaseError"));
        }
        if (this.changes === 0) {
          return reject(new AppError("Ad not found", 404, "NotFoundError"));
        }
        resolve();
      });
    });

    res.send({ message: "Ad updated successfully" });
  } catch (err) {
    next(err);
  } finally {
    // close the database connection after the query is done
    db.close((err: Error | null) => {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseCloseError"));
      }
    });
  }
});

// Update an ad by id
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    const id = Number(req.params.id);

    // Validate the updated ad
    const { error } = adSchema.validate(req.body);
    if (error) {
      throw new AppError(error.details[0].message, 400, "ValidateError");
    }

    // Extract updated fields from the request
    const { title, description, price, owner, picture, location, createdAt } =
      req.body;

    // Update the ad in SQLite
    const result = await new Promise<{ changes: number }>((resolve, reject) => {
      db.run(
        `UPDATE ad SET title = ?, description = ?, price = ?, owner = ?, picture = ?, location = ?, createdAt = ? WHERE id = ?`,
        [title, description, price, owner, picture, location, createdAt, id],
        function (err) {
          if (err) {
            return reject(err);
          }
          // `this.lastID` content ID in new line
          resolve({ changes: this.changes });
        }
      );
    });

    if (result.changes === 0) {
      return next(new AppError("Ad not found", 404, "NotFoundError"));
    }

    res.send({
      id,
      title,
      description,
      price,
      owner,
      picture,
      location,
      createdAt,
    });
  } catch (err) {
    next(err);
  } finally {
    // close the database connection after the query is done
    db.close((err: Error | null) => {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseCloseError"));
      }
    });
  }
});

// Delete an ad by id
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  // Open Database
  const db = new sqlite3.Database("./src/database/good_corner.sqlite");

  try {
    const id = Number(req.params.id);

    db.run("DELETE FROM ad WHERE id = ?", [id], function (err) {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseError"));
      }
      if (this.changes === 0) {
        return next(new AppError("Ad not found", 404, "NotFoundError"));
      }
      res.status(204).send();
    });
  } catch (err) {
    next(err);
  } finally {
    // close the database connection after the query is done
    db.close((err: Error | null) => {
      if (err) {
        return next(new AppError(err.message, 500, "DatabaseCloseError"));
      }
    });
  }
});

export default router;