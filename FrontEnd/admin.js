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

    // Créer le conteneur de la barre noire (et le contenu)
    const blackBar = document.createElement('div');
    blackBar.classList.add('black-bar');
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container');
    const logoElementUn = createModifierLogo();
    const blackBarText = document.createElement('p');
    blackBarText.innerText = "Mode édition";
    const buttonPost = document.createElement('button');
    buttonPost.type = "button";
    buttonPost.innerHTML = "publier les changements";
    buttonPost.className = "btnPost";

    // Insérer dans la barre noire
    blackBar.appendChild(logoContainer);
    blackBar.appendChild(logoElementUn);
    logoElementUn.appendChild(blackBarText);
    blackBar.appendChild(buttonPost);
    // Insérer la barre noire au début du corps du document
    document.body.prepend(blackBar);

    // Insérer le logo stylot et le mot sous la photo
    const introModif = document.querySelector('#introduction figure')
    const divModifUn = document.createElement('div');
    divModifUn.className = 'divModifUn';
    const logoElementDeux = createModifierLogo();
    const modifText = document.createElement('a');
    modifText.innerHTML = '<a href="#modal" class="js-modal">Modifier</a>';  
    divModifUn.appendChild(logoElementDeux);
    divModifUn.appendChild(modifText);
    introModif.appendChild(divModifUn);

    // Insérer le logo stylo et le mot à côté du titre du projet
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
    fetch('http://localhost:5678/api/categories')
    .then(response => response.json())
    .then(data => {
      const selectElement = document.querySelector('#categorieSelect');
  
      // Ajouter l'option vide en tant que premier élément
      const placeholderOption = document.createElement('option');
      placeholderOption.value = '';
      selectElement.appendChild(placeholderOption);
  
      // Générer les autres options à partir des catégories
      data.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.textContent = category.name;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
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

  }

  // Fonction de fermeture de la première modale
  function closeModal() {
    const modalElement = document.getElementById("modale");
    modalElement.classList.add("hidden");
  }
  
  // Fonction de fermeture de la deuxième modale
  function closeModal2() {
    const secondModal = document.getElementById("addImageModale");
    secondModal.classList.add("hidden");
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
  function retour() {
    const secondModal = document.getElementById('addImageModale');
    const modalElement = document.getElementById("modale");
    secondModal.classList.remove('active');
    secondModal.classList.add('hidden');
    modalElement.classList.remove("hidden");
    modalElement.classList.add("active");
  }
  const flecheRetour = document.querySelector(".return");
  flecheRetour.addEventListener('click', (event) => {
    event.preventDefault();
    retour();
  })

  // Chargement de l'image
  const fileInput = document.getElementById('file');
  const imagePreview = document.getElementById('loadImage');
  const labelElement = document.querySelector('#file-label');

  fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.alt = file.name;
      imagePreview.parentElement.classList.add('has-image');
      labelElement.classList.add('hidden');
    };

    reader.readAsDataURL(file);
  });

  // Ajout de l'écouteur d'événement pour le bouton .btnAddPhoto
  const addButton = document.querySelector('.btnAddPhoto');

  const titleInput = document.querySelector('.inputarea input[type="text"]');
  const categorySelect = document.getElementById('categorieSelect');
  const token = localStorage.getItem('token');
  
  addButton.addEventListener('click', () => {
    const fileInput = document.getElementById('file');
    
    if (fileInput.files.length > 0 && titleInput.value !== '' && categorySelect.value !== '') {
      const file = fileInput.files[0];
      const formData = new FormData();
    
      formData.append('image', file);
      formData.append('title', titleInput.value);
      formData.append('category', categorySelect.value);

      fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          // Traiter la réponse du serveur
          console.log(data);
        })
        .catch(error => {
          // Gérer les erreurs
          console.error(error);
        });
    }
  });

  // Appel de la fonction fetchData pour récupérer les données
  fetchData();

  // Liaison des événements
  const closeModalButton = document.querySelector(".close-modal");
  closeModalButton.addEventListener("click", closeModal);

  const closeModalButton2 = document.querySelector("#addImageModale .close-modal2");
  closeModalButton2.addEventListener("click", closeModal2);

  const openSecondModalButton = document.querySelector(".btnPhoto");
  openSecondModalButton.addEventListener("click", openSecondModal);

  // Fonction de fermeture de la première modale en cliquant en dehors
function closeModalOnOutsideClick(event) {
  const modalElement = document.getElementById("modale");
  if (event.target === modalElement) {
    closeModal();
  }
}
function closeModalOnOutsideClick2(event) {
  const modalElement = document.getElementById("addImageModale");
  if (event.target === modalElement) {
    closeModal2();
  }
}
// Ajouter l'écouteur d'événement pour la fermeture de la modale en cliquant en dehors
document.addEventListener("click", closeModalOnOutsideClick);
document.addEventListener("click", closeModalOnOutsideClick2);
});
