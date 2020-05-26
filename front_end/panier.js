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
        const showId = localStorage.getItem("id");
        const showQty = localStorage.getItem('qty');
        console.log(showQty);
        console.log(showId);
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

const catalog = [];


function displayCameraInTable(){
    retrieveContent(url).then(response => {
        for (let i = 0; i < response.length; i++) {                
            let newCamera = new Camera(                         
                response[i]._id,   
                response[i].name,                              
                response[i].price/100 + ',00 €',                              
                response[i].lenses                              
            )
            catalog.push(newCamera)                               
        }
    })
    console.log(catalog)

    
    const tableBody = document.getElementById('cart-tablebody');
    const tr = document.createElement('tr');
    tableBody.appendChild(tr);
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

    const id = localStorage.getItem('id');
    td2.innerText = id;
    const qty = localStorage.getItem('qty');
    td4.innerHTML = `<input type="number" id="quantityinput" value=${qty} min="1" max="10">`;
}
           
displayCameraInTable();

function post (toSend) {
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(toSend));
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

const submit = document.getElementById("submit")
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const address = document.getElementById("address")
const city = document.getElementById("city")
const email = document.getElementById("email")

submit.addEventListener("click", function (event) { // Au moment du la soumission du formulaire :
    event.preventDefault()
    ///Creation d'une variable contact contenant les informations de contact saisie par l'utilisateur
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }

    const data = {contact};

    post(data)
 
})
