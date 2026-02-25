/**
 * Script de test pour vérifier la connexion à MongoDB
 */

// Charger les variables d'environnement
require('dotenv').config({ path: './.env' });

// Importer la fonction de connexion
const { connectDB } = require('./config/database');

// Fonction de test
const testConnection = async () => {
  console.log('Test de connexion à MongoDB...');
  
  try {
    // Tenter de se connecter
    await connectDB();
    console.log('✅ Test de connexion réussi !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test de connexion échoué :', error);
    process.exit(1);
  }
};

// Exécuter le test
testConnection();