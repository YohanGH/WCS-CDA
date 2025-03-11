# CDA Training - Exercises, Solo Projects and Others

Welcome to my GitHub repository dedicated to my Concepteur Développeur d'Applications (CDA) training course. This repository contains all the exercises, solo projects and other work I've done during my training.

## Table of contents

## Introduction

As part of my CDA training, I worked on various projects and exercises to improve my application development skills. This repository gathers these works, each organized in specific folders.

## Tree structures

```md
.
├── module_1
|   ├── exercices_vite_react
|       ├── frontend
|       └── ...
|   ├── exercices_rest_express
|       ├── backend
|       └── ...
|   └── exercises_typing_typescript
│       └── practices
|   └── exercices_graphql
│       ├── graphql_discovery
│       └── ...
|   └── exercices_docker
|       ├── quest-1726-docker-express
|       └── ...
|   └── exercises_test
|       ├── tester-un-composant-react
|       ├── tests-end-to-end-playwright
|       ├── wns-test-display-name
|       └── ...
└── ...
```

## Technologies used

Here are the technologies and programming languages mainly used during my work:

- HTML / CSS
- JavaScript / TypeScript 
- Vite / React / Express / Apollo server / GraphQL / TypeGraphQL
- SQL / SQLite / 
- Node.js
- Git / GitHub
- Docker
- Tailwind / Shadcn
- Argon2 / JWT / Cookies

## Exercices

- Module 1 : 
    - Introduce fundamentals TypeScripte
    - Introduce in backend with Ts / Express
    - Introduce in SQL
    - Introduce in ORM
    - Introduce in React, vite
    - Introduce in basic components
    - Introduce in cors
    - Introduce in form
    - Introduce in connexion backend and frontend
    - Introduce in basic hooks react (useState, useEffect ...)
    - Introduce in Tailwind and Shadcn
    - Introduce in GraphQL and Apollo server
    - Introduce in Docker
    - Introduce in Docker compose and microservice
    - Introduce in Authentication and Cookies

## Getting Started

### project exercices frontend and backend

1. Clone the repository: 

```shell
git clone https://github.com/YohanGH/WCS-CDA.git
```

2. Navigate in folder module_x / exercices_y

```shell
cd my/path/in/folder
```

3. Install dependencies:

```shell
pnpm install
```

4. Create `.env`

```shell
cp .env.sample .env
```

5. Running the App backend

```shell
pnpm start
```

7. Running the App frontend

```shell
pnpm run dev
```

The app will be default running on http://localhost:3000.

### Project exercices graphql

1. Clone the repository: 

```shell
git clone https://github.com/YohanGH/WCS-CDA.git
```

2. Navigate in folder exercices_graphql/graphql_discovery

```shell
cd exercices_graphql/graphql_discovery
```

3. Install dependencies:

```shell
pnpm install
```

4. Running the App

```shell
pnpm start
```

### Project run with docker

1. Clone the repository: 

```shell
git clone https://github.com/YohanGH/WCS-CDA.git
```

2. Navigate in folder Module_1

```shell
cd module_1
```

3. Running the App

```shell
docker compose up --build
```

The app will be default running on backend : http://localhost:3310 and frontend : http://localhost:5173 and database : http://localhost:5432.
