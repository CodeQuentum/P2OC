const form = {
  email: document.querySelector('input[type="email"]'),
  password: document.querySelector('input[type="password"]'),
  submit: document.querySelector('button')
};
console.log(form.email);
console.log(form.password);
console.log(form.submit);

let button = form.submit.addEventListener("click", (event)=>{
  event.preventDefault();
  //const login = 'http://localhost:5678/api/users/login';

  fetch('http://localhost:5678/api/users/login',{
    method: "POST",
    mode: "cors",
    cache:"no-cache",
    credentials: "same-origin",
    headers:{
      Accept:"application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      password: form.password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error("error", data.message);
        document.querySelector(".error-message-all")
        .style.display = "block";
        document.querySelector(".error-message-all")
        .innerText =
        "Mots de passe ou e-mail incorect, réésayez s'il vous plait";
      } else {
        localStorage.setItem("userId", JSON.stringify(data));
        localStorage.setItem("token", 1)
      }
    })
    .catch((err) => {
      console.log(err);
    });
});