# DevOpsLabs
repo for devops course 

Lab1 - covers the basics of Git


1. Objectifs du lab : 
Se familiariser avec les bases de Git, la gestion du versionning et la logique d’utilisation des branches pour le développement en équipe. Savoir utiliser l’interface graphique Gitub Desktop mais aussi l’invit de commande CLI. 

2. Application dans un contexte réel d’entreprise
Dans le monde professionnel, Git est un outil très utilisé dans le développement logiciel, que ce soit via GitHub ou GitLab. Pour notre part, nous utilisons GitLab dans le cadre de notre apprentissage en entreprise. Cela permet à plusieurs développeurs de travailler sur un même projet en simultané sur différentes branches qui servent à : 
-	Développer de nouvelles fonctionnalités 
-	Corriger des bugs 
-	Tester des versions impacter la branche principale
-	Gérer les conflits 

3. Difficultés rencontrées et solutions
Problème : Un problème a été rencontré lors de la connexion du dépôt GitHub à Visual Studio.
Le chemin de référence du dépôt local n’était pas correctement configuré, ce qui entraînait des modifications non prises en compte ou enregistrées dans un mauvais répertoire.
Solution : 
Nous avons vérifié le dossier réellement cloné sur Gitub Desktop, ouvert le bon répertoire dans Visual studio et vérifié que les fichiers modifiés correspondaient bien au dépôt Git actif. 
Cela nous a permis une meilleure compréhension du lien entre IDE, répertoire local et dépôt Git.

4. Finalité et état d’avancement : 
-	le dépôt GitHub est correctement configuré,
-	les branches sont fonctionnelles,
-	les modifications sont versionnées et synchronisées,
-	les conflits sont compris et résolus manuellement,
-	les commandes Git en ligne de commande ont été maîtrisées.



Lab 2– Continuous Testing (User API)

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

Lab 3 – Continuous Integration & Continuous Delivery (CI/CD)
1. Application dans un contexte réel d’entreprise

Ce lab met en pratique les principes de Continuous Integration (CI) et de Continuous Delivery (CD) appliqués à une application User API développée en Node.js avec Redis.
Dans un contexte professionnel :
-chaque modification déclenche automatiquement des tests,
-les erreurs sont détectées avant l’intégration dans la branche principale,
-le déploiement est automatisé,
-une version instable ne peut pas être mise en production.
Cette organisation garantit la qualité, la stabilité et la maintenabilité du projet.

2. Difficultés rencontrées et solutions

Problème 1 : Connexion à Redis dans GitHub Actions (CI)
Difficulté :
Les tests échouaient lors de l’exécution de npm test dans GitHub Actions car Redis n’était pas disponible dans l’environnement CI.
Solution :
Un service Redis a été ajouté au workflow GitHub Actions via un conteneur, permettant aux tests de s’exécuter correctement.

Problème 2 : Organisation et utilisation des branches Git
Difficulté :
L’organisation des branches n’était pas optimale au début du projet :
-modifications faites directement sur la branche principale,
-confusion entre les branches,
-difficultés à suivre les changements lors des tests et des pull requests.
Solution :
Nous avons adopté un workflow plus structuré :
-création de branches dédiées pour chaque modification,
-utilisation systématique des Pull Requests,
-validation automatique par GitHub Actions avant la fusion dans la branche principale.
Cela a amélioré la lisibilité du projet et la fiabilité des intégrations.

Problème 3 : Déploiement avec Render (droits et autorisations GitHub)
Difficulté :
Le déploiement échouait car le compte GitHub ayant créé le dépôt n’avait pas autorisé l’accès de Render au repository.
Solution :
Les permissions GitHub ont été configurées pour autoriser Render à accéder au dépôt, ce qui a permis la synchronisation et le déploiement automatique.

Problème 4 : Mauvaise configuration du Root Directory sur Render
Difficulté :
Les commandes npm start et npm test échouaient sur Render.
Cause :
Le projet Node.js se trouvait dans le dossier lab, mais le Root Directory n’était pas défini correctement.
Solution :
Le Root Directory a été configuré sur lab, permettant à Render d’exécuter correctement les commandes npm.

Problème 5 : Utilisation de Render au lieu d’Heroku
Difficulté :
Le lab était prévu pour Heroku, mais nous avons utilisé Render à la place.
Solution :
Le pipeline CI/CD a été adapté à Render :
-déploiement automatique via GitHub,
-application accessible publiquement,
-acceptation du fait que Redis ne soit pas actif en production, conformément à l’esprit du lab.

