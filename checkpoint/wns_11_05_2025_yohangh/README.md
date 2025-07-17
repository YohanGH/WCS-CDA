# Checkpoint frontend

## Instructions

Tu vas utiliser une API GraphQL qui fournit des informations sur un ensemble de pays.

Tu peux démarrer le checkpoint en une commande (qui utilise docker), dans le répertoire racine :

```sh
npm start
```

Si tu ne souhaites pas utiliser docker, rends-toi simplement dans les sous-repertoires backend et frontend et lis les instructions dans le fichier README à l'intérieur.

Une fois le projet lancé, rends-toi sur [http://localhost:4000/graphql](http://localhost:4000/graphql) afin d'explorer l'API.

![explorer api graphql](https://github.com/WildCodeSchool/wns_11_05_2025/blob/main/screenshots/example/exploring_graphql_api.png?raw=true)

Pour réaliser ce projet, tu peux si tu le souhaites utiliser du CSS pur ou bien utiliser un framework CSS de ton choix (TailwindCSS, MaterialUI, Schadcn, AntDesign, ...)

Tu vas devoir développer la partie front de 3 fonctionnalités :

- Listing des pays (avec au minimum les infos "name" et "emoji") pour chaque pays
- Affichage des détails d'un pays sur une page dédiée ("name", "code", "emoji" et nom du continent s'il est renseigné)
- Ajout d'un pays (avec au minimum les infos "name", "code" et "emoji")

Voici un aperçu de ce que cela pourrait donner :

![ajout et listing des pays](https://github.com/WildCodeSchool/wns_11_05_2025/blob/main/screenshots/example/listing_add_desktop.png?raw=true)

![details d'un pays](https://github.com/WildCodeSchool/wns_11_05_2025/blob/main/screenshots/example/country_details_desktop.png?raw=true)

Le client est normalement disponible sur [http://localhost:5173](http://localhost:5173)

En bonus, tu pourras compléter le développement :
Permettre de renseigner un continent (à l'aide d'un select) lors de l'ajout d'un pays.
Dès que tu as fini, penses à prendre un screenshot de toutes tes pages en mobile et en desktop et à placer ces derniers dans le dossier screenshots, où tu trouveras des exemples visuels des résultats attendus.
