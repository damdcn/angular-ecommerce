# Projet Web - HMIN103

Projet Web réalisé sur l'architecture MEAN dans le cadre de l'UE HMIN103 à l'Université de Montpellier.  
Une version du projet est accessible en cliquant sur ce [lien](http://ecommerce.damienduchon.com) (il se peut qu'il y ait encore quelques bugs).

#### Technologies utilisées

* [MongoDB](https://www.mongodb.com/)
* [Express](http://expressjs.com/)
* [Angular](https://angular.io/)
* [Node.js](https://nodejs.org/)


## Prérequis

Pour installer ce projet, vous aurez besoin des 4 technos citées ci-dessus.
* node.js / npm
  ```sh
  sudo apt install nodejs npm
  ```
* mongodb (ubuntu 18.04)
  ```sh
  wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
  ```
  ```sh
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
  ```
   ```sh
   sudo apt-get update
   ```
   ```sh
   sudo apt-get install -y mongodb-org
   ```
   ```sh
   service mongod start
   ```


## Installation

1. Cloner le dépôt
   ```sh
   git clone https://github.com/damdcn/angular-ecommerce.git
   ```
2. Installer les modules node dans chacun des dossiers "serveur" et "pccomp" (serveur et client)
   ```sh
   npm install
   ```
   Si l'installation automatique ne fonctionne pas installer les modules suivants avec npm (npm install <module>)  
  * Serveur :
    * express
    * jsonwebtoken
    * mongodb
  * Client :
    * @angular/cli@lateset

3. Importer la base de donnée (dans `/serveur`) 
   ```sh
   sudo chmod +x creationBase.sh
   ```
   ```sh
   ./creationBase.sh
   ```

4. Lancer le serveur (dans `/serveur`) 
   ```sh
   node serveur.js
   ```
5. Lancer le serveur de développement local Angular  (dans `/pccomp`) 
   ```sh
   ng serve -o
   ```

## Navigation
Une fois que le serveur backend tourne et que le serveur de développement Angular est lancé, il suffit d'accéder au site via `http://localhost:4200`.


