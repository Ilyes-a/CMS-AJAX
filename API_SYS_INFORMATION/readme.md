
# 🎾 API de Réservation de Tennis  

## 📌 Description  
Cette API permet de gérer un système de réservation de terrains de tennis avec **authentification JWT** et **base de données SQLite**.  
Les fonctionnalités incluent l'inscription, la connexion, et la gestion des réservations pour les utilisateurs.

---

## 🚀 Installation  

### 1️⃣ **Cloner le projet**  
```bash
git clone 
cd tennis-reservation
```

### 2️⃣ **Installer les dépendances**  
```bash
npm install
```

### 3️⃣ **Lancer le serveur**  
```bash
node server.js
```

Ou en mode développement (avec auto-restart) :
```bash
nodemon server.js
```

---

## 🧑‍💻 Utilisation des Routes de l'API

### 1. Route d'inscription : `/register`  
Envoie une requête POST pour créer un utilisateur (inscription).  
**Corps de la requête (JSON)** :  

```json
{
  "email": "utilisateur@email.com",
  "password": "motdepasse"
}
```

**Réponse** :  
```json
{
  "message": "Compte créé !"
}
```

---

### 2. Route de connexion : `/login`  
Envoie une requête POST avec les informations de l'utilisateur pour obtenir un token JWT.  
**Corps de la requête (JSON)** :  

```json
{
  "email": "utilisateur@email.com",
  "password": "motdepasse"
}
```

**Réponse** :  
```json
{
  "token": "tonTokenJWTici"
}
```

---

### 3. Route de réservation : `/reserver`  
Envoie une requête POST avec un token valide pour effectuer une réservation.  
**Corps de la requête (JSON)** :  

```json
{
  "token": "tonTokenJWTici",
  "terrain_id": 1,
  "date": "2024-03-19"
}
```

**Réponse** :  
```json
{
  "message": "Réservation confirmée !"
}
```

---

### 4. Route de test : `/`  
Vérifie si l'API est en ligne.  
**Réponse** :  

```json
{
  "message": "Serveur OK !"
}
```

---

## 🛠️ Technologies utilisées

- Node.js (backend)  
- Express.js (framework web)  
- SQLite (base de données)  
- JWT (JSON Web Token) (authentification)  
- Bcryptjs (hachage des mots de passe)  
- CORS (gestion des accès cross-origin)  
- Nodemon (outil de développement)

---

## ⚙️ Variables d'environnement  
Dans le fichier `.env` à la racine du projet, vous pouvez définir des variables telles que :

- `SECRET_KEY` : Clé secrète pour signer les tokens JWT (à modifier pour la sécurité).
