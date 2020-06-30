function getIdFromUrl() { // Fonction qui vient récupérer l'ID de notre URL.
  const params = location.search;
  const id = params.split("id=")[1]
  return id;
}

function displayCamera(url) { // Fonction qui vient récupérer les informations de nos produits.
  retrieveContent(url).then(response => {
    let camera = new Camera(response) //Instanciation de notre classe camera.
    const article = document.createElement('article');
    article.innerHTML = camera.displayToOrder(); // Appel de la fonction présente dans notre classe camera.
    document.getElementById('main').appendChild(article);
    
    const select = document.getElementById('lenses_select'); // Ajout du menu de selection de la lentille.
    for (let i = 0; i < camera.lenses.length; i++) {
      const lense = camera.lenses[i];
      const option = select.appendChild(document.createElement("option"));
      option.setAttribute("value", lense);
      option.textContent = lense;
    }
    
    const selectQuantity = document.getElementById('quantity_select'); // Ajout du menu de selection de la quantité.
    for (let i = 1; i <= 10; i++) {
      const option = selectQuantity.appendChild(document.createElement("option"));
      option.textContent = i;
    }
    
    const addToCart = document.getElementById('sheet__form');
    
    addToCart.addEventListener('submit', function (e) { // Ajout du listener sur notre formulaire.
      e.preventDefault()
      let productToAdd = new Panier; // instanciation de notre classe Panier.
      productToAdd.ajouter(getDetailsOfProductsToAdd());
      retrieveArticlesInCart();
    })
  })
}

function getDetailsOfProductsToAdd(){ // Fonction qui récupère les élements qu'on store dans notre local storage.
  const lense = document.getElementById("lenses_select");
  const qte = document.getElementById("quantity_select");
  const id = document.getElementById("photo");
  const dataId = id.getAttribute('data-id');
  return {
    "id": dataId,
    "qte": parseInt(qte.value),
    "lense": lense.value,
  }
}



const id = getIdFromUrl();
let url = `http://localhost:3000/api/cameras/${id}`;

displayCamera(url);
