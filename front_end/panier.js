const url = `http://localhost:3000/api/cameras/`;

async function retrieveContent() {
    const response = await fetch(url);
    return response.json();
}


function retrieveStorage (){
    if (localStorage.getItem("newOrder") === null) {
        const p = document.createElement('p');
        p.innerHTML = `<strong> Votre panier est vide </strong>`
        document.getElementById('main__wrapper').appendChild(p);
        document.getElementById('table').style.display="none";
        document.getElementById('buttons').style.display="none";
        document.getElementById('form').style.display="none";
        document.getElementById('submit').style.display="none";
        document.getElementById('textForm').style.display="none";
        console.log("Panier vide");
    } else {                                                                     
        const productAddedToCart = localStorage.getItem("newOrder");
        console.log(productAddedToCart);
    }
}

retrieveStorage();

function retrieveArticlesInCart () {
    const nbrArtInCart = document.getElementById('articles__in__cart');
    console.log(nbrArtInCart)
    nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
  }

retrieveArticlesInCart();

class Camera{
    constructor(Name, Id, Lenses, Price){
        this.name = Name;
        this.id = Id;
        this.lenses = Lenses;
        this.price = Price;
    }
}




function displayCameraInTable(){
    let table = document.getElementById('table');
    document.getElementById('form');
    document.getElementById('submit');
    document.getElementById('textForm');

    }
                

displayCameraInTable();

function post () {
    let request = new XMLHttpRequest();
    request.open("POST", `http://localhost:3000/api/cameras/`);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify());
      request.onreadystatechange = function () {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
      }
    };
}

const emptyCart = function () {
    const emptyBtn = document.getElementById("empty")
    emptyBtn.addEventListener("click", function () {    
        localStorage.clear()                            
        location.reload()                               
    })
}

emptyCart();