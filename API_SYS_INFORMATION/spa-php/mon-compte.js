console.log("✅ Script mon-compte.js chargé depuis CMS");

function loadUserInfo() {
  const token = localStorage.getItem("jwt");
  console.log("🔑 Token :", token);

  if (!token) {
    const el = document.getElementById("user-info") || document.body;
    el.innerHTML = "<p>Non autorisé. Veuillez vous connecter.</p>";
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
}

// Petit délai pour s’assurer que le HTML a été injecté
setTimeout(loadUserInfo, 100);
