const apiUrl = "http://localhost:3000/api/cameras";

//Fonction pour afficher Formulaire et panier
function showBasket () {
if (0 >= localStorage.length) {
  const basketEmpty = document.getElementById("basketEmpty"); //Si panier vide supprimer le hidden du "panier vide"
  basketEmpty.classList.remove("hidden");
  basketFull.classList.add("hidden"); //rendre invisible le panier
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
        tdPriceUnitary.innerHTML = `${article.price / 100} €`;
        tdPriceUnitary.classList.add("text-center", "border");
        const tdAmount = document.createElement("td");
        tdAmount.innerHTML = amountProduct;
        tdAmount.classList.add("text-center", "border");
        const tdPriceTotal = document.createElement("td");
        tdPriceTotal.innerHTML = `${(article.price * amountProduct) / 100} €`;
        tdPriceTotal.classList.add("text-center", "border");
        const tdRemove = document.createElement("td");
        tdRemove.classList.add("text-center" , "border");
        const tdBtn = document.createElement("button");
        tdBtn.classList.add("btn", "btn-dark");
        tdBtn.setAttribute("id", key);
        const tdIcon = document.createElement("i");
        tdIcon.classList.add("far", "fa-trash-alt");

        tdBtn.appendChild(tdIcon);

        tdRemove.appendChild(tdBtn);

        lineBoard.appendChild(tdProduct);
        lineBoard.appendChild(tdImage);
        lineBoard.appendChild(tdPriceUnitary);
        lineBoard.appendChild(tdAmount);
        lineBoard.appendChild(tdPriceTotal);
        lineBoard.appendChild(tdRemove);

        const board = document.getElementById("boardBasket");
        board.appendChild(lineBoard);

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
}
showBasket();

// on ajoute dans le tableau panier, chaque id de produits trouvés dans le localStorage
let products = [];
for (let i = 0; i < localStorage.length; i++) {
 products.push(localStorage.key(i));
}

let contact = {}
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
  // envoi au server avec fetch en passant par la methode post son identifiant contact et ses produits
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
      // test console.log(localStorage.getItem("orderId"));
      // test console.log(localStorage.getItem("priceTotal"));
    });
});