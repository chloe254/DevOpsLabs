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

-comprendre le fonctionnement de Docker,
-construire une image à partir d’un Dockerfile,
-exécuter un conteneur avec différentes options,
-partager une image Docker via Docker Hub,
-utiliser Docker Compose pour lancer plusieurs services ensemble,
-comprendre la persistance des données avec les volumes Docker.

2. Application dans un contexte réel d’entreprise

Dans un contexte professionnel, Docker est largement utilisé pour standardiser les environnements de développement, de test et de production.

Cela permet :

-d’exécuter une application de manière identique sur toutes les machines,
-d’éviter les problèmes de configuration liés aux différences d’environnement,
-de déployer rapidement une application avec toutes ses dépendances,
-de faciliter le travail en équipe grâce au partage d’images via Docker Hub ou -des registres privés,
-d’orchestrer plusieurs services ensemble, comme une application web et une base de données.

Docker Compose est particulièrement utile en entreprise pour décrire et lancer facilement une architecture composée de plusieurs conteneurs, par exemple une API, une base Redis ou un autre service de support.

3. Difficultés rencontrées et solutions

Problème 1 : Pod bloqué en ContainerCreating

Difficulté :
Il était parfois impossible d’entrer dans le conteneur avec kubectl exec car le Pod était encore en cours de création.

Solution :
Nous avons attendu que le Pod passe à l’état Running en vérifiant son statut avec :
-kubectl get pods

Une fois le Pod démarré, il a été possible d’y accéder normalement.

Problème 2 : erreur ImagePullBackOff

Difficulté :
Kubernetes n’arrivait pas à télécharger l’image du conteneur, ce qui empêchait la création correcte du Pod.

Solution :
Nous avons vérifié le nom de l’image dans le fichier YAML, en utilisant bien nginx, puis réappliqué la configuration avec :
-kubectl apply -f deployment.yml

Cela a permis à Kubernetes de récupérer correctement l’image et de démarrer le Pod.

Problème 3 : curl localhost ne fonctionnait pas

Difficulté :
La commande curl localhost avait été lancée depuis le PC ou dans un mauvais environnement, ce qui ne permettait pas de tester le serveur nginx du conteneur.

Solution :
Nous avons compris qu’il fallait d’abord entrer dans le conteneur avec :
-kubectl exec -it <POD_NAME> -- sh

puis exécuter :
-curl localhost

Cela a permis de tester directement le service nginx à l’intérieur du Pod.

Problème 4 : erreur 403 Forbidden

Difficulté :
Nginx répondait avec une erreur 403, car aucun fichier index.html n’était présent dans le volume monté.

Solution :
Nous avons créé manuellement le fichier dans le dossier utilisé par nginx :
-echo 'Hello from Kubernetes storage!' > /usr/share/nginx/html/index.html

Après cela, la commande curl localhost retournait bien le contenu attendu.

Problème 5 : création de fichier avec sudo echo ne fonctionnait pas

Difficulté :
Dans la partie hostPath, la commande avec sudo echo '...' > fichier ne fonctionnait pas correctement à cause de la redirection.

Solution :
Nous avons utilisé la commande suivante :
-echo 'Hello from Kubernetes storage!' | sudo tee /mnt/hostPath/index.html

Cette méthode a permis d’écrire correctement dans le fichier avec les droits nécessaires.

4. Étapes de réalisation du lab
Étape 1 : Installation et vérification de Docker

-installation de Docker Desktop,
-vérification du bon fonctionnement avec docker run hello-world.

Étape 2 : Construction d’une image Docker simple
-ouverture du dossier hello-world-docker,
-analyse des fichiers server.js, package.json et Dockerfile,
-construction de l’image avec docker build -t hello-world-docker .,
-vérification de la présence de l’image avec docker images.

Étape 3 : Exécution d’un conteneur

-lancement du conteneur avec docker run -p 12345:8080 -d hello-world-docker,
-vérification du fonctionnement avec docker ps,
-consultation de l’application dans le navigateur sur localhost:12345,
-affichage des logs avec docker logs,
-arrêt du conteneur avec docker stop.

Étape 4 : Modification et partage de l’image

-modification du message affiché dans server.js,
-reconstruction de l’image Docker avec un nouveau nom,
-création d’un compte Docker Hub,
-ajout du tag Docker Hub à l’image,
-connexion avec docker login,
-publication de l’image avec docker push,
-récupération de l’image par un autre utilisateur avec docker pull.

Étape 5 : Utilisation de Docker Compose

-ouverture du dossier hello-world-docker-compose,
-construction de l’image de l’application,
-complétion du fichier docker-compose.yaml,
-démarrage des services avec docker-compose up,
-test de l’application sur localhost:5000,
-observation du compteur incrémenté à chaque actualisation.

Étape 6 : Mise en place de la persistance

-suppression des conteneurs avec docker-compose rm,
-constat de la réinitialisation du compteur,
-ajout d’un volume Docker pour Redis,
-redémarrage des conteneurs,
-vérification que le compteur conservait désormais sa valeur.

5. État d’avancement

-Docker Desktop installé et fonctionnel,
-image Docker construite correctement,
-conteneur simple exécuté avec succès,
-compréhension du rôle du Dockerfile et du build,
-application accessible via le navigateur,
-image publiée sur Docker Hub,
-application multi-conteneurs lancée avec Docker Compose,
-fonctionnement de Redis vérifié,
-persistance des données mise en place avec un volume Docker.

Le lab est entièrement terminé.

