let projets = document.querySelector('.clear');
projets.addEventListener('click', (event) => {
  event.preventDefault();
  if (confirm('Êtes-vous sûr de vouloir vider le stockage local ?')) {
    localStorage.clear();
    console.log('Stockage local vidé');
  }
});

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
async function filtres() {
  try {
    await fetchData(); 

    const categories = data.map((item) => item.category.name);
    
    // recuperation des boutons crée dans le html
    const btnTous = document.querySelector(".btn-tous"); 
    btnTous.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayGallery();
      
        //Changement de couleur du bouton cliqué

        btnTous.style.backgroundColor= "#1D6154";
        btnTous.style.color= "white";
           
        // Rétablir le style des autres boutons
        btnAppt.style.backgroundColor = "";
        btnAppt.style.color = "";
        btnHr.style.backgroundColor = "";
        btnHr.style.color = "";
        btnObjets.style.backgroundColor = "";
        btnObjets.style.color = "";
    })

    const btnObjets = document.querySelector(".btn-objets");
    const filtreObjets = data.filter((item) => item.category.name === "Objets");
    btnObjets.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayFiltredGallery(filtreObjets)

       //Changement de couleur du bouton cliqué

       btnObjets.style.backgroundColor= "#1D6154";
       btnObjets.style.color= "white";
 
         // Rétablir le style des autres boutons
       btnAppt.style.backgroundColor = "";
       btnAppt.style.color = "";
       btnHr.style.backgroundColor = "";
       btnHr.style.color = "";
       btnTous.style.backgroundColor = "";
       btnTous.style.color = "";
    })

    const btnAppt = document.querySelector(".btn-appt");
    const filtreAppt = data.filter((item) => item.category.name === "Appartements");
    btnAppt.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayFiltredGallery(filtreAppt);

      //Changement de couleur du bouton cliqué

      btnAppt.style.backgroundColor= "#1D6154";
      btnAppt.style.color= "white";

        // Rétablir le style des autres boutons
      btnObjets.style.backgroundColor = "";
      btnObjets.style.color = "";
      btnHr.style.backgroundColor = "";
      btnHr.style.color = "";
      btnTous.style.backgroundColor = "";
      btnTous.style.color = "";
    });

    const btnHr = document.querySelector(".btn-hr")
    const filtreHr = data.filter((item) => item.category.name === "Hotels & restaurants");
    btnHr.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = ""
      displayFiltredGallery(filtreHr)

       //Changement de couleur du bouton cliqué

       btnHr.style.backgroundColor= "#1D6154";
       btnHr.style.color= "white";
 
         // Rétablir le style des autres boutons
       btnAppt.style.backgroundColor = "";
       btnAppt.style.color = "";
       btnObjets.style.backgroundColor = "";
       btnObjets.style.color = "";
       btnTous.style.backgroundColor = "";
       btnTous.style.color = "";
    })
  
  } catch (error) {
    console.error(error);
  }
}

filtres();