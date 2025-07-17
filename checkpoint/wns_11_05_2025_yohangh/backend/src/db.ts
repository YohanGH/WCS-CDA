import { DataSource } from "typeorm";
import { Country } from "./entities/Country";
import { Continent } from "./entities/Continent";

export const db = new DataSource({
  type: "sqlite",
  database: "./countries.sqlite",
  synchronize: true,
  entities: [Country, Continent]
});
