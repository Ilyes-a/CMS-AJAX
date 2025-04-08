// router.js - Détection dynamique du CMS basé sur l'IP

const ROUTE_PREFIX = (() => {
  const host = window.location.hostname;
  if (host.endsWith("35")) return "/pages";      // WebsiteBaker
  if (host.endsWith("22")) return "/index.php";  // WordPress
  return ""; // fallback si inconnu
})();

const ROUTE_SUFFIX = (() => {
  const host = window.location.hostname;
  if (host.endsWith("35")) return ".php";       // WebsiteBaker
  if (host.endsWith("22")) return "";           // WordPress
  return ""; // fallback
})();

console.log("📦 ROUTE_PREFIX =", ROUTE_PREFIX);
console.log("📦 ROUTE_SUFFIX =", ROUTE_SUFFIX);
