const url = "http://localhost:3000/api/cameras/";

async function retrieveContent() {
    const response = await fetch(url);
    return response.json();
}


function retrieveStorage() { // On vient récuperer nos élements dans le local storage. Si local storage = vide, rien ne s'affiche.
    if (localStorage.getItem("cart") === null) {
        const p = document.createElement('p');
        p.innerHTML = `<strong> Votre panier est vide </strong>`
        document.getElementById('main__wrapper').appendChild(p);
        document.getElementById('table').style.display = "none";
        document.getElementById('empty').style.display = "none";
        document.getElementById('form').style.display = "none";
        document.getElementById('submit').style.display = "none";
        document.getElementById('textForm').style.display = "none";
        console.log("Panier vide");
    } else {
        const productAddedToCart = localStorage.getItem('cart');
        console.log(productAddedToCart);
    }
}

retrieveStorage();


let store = [];
let cart = [];


function addToCart() { // Fonction qui pour chaque element dans le local storage, va ajouter l'item dans notre tableau de produits.
    retrieveContent(url).then(response => {
        store = response; //Initialisation de notre variable store.
        cart = JSON.parse(localStorage.getItem('cart')); //Initialisation de notre variable cart.
        const tbody = document.getElementById("cart-tablebody");
        let subCounter = 0;
        cart.forEach(cartArticle => {
            let article = store.find(element => element._id === cartArticle.id); // création + initialisation de la variable article. On vient comparer les ID des produits dans le store avec celle du cart.
            article.qte = cartArticle.qte; // on va chercher la qté selectionnée.
            article.lense = cartArticle.lense; // on va chercher la lentille selectionnée.
            console.log("article", article);
            addRow(article, tbody); // on ajoute une ligne à notre tableau.
            let articlePrices = article.price * article.qte/100;
            console.log(articlePrices)
            subCounter = subCounter + (parseInt(articlePrices))
            let subtt = document.getElementById('subtt');
            subtt.innerText = subCounter + ',00 €';
            sessionStorage.setItem("total",subCounter);
        });     
    })
}

addToCart();

const emptyCart = function () { // fonction qui vide notre local storage et donc notre panier.
    const emptyBtn = document.getElementById("empty")
    emptyBtn.addEventListener("click", function () {
        localStorage.clear()
        location.reload()
    })
}

emptyCart();

function postForm(data) { // Fonction Post qui va nous servir à envoyer les données à l'API.
    console.log(data);
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "http://localhost:3000/api/cameras/order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(data));
        request.onreadystatechange = function () {
            console.log(this);
            if (this.readyState === 4 && this.status == 201) {
                let response = JSON.parse(this.responseText);
                console.log(response);
                resolve(response);
            }
        }
    }) 
}


const form = document.getElementById("form");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");


form.addEventListener("submit", function (e) { // On vient écouter notre formulaire lorsque nous submittons les données
    e.preventDefault();
    const contact = { // Objet contact envoyé à l'API.
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }

    const products = []; // Tableau Produits contenant seulement l'ID produits.
    for (let i = 0; i < cart.length; i++) {
        products.push(cart[i].id)
    }

    const data = {contact, products};
    
    postForm(data).then(function (response) { //Envoi de nos données avec la fonction Post.
        location.href = "confirmation.html";
        let myOrder = JSON.stringify(response);
        sessionStorage.setItem("myOrder", myOrder);
        localStorage.clear(); // stockage de la réponse du serveur dans notre local storage.
    })
})


function addRow(article, body){ // fonction qui vient ajouter une ligne à notre tableau.
    
    const tr = document.createElement("tr");
    body.appendChild(tr);
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    const td6 = document.createElement("td");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    td2.setAttribute('class', 'td2')
    td6.setAttribute('class', 'td6');
    td1.innerText = article.name;
    td2.innerText = article._id;
    td3.innerText = article.lense;
    td4.innerHTML = `<input type="number" id="quantityinput" value=${article.qte} min="1" max="10">`;
    td5.innerText = article.price / 100 + ',00 €';
    td6.innerText = (article.price * article.qte) / 100 + ',00 €';

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