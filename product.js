//Récupère l'adresse URL de la page et recupère l'ID de l'URL
let page =`${window.location.href}`;
const articleIdUrl = page.substring(page.lastIndexOf( "=" )+1 );


fetch("http://localhost:3000/api/products")
    .then((res) => {
        if (res.ok) {
        return res.json();
        }})
    .then((value) => {
        console.log(value);
        //Boucle qui incrémente i selon le nombre d'article
        for( let i=0 ; i<value.length ; i++){
            //boucle if permet de comparer deux Ids
            if(articleIdUrl == value[i]._id){
                let idArticle = value[i]._id;
                
                //Afficher les informations sur la pages web
                const imageArticle = document.querySelector(".item__img").innerHTML = `<img src="${value[i].imageUrl}" alt="${value[i].altTxt}"/>`;
                const nameArticle = document.getElementById("title").innerHTML = `${value[i].name}`;
                const priceArticle = document.getElementById("price").innerHTML = `${value[i].price}`;
                const descriptionArticle = document.getElementById("description").innerHTML = `${value[i].description}`;
    
                //Affiche le choix des couleurs correspondant au produit
                for( let c=0 ; c<value[i].colors.length ; c++){
                    let colorsArticle = document.querySelector("#colors").innerHTML += `
                    <option value="${value[i].colors[c]}">${value[i].colors[c]} </option>`;
                }

                let myColor;
                //Récuperer le choix de l'utlisateur pour les couleurs
                let selectColors = document.querySelector("#colors");
                selectColors.addEventListener('change', function colorChoix(e){
                    myColor = e.target.value;          
                });

                let  quantity;
                //Récupérer le choix de la quantité de l'utilisateur
                let nombreArticle = document.getElementById("quantity");
                nombreArticle.addEventListener('change', function quantityChoix(n){
                    quantity = n.target.value 
                });



                //Sur clic du bouton "ajouter dans le panier"
                //les informations du produit sont stocké au localStorage si couleur et quantité est choisi
                const onClick = document.querySelector("#addToCart");
                onClick.addEventListener('click', function(){

                    let objet = {
                        id : idArticle,
                        name : nameArticle,
                        color : myColor,
                        quantite : quantity,
                        image : value[i].imageUrl,
                        price : priceArticle,
                        desciption : descriptionArticle,
                        altTxt : value[i].altTxt
                    }    

                   
                    //Met un message d'alerte quand des couleurs et quantités ne sont pas sélectionnées
                    if ((myColor == "" || myColor == undefined) || (quantity <= 0 || quantity == null)){
                        alert("Veuiller choisir une couleur et une quantité positive");  
                    }else{
                        
                        if(localStorage.getItem("kanap") === null){
                            const kanap = [objet];
                            localStorage.setItem("kanap", JSON.stringify(kanap))
                        }else{  
                            const precedentTableau = JSON.parse(localStorage.getItem("kanap"));  
                            
                            //nameColors , quantités et nameId sont toutes les couleurs ,quantités et ids du tableau de "precedentTableau".
                            let nameColors;  
                            let nameId;  
                            let nameQuantite;                  
                            for (i=0 ; i<precedentTableau.length ; i++){
                                nameColors = precedentTableau[i].color;
                                nameId = precedentTableau[i].id;
                                nameQuantite = precedentTableau[i].quantite;
                            }

                            console.log(objet.color === nameColors);
                            console.log(objet.id === nameId);
                            console.log(objet.quantite);
                            console.log(nameQuantite);

                            let additionQuantite;
                            if (objet.color === nameColors || objet.id === nameId){
                                additionQuantite = (objet.quantite + nameQuantite);
                               
                            };
                            console.log(additionQuantite);

                            precedentTableau.push(objet);
                            localStorage.setItem("kanap", JSON.stringify(precedentTableau));
                            
                        }; 
                    };
                }); 
            }
        }

    }) 
    
    .catch(function(err){
        // Une erreur est survenue
    });
    
    
