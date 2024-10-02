import { DataSource } from "typeorm";

// TODO FIX devmode error true no fonctional
const devMode: boolean = process.env.IS_DEV === "true";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/good_corner.sqlite",
  entities: ["./src/database/entities/*.ts"],
  synchronize: true,
  migrations: [".src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: true,
});

export default dataSource;