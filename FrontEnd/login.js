const form = {
  email: document.querySelector('input[type="email"]'),
  password: document.querySelector('input[type="password"]'),
  submit: document.querySelector('input[type="submit"]')
};
console.log(form.email);
console.log(form.password);
console.log(form.submit);

let button = form.submit.addEventListener("click", (event)=>{
  event.preventDefault();
  const login = 'http://localhost:5678/api/users/login';

  fetch(login,{
    method: "POST",
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
    .then((data) => console.log(data))
    .catch((err) => {
      console.log(err);
    });
});