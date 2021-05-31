if (localStorage.getItem("orderId")) {
    let CommandTrue = document.getElementById("containerCommandTrue");
    CommandTrue.classList.remove("hidden");
    let h3PriceTotal = document.createElement("h3");
    h3PriceTotal.classList.add("m-4");
    h3PriceTotal.innerHTML = `Prix total de votre commande: ${localStorage.getItem("priceTotal")} €`;
    let p = document.createElement("p")
    p.classList.add("h2")
    p.innerHTML = `Identifiant de commande: ${localStorage.getItem("orderId")}`;
    CommandTrue.append(h3PriceTotal);
    CommandTrue.append(p);
    
} else {
    let CommandFalse = document.getElementById("containerCommandFalse");
    CommandFalse.classList.remove("hidden")
}
localStorage.clear();