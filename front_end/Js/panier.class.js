class Panier { // création de la classe Panier
    constructor(){
        this.produits = JSON.parse(localStorage.getItem("cart")) || []; //initialisation de notre variable produits = tableau contenant notre localstorage 'cart' ou vide si pas encore d'éléments dans le localstorage.
    }

    ajouter = (item) => {
        let article = this.produits.find(element => element.id === item.id && element.lense === item.lense); //initialisation de notre variable article => on va chercher une correspondance au niveau de l'id et des lentilles.
        if (article !== undefined) { // si l'article est déjà existant, alors on vient ajouter les quantités.
            article.qte += item.qte
        }else{ // sinon on le push dans notre tableau produits.
            this.produits.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(this.produits)); // et on set notre localstorage avec les éléments présents dans notre tableau
    }
}

