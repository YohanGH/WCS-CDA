# Création d'une catégorie
Mutation pour créer une nouvelle catégorie avec le champ title:
```md
mutation {
  createCategory(data: { title: "Nouvelle Catégorie" }) {
    id
    title
  }
}
```

Tester la validation en omettant le champ title (devrait retourner une erreur):
```md
mutation {
  createCategory(data: { title: "" }) {
    id
    title
  }
}
```

# Mise à jour d'une catégorie

Mutation pour mettre à jour le champ title d'une catégorie existante:
```md
mutation {
  updateCategory(id: 1, data: { title: "Titre Mis à Jour" }) {
    id
    title
  }
}
```

Tester la mise à jour partielle en ne fournissant aucun champ (devrait laisser la catégorie inchangée):
```md
mutation {
  updateCategory(id: 1, data: {}) {
    id
    title
  }
}
```

# Suppression d'une catégorie

Mutation pour supprimer une catégorie par ID:
```md
mutation {
  deleteCategory(id: 1)
}
```

# Récupération des catégories

Query pour obtenir toutes les catégories:
```md
query {
  categories {
    id
    title
  }
}
```

Query pour obtenir une catégorie par ID:
```md
query {
  category(id: 1) {
    id
    title
  }
}
```

# Pour l'entité Tag

Mutation pour créer un nouveau tag avec le champ title:
```md
mutation {
  createTag(data: { title: "Nouveau Tag" }) {
    id
    title
  }
}
```

Tester la validation en omettant le champ title (devrait retourner une erreur):
```md
mutation {
  createTag(data: { title: "" }) {
    id
    title
  }
}
```

# Mise à jour d'un tag
Mutation pour mettre à jour le champ title d'un tag existant:
```md
mutation {
  updateTag(id: 1, data: { title: "Tag Mis à Jour" }) {
    id
    title
  }
}
```

Tester la mise à jour partielle en ne fournissant aucun champ (devrait laisser le tag inchangé):
```md
mutation {
  updateTag(id: 1, data: {}) {
    id
    title
  }
}
```

# Suppression d'un tag

Mutation pour supprimer un tag par ID:
```md
mutation {
  deleteTag(id: 1)
}
```

# Récupération des tags

Query pour obtenir tous les tags:
```md
query {
  tags {
    id
    title
  }
}
```

Query pour obtenir un tag par ID:
```md
query {
  tag(id: 1) {
    id
    title
  }
}
```

# Pour l'entité Ad

Mutation pour créer une nouvelle annonce avec tous les champs:
```md
mutation {
  createAd(
    data: {
      title: "Nouvelle Annonce"
      description: "Description de l'annonce"
      categoryId: 1
      tagIds: [1, 2]
    }
  ) {
    id
    title
    description
    category {
      id
      title
    }
    tags {
      id
      title
    }
  }
}
```

Tester la validation en omettant le champ title (devrait retourner une erreur):
```md
mutation {
  createAd(
    data: {
      title: ""
      description: "Description sans titre"
      categoryId: 1
    }
  ) {
    id
    title
  }
}
```

Tester la création sans tags:
```md
mutation {
  createAd(
    data: {
      title: "Annonce Sans Tags"
      description: "Description de l'annonce"
      categoryId: 1
    }
  ) {
    id
    title
    tags {
      id
      title
    }
  }
}
```

Tester avec un categoryId invalide (devrait retourner une erreur):
```md
mutation {
  createAd(
    data: {
      title: "Annonce avec Catégorie Invalide"
      description: "Description"
      categoryId: 9999
    }
  ) {
    id
    title
  }
}
```

# Mise à jour d'une annonce

Mutation pour mettre à jour tous les champs d'une annonce existante:
```md
mutation {
  updateAd(
    id: 1
    data: {
      title: "Titre Mis à Jour"
      description: "Description Mise à Jour"
      categoryId: 2
      tagIds: [2, 3]
    }
  ) {
    id
    title
    description
    category {
      id
      title
    }
    tags {
      id
      title
    }
  }
}
```

Tester la mise à jour partielle (par exemple, uniquement le title):
```md
mutation {
  updateAd(
    id: 1
    data: {
      title: "Titre Partiellement Mis à Jour"
    }
  ) {
    id
    title
    description
  }
}
```

Tester la mise à jour avec un categoryId invalide (devrait retourner une erreur):
```md
mutation {
  updateAd(
    id: 1
    data: {
      categoryId: 9999
    }
  ) {
    id
    title
  }
}
```

Tester la suppression des tags en fournissant un tableau vide:
```md
mutation {
  updateAd(
    id: 1
    data: {
      tagIds: []
    }
  ) {
    id
    title
    tags {
      id
      title
    }
  }
}
```

# Suppression d'une annonce

Mutation pour supprimer une annonce par ID:
```md
mutation {
  deleteAd(id: 1)
}
```

# Récupération des annonces

Query pour obtenir toutes les annonces:
```md
query {
  ads {
    id
    title
    description
    category {
      id
      title
    }
    tags {
      id
      title
    }
  }
}
```

Query pour obtenir une annonce par ID:
```md
query {
  ad(id: 1) {
    id
    title
    description
    category {
      id
      title
    }
    tags {
      id
      title
    }
  }
}
```

# Tests des Cas Particuliers et des Validations

Essayer de créer une catégorie avec un title déjà existant (devrait retourner une erreur):
```md
mutation {
  createCategory(data: { title: "Titre Existant" }) {
    id
    title
  }
}
```

# Mise à Jour avec des Données Invalides

Essayer de mettre à jour une annonce avec un tagIds contenant des IDs invalides:
```md
mutation {
  updateAd(
    id: 1
    data: {
      tagIds: [9999, 10000]
    }
  ) {
    id
    title
    tags {
      id
      title
    }
  }
}
```

Essayer de mettre à jour une catégorie inexistante (devrait retourner une erreur):
```md
mutation {
  updateCategory(id: 9999, data: { title: "Titre Inexistant" }) {
    id
    title
  }
}

```

# Suppression d'Entités Inexistantes

Essayer de supprimer un tag inexistant (devrait retourner une erreur):
```md
mutation {
  deleteTag(id: 9999)
}
```

# Combinaison de Requêtes

Créer une catégorie:
```md
mutation {
  createCategory(data: { title: "Catégorie pour Annonce" }) {
    id
    title
  }
}
```

Créer des tags:
```md
mutation {
  createTag(data: { title: "Tag 1" }) {
    id
    title
  }
}

mutation {
  createTag(data: { title: "Tag 2" }) {
    id
    title
  }
}
```

Créer une annonce en utilisant les IDs de la catégorie et des tags créés:
```md
mutation {
  createAd(
    data: {
      title: "Annonce Combinée"
      description: "Description de l'annonce combinée"
      categoryId: <ID_CATÉGORIE>
      tagIds: [<ID_TAG1>, <ID_TAG2>]
    }
  ) {
    id
    title
    category {
      id
      title
    }
    tags {
      id
      title
    }
  }
}
```
