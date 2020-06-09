class Panier {
    constructor(){
        this.produits = JSON.parse(localStorage.getItem("cart")) || [];
    }

    ajouter = (item) => {
        let article = this.produits.find(element => element.id === item.id && element.lense === item.lense);
        if (article !== undefined) {
            article.qte += item.qte
        }else{
            this.produits.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(this.produits));
        console.log(this.produits);
    }
    afficherNbItems(){
        return this.produits.length;
    }
}

class Cartline {                                
    constructor(Id, Name, Lense, Qte, Price) {
        this.id = Id;
        this.name = Name;
        this.lense = Lense;
        this.qte = Qte;
        this.price = Price;
    }
}