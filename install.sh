#!/bin/bash
# Script d'installation pour l'application

echo "🧹 Nettoyage des anciennes dépendances..."
rm -rf node_modules package-lock.json

echo "📦 Installation des nouvelles dépendances..."
npm install

echo "✅ Installation terminée!"
echo "Vous pouvez maintenant lancer l'application avec:"
echo "  npm start    (pour la production)"
echo "  npm run dev  (pour le développement)"