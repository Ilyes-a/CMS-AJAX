<?php
// Redirection dynamique selon CMS
$uri = $_SERVER['REQUEST_URI'] ?? '';
$cms_host = $_SERVER['HTTP_REFERER'] ?? '';

// Table de routage universelle
$routes = [
    'login' => [
        'wordpress' => '/index.php/login/',
        'websitebaker' => '/pages/login'
    ],
    'register' => [
        'wordpress' => '/index.php/register/',
        'websitebaker' => '/pages/register'
    ],
    'mon-compte' => [
        'wordpress' => '/index.php/mon-compte/',
        'websitebaker' => '/pages/mon-compte'
    ],
    'reserver' => [
        'wordpress' => '/index.php/reserver/',
        'websitebaker' => '/pages/reserver'
    ]
];

// Détection CMS (très simple à adapter)
function detect_cms($referer) {
    if (strpos($referer, 'wp-') !== false || strpos($referer, '/index.php') !== false) {
        return 'wordpress';
    } elseif (strpos($referer, '/pages/') !== false || strpos($referer, 'websitebaker') !== false) {
        return 'websitebaker';
    } else {
        return 'wordpress'; // fallback par défaut
    }
}

$cms = detect_cms($cms_host);

// Récupérer la route demandée (ex: /index.php/login -> login)
$route = basename($uri);

// Vérifier si la route est connue
if (isset($routes[$route][$cms])) {
    $redirect_url = $routes[$route][$cms];
    header("Location: $redirect_url");
    exit;
}

// Sinon, erreur
http_response_code(404);
echo "Route inconnue.";
?>
