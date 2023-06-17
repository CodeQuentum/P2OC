document.addEventListener('DOMContentLoaded', function() {
  function createModifierLogo() {
    const logoElement = document.createElement('i');
    logoElement.classList.add('fas', 'fa-pen-to-square');
    return logoElement;
  }
  const userId = JSON.parse(localStorage.getItem("userId"));
  const filtresSection = document.querySelector('.filtres');
  if (userId === 1) {
    filtresSection.style.display = 'none';
    
    // Créer le conteneur de la barre noire(et le contenu)
    const blackBar = document.createElement('div');
    blackBar.classList.add('black-bar');
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container');
    const logoElementUn = createModifierLogo();
    const blackBarText = document.createElement('p');
    blackBarText.innerText =" Mode édition";
    const buttonPost = document.createElement('button');
    buttonPost.type ="button";
    buttonPost.innerHTML ="publier les changements";
    buttonPost.className ="btnPost";

    // Insérer dans la barre noire
    blackBar.appendChild(logoContainer);
    blackBar.appendChild(logoElementUn);
    logoElementUn.appendChild(blackBarText);
    blackBar.appendChild(buttonPost);
    // Insérer la barre noire au début du corps du document
    document.body.prepend(blackBar);

    // Inserer le logo stylot et le mot sous la photo
    const introModif = document.querySelector('#introduction figure')
    const divModifUn = document.createElement('div');
    divModifUn.className = 'divModifUn';
    const logoElementDeux = createModifierLogo();
    const modifText = document.createElement('a');
    modifText.innerHTML = '<a href="#modal" class="js-modal">Modifier</a>';  
    divModifUn.appendChild(logoElementDeux);
    divModifUn.appendChild(modifText);
    introModif.appendChild(divModifUn);

    // Inserer le logo stylo et le mot a coté du titre projet
    const sectionPortfolio = document.querySelector('#portfolio')
    const projetTitre = document.querySelector('#portfolio h2');
    const spanModif = document.createElement('span');
    spanModif.className = 'spanModif';
    const logoElementTrois = createModifierLogo();
    const modifText2 = document.createElement('a');
    modifText2.innerHTML = '<a href="#modal" class="js-modal">Modifier</a>';
    sectionPortfolio.appendChild(spanModif);
    spanModif.appendChild(logoElementTrois);
    spanModif.appendChild(modifText2);
    projetTitre.appendChild(spanModif);
  }
  const openModals = document.querySelectorAll(".js-modal");
  openModals.forEach(function(openModal) {
    openModal.addEventListener("click", openModalFunction);
  });


// Génération du contenu de la modale
let data = [];

async function fetchData() {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    if (response.ok) {
      data = await response.json(); 
      displayModal();
    } else {
      throw new Error('Erreur lors de la récupération des projets.');
    }
  } catch (error) {
    console.error(error);
  }
}

function displayModal() {
  const jsImg = document.querySelector(".js-img");

  for (let i = 0; i < data.length; i++) {
    const modalFigure = document.createElement('figure');
    modalFigure.className = "modalFigure";
    modalFigure.id = `figure-${data[i].id}`;

    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';

    const imageModal = document.createElement('img');
    imageModal.src = data[i].imageUrl;
    imageModal.className = "imageModal";

    const logoElement = document.createElement('i');
    logoElement.className = 'fas fa-trash-alt logo';
    logoElement.classList.add("js-trash");

    const modalText = document.createElement('p');
    modalText.textContent = "éditer";

    imageContainer.appendChild(imageModal);
    imageContainer.appendChild(logoElement);
    modalFigure.appendChild(imageContainer);
    modalFigure.appendChild(modalText);

    jsImg.appendChild(modalFigure);
  }
}

// Fonction d'ouverture de la première modale
function openModalFunction(event) {
  event.preventDefault(); // Empêche le comportement par défaut du lien
  const modalElement = document.getElementById("modale");
  modalElement.classList.remove("hidden");
  modalElement.classList.add("active");

  const trashLogo = document.querySelectorAll('.js-trash');
  trashLogo.forEach((logo) => {
    logo.addEventListener('click', () => {
      const figure = logo.closest('.modalFigure');
      if (figure) {
        const figureId = figure.getAttribute('id');

        // Extraire l'identifiant unique du projet à partir de l'ID de la figure
        const projectId = figureId.split('-')[1];
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Envoyer la requête Fetch pour supprimer le projet avec l'identifiant unique
        fetch(`http://localhost:5678/api/works/${projectId}`, {
          method: 'DELETE',
          headers: headers,
        })
          .then((response) => {
            if (response.ok) {
              // Supprimer la figure de la modale
              figure.remove();
            } else {
              throw new Error('Erreur lors de la suppression du projet.');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  });

  const secondModal = document.getElementById('addImageModale');
  const buttonSecondModal = document.querySelector(".btnPhoto");
  buttonSecondModal.addEventListener("click", openSecondModal);

  fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      generateCategoryOptions(data);
    });

  function generateCategoryOptions(categories) {
    const selectElement = document.querySelector('#categorieSelect');

    categories.forEach(category => {
      const optionElement = document.createElement('option');
      optionElement.value = category.id;
      optionElement.textContent = category.name;
      selectElement.appendChild(optionElement);
    });
  }
}

// Fonction de fermeture de la première modale
function closeModal() {
  const modalElement = document.getElementById("modale");
  modalElement.classList.add("hidden");
}

// Fonction d'ouverture de la deuxième modale
function openSecondModal(event) {
  event.preventDefault();
  const modalElement = document.getElementById("modale");
  modalElement.classList.add("hidden");

  const secondModal = document.getElementById('addImageModale');
  secondModal.classList.remove('hidden');
  secondModal.classList.add('active');
}

// fonction pour revenir a la 1ere modale
function retour(){
  const secondModal = document.getElementById('addImageModale');
  const modalElement = document.getElementById("modale");
  secondModal.classList.remove('active');
  secondModal.classList.add('hidden');
  modalElement.classList.remove("hidden");
  modalElement.classList.add("active");
}
const flecheRetour= document.querySelector(".return");
flecheRetour.addEventListener('click', (event)=>{
  event.preventDefault();
  retour();
});
  

// Appel de la fonction fetchData pour récupérer les données
fetchData();

// Liaison des événements
const closeModalButton = document.querySelector(".close-modal");
closeModalButton.addEventListener("click", closeModal);

const closeModalButton2 = document.querySelector("#addImageModale .close-modal2");
closeModalButton2.addEventListener("click", closeModal2);

function closeModal2() {
  const secondModal = document.getElementById("addImageModale");
  secondModal.classList.add("hidden");
}

const openSecondModalButton = document.querySelector(".btnPhoto");
openSecondModalButton.addEventListener("click", openSecondModal);
});