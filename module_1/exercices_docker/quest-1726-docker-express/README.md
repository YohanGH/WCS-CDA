# 🐳 Docker - Orchestration Express, MongoDB et React

## 📋 **Commandes principales**

**Pour démarrer l'application en mode développement :**

```bash
docker compose -f compose.dev.yaml up --build
```

# 🛠️ Description du projet

Ce projet contient :

Un serveur Express accessible via http://localhost:5050
Une base de données MongoDB persistante
Une application React accessible via http://localhost:8080
📁 Structure du projet

```css
├── client/
│   ├── Dockerfile
│   └── src/
├── server/
│   ├── Dockerfile
│   └── src/
├── compose.dev.yaml
├── README.md
└── .gitignore
```

# 🐙 GitHub

Commandes Git :

```bash
git init
echo "node_modules" >> .gitignore
echo "data" >> .gitignore
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <lien du repo github>
git push -u origin main
```

# 📦 Volumes

Les volumes permettent d'avoir une persistance des données MongoDB dans /data/db.
Les dossiers server/src et client/src sont synchronisés avec le conteneur.

# 💪 **Challenge final**

1️⃣ **Ajoute le service React** à `compose.dev.yaml`.

2️⃣ **Teste l'accès à l'API (Express) via** [http://localhost:5050](http://localhost:5050).

3️⃣ **Teste l'accès au client (React) via** [http://localhost:8080](http://localhost:8080).

4️⃣ **Pousse le projet sur GitHub** :
- Supprime les dossiers `.git` dans `client/` et `server/` :