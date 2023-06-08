const form = {
  email: document.querySelector('input[type="email"]'),
  password: document.querySelector('input[type="password"]'),
  submit: document.querySelector('button')
};

let button = form.submit.addEventListener("click", (event) => {
  event.preventDefault();
  const login = 'http://localhost:5678/api/users/login';

  fetch(login, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Mots de passe ou e-mail incorrect, réessayez s'il vous plaît");
      }
    })
    .then((data) => {
      localStorage.setItem("userId", JSON.stringify(data.userId));
      localStorage.setItem("token", data.token);
      window.location.assign("index.html"); // Redirection vers la page d'accueil
    })
    .catch((err) => {
      console.error("error", err.message);
      document.querySelector(".loginFailed").style.display = "block";
      document.querySelector(".loginFailed").innerText = err.message;
    });
});