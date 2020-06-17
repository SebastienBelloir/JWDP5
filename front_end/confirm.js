const myOrder = JSON.parse(localStorage.getItem("myOrder"));
console.log(myOrder);

let section = document.getElementById('order__confirmation');
let div = document.createElement('div');
div.innerHTML = `<h2> Merci pour votre commande</h2>
                <p>Votre numéro de commande est : ${myOrder.orderId} </p>
                <p>Le total de votre commande s'élève à : </p>`
section.appendChild(div);