3. Étapes de réalisation du lab
Étape 1 : Continuous Integration
-Mise en place de GitHub Actions
-Installation automatique des dépendances
-Exécution des tests
-Connexion à Redis en CI

Étape 2 : Workflow de développement
-Création de branches dédiées
-Commit et push des modifications
-Pull Requests
-Validation automatique par CI
-Fusion dans la branche principale

Étape 3 : Continuous Delivery avec Render
-Connexion du dépôt GitHub à Render
-Configuration du Root Directory (lab)
-Déploiement automatique après chaque merge
-Mise à disposition d’une URL publique

4. État d’avancement
-Pipeline CI fonctionnel
-Organisation Git améliorée
-Déploiement automatique opérationnel avec Render
-Application accessible publiquement

Lab entièrement résolu

Lab 7 – Containers with Docker
1. Contexte et objectif du lab

Ce lab avait pour objectif de découvrir l’utilisation de Docker et Docker Compose à travers la conteneurisation d’une application Node.js simple, puis d’une application multi-conteneurs avec Redis.

L’objectif principal était de :

comprendre le fonctionnement de Docker,

construire une image à partir d’un Dockerfile,

exécuter un conteneur avec différentes options,

partager une image Docker via Docker Hub,

utiliser Docker Compose pour lancer plusieurs services ensemble,

comprendre la persistance des données avec les volumes Docker.

2. Application dans un contexte réel d’entreprise

Dans un contexte professionnel, Docker est largement utilisé pour standardiser les environnements de développement, de test et de production.

Cela permet :

d’exécuter une application de manière identique sur toutes les machines,

d’éviter les problèmes de configuration liés aux différences d’environnement,

de déployer rapidement une application avec toutes ses dépendances,

de faciliter le travail en équipe grâce au partage d’images via Docker Hub ou des registres privés,

d’orchestrer plusieurs services ensemble, comme une application web et une base de données.

Docker Compose est particulièrement utile en entreprise pour décrire et lancer facilement une architecture composée de plusieurs conteneurs, par exemple une API, une base Redis ou un autre service de support.

3. Difficultés rencontrées et solutions
Problème 1 : Chemin des dossiers incorrect ou fichiers du lab absents

Difficulté :
Au début du lab, les dossiers hello-world-docker et hello-world-docker-compose n’étaient pas visibles. Cela venait du fait que les fichiers du TP n’avaient pas encore été clonés correctement ou qu’ils se trouvaient dans un mauvais emplacement.

Solution :
Nous avons vérifié le clonage du dépôt et l’emplacement réel des fichiers sur la machine. Une fois le bon dépôt récupéré et les fichiers placés dans le bon répertoire, il a été possible d’accéder aux dossiers du lab et de poursuivre le travail normalement.

Problème 2 : Confusion entre fichiers et dossiers

Difficulté :
Une confusion a été rencontrée lors de l’utilisation du terminal, notamment en essayant d’utiliser la commande cd sur un fichier comme server.js. Cette erreur empêchait d’accéder correctement aux éléments du projet.

Solution :
Nous avons revu la différence entre un fichier et un dossier. La commande cd permet uniquement de se déplacer dans un répertoire, tandis qu’un fichier comme server.js doit être ouvert ou modifié avec un éditeur de code. Cela a permis une meilleure maîtrise de la navigation dans l’arborescence du projet.

Problème 3 : Nom d’image Docker incorrect ou image absente en local

Difficulté :
Des erreurs sont apparues lors de l’exécution de conteneurs parce que Docker tentait de récupérer automatiquement une image depuis Docker Hub, alors que celle-ci n’existait pas encore en ligne et n’avait pas encore été construite localement.

Solution :
Nous avons compris qu’il fallait d’abord construire l’image localement avec docker build avant de pouvoir la lancer avec docker run. Nous avons aussi vérifié soigneusement les noms donnés aux images afin d’éviter les erreurs liées à un mauvais tag ou à une image inexistante.

Problème 4 : Oubli de reconstruire l’image après modification

Difficulté :
Après modification du fichier server.js, les changements n’apparaissaient pas dans le conteneur lancé. Cela venait du fait que l’image Docker n’avait pas été reconstruite après les modifications du code.

