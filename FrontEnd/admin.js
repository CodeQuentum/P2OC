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
    const modifText = document.createElement('p');
    modifText.innerText ="modifier";
    divModifUn.appendChild(logoElementDeux);
    divModifUn.appendChild(modifText);
    introModif.appendChild(divModifUn);
    // Inserer le logo stylo et le mot a coté du titre projet
    const sectionPortfolio = document.querySelector('#portfolio')
    const projetTitre = document.querySelector('#portfolio h2');
    const spanModif = document.createElement('span');
    spanModif.className = 'spanModif';
    const logoElementTrois = createModifierLogo();
    const modifText2 = document.createElement('p');
    modifText2.innerText = 'modifier';
    sectionPortfolio.appendChild(spanModif);
    spanModif.appendChild(logoElementTrois);
    spanModif.appendChild(modifText2);
    projetTitre.appendChild(spanModif);
  }
});