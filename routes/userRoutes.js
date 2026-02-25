/**
 * Routes pour la gestion des personnes dans l'API
 * @module routes/userRoutes
 */

// Importer les dépendances nécessaires
const express = require('express'); // Framework web pour Node.js

// Créer un routeur Express
const router = express.Router();

// Importer les fonctions du contrôleur
const userCtrl = require('../controllers/userControllers');

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nom de la personne
 *         age:
 *           type: number
 *           description: Âge de la personne
 *         favoriteFoods:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des aliments préférés
 */

// =========================
// ROUTES DE CRÉATION (CREATE)
// =========================

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer une nouvelle personne
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: Personne créée avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/', userCtrl.createPerson);

/**
 * @swagger
 * /api/users/bulk:
 *   post:
 *     summary: Créer plusieurs personnes en une seule requête
 *     tags: [Persons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: Personnes créées avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post('/bulk', userCtrl.createManyPeople);

// =========================
// ROUTES DE LECTURE (READ)
// =========================

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer toutes les personnes
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: Liste des personnes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 */
router.get('/', userCtrl.findPeople);

/**
 * @swagger
 * /api/users/food/{food}:
 *   get:
 *     summary: Trouver une personne par aliment préféré
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: food
 *         schema:
 *           type: string
 *         required: true
 *         description: Aliment à rechercher
 *     responses:
 *       200:
 *         description: Personne trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Personne non trouvée
 */
router.get('/food/:food', userCtrl.findOneByFood);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Trouver une personne par son ID
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la personne
 *     responses:
 *       200:
 *         description: Personne trouvée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Personne non trouvée
 */
router.get('/:id', userCtrl.findById);

// =========================
// ROUTES DE MISE À JOUR (UPDATE)
// =========================

/**
 * @swagger
 * /api/users/{id}/favorite:
 *   put:
 *     summary: Ajouter "hamburger" aux aliments préférés d'une personne
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la personne
 *     responses:
 *       200:
 *         description: Personne mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Personne non trouvée
 */
router.put('/:id/favorite', userCtrl.updateFavoriteFood);

/**
 * @swagger
 * /api/users/name/{name}/age:
 *   put:
 *     summary: Mettre à jour l'âge d'une personne par son nom
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Nom de la personne
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               age:
 *                 type: number
 *                 description: Nouvel âge
 *     responses:
 *       200:
 *         description: Personne mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Personne non trouvée
 */
router.put('/name/:name/age', userCtrl.updateAge);

// =========================
// ROUTES DE SUPPRESSION (DELETE)
// =========================

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer une personne par son ID
 *     tags: [Persons]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la personne à supprimer
 *     responses:
 *       200:
 *         description: Personne supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: Personne non trouvée
 */
router.delete('/:id', userCtrl.deleteById);

/**
 * @swagger
 * /api/users/name/mary:
 *   delete:
 *     summary: Supprimer toutes les personnes nommées "Mary"
 *     tags: [Persons]
 *     responses:
 *       200:
 *         description: Personnes supprimées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: number
 *                   description: Nombre de personnes supprimées
 */
router.delete('/name/mary', userCtrl.deleteManyMary);

// Exporter le routeur pour l'utiliser dans server.js
module.exports = router;
