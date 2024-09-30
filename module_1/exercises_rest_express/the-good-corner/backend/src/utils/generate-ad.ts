import { faker } from "@faker-js/faker";
import { Ad } from "../types/types";

// Function to generate an array of random tags
const generateRandomTags = (): { id: number }[] => {
  const numberOfTags = Math.floor(Math.random() * 3) + 1; // Générer entre 1 et 3 tags
  const tags = Array.from({ length: numberOfTags }, () => ({
    id: Math.floor(Math.random() * 4) + 2 // Générer un ID de tag aléatoire
  }));
  return tags;
};

export const generateRandomAd = (): Omit<Ad, "id">  => ({
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        owner: faker.internet.email(),
        price: parseFloat(faker.commerce.price()),
        picture: faker.image.avatar(),
        location: faker.address.city(),
        createdAt: new Date().toISOString(),
        category: { 
          id: Math.floor(Math.random() * 3) + 1
        },
        tags:generateRandomTags()
});

export const ads: Omit<Ad, "id">[] = Array.from({ length: 1 }, () =>
  generateRandomAd()
);

