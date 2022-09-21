


fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
        return res.json();
        }})
    .then((value) => {
        console.log(value);
        //Récupération de kanap en objet
        const kanap = JSON.parse(localStorage.getItem("kanap"));
        console.log(kanap);
        
        
        let objet;
        let i = 0;
        function genererHtml(){
            //Boucle qui permet de créer tous les articles du localStorage
            for(i = 0 ; i < kanap.length ; i++){   
                // trouve l'égalité entre l'ID de localStorage et l'API
                let element = value.filter(val => val._id == kanap[i].id);
                
                objet = {
                    id : kanap[i].id,
                    name : element[0].name,
                    color : kanap[i].color,
                    quantity : kanap[i].quantite,
                    image : element[0].imageUrl,
                    price : element[0].price,
                    altTxt : element[0].altTxt
                }             

                //Création de la partie HTML pour afficher tous les 
                //articles choisi par l'utilisateur
                document.getElementById("cart__items").innerHTML += `
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
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${objet.quantity}"
                                data-color="${objet.color}" data-id="${objet.id}"/>
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem" data-color="${objet.color}" data-id="${objet.id}" onClick="genererHtml();">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>`;          
            };
        };
        genererHtml();

        //Calcul du prix total  et quantité total de tous les articles du panier
        function calcul(){
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
        }

        
        //
        let objetSelect;
        const itemQuantity = document.querySelectorAll(".itemQuantity");
        for (let qtyInput of itemQuantity) {
            qtyInput.addEventListener("change", (e) => {
                const newQuantity = e.target.value;
                        
                // Créer un objet de sélection utilisateur
                objetSelect = {
                    id : e.target.dataset.id,
                    color : e.target.dataset.color,
                    nombre : e.target.value
                }
                
                // Trouve et modifie la quantitée du produit sélectionné
                let tableauLocalStorage = JSON.parse(localStorage.getItem("kanap"));  
                let memeIdColor = tableauLocalStorage.find((o) => o.id === objetSelect.id && o.color === objetSelect.color);               
                memeIdColor.quantite = objetSelect.nombre;
                
                // Validation de la nouvelle valeur et insertion dans le LocalStorage
                for(let i = 0 ; i < kanap.length ; i++){
                    if (kanap[i].id == memeIdColor.id && kanap[i].color == memeIdColor.color){
                        const objetSupprimer = kanap.splice(i, 1);
                        kanap.splice(i, 0, memeIdColor);
                        localStorage.setItem('kanap', JSON.stringify(kanap));
                        
                    }else{
                    }               
                }
                //Calcul du prix total et quantité total de tous les articles du panier
                calcul();
            });         
        }

        // Supprimer un article avec le bouton supprimer
        let deleteItems = document.querySelectorAll(".deleteItem");
        for(let deleteItem of deleteItems){
            deleteItem.addEventListener("click",(e) => {
                let id = e.target.dataset.id;
                let color = e.target.dataset.color;
                let tableauLocalStorage = JSON.parse(localStorage.getItem("kanap"));
                let result = tableauLocalStorage.filter((item)=> (item.id !== id || item.color !== color));
                localStorage.setItem("kanap", JSON.stringify(result));
                window.location.reload();
                // document.getElementById("cart__items").innerHTML = "";
                // document.getElementById("cart__items").innerHTML = `<button onClick="genererHtml()"></button>`;                
            });
        } 
        //Calcul du prix total et quantité total de tous les articles du panier
        calcul();   
    })
.catch(function(err){
    // Une erreur est survenue
});


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
address.setAttribute("pattern","[0-1000][A-z]{3,}");
address.setAttribute("placeholder","75 rue du Pain");

//Restriction Ville
let city = document.getElementById("city");
city.setAttribute("pattern","[A-z]{3,}");
city.setAttribute("placeholder","Lyon");

//Restriction E-mail
let email = document.getElementById("email");
email.setAttribute("placeholder","sebastienrobin@hotmail.com");        




