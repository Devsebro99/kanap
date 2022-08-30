fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }})

    .then(function(value){
        console.log(value);

        //Récupération de kanap en objet
        const kanap = JSON.parse(localStorage.getItem("kanap"));
        


            if(kanap.id == value[i]._id){

                //Création de la partie HTML pour afficher tous les 
                //articles choisi par l'utilisateur
                let cardPanier = document.getElementById("cart__items").innerHTML = `
                    <article class="cart__item" data-id="${idArticle}" data-color="${colorsChoice}">
                        <div class="cart__item__img">
                            <img src="${value[i].imageUrl}" alt="${value[i].altTxt}">
                        </div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${value[i].name}</h2>
                                <p>Color : ${colorsChoice}</p>
                                <p>Prix : ${value[i].price}</p>
                            </div>
                            <div class="cart__item__content__settings">
                                <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${nomberArticle}">
                                </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                        </div>
                    </article>`;
            }else{
                alert("attention erreur critique")
            };
        


    })

    .catch(function(err) {
        // Une erreur est survenue
    });
