console.log("🚀 Démarrage du serveur...");
const express = require("express");
console.log("✅ Express chargé !");
const cors = require("cors");
console.log("✅ CORS chargé !");
const jwt = require("jsonwebtoken");
console.log("✅ JWT chargé !");
const bcrypt = require("bcryptjs");
console.log("✅ Bcrypt chargé !");
require("dotenv").config();
console.log("✅ Dotenv chargé !");
const db = require("./database");
console.log("✅ Base de données chargée !");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "monSuperSecret"; // À mettre dans .env plus tard

// Route d'accueil
app.get("/", (req, res) => {
  res.send("🎾 API Tennis Reservation est en ligne !");
});

// Route d'inscription
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err) => {
      if (err) return res.status(400).json({ error: "Utilisateur déjà existant" });
      res.json({ message: "Compte créé !" });
    }
  );
});

// Route de connexion
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(401).json({ error: "Utilisateur inconnu" });

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  });
});

// Route de réservation
app.post("/reserver", (req, res) => {
  const { token, terrain_id, date } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    db.run(
      "INSERT INTO reservations (user_id, terrain_id, date) VALUES (?, ?, ?)",
      [userId, terrain_id, date],
      (err) => {
        if (err) return res.status(500).json({ error: "Erreur de réservation" });
        res.json({ message: "Réservation confirmée !" });
      }
    );
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Serveur API lancé sur http://localhost:${PORT}`));
// Fin du fichier server.js

