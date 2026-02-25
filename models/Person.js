/**
 * Modèle Person pour la gestion des personnes dans la base de données
 * @module models/Person
 */

// Importer mongoose pour la création du schéma et du modèle
const mongoose = require('mongoose');

/**
 * Schéma Person avec les champs requis
 * - name: String (obligatoire, minimum 2 caractères)
 * - age: Number (optionnel)
 * - favoriteFoods: Array de String (optionnel)
 */
const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Le nom est obligatoire'], 
    minlength: [2, 'Le nom doit contenir au moins 2 caractères'],
    trim: true
  },
  age: { 
    type: Number, 
    min: [0, 'L\'âge ne peut pas être négatif'],
    max: [120, 'L\'âge ne peut pas dépasser 120 ans']
  },
  favoriteFoods: { 
    type: [String],
    default: []
  }
}, {
  // Options du schéma
  timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
});

// Créer et exporter le modèle Person basé sur le schéma défini
module.exports = mongoose.model('Person', personSchema);

