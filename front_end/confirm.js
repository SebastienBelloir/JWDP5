const myOrder = JSON.parse(sessionStorage.getItem("myOrder")); // Récupération de notre local storage.
console.log(myOrder);

let section = document.getElementById('order__confirmation');
let div = document.createElement('div');
div.innerHTML = `<h2> Merci pour votre commande ${myOrder.contact.firstName}</h2>
                <p>Votre numéro de commande est : ${myOrder.orderId} </p>
                <p>Le total de votre commande s'élève à : ${sessionStorage.getItem("total") +",00 €"} </p>`
section.appendChild(div);
