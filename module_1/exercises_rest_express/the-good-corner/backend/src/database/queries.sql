-- Create table Ad
  CREATE TABLE IF NOT EXISTS ad (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  owner TEXT NOT NULL,
  price INTEGER NOT NULL,
  picture TEXT,
  location TEXT,
  createdAt DATE NOT NULL
  );

-- Insert Data

INSERT INTO ad (title, description, owner, price, picture, location, createdAt)
VALUES
('Annonce 1', 'Description 1', 'user1@example.com', 50, 'image1.jpg', 'Paris', '2024-09-02'),
('Annonce 2', 'Description 2', 'user2@example.com', 50, 'image2.jpg', 'Paris', '2024-09-02'),
('Annonce 3', 'Description 3', 'user3@example.com', 60, 'image3.jpg', 'Lyon', '2024-09-03'),
('Annonce 4', 'Description 4', 'user4@example.com', 45, 'image4.jpg', 'Bordeaux', '2024-09-04'),
('Annonce 5', 'Description 5', 'user5@example.com', 75, 'image5.jpg', 'Lyon', '2024-09-05'),
('Annonce 6', 'Description 6', 'user6@example.com', 30, 'image6.jpg', 'Bordeaux', '2024-09-06'),
('Annonce 7', 'Description 7', 'user7@example.com', 55, 'image7.jpg', 'Paris', '2024-09-07'),
('Annonce 8', 'Description 8', 'user8@example.com', 85, 'image8.jpg', 'Lyon', '2024-09-08'),
('Annonce 9', 'Description 9', 'user9@example.com', 40, 'image9.jpg', 'Bordeaux', '2024-09-09'),
('Annonce 10', 'Description 10', 'user10@example.com', 95, 'image10.jpg', 'Paris', '2024-09-10'),
('Annonce 11', 'Description 11', 'user11@example.com', 25, 'image11.jpg', 'Lyon', '2024-09-11'),
('Annonce 12', 'Description 12', 'user12@example.com', 35, 'image12.jpg', 'Bordeaux', '2024-09-12'),
('Annonce 13', 'Description 13', 'user13@example.com', 65, 'image13.jpg', 'Paris', '2024-09-13'),
('Annonce 14', 'Description 14', 'user14@example.com', 70, 'image14.jpg', 'Lyon', '2024-09-14'),
('Annonce 15', 'Description 15', 'user15@example.com', 20, 'image15.jpg', 'Bordeaux', '2024-09-15'),
('Annonce 16', 'Description 16', 'user16@example.com', 90, 'image16.jpg', 'Paris', '2024-09-16'),
('Annonce 17', 'Description 17', 'user17@example.com', 55, 'image17.jpg', 'Lyon', '2024-09-17'),
('Annonce 18', 'Description 18', 'user18@example.com', 65, 'image18.jpg', 'Bordeaux', '2024-09-18'),
('Annonce 19', 'Description 19', 'user19@example.com', 80, 'image19.jpg', 'Paris', '2024-09-19'),
('Annonce 20', 'Description 20', 'user20@example.com', 50, 'image20.jpg', 'Lyon', '2024-09-20');

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