Solution :
Nous avons compris qu’une image Docker est une version figée de l’application au moment du build. Il était donc nécessaire de relancer la commande de build après chaque modification du code afin que les changements soient pris en compte dans les nouveaux conteneurs.

Problème 5 : Erreur Node.js dans le conteneur

Difficulté :
Le conteneur s’arrêtait immédiatement car server.js ou ses dépendances n’étaient pas correctement copiées ou installées dans l’image Docker. L’application Node.js ne pouvait donc pas démarrer.

Solution :
Nous avons vérifié le contenu du Dockerfile, notamment :

la copie des fichiers du projet dans l’image,

l’installation des dépendances avec npm install,

la présence du bon fichier de démarrage.

Après correction de ces éléments, le conteneur a pu démarrer correctement.

Problème 6 : Conflits avec des conteneurs déjà en cours d’exécution

Difficulté :
Certaines commandes ont provoqué des conflits car des conteneurs lancés précédemment étaient encore actifs. Cela créait des problèmes lors des nouveaux démarrages.

Solution :
Nous avons utilisé les commandes docker ps, docker stop et, si nécessaire, la suppression des anciens conteneurs afin de repartir d’un environnement propre avant de relancer les nouveaux conteneurs.

Problème 7 : Erreurs de connexion et de mapping des ports

Difficulté :
Des erreurs de connexion ont été rencontrées lors du lancement des conteneurs, notamment à cause d’un mauvais mapping des ports ou d’un port déjà utilisé par un autre service.

Solution :
Nous avons vérifié la correspondance entre le port de la machine locale et celui du conteneur. Cela a permis d’accéder correctement à l’application depuis le navigateur et d’éviter les conflits de ports déjà occupés.

Problème 8 : Perte des données après suppression des conteneurs

Difficulté :
Dans la partie Docker Compose avec Redis, le compteur revenait à zéro après suppression et recréation des conteneurs. Les données n’étaient donc pas conservées.

Solution :
Nous avons compris que les données Redis étaient stockées uniquement dans le conteneur. Lorsqu’il était supprimé, les données disparaissaient également.
Pour résoudre ce problème, nous avons ajouté un Docker Volume monté sur le dossier /data de Redis, ce qui a permis d’assurer la persistance des données même après suppression et recréation des conteneurs.

4. Étapes de réalisation du lab
Étape 1 : Installation et vérification de Docker

installation de Docker Desktop,

vérification du bon fonctionnement avec docker run hello-world.

Étape 2 : Construction d’une image Docker simple

ouverture du dossier hello-world-docker,

analyse des fichiers server.js, package.json et Dockerfile,

construction de l’image avec docker build -t hello-world-docker .,

vérification de la présence de l’image avec docker images.

Étape 3 : Exécution d’un conteneur

lancement du conteneur avec docker run -p 12345:8080 -d hello-world-docker,

vérification du fonctionnement avec docker ps,

consultation de l’application dans le navigateur sur localhost:12345,

affichage des logs avec docker logs,

arrêt du conteneur avec docker stop.

Étape 4 : Modification et partage de l’image

modification du message affiché dans server.js,

reconstruction de l’image Docker avec un nouveau nom,

création d’un compte Docker Hub,

ajout du tag Docker Hub à l’image,

connexion avec docker login,

publication de l’image avec docker push,

récupération de l’image par un autre utilisateur avec docker pull.

Étape 5 : Utilisation de Docker Compose

ouverture du dossier hello-world-docker-compose,

construction de l’image de l’application,

complétion du fichier docker-compose.yaml,

démarrage des services avec docker-compose up,

test de l’application sur localhost:5000,

observation du compteur incrémenté à chaque actualisation.

Étape 6 : Mise en place de la persistance

suppression des conteneurs avec docker-compose rm,

constat de la réinitialisation du compteur,

ajout d’un volume Docker pour Redis,

redémarrage des conteneurs,

vérification que le compteur conservait désormais sa valeur.

5. État d’avancement

Docker Desktop installé et fonctionnel,

image Docker construite correctement,

conteneur simple exécuté avec succès,

compréhension du rôle du Dockerfile et du build,

application accessible via le navigateur,

image publiée sur Docker Hub,

application multi-conteneurs lancée avec Docker Compose,

fonctionnement de Redis vérifié,

persistance des données mise en place avec un volume Docker.

Le lab est entièrement terminé.