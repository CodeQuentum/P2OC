async function fetchData() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      if (response.ok) {
        const data = await response.json();
  
        const gallery = document.querySelector(".gallery");
  
        for (let i = 0; i < data.length; i++) {
          const figure = document.createElement("figure");
  
          const imgElement = document.createElement("img");
          imgElement.src = data[i].imageUrl;
  
          const titreElement = document.createElement("figcaption");
          titreElement.textContent = data[i].title;
  
          figure.appendChild(imgElement);
          figure.appendChild(titreElement);
  
          gallery.appendChild(figure);
        }
      } else {
        throw new Error('Erreur lors de la récupération des projets.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchData();