/**
 * Point d'entrée principal de l'application backend
 * @module server
 */

// Importer les dépendances nécessaires
const express = require('express'); // Framework web pour Node.js

// Charger les variables d'environnement depuis le fichier .env
require('dotenv').config({ path: './.env' });

// Importer la configuration de la base de données
const { connectDB } = require('./config/database');

// Importer les routes définies dans routes/userRoutes.js
const userRoutes = require('./routes/userRoutes');

// Créer l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware pour parser les requêtes URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configurer les routes de l'API
app.use('/api/users', userRoutes); // Préfixer toutes les routes avec /api/users

// Définir le port d'écoute à partir des variables d'environnement ou utiliser 5010 par défaut
const PORT = process.env.PORT || 5010;

// Fonction pour démarrer le serveur
const startServer = async () => {
  try {
    // Établir la connexion à la base de données
    await connectDB();
    
    // Démarrer le serveur et afficher un message de confirmation
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api/users`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Démarrer le serveur
startServer();


