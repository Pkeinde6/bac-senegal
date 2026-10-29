#!/bin/sh
# Construit le site et publie dist/ sur la branche gh-pages.
set -e
npm run build
cd dist
touch .nojekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git commit -qm "Déploiement"
git push -qf https://github.com/Pkeinde6/bac-senegal.git gh-pages
rm -rf .git
echo "Publié : https://pkeinde6.github.io/bac-senegal/"
