const sqlite3 = require("sqlite3").verbose();
console.log("📡 Tentative de connexion à SQLite...");

// Création ou ouverture de la BDD SQLite
const db = new sqlite3.Database("./tennis_reservation.db", (err) => {
  if (err) {
    console.error("Erreur lors de la connexion à la BDD :", err);
  } else {
    console.log("Base de données SQLite connectée !");
  }
});

// Création des tables si elles n'existent pas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    terrain_id INTEGER,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

module.exports = db;
