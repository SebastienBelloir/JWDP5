const url = `http://localhost:3000/api/cameras`;

async function retrieveContent() {
  const response = await fetch(url);
  return response.json();
}

function getFromCameras() {
  retrieveContent(url).then(items => {
    for (let camera of items) {
      displayCamera(camera)
    }
    addClickListenerToButton();
  });
}

function displayCamera(camera) {
  const article = document.createElement('article');
  article.innerHTML = `<img class="details product__photos" data-id="${camera._id}" src="${camera.imageUrl}" alt="${camera.name}">
                      <h3 class="details camera__name" data-id="${camera._id}">${camera.name}</h3>
                      <button id="see__product" class="details product__details btn" data-id="${camera._id}"> Voir le produit</button>`
  document.getElementById('accueil').appendChild(article);
}

function getCamerasById(id) {
  retrieveContent(url).then(response => {
    const id = response._id;
  })
}

function retrieveArticlesInCart () {
  const nbrArtInCart = document.getElementById('articles__in__cart');
  nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
  span.style.display = 'inline-block';
  span2.style.display = 'inline-block';
  nbrArtInCart.style.display = 'inline-block';
}

retrieveArticlesInCart();

function addClickListenerToButton() {
  const buttons = Array.from(document.getElementsByClassName('btn'));
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      getCamerasById(id);
      const redirect = `http://127.0.0.1:5500/front_end/produits.html`;
      location.assign(redirect + `?id=${id}`);
    })
  })
}

getFromCameras();

