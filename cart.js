//Récupération de kanap en objet
const kanap = JSON.parse(localStorage.getItem("kanap"));
//Boucle qui permet de créer tous les articles du localStorage
for(let i = 0 ; i < kanap.length ; i++){             
    const objet = {
        id : kanap[i].id,
        name : kanap[i].name,
        color : kanap[i].color,
        quantity : kanap[i].quantite,
        image : kanap[i].image,
        price : kanap[i].price,
        altTxt : kanap[i].altTxt
    }

    //Création de la partie HTML pour afficher tous les 
    //articles choisi par l'utilisateur
    let cardPanier = document.getElementById("cart__items").innerHTML += `
    <article class="cart__item" data-id="${objet.id}" data-color="${objet.color}">
        <div class="cart__item__img">
            <img src="${objet.image}" alt="${objet.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${objet.name}</h2>
                <p>Color : ${objet.color}</p>
                <p>Prix : ${objet.price}</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${objet.quantity}">
                </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
    </article>`;

    // let changementQuantity = document.querySelector(".itemQuantity");  
    // changementQuantity.addEventListener("change", function totalQuantity(){
    //     //Additionner toutes les quantitées et les afficher.
    //     let resultatQuantity = (kanap[i].quantite);
    //     console.log(resultatQuantity);

    // });

    let piece = kanap[i]
    const totalQuantity = kanap.map(function(piece){
        return piece.quantite
    });
    

   
};    

