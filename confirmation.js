
let page =`${window.location.href}`;
const articleIdUrl = page.substring(page.lastIndexOf( "=" )+1 );
document.getElementById("orderId").innerHTML = `${articleIdUrl}`;
localStorage.removeItem("kanap");