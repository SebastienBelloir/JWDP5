const url = `http://localhost:3000/api/cameras/`;

async function retrieveContent() {
  const response = await fetch(url);
  return response.json();
}

function getFromCameras() {
  retrieveContent(url).then(items => {
    for (let camera of items) {
      displayCamera(camera)
      console.log(camera)
    }
    addClickListenerToButton();
  });
}

function displayCamera() {
  let camera = new Camera();
  const article = document.createElement('article');
  document.getElementById('accueil').appendChild(article);
  article.innerHTML = `${camera.displayInList()}`; 
}

function getCamerasById() {
  retrieveContent(url);
}

function retrieveArticlesInCart () {
  let nbrArtInCart = document.getElementById('articles__in__cart');
  nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
}

retrieveArticlesInCart();

function addClickListenerToButton() {
  const buttons = Array.from(document.getElementsByClassName('btn'));
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      getCamerasById(id);
      const redirect = `produits.html`;
      location.assign(redirect + `?id=${id}`);
    })
  })
}

getFromCameras();

