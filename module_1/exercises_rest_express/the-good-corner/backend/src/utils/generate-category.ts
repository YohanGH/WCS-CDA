import { Category } from "../types/types";
import { faker } from "@faker-js/faker";

// Generate a random category
export const generateRandomCategory = (): Category => ({
  title: faker.commerce.department(),
});