@echo off
REM Script d'installation pour l'application

echo 🧹 Nettoyage des anciennes dépendances...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo 📦 Installation des nouvelles dépendances...
npm install

echo ✅ Installation terminée!
echo Vous pouvez maintenant lancer l'application avec:
echo   npm start    (pour la production)
echo   npm run dev  (pour le développement)
pause