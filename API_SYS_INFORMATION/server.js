console.log("🚀 Démarrage du serveur...");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const db = require("./database");

console.log("✅ Modules chargés !");

const app = express();
const SECRET_KEY = "monSuperSecret"; // Idéalement dans un fichier .env

app.use(cors());
app.use(express.json());

// ✅ Sert les fichiers statiques (HTML, JS, CSS) depuis ton dossier SPA
const path = require("path"); // <-- tu l'as bien fait
const spaPath = path.join(__dirname, "spa-pages"); // <-- à ajouter ici
app.use(express.static(spaPath));

// ✅ Route d'accueil de test
app.get("/", (req, res) => {
  res.send("🎾 API Tennis Reservation est en ligne !");
});

// ✅ Route d'inscription
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

// ✅ Route pour récupérer le nombre de réservations
app.post("/reservation-count", (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    db.get(
      "SELECT COUNT(*) AS count FROM reservations WHERE user_id = ?",
      [userId],
      (err, row) => {
        if (err) return res.status(500).json({ error: "Erreur de base de données" });
        res.json({ count: row.count });
      }
    );
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
});


// ✅ Route de connexion
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err || !user) return res.status(401).json({ error: "Utilisateur inconnu" });
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
    // 🔐 Envoi du token dans la réponse (tu gères le stockage côté client avec JS ensuite)
    res.json({ token });
  });
});

app.get("/reservations-count", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token manquant" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    db.get("SELECT COUNT(*) AS count FROM reservations WHERE user_id = ?", [decoded.id], (err, row) => {
      if (err) return res.status(500).json({ error: "Erreur DB" });
      res.json({ count: row.count });
    });
  } catch {
    return res.status(401).json({ error: "Token invalide" });
  }
});

app.get("/mon-compte", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token manquant" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;
    db.get("SELECT email FROM users WHERE id = ?", [userId], (err, user) => {
      if (err || !user) {
        console.error("❌ Erreur ou utilisateur introuvable :", err);
        return res.status(404).json({ error: "Utilisateur introuvable" });
      }

      db.all("SELECT * FROM reservations WHERE user_id = ?", [userId], (err, reservations) => {
        if (err) {
          console.error("❌ Erreur récupération réservations :", err);
          return res.status(500).json({ error: "Erreur récupération réservations" });
        }


        res.json({
          email: user.email,
          reservations
        });
      });
    });
  } catch (err) {
    console.error("🔒 Erreur JWT :", err);
    return res.status(401).json({ error: "Token invalide" });
  }
});



// Route de réservation (protégée)
// Route de réservation (protégée)
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
  } catch (err) {
    return res.status(401).json({ error: "Token invalide" });
  }
});



// ✅ Écoute sur toutes les IPs pour que ce soit visible en réseau
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
});
