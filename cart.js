


fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
        return res.json();
        }})
    .then((value) => {

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
                console.log(sumQuantity );
                console.log(sumPrice);
            }
            document.getElementById("totalQuantity").innerHTML = `${sumQuantity}`;
            document.getElementById("totalPrice").innerHTML = `${sumPrice}`;
            
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


let contact;
// Formulaire test Regex____________________________________
        
//Prénom********************
let firstName = document.getElementById("firstName");
firstName.setAttribute("placeholder","Sébastien");
firstName.addEventListener("change", function verifierPrenom(){
    let prenom = firstName.value;
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(regex.test(prenom)) { 
        contact.prenom = prenom;
        document.getElementById("firstNameErrorMsg").innerHTML = "";
        
    }else{
        document.getElementById("firstNameErrorMsg").innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//Nom********************
let lastName = document.getElementById("lastName");
lastName.setAttribute("placeholder","Pageau");
lastName.addEventListener("change", function verifierNom(){
    let nom = lastName.value;
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(regex.test(nom)) { 
        contact.nom = nom;
        document.getElementById("lastNameErrorMsg").innerHTML = "";
    }else{
        document.getElementById("lastNameErrorMsg").innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//Adresse********************
let address = document.getElementById("address");
address.setAttribute("placeholder","7 bis rue du Pain 77358 Lyon");
address.addEventListener("change", function verifierAddress(){
    let adresse = address.value;
    const regex = /^([0-9]*) ?([a-zA-Z-,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)*$/;
    if(regex.test(adresse)) { 
        contact.adresse = adresse;
        document.getElementById("addressErrorMsg").innerHTML = "";
    }else{
        document.getElementById("addressErrorMsg").innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//Ville********************
let city = document.getElementById("city");
city.setAttribute("placeholder","Lyon");
city.addEventListener("change", function verifierCity(){
    let ville = city.value;
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(regex.test(ville)) { 
        contact.ville = ville;
        document.getElementById("cityErrorMsg").innerHTML = "";
    }else{
        document.getElementById("cityErrorMsg").innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//E-mail********************
let email = document.getElementById("email");
email.setAttribute("placeholder","sebastien.pageau125@hotmail.fr");
email.addEventListener("change", function verifierEmail(){
    let courrier = email.value;
    const regex = /^(^([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if(regex.test(courrier)) { 
        contact.email = courrier;
        document.getElementById("emailErrorMsg").innerHTML = "";
    }else{
        document.getElementById("emailErrorMsg").innerHTML = "veuillez respecter la syntaxe";
    }; 
});


//Objet contact________________________________________________
contact = {
    prenom : firstName.value,
    nom : lastName.value,
    adresse : address.value,
    ville : city.value,
    email : email.value
};
const tableauContact = [contact];
console.log(tableauContact);

localStorage.setItem("contact", JSON.stringify(tableauContact));