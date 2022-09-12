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
        






        
        

        //Calcul du prix total  et quantité total de tous les articles du panier
        let tableauTotalQuantity = [];
        let sumQuantity = 0;
        let tableauTotalprice = [];
        let sumPrice = 0; 
        for(p=0 ; p<kanap.length ; p++){
            
            tableauTotalQuantity.push(parseInt(kanap[p].quantite));
            sumQuantity += tableauTotalQuantity[p];
            
            tableauTotalprice.push(kanap[p].quantite * value[p].price); 
            sumPrice += tableauTotalprice[p];
        }
        document.getElementById("totalPrice").innerHTML = `${sumPrice}`;
        document.getElementById("totalQuantity").innerHTML = `${sumQuantity}`;



        // Formulaire____________________________________
        
        //Restriction Prénom
        let firstName = document.getElementById("firstName");
        firstName.setAttribute("pattern","[A-z]{3,}");
        firstName.setAttribute("placeholder","Sebastien");
        
        document.getElementById("firstNameErrorMsg").innerHTML = "";


        //Restriction Nom
        let lastName = document.getElementById("lastName");
        lastName.setAttribute("pattern","[A-z]{3,}");
        lastName.setAttribute("placeholder","Robin");

        //Restriction Adresse
        let address = document.getElementById("address");
        address.setAttribute("pattern","[0-9][a-z]{3,}");
        address.setAttribute("placeholder","75 rue du Pain");

        //Restriction Ville
        let city = document.getElementById("city");
        city.setAttribute("pattern","[A-z]{3,}");
        city.setAttribute("placeholder","Lyon");

        //Restriction E-mail
        let email = document.getElementById("email");
        email.setAttribute("placeholder","sebastienrobin@hotmail.com");

        
    })
.catch(function(err){
    // Une erreur est survenue
});



