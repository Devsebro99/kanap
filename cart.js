
fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
        return res.json();
        }})
    .then((value) => {
        //Générer l'affichage des articles du panier
        let objet;
        const kanap = JSON.parse(localStorage.getItem("kanap"));

        function genererHtml(){
            for(let i = 0 ; i < kanap.length ; i++){
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

        //Calcul du prix total et quantité total de tous les articles du panier
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

        //Ecoute l'evenement sur les quantitées pour les modifier dans le localStorage
        let objetSelect;
        let memeIdColor;
        const itemQuantity = document.querySelectorAll(".itemQuantity");
        for (let qtyInput of itemQuantity) {
            qtyInput.addEventListener("change", (e) => {
                const newQuantity = e.target.value;
                        
                objetSelect = {
                    id : e.target.dataset.id,
                    color : e.target.dataset.color,
                    nombre : e.target.value
                }

                // Trouve et modifie la quantitée du produit sélectionné
                function quantiteSelectionner(){
                    let tableauLocalStorage = JSON.parse(localStorage.getItem("kanap"));  
                    memeIdColor = tableauLocalStorage.find((o) => o.id === objetSelect.id && o.color === objetSelect.color);               
                    memeIdColor.quantite = objetSelect.nombre;
                }

                // Validation de la nouvelle valeur et insertion dans le LocalStorage
                function validationLocalStorage(){
                    for(let i = 0 ; i < kanap.length ; i++){
                        if (kanap[i].id == memeIdColor.id && kanap[i].color == memeIdColor.color){
                            const objetSupprimer = kanap.splice(i, 1);
                            kanap.splice(i, 0, memeIdColor);
                            localStorage.setItem('kanap', JSON.stringify(kanap));
                        }else{
                        }               
                    }
                }
                quantiteSelectionner()
                validationLocalStorage();
                calcul();
            });         
        }

        // Supprimer un article avec le bouton supprimer
        function boutonSupprimer(){
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
        }
        boutonSupprimer();
        calcul();  
    })
.catch(function(err){});


// Formulaire test Regex____________________________________

//Test validation de formulaire (regex)
function testFormulaire(para1 , para2 , para3){
    if(para1 .test(para2)){ 
        para3.setAttribute("style","color:#0AFF0E");
        para3.innerHTML = "Valide";
    }else{
        para3.setAttribute("style","color:red");
        para3.innerHTML = "Veuillez respecter la syntaxe";
    }; 
}

//Prénom********************
let errorMsgFirstName;
let elementFirstName;
function prenom(){
    document.getElementById("firstName").setAttribute("placeholder","Sébastien");
    errorMsgFirstName = document.getElementById("firstNameErrorMsg");
    elementFirstName = document.getElementById("firstName");
    elementFirstName.addEventListener("change", function verifierPrenom(){
        regexFirstName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        testFormulaire(regexFirstName , elementFirstName.value , errorMsgFirstName);
    });
}
//Nom********************
let errorMsgLastName;
let elementLastName;
function nom(){
    document.getElementById("lastName").setAttribute("placeholder","Pageau");
    errorMsgLastName = document.getElementById("lastNameErrorMsg");
    elementLastName = document.getElementById("lastName");
    elementLastName.addEventListener("change", function verifierNom(){
        regexLastName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        testFormulaire(regexLastName , elementLastName.value , errorMsgLastName);
    });
}
//Adresse********************
let errorMsgAddress;
let elementAddress;
function adresse(){
    document.getElementById("address").setAttribute("placeholder","7 bis rue du Pain 77358 Lyon");
    errorMsgAddress = document.getElementById("addressErrorMsg");
    elementAddress = document.getElementById("address");
    elementAddress.addEventListener("change", function verifierAddress(){
        regexAddress = /^([0-9]*) ?([a-zA-Z-,\. ]*) ?([0-9]{5}) ?([a-zA-Z]*)*$/;
        testFormulaire(regexAddress , elementAddress.value , errorMsgAddress);
    });
}
//Ville********************
let errorMsgCity
let elementCity
function ville(){
    document.getElementById("city").setAttribute("placeholder","Lyon");
    errorMsgCity = document.getElementById("cityErrorMsg");
    elementCity = document.getElementById("city");
    elementCity.addEventListener("change", function verifierCity(){
        regexCity = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
        testFormulaire(regexCity , elementCity.value , errorMsgCity);
    });
}
//E-mail********************
let errorMsgEmail;
let elementEmail;
function email(){
    document.getElementById("email").setAttribute("placeholder","sebastien.pageau125@hotmail.fr");
    errorMsgEmail = document.getElementById("emailErrorMsg");
    elementEmail = document.getElementById("email");
    elementEmail.addEventListener("change", function verifierEmail(){
        regexEmail = /^(^([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
        testFormulaire(regexEmail , elementEmail.value , errorMsgEmail);
    });
}

prenom();
nom();
adresse();
ville();
email();

//Dernier test de validation du formulaire entier avant la recupération du numero de commande et de son envoi
let contact;
let commande = document.getElementById("order");
commande.addEventListener("click",function commander(e){ 
    if(errorMsgFirstName.innerHTML != "Valide" || errorMsgLastName.innerHTML != "Valide" || errorMsgAddress.innerHTML != "Valide" || errorMsgCity.innerHTML != "Valide" || errorMsgEmail.innerHTML != "Valide"){
      alert("Le formulaire n'est pas valide");     
    }else{
        contact = {
            firstName : elementFirstName.value,
            lastName : elementLastName.value,
            address : elementAddress.value,
            city : elementCity.value,
            email : elementEmail.value
        };  

        const kanap = JSON.parse(localStorage.getItem("kanap"));        
        let productIds = kanap.map(o => o.id); 

        //Objet qui regroupe la liste des canapés et le formulaire
        let dataUser = {
            contact: contact,
            products: productIds,
        }
        
        fetch('http://localhost:3000/api/products/order',{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(dataUser) 
            })
        .then((res) => res.json())
        .then((data) => {
           window.location.href="../html/confirmation.html?orderId="+data.orderId;
        })
        .catch(() => {})
        e.preventDefault();
    };
});

    