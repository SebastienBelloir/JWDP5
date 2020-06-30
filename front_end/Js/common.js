async function retrieveContent(url) { //Fonction asynchrone qui va récuperer la reponse de l'API.
  const response = await fetch(url);
  return response.json();
}

function retrieveArticlesInCart() { // Fonction qui vient afficher le nombre de produits dans notre panier.
    let nbrArtInCart = document.getElementById('articles__in__cart');
    let artInStorage = JSON.parse(localStorage.getItem('cart'));
    if (artInStorage == null){
      console.log("storage vide");
    }else{
    nbrArtInCart.innerHTML = artInStorage.length;
    }
  }
retrieveArticlesInCart();