/**
 * Contrôleurs pour la gestion des personnes dans l'API
 * @module controllers/userControllers
 */

// Import du modèle Person (chemin relatif depuis ce fichier)
const Person = require('../../models/Person');

/**
 * Crée une nouvelle personne dans la base de données
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const createPerson = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const { name, age, favoriteFoods } = req.body;

    // Créer une nouvelle instance du modèle Person
    const newPerson = new Person({ name, age, favoriteFoods });

    // Sauvegarder la personne dans la base de données
    const savedPerson = await newPerson.save();
    // Succès : renvoyer la personne créée avec le statut 201 (Created)
    return res.status(201).json(savedPerson);
  } catch (err) {
    // Erreur de validation ou autre problème
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Crée plusieurs personnes en une seule opération
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const createManyPeople = async (req, res) => {
  try {
    // Récupérer le tableau de personnes depuis le corps de la requête
    const people = req.body; // doit être un tableau

    // Insérer plusieurs personnes en une seule opération
    const createdPeople = await Person.create(people);
    // Succès : renvoyer les personnes créées avec le statut 201 (Created)
    return res.status(201).json(createdPeople);
  } catch (err) {
    // Erreur lors de la création
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Récupère toutes les personnes de la base de données
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const findPeople = async (req, res) => {
  try {
    // Récupérer toutes les personnes sans filtre
    const people = await Person.find({});
    // Succès : renvoyer toutes les personnes
    return res.status(200).json(people);
  } catch (err) {
    // Erreur serveur
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Trouve une personne par son aliment préféré
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const findOneByFood = async (req, res) => {
  try {
    // Extraire l'aliment des paramètres de la requête
    const food = req.params.food;

    // Chercher une personne dont favoriteFoods contient l'aliment spécifié
    const person = await Person.findOne({ favoriteFoods: food });
    if (!person) {
      // Aucune personne trouvée
      return res.status(404).json({ message: 'Person not found' });
    }
    // Succès : renvoyer la personne trouvée
    return res.status(200).json(person);
  } catch (err) {
    // Erreur serveur
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Trouve une personne par son ID
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const findById = async (req, res) => {
  try {
    // Extraire l'ID des paramètres de la requête
    const { id } = req.params;

    // Chercher une personne par son ID
    const person = await Person.findById(id);
    if (!person) {
      // Aucune personne trouvée avec cet ID
      return res.status(404).json({ message: 'Person not found' });
    }
    // Succès : renvoyer la personne trouvée
    return res.status(200).json(person);
  } catch (err) {
    // Erreur liée à l'ID (CastError) ou autre
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Ajoute "hamburger" aux aliments préférés d'une personne
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const updateFavoriteFood = async (req, res) => {
  try {
    // Extraire l'ID des paramètres de la requête
    const { id } = req.params;

    // D'abord, trouver la personne par son ID
    const person = await Person.findById(id);
    if (!person) {
      // Aucune personne trouvée avec cet ID
      return res.status(404).json({ message: 'Person not found' });
    }

    // S'assurer que favoriteFoods est un tableau
    person.favoriteFoods = person.favoriteFoods || [];
    // Ajouter "hamburger" à la liste des aliments préférés
    person.favoriteFoods.push('hamburger');

    // Sauvegarder les modifications
    const updatedPerson = await person.save();
    // Succès : renvoyer la personne mise à jour
    return res.status(200).json(updatedPerson);
  } catch (err) {
    // Erreur lors de la sauvegarde
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Met à jour l'âge d'une personne par son nom
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const updateAge = async (req, res) => {
  try {
    // Extraire le nom des paramètres de la requête
    const { name } = req.params;
    // Extraire le nouvel âge du corps de la requête
    const { age } = req.body;

    // Mettre à jour l'âge de la première personne trouvée avec ce nom
    const updatedPerson = await Person.findOneAndUpdate(
      { name },
      { age },
      { new: true, runValidators: true, context: 'query' }
    );
    if (!updatedPerson) {
      // Aucune personne trouvée avec ce nom
      return res.status(404).json({ message: 'Person not found' });
    }
    // Succès : renvoyer la personne mise à jour
    return res.status(200).json(updatedPerson);
  } catch (err) {
    // Erreur lors de la mise à jour
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Supprime une personne par son ID
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const deleteById = async (req, res) => {
  try {
    // Extraire l'ID des paramètres de la requête
    const { id } = req.params;

    // Supprimer la personne par son ID
    const deletedPerson = await Person.findByIdAndDelete(id);
    if (!deletedPerson) {
      // Aucune personne trouvée avec cet ID
      return res.status(404).json({ message: 'Person not found' });
    }
    // Succès : renvoyer la personne supprimée
    return res.status(200).json(deletedPerson);
  } catch (err) {
    // Erreur liée à l'ID ou autre
    return res.status(400).json({ error: err.message });
  }
};

/**
 * Supprime toutes les personnes nommées "Mary"
 * @param {Object} req - Objet de requête Express
 * @param {Object} res - Objet de réponse Express
 */
const deleteManyMary = async (req, res) => {
  try {
    // Supprimer toutes les personnes dont le nom est "Mary"
    const result = await Person.deleteMany({ name: 'Mary' });
    // Succès : renvoyer le résultat de l'opération
    return res.status(200).json(result);
  } catch (err) {
    // Erreur lors de la suppression
    return res.status(500).json({ error: err.message });
  }
};

// Export des handlers pour utilisation dans les routes
module.exports = {
  createPerson,
  createManyPeople,
  findPeople,
  findOneByFood,
  findById,
  updateFavoriteFood,
  updateAge,
  deleteById,
  deleteManyMary
};
