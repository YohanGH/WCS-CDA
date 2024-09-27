import { Tag } from "../types/types";
import { faker } from "@faker-js/faker";

// Generate a random category
export const generateRandomTag = (): Tag => ({
    title: faker.commerce.department(),
});