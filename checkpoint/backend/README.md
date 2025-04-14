# Backend Checkpoint

API GraphQL avec Apollo Server et TypeGraphQL pour gérer des pays.

## Installation

```bash
# Installer les dépendances
npm install
```

## Utilisation

### Démarrer le serveur

```bash
npm start
```

Le serveur sera accessible à l'adresse http://localhost:4000

### Peupler la base de données

Pour insérer 10 pays dans la base de données, exécutez :

```bash
npm run seed
```

## Fonctionnalités

- Mutation pour créer un pays avec code, nom, emoji et code continent
- Query pour récupérer tous les pays
- Query pour récupérer les pays par continent

## Requêtes GraphQL

### Mutation

#### Créer un pays

```graphql
mutation {
  createCountry(
    code: "FR"
    name: "France"
    emoji: "🇫🇷"
    continentCode: "EU"
  ) {
    code
    name
    emoji
    continentCode
  }
}
```

### Queries

#### Récupérer tous les pays

```graphql
query {
  countries {
    code
    name
    emoji
    continentCode
  }
}
```

#### Récupérer les pays par continent

```graphql
query {
  countriesByContinent(continentCode: "EU") {
    code
    name
    emoji
    continentCode
  }
}
```