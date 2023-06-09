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
  }
});