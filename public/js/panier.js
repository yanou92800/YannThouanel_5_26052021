const apiUrl = "http://localhost:3000/api/cameras";

if (0 >= localStorage.length) {
  const basketEmpty = document.getElementById("basketEmpty"); //Si panier vide supprimer le hidden du "panier vide"
  basketEmpty.classList.remove("hidden");
  basketFull.classList.add("hidden");
} else {
  let priceTotalBasket = 0;
  const basketFull = document.getElementById("basketFull"); // Sinon afficher le tableau du panier
  basketFull.classList.remove("visually-hidden");
  for (let i = 0; i < localStorage.length; i++) { // Créer boucle, pour chaque ajout dans panier, rajouter article dans tableau
    fetch(apiUrl + `/${localStorage.key(i)}`)
      .then((res) => res.json())
      .then((article) => {
        const key = localStorage.key(i);
        const amountProduct = parseInt(localStorage.getItem(key));
        priceTotalBasket = priceTotalBasket += (article.price * amountProduct) / 100;

        const lineBoard = document.createElement("tr");

        const tdProduct = document.createElement("td");
        tdProduct.innerHTML = article.name;
        tdProduct.classList.add("text-center", "border");
        const tdImage = document.createElement("img"); // Créer img
        tdImage.src = article.imageUrl; // Mettre le lien serveur de l'image
        tdImage.alt = "Image caméra"; // Ajout alt à image
        tdImage.setAttribute("height", "100");
        tdImage.classList.add("p-1", "border-top");
        const tdPriceUnitary = document.createElement("td");
        tdPriceUnitary.innerHTML = article.price / 100;
        tdPriceUnitary.classList.add("text-center", "border");
        const tdAmount = document.createElement("td");
        tdAmount.innerHTML = amountProduct;
        tdAmount.classList.add("text-center", "border");
        const tdPriceTotal = document.createElement("td");
        tdPriceTotal.innerHTML = (article.price * amountProduct) / 100;
        tdPriceTotal.classList.add("text-center", "border");
        const tdRemove = document.createElement("td");
        tdRemove.classList.add("text-center" , "border");
        const tdBtn = document.createElement("button");
        tdBtn.classList.add("btn", "btn-dark");
        tdBtn.setAttribute("id", key);
        const tdIcon = document.createElement("i");
        tdIcon.classList.add("far", "fa-trash-alt");

        tdBtn.append(tdIcon);

        tdRemove.append(tdBtn);

        lineBoard.append(tdProduct);
        lineBoard.append(tdImage);
        lineBoard.append(tdPriceUnitary);
        lineBoard.append(tdAmount);
        lineBoard.append(tdPriceTotal);
        lineBoard.append(tdRemove);

        const board = document.getElementById("boardBasket");
        board.append(lineBoard);

        const totalPriceBasket = document.getElementById("totalPriceBasket");
        totalPriceBasket.innerHTML = priceTotalBasket;

        const btnId = document.getElementById(key);
        btnId.addEventListener("click", function () {
          localStorage.removeItem(key);
          board.removeChild(lineBoard);
          priceTotalBasket =
            priceTotalBasket - (article.price * amountProduct) / 100;
          totalPriceBasket.innerHTML = priceTotalBasket;
          if (0 >= localStorage.length) {
            const basketFull = document.getElementById("basketFull"); //Si article dans panier, ajouter hidden dans panier full et supprimer hidden de panier vide
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

// Creation de la requete post en utilisant fetch pour le formulaire
// initialisation
let contact = {};
let products = [];
// recuperation du formulaire + ecoute au submit
const formClient = document.getElementById("formClient");
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
      const priceTotal = totalPriceBasket.innerHTML;
      localStorage.clear();
      localStorage.setItem("orderId", `${article.orderId}`);
      localStorage.setItem("priceTotal", `${priceTotal}`);
      window.location.assign("./commande.html");
    });
});