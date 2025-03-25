<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require "vendor/autoload.php";

define("SECRET_KEY", "monSuperSecret");

function generateJWT($payload) {
    return JWT::encode($payload, SECRET_KEY, "HS256");
}

function verifyJWT($token) {
    try {
        return (array) JWT::decode($token, new Key(SECRET_KEY, "HS256"));
    } catch (Exception $e) {
        return false;
    }
}
?>
