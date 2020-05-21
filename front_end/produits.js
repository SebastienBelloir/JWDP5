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
    let camera = new Camera(response);
    console.log(camera)
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
      let productsInCart = parseInt(parentCount.textContent);
      productsInCart++;
      const stringCart = JSON.stringify(productsInCart);
      localStorage.setItem('productInCart', stringCart);
      parentCount.textContent = productsInCart;
      parentCount.style.display = "inline-block";
    })
    
    const lense = document.getElementById('lenses_select');
    const qty = document.getElementById("quantity_select")
    addToCart.addEventListener('click', function () {
      retrieveContent(`http://localhost:3000/api/cameras/`).then(response =>{
        console.log(response)
        let camera = response;
          /* let order = {
            id: camera._id,
            name: camera.name,
            quantity: qty.value,
            price: camera.price,
            lenses: lense.value,
          } */
        const stringOrder = JSON.stringify(camera);
        localStorage.setItem('newOrder', stringOrder);

      } )
      })
      })
    }


function retrieveArticlesInCart () {
  let nbrArtInCart = document.getElementById('articles__in__cart');
  nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
  nbrArtInCart.style.display = "inline-block";
  console.log(nbrArtInCart)
}


console.log(localStorage);

const id = getIdFromUrl();
let url = `http://localhost:3000/api/cameras/${id}`;

displayCamera(url);
