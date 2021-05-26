const apiUrl = "http://localhost:3000/api/cameras";

if (0 >= localStorage.length) {
  let basketEmpty = document.getElementById("basketEmpty");
  basketEmpty.classList.remove("hidden");
} else {
  let priceTotalBasket = 0;
  let basketFull = document.getElementById("basketFull");
  basketFull.classList.remove("visually-hidden");
  for (let i = 0; i < localStorage.length; i++) {
    fetch(apiUrl + `/${localStorage.key(i)}`)
      .then((res) => res.json())
      .then((article) => {
        let amountProduct = parseInt(localStorage.getItem(localStorage.key(i)));
        priceTotalBasket = priceTotalBasket +=
          (article.price * amountProduct) / 100;

        let lineBoard = document.createElement("tr");

        let tdProduct = document.createElement("td");
        tdProduct.innerHTML = article.name;
        let tdPriceUnitary = document.createElement("td");
        tdPriceUnitary.innerHTML = article.price / 100;
        let tdAmount = document.createElement("td");
        tdAmount.innerHTML = amountProduct;
        let tdpriceTotal = document.createElement("td");
        tdpriceTotal.innerHTML = (article.price * amountProduct) / 100;
        let tdRemove = document.createElement("td");
        let tdBtn = document.createElement("button");
        tdBtn.classList.add("btn", "btn-danger", "fts");
        tdBtn.setAttribute("id", localStorage.key(i));
        let tdIcon = document.createElement("i");
        tdIcon.classList.add("fas", "fa-trash-alt");

        tdBtn.append(tdIcon);

        tdRemove.append(tdBtn);

        lineBoard.append(tdProduct);
        lineBoard.append(tdPriceUnitary);
        lineBoard.append(tdAmount);
        lineBoard.append(tdpriceTotal);
        lineBoard.append(tdRemove);

        let board = document.getElementById("boardBasket");
        board.append(lineBoard);

        let totalPriceBasket = document.getElementById("totalPriceBasket");
        totalPriceBasket.innerHTML = priceTotalBasket;

        let btnId = document.getElementById(localStorage.key(i));
        btnId.addEventListener("click", function () {
          localStorage.removeItem(localStorage.key(i));
          board.removeChild(lineBoard);
          priceTotalBasket =
            priceTotalBasket - (article.price * amountProduct) / 100;
          totalPriceBasket.innerHTML = priceTotalBasket;
          if (0 >= localStorage.length) {
            let basketFull = document.getElementById("basketFull");
            basketFull.classList.add("hidden");
            basketEmpty.classList.remove("hidden");
          }
        });
      })
      .catch(function (error) {
        alert("Erreur : Veuillez réessayer plus tard \n" + error); // ici on vient rajouter une erreur si jamais la fonction ne fonctionne pas
      });
  }
}
// Creation de la requete post en utilisant fetch
// initialisation
let contact = {};
let products = [];
// recuperation du formulaire + ecoute au submit
let formClient = document.getElementById("formClient");
formClient.addEventListener("submit", function (form) {
  form.preventDefault();
  contact = {
    firstName: formClient.elements.prenom.value,
    lastName: formClient.elements.nom.value,
    address: formClient.elements.adresse.value,
    city: formClient.elements.ville.value,
    email: formClient.elements.email.value,
  };
  // on ajoute dans le board products, chaque id de produits trouver dans le localStorage
  for (let i = 0; i < localStorage.length; i++) {
    products.push(localStorage.key(i));
  }
  // envoi au server avec fetch en passant par la methode post
  fetch(apiUrl + "/order", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ contact, products }),
  })
    .then((res) => res.json())
    .then((article) => {
      let priceTotal = totalPriceBasket.innerHTML;
      localStorage.clear();
      localStorage.setItem("orderId", `${article.orderId}`);
      localStorage.setItem("priceTotal", `${priceTotal}`);
      window.location.assign("./commande.html");
    });
});