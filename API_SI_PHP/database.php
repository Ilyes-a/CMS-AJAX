<?php
// Connexion à la base de données SQLite
try {
    $db = new PDO("sqlite:tennis_reservation.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données: " . $e->getMessage());
}

// Création des tables si elles n'existent pas
$db->exec("CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)");

$db->exec("CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    terrain_id INTEGER,
    date TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id)
)");

?>
