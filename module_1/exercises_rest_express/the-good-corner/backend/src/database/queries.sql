-- Create table Category
  CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  )

-- Create table Ad
  CREATE TABLE IF NOT EXISTS ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  owner TEXT NOT NULL,
  price INTEGER NOT NULL,
  picture TEXT,
  location TEXT,
  categoryId INTEGER NOT NULL,
  createdAt DATE NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES catagrory(id)
  );

-- Create column
INSERT INTO category (title) 
VALUES 
("clothing"),
("car"),
("other");

-- Insert Data
INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId)
VALUES
('Annonce 1', 'Description 1', 'user1@example.com', 50, 'image1.jpg', 'Paris', '2024-09-02', 1),
('Annonce 2', 'Description 2', 'user2@example.com', 50, 'image2.jpg', 'Paris', '2024-09-02', 2),
('Annonce 3', 'Description 3', 'user3@example.com', 60, 'image3.jpg', 'Lyon', '2024-09-03', 3),
('Annonce 4', 'Description 4', 'user4@example.com', 45, 'image4.jpg', 'Bordeaux', '2024-09-04', 1),
('Annonce 5', 'Description 5', 'user5@example.com', 75, 'image5.jpg', 'Lyon', '2024-09-05', 2),
('Annonce 6', 'Description 6', 'user6@example.com', 30, 'image6.jpg', 'Bordeaux', '2024-09-06', 3),
('Annonce 7', 'Description 7', 'user7@example.com', 55, 'image7.jpg', 'Paris', '2024-09-07', 1),
('Annonce 8', 'Description 8', 'user8@example.com', 85, 'image8.jpg', 'Lyon', '2024-09-08', 2),
('Annonce 9', 'Description 9', 'user9@example.com', 40, 'image9.jpg', 'Bordeaux', '2024-09-09', 3),

-- Selected All annonces
SELECT * FROM ad;

-- Selected All annonces in Bordeaux
SELECT * FROM ad WHERE location = 'Bordeaux';

-- Delete all annonces > 40$
DELETE FROM ad WHERE price > 40;

-- Update all annonces where firt 1 september with 0$
UPDATE ad SET price = 0 WHERE createdAt = '2024-09-01'

-- AVG all annonces in Paris
SELECT AVG(price) AS average_price FROM ad WHERE location = 'Paris';

-- display ad in the "Clothing" category
SELECT * FROM ad
WHERE categoryId = (SELECT id FROM category WHERE title = 'clothing');

-- Display ad in both "Clothing" and "Car" category
SELECT * FROM ad
WHERE categoryID IN (SELECT id FRoM category WHERE title IN ('clothing', 'car'));

-- Display the average price of ad in the "other" categroy
SELECT AVG(price) AS average_price FROM ad
WHERE categoryId =(SELECT id FROM category WHERE title = 'other');

-- Diplay ad from category where the name starts with "V"
SELECT * FROM ad
WHERE categoryId IN (SELECT id FROM category WHERE title LIKE 'v%')