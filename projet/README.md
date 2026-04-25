# Projet DevOps

## Table of Contents
1. [Web Application](#1-web-application)
2. [Automated Tests](#2-automated-tests)
3. [Project Structure](#3-project-structure)
4. [CI/CD Pipeline](#4-cicd-pipeline)
5. [Vagrant](#5-vagrant)
6. [Ansible](#6-ansible)
7. [Docker](#7-docker)
8. [Kubernetes](#8-kubernetes)
9. [Difficulties Encountered](#9-difficulties-encountered)
10. [Authors](#10-authors)

---

## 1. Web Application

### Description

We developed a simple web application using Node.js and the Express framework.
This application allows:
- displaying a CV as an image
- verifying that the application is running correctly through a health check endpoint

---

### Running the Application

To run the application locally:

```bash
cd projet/webapp
node src/server.js
```

> ![image](images/1.jpeg)

Once launched, the server is accessible at:

```
http://localhost:3000
```

### Application Result

When accessing the main page (`/`), the CV is displayed as an image.

Expected result:
- the browser correctly displays the CV

>  ![image](image/2.jpeg)

---

### Health Check Endpoint

The application provides a `/health` endpoint to verify it is working correctly.

URL:

```
http://localhost:3000/health
```

Expected result:

```json
{"status":"OK"}
```

This allows verifying that the server is running correctly.

>  ![image](image/3.jpeg)

---

## 2. Automated Tests

### Description

We set up automated tests to verify that the application is working correctly.
These tests allow:
- verifying that the main page responds correctly (status code 200)
- verifying that the `/health` endpoint returns a valid status

---

### Running the Tests

To run the tests:

```bash
npm test
```

---

### Test Results

Tests should run without errors and display a positive result.

Expected result:

```
PASS test/app.test.js
```

>  ![image](image/4.jpeg)

---

## 3. Project Structure

The project is organized as follows:

```
projet/
  webapp/
    public/
      CV.jpg
    src/
      app.js
      server.js
    test/
      app.test.js
```

Description of folders:
- `public/` : contains static files (CV image)
- `src/` : contains the application source code
- `test/` : contains automated tests

>  ![image](image/5.jpeg)

---

## 4. CI/CD Pipeline

### Description

We set up a CI/CD pipeline using GitHub Actions.
This pipeline allows:
- automatically verifying that tests pass on every push
- ensuring that the code on the `main` branch is always functional

### Trigger

The pipeline is triggered automatically on every push or pull request on the `main` branch.

### Pipeline Steps

1. Checkout of the source code
2. Installation of Node.js 20
3. Installation of dependencies (`npm install`)
4. Running tests (`npm test`)

### Configuration File

The pipeline is defined in `.github/workflows/main.yml`.

### Expected Result

The pipeline should run without errors and display a green status.

> **photo_ci_cd**

---

## 5. Vagrant

### Description

We created a Linux virtual machine using Vagrant with VirtualBox.
This VM allows reproducing an identical deployment environment for all project members.

### Configuration

- Box: `ubuntu/focal64`
- Memory: 1024 MB
- Port forwarding: 3000 (guest) → 3000 (host)
- Synced folder: `webapp/` mounted at `/home/vagrant/webapp`

### Launch

To start the VM:

```bash
cd projet/iac
vagrant up
```

### Verification

To verify that the VM is running:

```bash
vagrant status
```

### Expected Result

The VM starts correctly and the webapp folder is accessible from the VM.

> **photo_vagrant_up**

---

## 6. Ansible

### Description

We used Ansible to automatically provision the VM.
Provisioning is done via `ansible_local`, meaning Ansible installs and runs directly from the VM, without requiring installation on the host machine.

### Tasks Executed

1. Update apt cache
2. Install Node.js and npm
3. Install application dependencies (`npm install`)
4. Launch the application

### Configuration File

The playbook is defined in `iac/playbooks/playbook.yml`.

### Expected Result

Once provisioning is complete, the application is accessible from the VM:

```bash
curl http://localhost:3000
curl http://localhost:3000/health
```

Expected results:
- `/` : displays the CV HTML
- `/health` : returns `{"status":"ok"}`

> **photo_ansible**

---

## 7. Docker

### Description

We containerized the application using Docker to ensure it runs consistently across any environment.

### Dockerfile

The `Dockerfile` is located at `webapp/Dockerfile`.

### Build the Image

```bash
cd projet/webapp
docker build -t myapp .
```

> **photo_docker_build**

### Run the Container

```bash
docker run -p 3000:3000 myapp
```

The application is then accessible at:

```
http://localhost:3000
```

> **photo_docker_run**

### Docker Hub

The image is publicly available on Docker Hub:

```
https://hub.docker.com/r/TON_USERNAME/myapp
```

To pull and run the image directly:

```bash
docker pull TON_USERNAME/myapp:latest
docker run -p 3000:3000 TON_USERNAME/myapp:latest
```

> **photo_dockerhub**

---

## 8. Kubernetes

### Description

We deployed the application on a local Kubernetes cluster using Minikube.

### Prerequisites

- [Minikube](https://minikube.sigs.k8s.io/docs/start/) installed
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- Docker Desktop running

### Start Minikube

```bash
minikube start --driver=docker
```

### Manifest Files

The Kubernetes manifests are located in the `k8s/` folder:
- `k8s/deployment.yaml` : defines the application deployment (2 replicas)
- `k8s/service.yaml` : exposes the application via a NodePort

### Deploy the Application

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### Verify the Deployment

```bash
kubectl get pods
kubectl get services
```

Expected result — pods:

```
NAME                                READY   STATUS    RESTARTS   AGE
myapp-deployment-XXXXXXXXX-XXXXX    1/1     Running   0          Xs
myapp-deployment-XXXXXXXXX-XXXXX    1/1     Running   0          Xs
```

Expected result — services:

```
NAME             TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
myapp-service    NodePort   10.X.X.X       <none>        3000:30000/TCP   Xs
```

> **photo_kubectl_pods**

> **photo_kubectl_services**

### Access the Application

```bash
minikube service myapp-service
```

This command opens the application automatically in your browser.

> **photo_app_k8s**

---

## 9. Difficulties Encountered

### CI/CD — GitHub Actions

During the CI/CD pipeline setup, we encountered several issues.

The first problem was related to an old `node.js.yml` workflow file linked to a previous lab, which pointed to a non-existent folder. This file was triggering a failing pipeline on every push. The solution was to delete this file and keep only our `main.yml` pipeline.

The second problem was related to the location of `main.yml`. We had placed it in `projet/.github/workflows/` whereas GitHub Actions only recognizes workflows if they are located at the root of the repository in `/.github/workflows/`. Once the file was moved to the correct location, the pipeline ran correctly.

The third problem concerned the `working-directory` path in the workflow file. We had to specify `projet/webapp` instead of simply `webapp` because the source code is located in a subfolder of the repository.

### Vagrant

The main difficulty encountered with Vagrant was an accidental interruption of the VM startup process with `Ctrl+C`. This created a lock that prevented any new launch with the message `another process is already executing an action`. The solution was to wait for the process to finish naturally before relaunching `vagrant up`.

We also noted a warning related to a version incompatibility between VirtualBox Guest Additions (6.1.50) and VirtualBox itself (7.2). This did not prevent the project from working correctly.

### Ansible

Automatic provisioning via Ansible did not install Node.js dependencies correctly on the first launch. The Ansible `npm` module did not work as expected, preventing the application from starting with the error `Cannot find module 'express'`. The solution was to replace the `npm` module with a direct `npm install` command via Ansible's `command` module, which resolved the issue.

### Docker

Docker Desktop occasionally failed to start automatically on Windows. The solution was to run Docker Desktop as administrator and ensure WSL2 was up to date via `wsl --update`.

### Kubernetes

The `minikube` and `kubectl` commands were not recognized in the VS Code integrated terminal after installation. This was caused by the PATH environment variable not being reloaded. The solution was to fully restart VS Code so that the terminal picked up the updated PATH.

---

## 10. Authors

- **Clara** — Web application, tests
- **Édouard** — CI/CD pipeline, Vagrant, Ansible
- **Chloé** — Docker, Kubernetes, README finalization

---

*ECE Paris — DevOps Project — 2024/2025*
