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
                    const objet = {
                        id : idArticle , 
                        color : myColor , 
                        quantity : quantity,
                        price : priceArticle,
                        image : imageArticle,
                        name : nameArticle,
                        description : descriptionArticle
                    }; 

                    let objetKey;
                    for (var z = 0; z < localStorage.length; z++) {
                        objetKey = JSON.parse(localStorage.getItem(localStorage.key(z)));
                    }

                    // Vérifier si la selection de couleur et quantité est egale à null, 
                    // undefined ou "0" si oui alors alerte sinon continue
                    if((myColor === null || myColor === undefined)  || (quantity == 0 || quantity == undefined || quantity == null)){                
                        alert("Vous devez choisir une couleur et une quantité")
                    }else{  
                        let quantity;
                        if(objetKey == undefined){
                            localStorage.setItem(`kanap${0}`,JSON.stringify(objet));
                        }else{
                            
                                if((idArticle == objetKey.id) || (myColor != objetKey.color)){
                                    let r ;
                                    localStorage.setItem(`kanap${r}`,JSON.stringify(objet));
                                    return r = r + 1;
                                }else{
                                    localStorage.setItem(`kanap${r}`,JSON.stringify(quantity = objetKey.quantity + quantity));
                                    
                                }
                            
                        };       
                            
                        
                        

                        // let key;
                        // for (var z = 0; z < localStorage.length; z++) {
                        //     key = JSON.parse(localStorage.getItem(localStorage.key(z)));
                        // }
                        // let color;
                        // let id;
                        // if((idArticle == key.id)){  
                        //     if(color == key.color){
                        //         let ajoutQuantity = key.quantity + quantity;
                        //         console.log(ajoutQuantity);
                        //         localStorage.setItem(idArticle,JSON.stringify(objet));
                        //     }else{
                        //         localStorage.setItem(idArticle,JSON.stringify(objet));
                        //     };   
                        // }else{
                        //     localStorage.setItem(idArticle,JSON.stringify(objet));   
                        // }; 
                    }  
                    
                }); 
                
            }
        }
        
    }) 
    
    .catch(function(err){
        // Une erreur est survenue
    });
    
    
