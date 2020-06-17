const url = `http://localhost:3000/api/cameras/`;

async function retrieveContent() { // Fonction asynchrone qui va récuperer la reponse de l'API. 
  const response = await fetch(url);
  return response.json();
}

function getFromCameras() { // Fonction qui vient appeler la fonction display camera pour chaque item de la réponse.
  retrieveContent(url).then(items => {
    for (let camera of items) {
      displayCamera(camera)
    }
    addClickListenerToButton();
  });
}

function displayCamera(camera) { // Fonction qui vient créer un article et ajouter les élements de notre classe Camera.
  let newCamera = new Camera(camera); //instanciation de la classe Camera
  const article = document.createElement('article');
  article.innerHTML = newCamera.displayInList(); //appel de la fonction displayInList présente dans la class camera.
  document.getElementById('accueil').appendChild(article);
}

function getCamerasById() {
  retrieveContent(url);
}

function retrieveArticlesInCart () {
  let nbrArtInCart = document.getElementById('articles__in__cart');
  nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
}

/* retrieveArticlesInCart(); */

function addClickListenerToButton() { //Fonction qui vient ajouter un eventlistener sur nos buttons.
  const buttons = Array.from(document.getElementsByClassName('btn')); // on vient créer un tableau avec nos boutons.
  buttons.forEach(button => { // pour chaque bouton on vient ajouter l'eventListener qui nous redirigera vers la page du produit grâce à l'ID produit.
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      getCamerasById(id);
      const redirect = `produits.html`;
      location.assign(redirect + `?id=${id}`);
    })
  })
}

getFromCameras(url);

