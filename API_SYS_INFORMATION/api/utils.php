<?php
require_once __DIR__ . '/../vendor/autoload.php'; // <- charge la lib JWT
require_once 'db.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

const SECRET_KEY = 'monSuperSecret';

function check_jwt() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Token manquant']);
        exit;
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);

    try {
        return JWT::decode($token, new Key(SECRET_KEY, 'HS256'));
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['error' => 'Token invalide']);
        exit;
    }
}
