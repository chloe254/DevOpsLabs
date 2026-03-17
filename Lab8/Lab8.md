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


![Shell in pod](images/shell_pod.png)--
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
![curl result](images/curl_inside.png)
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

Réponse :
(à compléter)

4.2 Refresh Behaviour
 Question

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
Observation dans le navigateur :

Si tu rafraîchis avec CTRL+F5 pendant le déploiement, certaines pages peuvent s’afficher avec l’ancienne version et d’autres avec la nouvelle.

Pourquoi ? → Kubernetes met à jour les pods progressivement (rolling update). Les anciens pods répondent encore jusqu’à ce que les nouveaux soient prêts.
```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```

 Screenshot
![Version v2](images/51.jpeg)
Question

What happened?

 Réponse :
(à compléter)

5.2 Update v3
```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3
```


![Version v3](images/v3.png)
 Question

What is happening?

 Réponse :
(à compléter)

5.3 Rollback
```bash
kubectl rollout undo deployments/kubernetes-bootcamp
```


![Rollback](images/53.jpeg)
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

 Réponse :
(à compléter)

6.2 Apply Service
```bash
kubectl apply -f service.yaml
```


![Service YAML](images/62.jpeg)
 Question

Can you access the service?

 Réponse :
(à compléter)

6.3 Scale to 3 Replicas
```bash
kubectl apply -f deployment.yaml
```
![3 pods](images/63.jpeg)
![3 pods](images/64.jpeg)


 Question

Are you hitting different replicas?

 Réponse :
(à compléter)

 Cleanup
```bash
kubectl delete service kubernetes-bootcamp
kubectl delete deployment kubernetes-bootcamp
minikube stop
```

