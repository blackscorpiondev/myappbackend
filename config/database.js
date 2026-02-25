/**
 * Configuration de la connexion à la base de données MongoDB
 * @module config/database
 */

// Importer mongoose pour gérer la connexion à MongoDB
const mongoose = require('mongoose');

// Récupérer l'URI depuis les variables d'environnement
const mongoUri = process.env.MONGO_URI;

// Vérification basique : s'assurer que l'URI est défini
if (!mongoUri) {
  // Si MONGO_URI est absent, on affiche une erreur explicite et on arrête l'exécution.
  console.error('ERREUR : MONGO_URI non défini dans le fichier .env');
  process.exit(1);
}

// Configuration de la connexion à MongoDB
// Pour Mongoose 9.x, il est recommandé d'utiliser la configuration minimale
// et de laisser le driver gérer les options par défaut
const connectDB = async () => {
  try {
    // Établir la connexion à MongoDB
    await mongoose.connect(mongoUri);
    console.log('✅ Connexion à MongoDB établie avec succès');
    console.log(`📊 Connecté à la base de données : ${mongoUri.split('/')[3].split('?')[0]}`);
  } catch (err) {
    console.error('❌ Erreur de connexion à MongoDB :', err);
    process.exit(1);
  }
};

// Gérer les événements de connexion
mongoose.connection.on('connected', () => {
  console.log('⚡ Mongoose connecté à MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Erreur de connexion Mongoose :', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose déconnecté de MongoDB');
});

// Gérer l'arrêt propre de l'application
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 Connexion à MongoDB fermée suite à l\'arrêt de l\'application');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors de la fermeture de la connexion MongoDB :', err);
    process.exit(1);
  }
});

// Exporter la fonction de connexion et mongoose
module.exports = { connectDB, mongoose };
