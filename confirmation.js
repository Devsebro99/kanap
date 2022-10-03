
fetch("http://localhost:3000/api/products/order")
.then((res) => {
    if (res.ok) {
    return res.json();
    }})
.then((data) => {data})
.catch(function(err){
    // Une erreur est survenue
});