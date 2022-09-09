fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
        return res.json();
        }})
    .then((value) => {
        
        //Récupération de kanap en objet
        const kanap = JSON.parse(localStorage.getItem("kanap"));
        let objet;
        //Boucle qui permet de créer tous les articles du localStorage
        for(let i = 0 ; i < kanap.length ; i++){             
            objet = {
                id : kanap[i].id,
                name : value[i].name,
                color : kanap[i].color,
                quantity : kanap[i].quantite,
                image : value[i].imageUrl,
                price : value[i].price,
                altTxt : value[i].altTxt
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
 
        };
        
        // // Récupérer toutes les quantités dans un tableau à partir du localStorage
        // const nouveauTableau = [];  
        // for(q=0 ; q<kanap.length ; q++){       
        //     nouveauTableau.push(kanap[q].quantite);
        // };
          
        // récupération des valeurs de quantité des différents articles
        
        
        // for(q=0 ; q<kanap.length ; q++){

        //     let tableauSelectionQuantity = document.getElementsByClassName("itemQuantity");
        //     console.log(tableauSelectionQuantity);
        //     tableauSelectionQuantity.addEventListener("change", );

        //     let valeur = input.value;
            
        // }
        
            
        // //Fonction Supprimer l'article
        // let supprimerArticle = document.getElementsByClassName("deleteItem");
       
        // supprimerArticle.addEventListener("click", function supprimer(e){
        //     let x = e.target.value; 

        // });
        






        //Calcul de la quantité total
        let tableauTotalQuantity = [];
        let sumQuantity = 0;
        for(q=0 ; q<kanap.length ; q++){
            tableauTotalQuantity.push(parseInt(kanap[q].quantite));
            sumQuantity += tableauTotalQuantity[q];
        }
        document.getElementById("totalQuantity").innerHTML = `${sumQuantity}`;
        console.log(sumQuantity);
        console.log(tableauTotalQuantity);

        //Calcul du prix total de tous les articles
        let tableauTotalprice = [];
        let sumPrice = 0; 
        for(p=0 ; p<kanap.length ; p++){
            tableauTotalprice.push(kanap[p].quantite * value[p].price); 
            sumPrice += tableauTotalprice[p];
        }
        document.getElementById("totalPrice").innerHTML = `${sumPrice}`;
        console.log(tableauTotalprice);

        
        

        
    })
.catch(function(err){
    // Une erreur est survenue
});



