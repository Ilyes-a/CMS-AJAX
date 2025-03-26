<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'utils.php';
use Firebase\JWT\JWT;

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(["error" => "Identifiants invalides"]);
        exit;
    }

    $payload = ["id" => $user["id"], "iat" => time(), "exp" => time() + 3600];
    $token = JWT::encode($payload, SECRET_KEY, 'HS256');

    echo json_encode(["token" => $token]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur", "details" => $e->getMessage()]);
}
