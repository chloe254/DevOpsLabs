# Lab 4 — Infrastructure as Code (IaC) avec Vagrant & Ansible

## Objectif du Lab

Ce lab a pour objectif d’apprendre les principes de l’Infrastructure as Code (IaC) à travers :

- **Partie 1 : Approche impérative** (Vagrant + Shell Provisioner)
- **Partie 2 : Approche déclarative** (GitLab avec Vagrant + Ansible)
- **Partie 3 : Health Checks GitLab**
- Bonus

---


### Installation des outils

- VirtualBox
- Vagrant

### Désactiver Hyper-V (Windows)

Dans PowerShell (admin) :

```powershell
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

---

#  Avant de commencer

Ajouter la box CentOS 7 :

```bash
vagrant box add centos/7
```

Choisir :

```
3) virtualbox
```

---

# PARTIE 1 — Approche Impérative (Vagrant + Shell)

## 1. Préparation

Se placer dans :

```bash
cd lab/part-1
```

![Bon dossier](images/bon_endroit2.jpeg)
![ls](images/ls_6.jpeg) 

---

## 2. Création de la VM

```bash
vagrant up
```

![vagrant up](images/vagrant_up3.jpeg)

Vérification dans VirtualBox :

![VM running](images/running_virtual4.jpeg)

---

## 3. Commandes utiles

```bash
vagrant status
vagrant halt
vagrant destroy
```

![Test commandes](images/vagrant_test5.jpeg)

---

## 4. Connexion SSH

```bash
vagrant ssh
```

Commandes Linux :

```bash
ls
pwd
```

 
![ssh](images/vagrant_ssh7.jpeg)  

![vm](images/vm8.jpeg)

---

## 5. Shell Provisioner — Modifier /etc/hosts

Dans le `Vagrantfile` :

```ruby
config.vm.provision "shell",
  inline: "echo '127.0.0.1  mydomain-1.local' >> /etc/hosts"
```

Puis :

```bash
vagrant provision
```

![Vagrantfile](images/vagrant_file9.jpeg)  
![Provision](images/vagrant_provision11.jpeg)

Vérification :

```bash
vagrant ssh
cat /etc/hosts
```

![cat hosts](images/cat_16.jpeg)

---

## 6. Shell Provisioner — Écrire la date

```ruby
$script = <<-SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

config.vm.provision "shell", inline: $script
```

Puis :

```bash
vagrant provision
```

![Script](images/script_config14.jpeg)  
![Provision 2](images/vag_provision15.jpeg)

---

## 7. Gestion d’erreurs

![Erreur vagrant](images/vagrant_fail12.jpeg)

---

# PARTIE 2 — Approche Déclarative (GitLab + Ansible)

## Principe

Utilisation de `ansible_local` :

- Ansible est installé dans la VM
- Configuration décrite dans des playbooks YAML
- Infrastructure reproductible

---

## 1. Préparation

```bash
cd lab/part-2
```

![part2](images/part17.jpeg)  
![run.yml](images/run_yml18.jpeg)

---

## 2. Lancement GitLab

```bash
vagrant up
```

Cette étape installe :

- curl
- SSH
- Firewall
- IPv6
- Postfix
- GitLab CE
- Base de données

---

## 3. Test navigateur

Ouvrir :

```
http://localhost:8080
```

Si la page GitLab apparaît :

![GitLab page](images/gitlab21.jpeg)

---

## 4. Mot de passe root

Dans la VM :

```bash
vagrant ssh
sudo cat /etc/gitlab/initial_root_password
```

![password](images/password.jpeg)

---

## 5. Mise à jour des playbooks

```bash
vagrant upload playbooks /vagrant/playbooks gitlab_server
vagrant provision
```

---

# PARTIE 3 — Health Checks GitLab

## 1. Test simple

```bash
vagrant ssh
curl http://127.0.0.1:8080/-/health
```

Résultat attendu :

```
GitLab OK
```

---

## 2. Lancer les healthchecks via Ansible

Lister les tags :

```bash
ansible-playbook /vagrant/playbooks/run.yml \
  --list-tags \
  -i /tmp/vagrant-ansible/inventory/vagrant_ansible_local_inventory
```

Lancer un tag :

```bash
ansible-playbook /vagrant/playbooks/run.yml \
  --tags healthcheck \
  -i /tmp/vagrant-ansible/inventory/vagrant_ansible_local_inventory
```

Même chose pour :

- readiness
- liveness

---

## Vérification finale

```bash
vagrant status
```

![status](images/vagrant_status19.jpeg)

![VirtualBox](images/VM_20.jpeg)

---

# Conclusion

Ce lab montre la différence entre :

## Approche Impérative
- Commandes exécutées directement
- Moins reproductible

## Approche Déclarative
- État final décrit
- Automatisation complète
- Infrastructure reproductible
- Meilleure maintenabilité

L’association de **Vagrant + Ansible** permet de créer une infrastructure fiable, portable et automatisée.

---
