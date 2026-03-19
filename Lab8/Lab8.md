 Lab – Container Orchestration with Kubernetes


Nom : Clara Chalayer 
Edouard Menut
Chloe Lestic 

1️- Install Minikube
 Objectif

Installer et lancer un cluster Kubernetes local.
```bash
minikube start
minikube status
```


![Minikube status](images/telechargementMinikube.jpeg)



2️- Learn to use kubectl commands
 Objectif

Créer et manipuler un pod Kubernetes.

2.2 Create Deployment


Créer un deployment contenant un pod avec une application Node.js.

```bash
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

![Deployment created](images/demarrageMinikibe.jpeg)
Utilisation des commandes de base : 

![Commandes ](images/appUseCommandesBase.jpeg)

2.3 List Pods
Explication
Vérifier que le pod est bien lancé.

```bash
kubectl get pods

```
![Pods running](images/verif.jpeg)

2.4 Logs
 Explication

Afficher les logs du pod.

```bash
kubectl logs $POD_NAME
```


![Pod logs](images/affLogPods.jpeg) 

2.5 Execute Command in Pod
Explication

Voir les informations système du conteneur.

```bash
kubectl exec $POD_NAME -- cat /etc/os-release
```

![OS info](images/openJS.jpeg)--
2.6 Open Shell
 Explication

Accéder au shell du conteneur.

```bash
kubectl exec -ti $POD_NAME -- bash
```

2.7 Find server.js
 

Trouver le fichier server.js pour connaître le port utilisé.


```bash
ls
find / -name "server.js" 2>/dev/null
```

![server.js](images/deploiAvecNodeJs.jpeg)

2.8 Test App Inside Pod

Tester l’application avec curl.

```bash
curl localhost:<PORT>

```
![localhost](images/deploiAvecNodeJs.jpeg)

 2.9 Are you able to query the web app outside of the pod?

Oui il est possible d'interroger l'application web depuis l'exterieur du pod, a condition qu'elle soit correctement exposée. 

3️- Expose Kubernetes Service
 

Rendre l’application accessible depuis l’extérieur.

3.1 Expose Deployment

```bash
kubectl expose deployment kubernetes-bootcamp --type="NodePort" --port=8080

```
![expose deployment](images/exit31.jpeg)

3.2 Get Services

```bash
kubectl get services

```

![Services](images/32.jpeg)

3.3 Get Minikube IP
```bash
minikube ip

```
![minikube IP](images/32(2).jpeg)

3.4 Access Application
 

Accéder via navigateur :

http://<MINIKUBE_IP>:<NODE_PORT>
![Web app](images/34.jpeg)

4️- Scale Deployment

Gérer le nombre de pods.

4.1 Scale Up
```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=5

```
![scale up](images/41.jpeg)


4.2 Which command did you use?

Cette commande dit à Kubernetes : “Je veux 5 pods pour ce déploiement”. kubectl get pods est celle qui permet de vérifier le nombre de pods et leur état.

![4.2](images/41-verifpodetat.jpeg)

4.3 What is happening? Why?

Quand on rafraîchit la page plusieurs fois, la réponse change. L’application est maintenant exécutée sur plusieurs pods (5 pods après le scale up). À chaque rafraîchissement, la requête est envoyée vers un pod différent.

Cela se produit parce que le Service Kubernetes utilise un load balancing : il répartit automatiquement les requêtes entre tous les pods du déploiement. 


```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=2

```

![scaledeploy](images/43.jpeg)

4.4 Scale Down

![red points](images/44red.jpeg)

5️-  Update and Rollback
 

Mettre à jour l’application et comprendre le rollback.

5.1/2 Update v2

```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```

![Version v2](images/51.jpeg)


5.3 What happened?


Si on rafraîchis avec CTRL+F5 pendant le déploiement, certaines pages peuvent s’afficher avec l’ancienne version et d’autres avec la nouvelle.

Car Kubernetes met à jour les pods progressivement (rolling update). Les anciens pods répondent encore jusqu’à ce que les nouveaux soient prêts.

![rolling update](images/53.jpeg)

5.4 Update v3
```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3
kubectl get pods
```
![version v3](images/54V3.jpeg)


 5.5 List all of the running pods, what is happening here?

Les nouveaux pods n’arrivent pas à démarrer.
On peut voir des erreurs comme ErrImagePull et ImagePullBackOff.
Cela signifie que Kubernetes n’arrive pas à télécharger l’image Docker (image invalide ou indisponible).

![55](images/55.jpeg)

5.6 Rollout 
```bash
kubectl rollout undo deployments/kubernetes-bootcamp
```
![Rollout](images/56.jpeg)

5.7 Rollback 

```bash
kubectl rollout status deployment/kubernetes-bootcamp
kubectl get pods
```
Roll back the service to the image we first chose in part 2 of the lab.

Le rollback restaure la version précédente fonctionnelle de l’application (v2).
Tous les pods reviennent à un état stable Running et l’application redevient accessible.


![Rollback](images/57.jpeg)


6️- Deployment with YAML

Déployer avec des fichiers YAML.

6.1 Apply Deployment
```bash
kubectl apply -f deployment.yaml
```

![Pods YAML](images/61.jpeg)

Are the pods running?

 Oui avec succès

6.2 Apply Service
```bash
kubectl apply -f service.yaml
```

![Service YAML](images/62.jpeg)

6.3 Scale to 3 Replicas
```bash
kubectl apply -f service.yaml

```
![service yaml ](images/63.jpeg)
6.4 
![3 pods](images/64.jpeg)

6.5 Can you access the service?

Oui, le service est accessible via le navigateur en utilisant l’URL fournie par Minikube.


![65](images/65.jpeg)

6.6 Modification du code service 

![66](images/662.jpeg)

6.7

![67](images/67.jpeg)





Are you hitting different replicas?

Oui. En rafraîchissant le navigateur plusieurs fois, le nom d’hôte change.
Cela montre que les requêtes sont réparties entre différentes réplicas (répartition de charge).


 Cleanup

```bash
kubectl delete service kubernetes-bootcamp
```

![stop](images/clean3.jpeg)

```bash
kubectl delete deployment kubernetes-bootcamp
```

![stop](images/clean2.jpeg)

```bash

minikube stop
```

![stop](images/clean1.jpeg)
