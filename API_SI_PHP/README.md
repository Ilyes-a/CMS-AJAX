# 🎾 API de Réservation de Tennis (PHP + SQLite)

Ce projet est une API REST en **PHP** permettant la gestion des utilisateurs et des réservations de terrains de tennis. Elle utilise **SQLite** pour la base de données et **JWT** pour l'authentification sécurisée.

## 🚀 Installation et Démarrage

### 1️⃣ Prérequis
- **PHP** (≥ 7.4)
- **Composer** (déjà présent pas besoin d'installer)
- **Un serveur local** comme XAMPP ou WAMP


### Lancer l'API  


Tu peux tester l'api avant de mettre dans xampp avec simplement la commande (pour test avec postman):
```
php -S localhost:8000 api.php
```

Une fois que voius avez test et ca marche mettez le dossier dans **htdocs** de xampp et lancez le serv apache.

---

## 🔧 Configuration

### Base de données
L'API utilise **SQLite** (fichier `tennis_reservation.db`).  
Les tables sont créées automatiquement lors de l'exécution.

### Fichiers importants
- `database.php` → Connexion et création des tables SQLite
- `api.php` → Point d'entrée de l'API (gère les requêtes)
- `jwt_utils.php` → Gestion des tokens JWT
- `password_utils.php` → Hashage et vérification des mots de passe
- `composer.json` → Dépendances du projet

---

## 📡 **Utilisation de l'API**

### 🔹 **1. Inscription d'un utilisateur**
- **Méthode** : `POST`
- **URL** : `http://localhost/api.php`
- **Body (JSON)** :
  ```json
  {
    "action": "register",
    "email": "test@example.com",
    "password": "123456"
  }
  ```
- **Réponse** :
  ```json
  { "message": "Compte créé !" }
  ```

### 🔹 **2. Connexion et récupération du token JWT**
- **Méthode** : `POST`
- **URL** : `http://localhost/api.php`
- **Body (JSON)** :
  ```json
  {
    "action": "login",
    "email": "test@example.com",
    "password": "123456"
  }
  ```
- **Réponse** :
  ```json
  { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
  ```

### 🔹 **3. Réservation d'un terrain**
- **Méthode** : `POST`
- **URL** : `http://localhost/api.php`
- **Body (JSON)** :
  ```json
  {
    "action": "reserver",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "terrain_id": 1,
    "date": "2025-04-01"
  }
  ```
- **Réponse** :
  ```json
  { "message": "Réservation confirmée !" }
  ```

---

## 🔗 **Connexion avec WordPress**
Dans WordPress, vous pouvez utiliser **AJAX** pour interagir avec l'API.  
Voici un exemple d'appel avec **jQuery** :

```js
jQuery.ajax({
    url: "http://localhost/api.php",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
        action: "login",
        email: "test@example.com",
        password: "123456"
    }),
    success: function(response) {
        console.log("Token reçu :", response.token);
    },
    error: function(xhr) {
        console.error("Erreur:", xhr.responseText);
    }
});
```

---

## 💡 **Notes**

 On peut modifier `SECRET_KEY` dans `jwt_utils.php` pour une meilleure sécurité et ajouter un .env

