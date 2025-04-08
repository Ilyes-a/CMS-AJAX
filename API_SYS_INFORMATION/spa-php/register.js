console.log("📥 Chargement register.js");

(async () => {
  // Charger router.js si ROUTE_PREFIX ou ROUTE_SUFFIX est manquant
  if (typeof ROUTE_PREFIX === "undefined" || typeof ROUTE_SUFFIX === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "http://192.168.1.77/router.js";
      script.onload = () => {
        // Attendre que ROUTE_SUFFIX soit défini
        const waitForVars = setInterval(() => {
          if (typeof ROUTE_PREFIX !== "undefined" && typeof ROUTE_SUFFIX !== "undefined") {
            clearInterval(waitForVars);
            resolve();
          }
        }, 10);
      };
      script.onerror = () => reject("❌ Échec chargement router.js");
      document.head.appendChild(script);
    });
  }

  console.log("📦 ROUTE_PREFIX =", ROUTE_PREFIX);
  console.log("📦 ROUTE_SUFFIX =", ROUTE_SUFFIX);

  const token = localStorage.getItem("jwt");
console.log("🔐 Token récupéré :", token);

if (token) {
  console.log("🔁 Tentative de redirection vers :", `${ROUTE_PREFIX}/mon-compte${ROUTE_SUFFIX}`);
  window.location.href = `${ROUTE_PREFIX}/mon-compte${ROUTE_SUFFIX}`;
  return;
}


  const form = document.getElementById("register-form");
  if (!form) {
    console.error("❌ Formulaire introuvable !");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch("http://192.168.1.77/api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Compte créé !");
        localStorage.setItem("jwt", data.token);
        window.location.href = `${ROUTE_PREFIX}/mon-compte${ROUTE_SUFFIX}`;
      } else {
        alert(data.error || "Erreur à l'inscription");
      }

    } catch (err) {
      console.error("❌ Erreur JS :", err);
      alert("Erreur réseau.");
    }
  });
})();
