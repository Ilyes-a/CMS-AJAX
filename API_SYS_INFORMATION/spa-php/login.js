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
      alert("Connecté !");
      window.location.href = "/index.php/mon-compte"; // redirection
    } else {
        console.error("❌ Erreur serveur :", data);
  alert("Erreur : " + (data.error || "Inconnue"));
}
  } catch (err) {
    console.error("Erreur JS :", err);
    alert("Erreur lors de la connexion !");
  }
});
