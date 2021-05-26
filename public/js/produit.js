// On récupère l'ID dans l'URL
const params = new URLSearchParams(window.location.search);
const productID = params.get("id"); 

// On récupère le produit
fetch("http://localhost:3000/api/cameras" + `/${productID}`)
  .then(function(res){
    if(res.ok){
      return res.json()
    }
  })
  .then(function(article){ // On récupère le produit et intégre le html
    row.innerHTML = `
            <div class="col-6">
              <img class="coverImg" src="${article.imageUrl}" alt="" width="476" height="375">
            </div>
            <div class="col-6">
              <h1 class="h3 text-center">${article.name}</h1>
              <p class="col-lg-11 mt-4 px-0">${article.description}</p>
              <p>${article.price / 100} €</p>
              <select class="form-select  mb-3 mt-4" id="selectLense"></select>
              <div class="row mt-5 justify-content-between">
                <div class="col-lg-3 col-md-3 mb-3 d-flex" id="choiceTotal">
                  <button class="btn btn-primary btn-purple" type="button" id="Down">-</button>
                  <input id="totalProduct" type="text" class="form-control text-center" aria-label="Quantité de produit" value="1"  minlength="1" maxlength="2">
                  <button class="btn btn-primary btn-purple" type="button" id="Up">+</button>
                </div>
                <div class="col-lg-4">
                  <button type="submit" class="btn btn-primary btn-purple p-2" id="${productID}">Ajouter au panier</button>
                </div>
            </div>`;

    //creation des options lentilles de produit
    for (let i = 0; i < article.lenses.length; i++) {
      const selectElement = document.getElementById("selectLense"); // on recupere notre selecteur en le nommant selectElement
      const optionElement = document.createElement("option"); // on nomme les option qu'il y aura dedans optionElement et on la créé avec createElement
      optionElement.setAttribute("value", `${article.lenses[i]}`); // on lui rajoute les value de tous les elements qui trouve
      optionElement.textContent = `${article.lenses[i]}`; // on lui rajoute la meme chose que au dessu mais en partie visible (text)
      selectElement.append(optionElement); // on mets les options dans selectElement
    }
    // creation de la gestion du nombre de d'article
    let totalProduct = document.getElementById("totalProduct"); // on recupere notre element html et on le nomme

    let btnUp = document.getElementById("Up"); // on recupere notre bouton Up et on le nome btnUp
    btnUp.addEventListener("click", function () {
      // on ecoute le boutton avec addEventListener et on lui dit que des que quelqu'un click dessu, cela active la function
      if (totalProduct.value < 99) {
        // la on dit, si la quantité (value) et inferieur a 99 alors exectute le code suivant
        totalProduct.value++; // rajoute 1
      }
    });

    let btnDown = document.getElementById("Down");
    btnDown.addEventListener("click", function () {
      if (totalProduct.value > 1) {
        totalProduct.value--;
      }
    });

    document.getElementById(article._id).addEventListener("click", function () {
      let numberTotalInput = parseInt(totalProduct.value); // on vien recupéré le nombre total qu'il y a dans le input en noubliant pas le PARSEINT et en le nommant
      //fonction pour le nombre d'article qui s'affiche dans le panier (on fait apelle a deux autre function)
      let numberProduct = searchProductStorage(article._id); // on lui dit que nombre produit est egale au nombre de la function apeller (donc la valeur de chaque key)
      numberProduct += numberTotalInput; // on lui dit qu'il rajoute 1 a chaque click (grace a la function click apeller au dessu )
      localStorage.setItem(article._id, numberProduct); // on lui de re ajouter la key avec ca nouvelle valeur  (+1)
      upProduct(); // on apelle la function qui nous sert a afficher et aditioner la valeur a coté du mot panier de la bare de nav
    });
    upProduct(); // ici je refait apelle la fonction qui sert d'affichage a coté de panier mais en dehor de la function (car cette function sactive au click, donc en refrsh la page tent que je click pas cela ne safiche pas)
  })
  .catch(function (error) {
    alert("Erreur : Veuillez réessayer plus tard \n" + error); // ici on vient rajouter une erreur si jamais la fonction ne fonctionne pas
  });

  //  fonction pour rechercher les produits dans le localStorage
function searchProductStorage(storageProductId) { //recherche produit id du serveur
  if (localStorage.getItem(storageProductId)) { // si tu trouves l'ID
    return parseInt(localStorage.getItem(storageProductId)); //retourne la valeur
  } else {
    return 0;
}
};
//  fonction pour additionner le nombre total d'articles dans le panier 
function upProduct() {
  let numberProductBasket = document.getElementById("numberProductBasket");
  if (localStorage.length < 1) {
    numberProductBasket.textContent = "";
  } else {
    let valueBasket = 0;

    for (let i = 0; i < localStorage.length; i++) {
      valueBasket += parseInt(localStorage.getItem(localStorage.key(i)));
    }
    if (valueBasket !== 0) {
      numberProductBasket.textContent = valueBasket;
    }
  }
};