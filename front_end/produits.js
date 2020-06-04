async function retrieveContent(url) {
  const response = await fetch(url);
  return response.json();
}

function getIdFromUrl() {
  const params = location.search;
  const id = params.split("id=")[1]
  return id;
}

function displayCamera(url) {
  retrieveContent(url).then(response => {
    let camera = new Camera(response)
    const article = document.createElement('article');
    article.innerHTML = camera.displayToOrder();
    document.getElementById('main').appendChild(article);
    
    const select = document.getElementById('lenses_select');
    for (let i = 0; i < camera.lenses.length; i++) {
      const lense = camera.lenses[i];
      const option = select.appendChild(document.createElement("option"));
      option.setAttribute("value", lense);
      option.textContent = lense;
    }
    
    const selectQuantity = document.getElementById('quantity_select');
    for (let i = 1; i <= 10; i++) {
      const option = selectQuantity.appendChild(document.createElement("option"));
      option.textContent = i;
    }
    
    const addToCart = document.getElementById('sheet__form');
    let parentCount = document.getElementById('articles__in__cart');
    
    addToCart.addEventListener('submit', function (e) {
      e.preventDefault();
      let itemsNumber = new Panier;
      /* let productsInCart = itemsNumber >= 0 ? itemsNumber : 0; // condition ternaire = equivalent if else
      productsInCart++; */
      const stringCart = getDetailsOfProductsToAdd();
      localStorage.setItem('productInCart', stringCart);
      parentCount.textContent = itemsNumber.afficherNbItems();
      parentCount.style.display = "inline-block";
    })
    
    

  })
}

function getDetailsOfProductsToAdd(){
  const lense = document.getElementById("lenses_select");
  const qte = document.getElementById("quantity_select");
  const id = document.getElementById("photo");
  const dataId = id.getAttribute('data-id');
  console.log(dataId,lense.value, qte.value);
  return {
    "id": dataId,
    "qte": qte.value,
    "lense": lense.value,
  }
}


function retrieveArticlesInCart () {
  let nbrArtInCart = document.getElementById('articles__in__cart');
  nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
  nbrArtInCart.style.display = "inline-block";
}


/* retrieveArticlesInCart(); */

console.log(localStorage);

const id = getIdFromUrl();
let url = `http://localhost:3000/api/cameras/${id}`;

displayCamera(url);
