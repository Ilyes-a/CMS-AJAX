console.log("📥 Chargement login.js");

(async () => {
  // Charge router.js si ROUTE_PREFIX n'existe pas encore
  // Charger router.js si l’un des deux est manquant
if (typeof ROUTE_PREFIX === "undefined" || typeof ROUTE_SUFFIX === "undefined") {
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "http://192.168.1.77/router.js";
    script.onload = resolve;
    script.onerror = () => reject("❌ Échec chargement router.js");
    document.head.appendChild(script);
  });
}

  console.log("📦 ROUTE_PREFIX détecté :", ROUTE_PREFIX);

  // 🔐 Redirige directement si déjà connecté
  const token = localStorage.getItem("jwt");
  if (token) {
    console.log("🔁 Redirection automatique (déjà connecté)");
    window.location.href = `${ROUTE_PREFIX}/mon-compte${ROUTE_SUFFIX}`;
    return;
  }

  // ... reste du code (submit listener)
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://192.168.1.77/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("jwt", data.token);
        alert("✅ Connecté !");
        window.location.href = `${ROUTE_PREFIX}/mon-compte${ROUTE_SUFFIX}`;
      } else {
        console.error("❌ Erreur serveur :", data);
        alert("Erreur : " + (data.error || "Inconnue"));
      }

    } catch (err) {
      console.error("❌ Erreur JS :", err);
      alert("Erreur lors de la connexion !");
    }
  });
})();

