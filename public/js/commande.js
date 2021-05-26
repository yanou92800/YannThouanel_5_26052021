if(localStorage.getItem("orderId")) {
    let CommandTrue = document.getElementById("containerCommandTrue");
    CommandTrue.classList.remove("hidden");
    let pCommandTrue = document.getElementById("pCommandTrue");
    pCommandTrue.classList.remove("hidden");
    let h1CommandTrue = document.getElementById("h1CommandTrue");
    h1CommandTrue.classList.remove("hidden");
    let pPriceTotal = document.createElement("p");
    pPriceTotal.classList.add("h2");
    pPriceTotal.classList.add("mb-4", "mt-4");
    pPriceTotal.innerHTML = `Prix total de votre commande: ${localStorage.getItem("priceTotal")} €`;
    let p = document.createElement("p")
    p.classList.add("h2")
    p.innerHTML = `Identifiant de commande: ${localStorage.getItem("orderId")}`;
    CommandTrue.append(pPriceTotal);
    CommandTrue.append(p);
    
} else {
    let CommandFalse = document.getElementById("containerCommandFalse");
    CommandFalse.classList.remove("hidden")
    let pCommandFalse = document.getElementById("pCommandFalse")
    pCommandFalse.classList.remove("hidden")
    let iconCommandFalse = document.getElementById("iconCommandFalse")
    iconCommandFalse.classList.remove("hidden")
    iconCommandFalse.classList.add("mb-5")
}
localStorage.clear();