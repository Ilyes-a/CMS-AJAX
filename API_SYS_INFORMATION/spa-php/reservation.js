console.log("📅 Script reservation.js chargé depuis CMS");

function initReservation() {
  const form = document.getElementById("resa-form");
  if (!form) {
    console.error("❌ Formulaire non trouvé !");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const terrain_id = document.getElementById("terrain_id").value;
    const date = document.getElementById("date").value;
    const message = document.getElementById("resa-message");

    const token = localStorage.getItem("jwt");
    if (!token) {
      message.textContent = "Veuillez vous connecter.";
      return;
    }

    console.log("📝 Envoi des données :", { terrain_id, date });

    try {
      const res = await fetch("http://192.168.1.77/api/reserver.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
	  "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ terrain_id, date })
      });

      const data = await res.json();
      console.log("📥 Réponse :", data);

      if (res.ok) {
        message.textContent = "✅ Réservation confirmée !";
      } else {
        message.textContent = data.error || "Erreur de réservation.";
      }
    } catch (err) {
      console.error("❌ Erreur de requête :", err);
      message.textContent = "Erreur réseau.";
    }
  });
}

// Appelle directement la fonction
initReservation();
