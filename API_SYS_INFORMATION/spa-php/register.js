console.log("✅ Script register.js chargé");

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://192.168.1.77/api/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (res.ok) {
    alert("Compte créé !");
    window.location.href = "/index.php/mon-compte";
  } else {
    alert(data.error || "Erreur à l'inscription");
  }
});
