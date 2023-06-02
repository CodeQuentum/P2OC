const login = document.querySelector('input[type="submit"]');

login.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  const url = "http://localhost:5678/api/users/login";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (response.ok) {
      const data = await response.json();
      // Traitement des données de la réponse
      console.log(data);
    } else {
      // Gestion des erreurs
      console.error("Erreur lors de la requête :", response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});