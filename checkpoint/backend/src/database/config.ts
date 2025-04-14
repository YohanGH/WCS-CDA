import { DataSource } from "typeorm";
import { Country } from "../entity/Country";

// Configuration de TypeORM avec SQLite
const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./database.sqlite",
    synchronize: true,      // Création / mise à jour automatique du schéma en développement
    logging: false,
    entities: [Country],    // Spécifier explicitement les entités
  });

export default AppDataSource;