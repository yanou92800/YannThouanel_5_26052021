// Fonction pour récupérer et afficher la commande
function getCommand () {
if (localStorage.getItem("orderId")) {
    let CommandTrue = document.getElementById("containerCommandTrue");
    CommandTrue.classList.remove("hidden");
    let h3PriceTotal = document.createElement("h3");
    h3PriceTotal.classList.add("m-4");
    h3PriceTotal.innerHTML = `Prix total de votre commande: ${localStorage.getItem("priceTotal")} €`;
    let p = document.createElement("p")
    p.classList.add("h2")
    p.innerHTML = `Identifiant de commande: ${localStorage.getItem("orderId")}`;
    CommandTrue.appendChild(h3PriceTotal);
    CommandTrue.appendChild(p);
} else {
    let CommandFalse = document.getElementById("containerCommandFalse");
    CommandFalse.classList.remove("hidden")
}
}
getCommand();
localStorage.clear(); //une fois que la commande est validé le localstorage est vide
