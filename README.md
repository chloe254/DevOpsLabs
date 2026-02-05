# DevOpsLabs
repo for devops course 


Lab 4– Continuous Testing (User API)

1. Contexte et objectif du lab

Ce lab avait pour objectif de découvrir le continuous testing et la méthode Test-Driven Development (TDD) à travers une application User API développée en Node.js et utilisant Redis comme base de données.

L’objectif principal était de comprendre l’importance des tests automatisés et de développer une fonctionnalité GET user en suivant une approche TDD.

2. Application dans un contexte réel d’entreprise

Dans un contexte professionnel, ce type d’architecture et de méthodologie est essentiel :

-Les tests unitaires automatiques permettent de vérifier le bon fonctionnement de chaque composant du code.

-Les tests API assurent que les routes REST répondent correctement.

-Le TDD permet de limiter les erreurs et d’éviter les régressions.

-Un projet ne peut pas être mis en production si l’ensemble des tests n’est pas validé.

Cela garantit une application plus fiable, plus stable et plus facile à maintenir.

3. Difficultés rencontrées et solutions

Problème 1 : Installation de Redis sous Windows

Difficulté :
Les commandes utilisant sudo ne fonctionnaient pas sous PowerShell, ce qui empêchait l’installation de Redis directement sous Windows.

Solution :
Nous avons utilisé WSL (Ubuntu) via PowerShell pour installer Redis dans un environnement Linux.
Le serveur Redis a ensuite été lancé depuis Ubuntu et vérifié avec la commande redis-cli ping, qui a retourné la réponse PONG.

Problème 2 : Mise en place de l’environnement de travail

Difficulté :
La gestion des chemins entre Windows et Linux ainsi que le téléchargement du lab ont posé problème au départ.

Solution :
Le projet du lab a été téléchargé puis ajouté sur le GitHub du groupe.
Les commandes npm install, npm test et npm start ont ensuite été exécutées depuis le terminal Ubuntu, ce qui a permis de travailler correctement sur l’application.

4. Étapes de réalisation du lab

Étape 1 : Utilisation de l’application existante
-Installation des dépendances avec npm install

-Exécution des tests existants avec npm test

-Lancement de l’application avec npm start

Étape 2 : Création de la fonctionnalité GET user avec TDD

a) Tests unitaires (Controller)

-Création de deux tests unitaires :

	-récupération d’un utilisateur existant par son nom d’utilisateur

	-gestion du cas où l’utilisateur n’existe pas

-Implémentation de la méthode GET user dans le controller

b) Tests API (Router)

-Création de deux tests API :

	-récupération réussie d’un utilisateur existant

	-erreur retournée lorsque l’utilisateur n’existe pas

-Implémentation de la route GET /user

Les tests ont été écrits avant le code fonctionnel, conformément au principe du Test-Driven Development.

5. État d’avancement

-Redis installé et fonctionnel

-Application installée et lancée

-Tests unitaires et tests API implémentés

-Fonctionnalité GET user opérationnelle

-Tous les tests passent avec succès

Le lab est entièrement terminé.