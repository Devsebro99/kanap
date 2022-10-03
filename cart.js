
fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
        return res.json();
        }})
    .then((value) => {
        //Récupération de kanap en objet
        const kanap = JSON.parse(localStorage.getItem("kanap"));
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
                tableauTotalprice.push(kanap[p].quantite * objet.price); 
                sumPrice += tableauTotalprice[p];
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
            });
        } 
        //Calcul du prix total et quantité total de tous les articles du panier
        calcul();  
    })
.catch(function(err){
    // Une erreur est survenue
});


// Formulaire test Regex____________________________________
//Objet contact
let contact = {
    firstName : firstName.value,
    lastName : lastName.value,
    address : address.value,
    city : city.value,
    email : email.value
};       

//Prénom********************
document.getElementById("firstName").setAttribute("placeholder","Sébastien")
let errorMsgFirstName = document.getElementById("firstNameErrorMsg");
let elementFirstName = document.getElementById("firstName");
elementFirstName.addEventListener("change", function verifierPrenom(){
    let prenom = elementFirstName.value;
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(regex.test(prenom)) { 
        contact.firstName = prenom;
        errorMsgFirstName.setAttribute("style","color:#0AFF0E");
        errorMsgFirstName.innerHTML = "Valide";
        
    }else{
        errorMsgFirstName.setAttribute("style","color:red");
        errorMsgFirstName.innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//Nom********************
document.getElementById("lastName").setAttribute("placeholder","Pageau");
let errorMsgLastName = document.getElementById("lastNameErrorMsg");
let elementLastName = document.getElementById("lastName");
elementLastName.addEventListener("change", function verifierNom(){
    let nom = elementLastName.value;
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(regex.test(nom)) { 
        contact.lastName = nom;
        errorMsgLastName.setAttribute("style","color:#0AFF0E");
        errorMsgLastName.innerHTML = "Valide";
    }else{
        errorMsgLastName.setAttribute("style","color:red");
        errorMsgLastName.innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//Adresse********************
document.getElementById("address").setAttribute("placeholder","7 bis rue du Pain 77358 Lyon");
let errorMsgAddress = document.getElementById("addressErrorMsg");
let elementAddress = document.getElementById("address");
elementAddress.addEventListener("change", function verifierAddress(){
    let adresse = elementAddress.value;
    const regex = /^([0-9]*) ?([a-zA-Z-,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)*$/;
    if(regex.test(adresse)) { 
        contact.address = adresse;
        errorMsgAddress.setAttribute("style","color:#0AFF0E");
        errorMsgAddress.innerHTML = "Valide";
    }else{
        errorMsgAddress.setAttribute("style","color:red");
        errorMsgAddress.innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//Ville********************
document.getElementById("city").setAttribute("placeholder","Lyon");
let errorMsgCity = document.getElementById("cityErrorMsg");
let elementCity = document.getElementById("city");
elementCity.addEventListener("change", function verifierCity(){
    let ville = elementCity.value;
    const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    if(regex.test(ville)) { 
        contact.city = ville;
        errorMsgCity.setAttribute("style","color:#0AFF0E");
        errorMsgCity.innerHTML = "Valide";
    }else{
        errorMsgCity.setAttribute("style","color:red");
        errorMsgCity.innerHTML = "veuillez respecter la syntaxe";
    }; 
});

//E-mail********************
document.getElementById("email").setAttribute("placeholder","sebastien.pageau125@hotmail.fr");
let errorMsgEmail = document.getElementById("emailErrorMsg");
let elementEmail = document.getElementById("email");
elementEmail.addEventListener("change", function verifierEmail(){
    let courrier = elementEmail.value;
    const regex = /^(^([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    if(regex.test(courrier)) { 
        contact.email = courrier;
        errorMsgEmail.setAttribute("style","color:#0AFF0E");
        errorMsgEmail.innerHTML = "Valide";
    }else{
        errorMsgEmail.setAttribute("style","color:red");
        errorMsgEmail.innerHTML = "veuillez respecter la syntaxe";
    }; 
});


let commande = document.getElementById("order");
commande.addEventListener("click",function commander(e){ 
    if(errorMsgFirstName.innerHTML != "Valide" || errorMsgLastName.innerHTML != "Valide" || errorMsgAddress.innerHTML != "Valide" || errorMsgCity.innerHTML != "Valide" || errorMsgEmail.innerHTML != "Valide"){
      alert("Le formulaire n'est pas valide");     
    }else{
        //Tableau d'objet Canapé
        const kanap = JSON.parse(localStorage.getItem("kanap"));
        
        //Objet qui regroupe la liste d'objet et le formulaire
        let dataUser = {
            contact: contact,
            products: kanap,
        }

        fetch("http://localhost:3000/api/products/order", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(dataUser) 
            })
        .then((res) => res.json())
        .then((data) => (data))
        .catch(() => {})

        // window.open("../html/confirmation.html");
        e.preventDefault();
    };
});

    