class Camera {
    constructor(id, name, price, description, image, lenses){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
        this.lenses = lenses;
    }

    displayInList(){
        return `<img class="details product__photos" data-id="${this.id}" src="${this.image}" alt="${this.name}">
                <h3 class="details camera__name" data-id="${this.id}">${this.name}</h3>
                <button id="see__product" class="details product__details btn" data-id="${this.id}"> Voir le produit</button>`
    }

    displayToOrder(){
        return `<img class="product__photos" src="${this.imageUrl}" alt="product photo">
                <h3 id="camera__name">${this.name}</h3>
                <p class="product__description"> <strong> Description : ${this.description}</strong></p>
                <form id="sheet__form">
                <label for="lenses_select">Choix de la lentille</label><br>
                <select id="lenses_select" required>
                <option value=""> - Lentille - </option></select><br><br>
                <label for="lenses_select">Choix de la Quantité</label><br>
                <select id="quantity_select" required>
                <option value=""> - Quantité - </option></select>
                <p class="product__price"> <strong> Prix : ${this.price/100},00 €</strong></p>
                <button id="add__to__cart" class="product__add__to__cart"> <strong> Ajouter au panier</strong></button>
                </form>`
    }
}
