<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require "database.php"; // Connexion à SQLite
require "jwt_utils.php"; // Gestion des tokens JWT
require "password_utils.php"; // Gestion du hashage des mots de passe

$request_method = $_SERVER["REQUEST_METHOD"];

if ($request_method == "OPTIONS") {
    http_response_code(200);
    exit();
}

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["action"])) {
    echo json_encode(["error" => "Action non spécifiée"]);
    exit();
}

$action = $data["action"];

switch ($action) {
    case "register":
        register($data);
        break;
    case "login":
        login($data);
        break;
    case "reserver":
        reserver($data);
        break;
    default:
        echo json_encode(["error" => "Action inconnue"]);
}

function register($data) {
    global $db;
    if (!isset($data["email"]) || !isset($data["password"])) {
        echo json_encode(["error" => "Email et mot de passe requis"]);
        exit();
    }

    $email = $data["email"];
    $password = hashPassword($data["password"]);

    try {
        $stmt = $db->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        $stmt->execute([$email, $password]);
        echo json_encode(["message" => "Compte créé !"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Utilisateur déjà existant"]);
    }
}

function login($data) {
    global $db;
    if (!isset($data["email"]) || !isset($data["password"])) {
        echo json_encode(["error" => "Email et mot de passe requis"]);
        exit();
    }

    $email = $data["email"];
    $password = $data["password"];

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !verifyPassword($password, $user["password"])) {
        echo json_encode(["error" => "Identifiants incorrects"]);
        exit();
    }

    $token = generateJWT(["id" => $user["id"]]);
    echo json_encode(["token" => $token]);
}

function reserver($data) {
    global $db;
    if (!isset($data["token"]) || !isset($data["terrain_id"]) || !isset($data["date"])) {
        echo json_encode(["error" => "Token, terrain_id et date requis"]);
        exit();
    }

    $decoded = verifyJWT($data["token"]);
    if (!$decoded) {
        echo json_encode(["error" => "Token invalide"]);
        exit();
    }

    $user_id = $decoded["id"];
    $terrain_id = $data["terrain_id"];
    $date = $data["date"];

    try {
        $stmt = $db->prepare("INSERT INTO reservations (user_id, terrain_id, date) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $terrain_id, $date]);
        echo json_encode(["message" => "Réservation confirmée !"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Erreur lors de la réservation"]);
    }
}
?>
