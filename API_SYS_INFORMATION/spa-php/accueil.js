console.log("🏠 Script accueil.js chargé");

(async () => {
  // Charge router.js si non chargé
  if (typeof ROUTE_PREFIX === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "http://192.168.1.77/router.js";
      script.onload = resolve;
      script.onerror = () => reject("❌ Échec chargement router.js");
      document.head.appendChild(script);
    });
  }

  console.log("📦 ROUTE_PREFIX détecté :", ROUTE_PREFIX);

  const token = localStorage.getItem("jwt");

  setTimeout(() => {
    const links = {
      login: document.getElementById("btn-login"),
      register: document.getElementById("btn-register"),
      compte: document.getElementById("btn-compte"),
      reserver: document.getElementById("btn-reserver"),
    };

    // Attribution dynamique des liens
    if (links.login)    links.login.setAttribute("href", `${ROUTE_PREFIX}/login${ROUTE_SUFFIX}`);
    if (links.register) links.register.setAttribute("href", `${ROUTE_PREFIX}/register${ROUTE_SUFFIX}`);
    if (links.compte)   links.compte.setAttribute("href", `${ROUTE_PREFIX}/mon-compte${ROUTE_SUFFIX}`);
    if (links.reserver) links.reserver.setAttribute("href", `${ROUTE_PREFIX}/reserver${ROUTE_SUFFIX}`);

    // Affichage conditionnel
    if (token) {
      if (links.login)    links.login.style.display = "none";
      if (links.register) links.register.style.display = "none";
      if (links.compte)   links.compte.style.display = "inline-block";
      if (links.reserver) links.reserver.style.display = "inline-block";
    } else {
      if (links.compte)   links.compte.style.display = "none";
      if (links.reserver) links.reserver.style.display = "none";
    }
  }, 50);
})();
