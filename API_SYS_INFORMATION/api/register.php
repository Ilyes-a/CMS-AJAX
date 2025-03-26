<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $db->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->execute([$email, $hashedPassword]);
    echo json_encode(["message" => "Compte créé !"]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["error" => "Email déjà utilisé"]);
}
?>
