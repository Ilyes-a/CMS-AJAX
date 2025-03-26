<?php
// Gestion requête OPTIONS pour CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';
require_once 'utils.php';

header("Content-Type: application/json");

// Vérification du token JWT
$decoded = check_jwt();
$user_id = $decoded->id;

// Récupération des données POST
$data = json_decode(file_get_contents("php://input"), true);
$terrain_id = $data['terrain_id'] ?? null;
$date = $data['date'] ?? null;

if (!$terrain_id || !$date) {
    http_response_code(400);
    echo json_encode(["error" => "Champ manquant"]);
    exit;
}

try {
    // Vérifier si une réservation existe déjà
    $stmt = $db->prepare("SELECT * FROM reservations WHERE user_id = ? AND terrain_id = ? AND date = ?");
    $stmt->execute([$user_id, $terrain_id, $date]);

    if ($stmt->fetch()) {
        http_response_code(400);
        echo json_encode(["error" => "Déjà réservé ce terrain ce jour-là"]);
        exit;
    }

    // Insertion de la réservation
    $stmt = $db->prepare("INSERT INTO reservations (user_id, terrain_id, date) VALUES (?, ?, ?)");
    $stmt->execute([$user_id, $terrain_id, $date]);

    echo json_encode(["message" => "Réservation confirmée !"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur lors de la réservation",
        "details" => $e->getMessage() // Pour déboguer proprement
    ]);
}
?>

