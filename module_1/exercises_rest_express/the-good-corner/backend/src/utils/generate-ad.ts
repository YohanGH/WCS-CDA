import { faker } from "@faker-js/faker";
import { Ad } from "../types/types";

export const generateRandomAd = (): Omit<Ad, "id">  => ({
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        owner: faker.internet.email(),
        price: parseFloat(faker.commerce.price()),
        picture: faker.image.avatar(),
        location: faker.address.city(),
        createdAt: new Date().toISOString(),
        categoryId: Math.floor(Math.random() * 3) + 1
});

export const ads: Omit<Ad, "id">[] = Array.from({ length: 10 }, () =>
  generateRandomAd()
);

