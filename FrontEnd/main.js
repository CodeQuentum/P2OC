let data = [];

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (response.ok) {
      data = await response.json(); // Assigner les données à la variable globale
      displayGallery(); // Appeler la fonction pour afficher la galerie
    } else {
      throw new Error('Erreur lors de la récupération des projets.');
    }
  } catch (error) {
    console.error(error);
  }
}

function displayGallery() {
  const gallery = document.querySelector('.gallery');
  for (let i = 0; i < data.length; i++) {
    const figure = document.createElement('figure');

    const imgElement = document.createElement('img');
    imgElement.src = data[i].imageUrl;

    const titreElement = document.createElement('figcaption');
    titreElement.textContent = data[i].title;

    figure.appendChild(imgElement);
    figure.appendChild(titreElement);

    gallery.appendChild(figure);
  }
}
function displayFiltredGallery(filtre){
  const gallery = document.querySelector('.gallery');
  for (let i = 0; i < filtre.length; i++) {
    const figure = document.createElement('figure');

    const imgElement = document.createElement('img');
    imgElement.src = filtre[i].imageUrl;

    const titreElement = document.createElement('figcaption');
    titreElement.textContent = filtre[i].title;

    figure.appendChild(imgElement);
    figure.appendChild(titreElement);

    gallery.appendChild(figure);
  }
}
async function main() {
  try {
    await fetchData(); // Appeler la fonction fetchData pour récupérer les données
    

    // Manipulations supplémentaires des données si nécessaire
    const categories = data.map((item) => item.category.name);
    
    // recuperation des boutons crée dans le html
    const btnTous = document.querySelector(".btn-tous"); 
    btnTous.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayGallery();
    })

    const btnObjets = document.querySelector(".btn-objets");
    const filtreObjets = data.filter((item) => item.category.name === "Objets");
    btnObjets.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayFiltredGallery(filtreObjets)
    })

    const btnAppt = document.querySelector(".btn-appt");
    const filtreAppt = data.filter((item) => item.category.name === "Appartements");
    btnAppt.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayFiltredGallery(filtreAppt)
    })

    const btnHr = document.querySelector(".btn-hr")
    const filtreHr = data.filter((item) => item.category.name === "Hotels & restaurants");
    btnHr.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayFiltredGallery(filtreHr)
    })
  
  } catch (error) {
    console.error(error);
  }
}

main();


