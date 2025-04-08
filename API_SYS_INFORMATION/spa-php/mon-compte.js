console.log("✅ Script mon-compte.js chargé depuis CMS");

(async () => {
  if (typeof ROUTE_PREFIX === "undefined") {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "http://192.168.1.77/router.js";
      script.onload = resolve;
      script.onerror = () => reject("❌ router.js non chargé !");
      document.head.appendChild(script);
    });
  }

  const token = localStorage.getItem("jwt");
  console.log("🔑 Token :", token);

  if (!token) {
  window.location.href = `${ROUTE_PREFIX}/login${ROUTE_SUFFIX}`;
  return;
}


  fetch("http://192.168.1.77/api/mon-compte.php", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log("📊 Données utilisateur :", data);

      document.getElementById("email").textContent = data.email;
      const list = document.getElementById("reservations");
      list.innerHTML = "";
      data.reservations.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `Terrain ${r.terrain_id} - ${r.date}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("❌ Erreur fetch /mon-compte.php :", err);
    });
})();
