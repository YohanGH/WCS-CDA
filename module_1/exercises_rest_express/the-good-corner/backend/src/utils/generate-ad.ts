import { faker } from "@faker-js/faker";
import { Ad } from "../types/ad";

export const generateRandomAd = (): Omit<Ad, "id">  => ({
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        owner: faker.internet.email(),
        price: parseFloat(faker.commerce.price()),
        picture: faker.image.avatar(),
        location: faker.address.city(),
        createdAt: new Date().toISOString(),
});

export const ads: Omit<Ad, "id">[] = Array.from({ length: 10 }, () =>
  generateRandomAd()
);

