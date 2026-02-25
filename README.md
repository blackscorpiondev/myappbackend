# API de Gestion des Personnes

## Description

Cette API RESTful permet de gérer une collection de personnes avec leurs informations personnelles. Elle est construite avec Node.js, Express et MongoDB (via Mongoose).

## Installation

1. Cloner ce dépôt :
```bash
git clone https://github.com/votre-username/monapp-express.git
cd monapp-express/myappBackend
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer les variables d'environnement :
- Créer un fichier `.env` à la racine du projet
- Ajouter les variables suivantes :
```
MONGO_URI="mongodb://localhost:27017/myapp"
PORT=5010
```

4. Démarrer le serveur :
```bash
npm start
```

Ou en mode développement avec nodemon :
```bash
npm run dev
```

## Structure du projet

```
myappBackend/
├── config/
│   └── database.js      # Configuration de la connexion à la base de données
├── controllers/
│   └── userControllers/
│       └── index.js     # Logique métier pour les opérations CRUD
├── models/
│   └── Person.js        # Schéma Mongoose pour le modèle Person
├── routes/
│   └── userRoutes.js    # Définition des routes de l'API
├── .env                 # Variables d'environnement
├── package.json         # Dépendances et scripts du projet
└── server.js            # Point d'entrée de l'application
```

## Endpoints de l'API

### Création
- `POST /api/users` - Créer une nouvelle personne
- `POST /api/users/bulk` - Créer plusieurs personnes en une seule requête

### Lecture
- `GET /api/users` - Récupérer toutes les personnes
- `GET /api/users/food/:food` - Trouver une personne par aliment préféré
- `GET /api/users/:id` - Trouver une personne par son ID

### Mise à jour
- `PUT /api/users/:id/favorite` - Ajouter "hamburger" aux aliments préférés d'une personne
- `PUT /api/users/name/:name/age` - Mettre à jour l'âge d'une personne par son nom

### Suppression
- `DELETE /api/users/:id` - Supprimer une personne par son ID
- `DELETE /api/users/name/mary` - Supprimer toutes les personnes nommées "Mary"

## Modèle de données

Le modèle Person contient les champs suivants :
- `name` (String, obligatoire) : Nom de la personne (minimum 2 caractères)
- `age` (Number, optionnel) : Âge de la personne (entre 0 et 120)
- `favoriteFoods` (Array of String, optionnel) : Liste des aliments préférés

## Exemples de requêtes

### Créer une personne
```json
POST /api/users
{
  "name": "John Doe",
  "age": 30,
  "favoriteFoods": ["pizza", "pasta"]
}
```

### Mettre à jour l'âge d'une personne
```json
PUT /api/users/name/John Doe/age
{
  "age": 35
}
```

## Auteur

[Mouhamed Diouf] - [mouhameddiouff99@example.com]