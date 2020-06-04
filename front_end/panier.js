const url = "http://localhost:3000/api/cameras/";

async function retrieveContent() {
    const response = await fetch(url);
    return response.json();
}


function retrieveStorage (){
    if (localStorage.getItem("cart") === null) {
        const p = document.createElement('p');
        p.innerHTML = `<strong> Votre panier est vide </strong>`
        document.getElementById('main__wrapper').appendChild(p);
        document.getElementById('table').style.display="none";
        document.getElementById('empty').style.display="none";
        document.getElementById('form').style.display="none";
        document.getElementById('submit').style.display="none";
        document.getElementById('textForm').style.display="none";
        console.log("Panier vide");
    } else {                                                                
        const productAddedToCart = localStorage.getItem('cart');
        console.log(productAddedToCart);
    }
}


retrieveStorage();

function retrieveArticlesInCart () {
    const nbrArtInCart = document.getElementById('articles__in__cart');
    nbrArtInCart.textContent = JSON.parse(localStorage.getItem('productInCart'));
  }

/* retrieveArticlesInCart(); */

const store = [];
const cart = [];


console.log('mon store', store)


function addToCart () {
    retrieveContent(url).then(response => {
        for (let i = 0; i < response.length; i++) {                 
                let newCamera = response[i];
                store.push(newCamera);
                console.log('new camera id', newCamera._id);
                let article = JSON.parse(localStorage.getItem('newOrder'));
                if (localStorage.length == null) {
                    console.log('LocalStorage vide');
                } if (article.id === newCamera._id){
                    cart.push(article);
                }
                                          
                    const tbody = document.getElementById("cart-tablebody");
                    const tr = document.createElement("tr");
                    tbody.appendChild(tr);
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
                    const cartLine = cart[i];
                        td1.innerText = newCamera.name;
                        td2.innerText = cartLine.id;
                        td3.innerText = cartLine.lense;
                        td4.innerHTML = `<input type="number" id="quantityinput" value=${cartLine.qte} min="1" max="10">`;
                        td5.innerText = newCamera.price/100 + ',00 €';
                        td6.innerText = (newCamera.price * cartLine.qte)/100 + ',00 €';
                
            }
        })
            
    }


addToCart();

console.log('mon cart', cart)

function post(content) {
    return new Promise(function () {
        let httpRequest = new XMLHttpRequest();
        httpRequest.open("POST", "http://localhost:3000/api/cameras/order");
        httpRequest.setRequestHeader("Content-Type", "application/json");
        httpRequest.send(JSON.stringify(content));
        httpRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status == 200 ) {
                let response = JSON.parse(this.responseText);
                console.log(response);
            }
        }
    })
}

const emptyCart = function () {
    const emptyBtn = document.getElementById("empty")
    emptyBtn.addEventListener("click", function () {    
        localStorage.clear()                            
        location.reload()                               
    })
}

emptyCart();

const form = document.getElementById("submit");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");


form.addEventListener("click", function () {
    const contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }
    

    const data =  contact ;

    post(data).then(response => {
        console.log(response);
        /* window.location.href = "confirmation.html"; */
        const myOrder = JSON.stringify(response);      
        localStorage.setItem("myOrder",myOrder);
        localStorage.clear(); 
    })
})
