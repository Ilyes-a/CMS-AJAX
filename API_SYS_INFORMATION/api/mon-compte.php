<?php
require_once 'db.php';
require_once 'utils.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
$decoded = check_jwt();
$user_id = $decoded->id;

$stmt = $db->prepare("SELECT email FROM users WHERE id = ?");
$stmt->execute([$user_id]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    http_response_code(404);
    echo json_encode(["error" => "Utilisateur introuvable"]);
    exit;
}

$stmt = $db->prepare("SELECT * FROM reservations WHERE user_id = ?");
$stmt->execute([$user_id]);
$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "email" => $user["email"],
    "reservations" => $reservations
]);
?>
