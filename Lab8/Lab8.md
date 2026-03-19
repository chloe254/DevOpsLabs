 Lab – Container Orchestration with Kubernetes


Nom : 

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

2.1 Create Deployment


Créer un deployment contenant un pod avec une application Node.js.

```bash
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

![Deployment created](images/demarrageMinikibe.jpeg)
Utilisation des commandes de base : 

![Commandes ](images/appUseCommandesBase.jpeg)
2.2 List Pods
Explication
Vérifier que le pod est bien lancé.

```bash
kubectl get pods

```
![Pods running](images/verif.jpeg)
2.3 Logs
 Explication

Afficher les logs du pod.

```bash
kubectl logs $POD_NAME
```


![Pod logs](images/affLogPods.jpeg) 
2.4 Execute Command in Pod
Explication

Voir les informations système du conteneur.

```bash
kubectl exec $POD_NAME -- cat /etc/os-release
```

![OS info](images/openJS.jpeg)--
2.5 Open Shell
 Explication

Accéder au shell du conteneur.

```bash
kubectl exec -ti $POD_NAME -- bash
```

2.6 Find server.js
 Explication

Trouver le fichier server.js pour connaître le port utilisé.


```bash
ls
find / -name "server.js" 2>/dev/null
```

![server.js](images/deploiAvecNodeJs.jpeg)
2.7 Test App Inside Pod
 Explication

Tester l’application avec curl.

```bash
curl localhost:<PORT>

```

 Question

Are you able to query the web app outside of the pod?

 Réponse :
(à compléter)

3️- Expose Kubernetes Service
 Objectif

Rendre l’application accessible depuis l’extérieur.

3.1 Expose Deployment
```bash
kubectl expose deployment kubernetes-bootcamp --type="NodePort" --port=8080

```
![Services](images/exit31.jpeg)
3.2 Get Services
```bash
kubectl get services

```

![Services](images/32.jpeg)
3.3 Get Minikube IP
```bash
minikube ip

```
![Services](images/32(2).jpeg)
3.4 Access Application
 Explication

Accéder via navigateur :

http://<MINIKUBE_IP>:<NODE_PORT>
![Web app](images/34.jpeg)

4️- Scale Deployment
 Objectif

Gérer le nombre de pods.

4.1 Scale Up
```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=5

```
![5 pods](images/41-verifpodetat.jpeg)
 Question

Which command did you use?

Cette commande dit à Kubernetes : “Je veux 5 pods pour ce déploiement”. kubectl get pods est celle qui permet de vérifier le nombre de pods et leur état.

4.2 Refresh Behaviour

What is happening? Why?

 Réponse :
(à compléter)

4.3 Scale Down
```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=2

```

![2 pods](images/43.jpeg)
![2 pods](images/44red.jpeg)
5️-  Update and Rollback
 Objectif

Mettre à jour l’application et comprendre le rollback.

5.1 Update v2

```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```

 Screenshot
![Version v2](images/51.jpeg)
Question

What happened?
Observation dans le navigateur :

Si tu rafraîchis avec CTRL+F5 pendant le déploiement, certaines pages peuvent s’afficher avec l’ancienne version et d’autres avec la nouvelle.

Pourquoi ? → Kubernetes met à jour les pods progressivement (rolling update). Les anciens pods répondent encore jusqu’à ce que les nouveaux soient prêts.

5.2 Update v3
```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3
kubectl get pods
```


 List all of the running pods, what is happening here?
 The new pods are failing to start.
We can see errors such as ErrImagePull and ImagePullBackOff.

This means Kubernetes is unable to download the Docker image (invalid or unavailable image).

5.3 Rollback
```bash
kubectl rollout undo deployments/kubernetes-bootcamp
```


![Rollback](images/53.jpeg)
```bash
kubectl rollout status deployment/kubernetes-bootcamp
kubectl get pods
```
Roll back the service to the image we first chose in part 2 of the lab.
The rollback restores the previous working version of the application (v2).
All pods return to a stable Running state and the application becomes accessible again.

![Rollback](images/54V3.jpeg)
![Rollback](images/55.jpeg)
![Rollback](images/56.jpeg)
![Rollback](images/57.jpeg)


6️- Deployment with YAML
 Objectif

Déployer avec des fichiers YAML.

6.1 Apply Deployment
```bash
kubectl apply -f deployment.yaml
```


![Pods YAML](images/61.jpeg)
 Question

Are the pods running?

 Oui avec succès

6.2 Apply Service
```bash
kubectl apply -f service.yaml
```


![Service YAML](images/62.jpeg)
 Question

Can you access the service?

Yes, the service is accessible through the browser using the Minikube URL.

6.3 Scale to 3 Replicas
```bash
kubectl apply -f service.yaml
kubectl get services
minikube service kubernetes-bootcamp
```
![3 pods](images/63.jpeg)
![3 pods](images/64.jpeg)
![3 pods](images/65.jpeg)
![3 pods](images/66.jpeg)
![3 pods](images/67.jpeg)

 Question

Are you hitting different replicas?

 Yes. By refreshing the browser multiple times, the hostname changes.
This shows that requests are being distributed across different replicas (load balancing).


 Cleanup
```bash
kubectl delete service kubernetes-bootcamp
kubectl delete deployment kubernetes-bootcamp
minikube stop
```

