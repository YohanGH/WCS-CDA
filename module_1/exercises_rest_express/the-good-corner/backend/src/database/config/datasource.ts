import { DataSource } from "typeorm";

const devMode: boolean = process.env.IS_DEV === "true";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/good_corner.sqlite",
  entities: ["./src/database/entities/*.ts"],
  synchronize: devMode,
  migrations: [".src/database/migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: true,
});

export default dataSource;