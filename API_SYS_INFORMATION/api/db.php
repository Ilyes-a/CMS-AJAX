<?php
// PAS de header CORS ici !

try {
    $db = new PDO('sqlite:' . __DIR__ . '/../tennis_reservation.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur connexion DB']);
    exit;
}
?>
