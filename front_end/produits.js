async function retrieveContent(url) {
  const response = await fetch(url);
  return response.json();
}

function getIdFromUrl() {
  const params = location.search;
  const id = params.split("id=")[1]
  return id;
}


function retrieveArticlesInCart () {
  const nbrArtInCart = document.getElementById('articles__in__cart');
  nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
}


function displayCamera(url) {
  retrieveContent(url).then(response => {
    const cameras = response;
    const cameraPrice = ((cameras.price) / 100)
    const article = document.createElement('article');
    article.innerHTML = `<img class="product__photos" src="${cameras.imageUrl}" alt="product photo">
                        <h3 id="camera__name">${cameras.name}</h3>
                        <p class="product__description"> <strong> Description : ${cameras.description}</strong></p>
                        <form id="sheet__form">
                        <label for="lenses-select">Choix de la lentille</label><br>
                        <select id="lenses-select" required>
                        <option value=""> - Lentille - </option></select>
                        <p class="product__price"> <strong> Prix : ${cameraPrice},00 €</strong></p>
                        <button id="add__to__cart" class="product__add__to__cart"> <strong> Ajouter au panier</strong></button>
                        </form>`
    document.getElementById('main').appendChild(article);

    const select = document.getElementById('lenses-select');
    for (i = 0; i < cameras.lenses.length; i++) {
      const lense = cameras.lenses[i];
      const option = select.appendChild(document.createElement("option"));
      option.setAttribute("value", lense);
      option.textContent = lense;
    }
    const addToCart = document.getElementById('sheet__form');
    let parentCount = document.getElementById('articles__in__cart');
    let span = document.getElementById('span');
    let span2 = document.getElementById('span2');

    console.log(addToCart);
    addToCart.addEventListener('submit', function (e) {
      e.preventDefault();
      let productsInCart = parseInt(parentCount.textContent);
      productsInCart++;
      const stringCart = JSON.stringify(productsInCart);
      localStorage.setItem('productInCart', stringCart);
      span.style.display = 'inline-block';
      span2.style.display = 'inline-block';
      parentCount.style.display = 'inline-block';
      parentCount.innerHTML = productsInCart;
    })

    const lense = document.getElementById('lenses-select');
    addToCart.addEventListener('click', function () {
      const order = {
        _id: cameras._id,
        lense: lense.value,
      }
      const stringOrder = JSON.stringify(order);
      localStorage.setItem('newOrder', stringOrder);
    })
  })
}

console.log(localStorage);

const id = getIdFromUrl();
const url = `http://localhost:3000/api/cameras/${id}`;

displayCamera(url);
