import "reflect-metadata";
import { Country } from "../entity/Country";
import dataSource from "../database/config";

/**
 * Script pour peupler la base de données avec 10 pays
 */

const countries = [
    {
        code: "FR",
        name: "France",
        emoji: "🇫🇷",
        continentCode: "EU",
    },
    {
        code: "BE",
        name: "Belgique",
        emoji: "🇧🇪",
        continentCode: "EU",
    },
    {
        code: "DE",
        name: "Allemagne",
        emoji: "🇩🇪",
        continentCode: "EU",
    },
    {
        code: "US",
        name: "États-Unis",
        emoji: "🇺🇸",
        continentCode: "NA",
    },
    {
        code: "CA",
        name: "Canada",
        emoji: "🇨🇦",
        continentCode: "NA",
    },
    {
        code: "JP",
        name: "Japon",
        emoji: "🇯🇵",
        continentCode: "AS",
    },
    {
        code: "CN",
        name: "Chine",
        emoji: "🇨🇳",
        continentCode: "AS",
    },
    {
        code: "BR",
        name: "Brésil",
        emoji: "🇧🇷",
        continentCode: "SA",
    },
    {
        code: "AU",
        name: "Australie",
        emoji: "🇦🇺",
        continentCode: "OC",
    },
    {
        code: "ZA",
        name: "Afrique du Sud",
        emoji: "🇿🇦",
        continentCode: "AF",
    },
];

async function seedDatabase() {
    try {
        // Initialiser la connexion à la base de données
        await dataSource.initialize();
        console.log("🔗 Base de données connectée");

        // Supprimer les données existantes (optionnel)
        const countryRepository = dataSource.getRepository(Country);
        await countryRepository.clear();
        console.log("🗑️ Données existantes supprimées");

        // Insérer les nouveaux pays
        for (const countryData of countries) {
            const country = new Country();
            country.code = countryData.code;
            country.name = countryData.name;
            country.emoji = countryData.emoji;
            country.continentCode = countryData.continentCode;

            await countryRepository.save(country);
            console.log(`✅ Pays ajouté: ${country.name} (${country.code})`);
        }

        console.log("✅ Base de données peuplée avec succès!");

        // Fermer la connexion
        await dataSource.destroy();
        console.log("🔌 Connexion à la base de données fermée");
    } catch (error) {
        console.error("🚨 Erreur lors du peuplement de la base de données:", error);
    }
}

// Exécuter la fonction
seedDatabase();
