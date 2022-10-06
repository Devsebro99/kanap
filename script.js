fetch("http://localhost:3000/api/products")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }})
    .then(function(value){
        //Boucle "For" pour créer le nombre d'objet "article" selon l'API
        for ( let i=0 ; i<value.length ; i++) {
            document.getElementById("items").innerHTML += `
            <a href="../html/product.html?Id=${value[i]._id}"> 
                <article> 
                    <img src="${value[i].imageUrl}" alt="${value[i].altTxt}">
                    <h3 class="productName">${value[i].name}</h3> 
                    <p class="productDescription">${value[i].description}</p>
                </article> 
            </a>`;
        }  
    })        
    .catch(function(err) {
        // Une erreur est survenue
    });


    
    
        
