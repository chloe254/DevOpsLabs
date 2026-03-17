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

![Deployment created](images/deployment_created.png)
2.2 List Pods
Explication
Vérifier que le pod est bien lancé.

```bash
kubectl get pods

```
![Pods running](images/pods_running.png)
2.3 Logs
 Explication

Afficher les logs du pod.

```bash
kubectl logs $POD_NAME
```


![Pod logs](images/pod_logs.png)
2.4 Execute Command in Pod
Explication

Voir les informations système du conteneur.

```bash
kubectl exec $POD_NAME -- cat /etc/os-release
```

![OS info](images/os_info.png)
2.5 Open Shell
 Explication

Accéder au shell du conteneur.

```bash
kubectl exec -ti $POD_NAME -- bash
```


![Shell in pod](images/shell_pod.png)
2.6 Find server.js
 Explication

Trouver le fichier server.js pour connaître le port utilisé.


```bash
ls
find / -name "server.js" 2>/dev/null
```

![server.js](images/server_js.png)
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
3.2 Get Services
```bash
kubectl get services

```

![Services](images/services.png)
3.3 Get Minikube IP
```bash
minikube ip

```
![Minikube IP](images/minikube_ip.png)
3.4 Access Application
 Explication

Accéder via navigateur :

http://<MINIKUBE_IP>:<NODE_PORT>
![Web app](images/web_app.png)

4️- Scale Deployment
 Objectif

Gérer le nombre de pods.

4.1 Scale Up
```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=5

```
![5 pods](images/scale_5.png)
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
📸 Screenshot
![2 pods](images/scale_2.png)

5️-  Update and Rollback
 Objectif

Mettre à jour l’application et comprendre le rollback.

5.1 Update v2
```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```

 Screenshot
![Version v2](images/v2.png)
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


![Rollback](images/rollback.png)
6️- Deployment with YAML
 Objectif

Déployer avec des fichiers YAML.

6.1 Apply Deployment
```bash
kubectl apply -f deployment.yaml
```


![Pods YAML](images/pods_yaml.png)
 Question

Are the pods running?

 Réponse :
(à compléter)

6.2 Apply Service
```bash
kubectl apply -f service.yaml
```


![Service YAML](images/service_yaml.png)
 Question

Can you access the service?

 Réponse :
(à compléter)

6.3 Scale to 3 Replicas
```bash
kubectl apply -f deployment.yaml
```
![3 pods](images/scale_3.png)
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