Lab 9 – Kubernetes Storage
1. Contexte et objectif du lab

Ce lab avait pour objectif de découvrir les principaux mécanismes de stockage dans Kubernetes à travers trois types de volumes :

-emptyDir
-hostPath
-PersistentVolume avec PersistentVolumeClaim

L’objectif principal était de comprendre comment Kubernetes gère le stockage des données dans un Pod, de distinguer le stockage temporaire du stockage persistant, et de savoir monter un volume dans un conteneur nginx afin de rendre un fichier index.html accessible via le serveur web.

2. Application dans un contexte réel d’entreprise

Dans un contexte professionnel, la gestion du stockage dans Kubernetes est essentielle pour déployer des applications robustes et persistantes.

Cela permet notamment :

-de stocker temporairement des données utilisées par un Pod pendant son exécution,
-de partager des fichiers entre plusieurs conteneurs d’un même Pod,
-de conserver les données même après la suppression ou le redémarrage d’un conteneur,
-de connecter les applications à un espace de stockage durable,
-de séparer le cycle de vie des données du cycle de vie des Pods.

En entreprise, ces mécanismes sont utilisés pour des applications web, des bases de données, des systèmes de logs, des volumes de configuration ou encore des traitements nécessitant de conserver des fichiers entre plusieurs déploiements.

3. Difficultés rencontrées et solutions

Problème 1 : utilisation du mauvais Pod pour les tests

Difficulté :
Lors du test avec la commande curl localhost, une erreur Connection refused est apparue. Cela venait du fait que la commande avait été exécutée dans un Pod kubernetes-bootcamp, qui n’était pas le Pod nginx du lab.

Solution :
Nous avons listé les Pods avec kubectl get pods, puis identifié le bon Pod créé par le fichier deployment.yml, de type nginx-emptydir ou nginx-hostpath.
En entrant dans le bon conteneur avec kubectl exec -it <POD_NAME> -- sh, le test a pu être réalisé correctement.

Problème 2 : compréhension du fonctionnement du dossier monté dans nginx

Difficulté :
Au départ, nginx retournait une erreur 403 Forbidden, ce qui pouvait laisser penser à une mauvaise configuration.

Solution :
Nous avons compris que nginx servait les fichiers présents dans le dossier /usr/share/nginx/html, et que ce dossier était vide tant qu’aucun fichier index.html n’avait été créé.
Après ajout du fichier avec :

-echo 'Hello from Kubernetes storage!' > /usr/share/nginx/html/index.html

nginx a répondu correctement.

Problème 3 : écriture dans le volume hostPath

Difficulté :
Dans la partie hostPath, le contenu n’apparaissait pas immédiatement dans le conteneur, car le fichier devait être créé directement sur le système de fichiers de la VM Minikube et non dans le conteneur lui-même.

Solution :
Nous avons utilisé minikube ssh pour entrer dans la VM, puis créé le dossier et le fichier :

-sudo mkdir -p /mnt/hostPath
-sudo chmod -R 777 /mnt/hostPath
-echo 'Hello from Kubernetes storage!' | sudo tee /mnt/hostPath/index.html

Ensuite, le contenu a bien été visible depuis le Pod nginx.

Problème 4 : compréhension de la persistance entre emptyDir, hostPath et PersistentVolume

Difficulté :
Il fallait bien distinguer le comportement de chaque type de stockage après suppression d’un Pod.

Solution :
Les tests réalisés ont permis de comprendre que :

-emptyDir supprime les données à la suppression du Pod,
-hostPath conserve les données sur le nœud Minikube,
-PersistentVolume permet une gestion plus propre et plus durable du stockage via Kubernetes.

4. Étapes de réalisation du lab
Étape 1 : utilisation de emptyDir

-complétion du fichier lab/emptyDir/deployment.yml,
-création d’un déploiement nginx avec montage du volume sur /usr/share/nginx/html,
-application de la configuration avec kubectl apply -f,
-vérification du Pod avec kubectl get pods,
-connexion au conteneur avec kubectl exec,
-test avec curl localhost,
-création du fichier index.html dans le volume,
-vérification de l’affichage du message dans nginx,
-constat que les données sont perdues après suppression du Pod.

Étape 2 : utilisation de hostPath

-complétion du fichier lab/hostPath/deployment.yml,
-création d’un déploiement nginx utilisant un dossier du nœud Minikube,
-application de la configuration,
-test du comportement initial avec curl localhost,
-connexion à la VM Minikube avec minikube ssh,
-création du dossier /mnt/hostPath et du fichier index.html,
-retour dans le conteneur pour tester l’affichage,
-vérification que les données restent présentes même après suppression du Pod.

Étape 3 : utilisation de PersistentVolume

-création du fichier pv-volume.yaml,
-création d’un PersistentVolume,
-création du fichier pv-claim.yaml,
-création d’un PersistentVolumeClaim,
-vérification que le PVC passe à l’état Bound,
-création du fichier pv-pod.yaml,
-création d’un Pod nginx utilisant le PVC,
-ajout d’un fichier index.html dans le volume monté,
-test avec curl localhost,
-validation du fonctionnement du stockage persistant géré par Kubernetes.

5. État d’avancement

-Minikube installé et démarré correctement,
-déploiement avec emptyDir fonctionnel,
-déploiement avec hostPath fonctionnel,
-création et utilisation d’un PersistentVolume réussies,
-compréhension des différences entre stockage temporaire et persistant,
-tests réalisés avec nginx et fichier index.html,
-comportement de chaque type de volume vérifié.

Le lab est entièrement terminé. 