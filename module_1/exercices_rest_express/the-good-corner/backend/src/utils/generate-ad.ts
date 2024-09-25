import { faker } from "@faker-js/faker";
import { Ad } from "../types/ad";

export const generateRandomAd = (id: number): Ad => ({
        id,
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        owner: faker.internet.email(),
        price: parseFloat(faker.commerce.price()),
        picture: faker.image.avatar(),
        location: faker.address.city(),
        createdAt: new Date().toISOString(),
});

export let lastId = 10;

export const ads: Ad[] = Array.from({ length: 10 }, (_, i) =>
  generateRandomAd(i + 1)
);

