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
            <div class="col-lg-5 col-0 px-0">
              <img class="imgProduct" src="${article.imageUrl}" alt="">
            </div>
            <div class="col-lg-7" data-children-count="2">
              <h1 class="h3 text-center my-3">${article.name}</h1>
              <p class="col-lg-11 mt-4 px-0">${article.description}</p>
              <p><strong>${article.price / 100} €</strong></p>
              <select class="form-select  mb-3 mt-4" id="selectLense"></select>
              <div class="row mt-5 justify-content-between">
                <div class="col-lg-3 col-md-3 mb-3 d-flex" id="choiceTotal">
                  <button class="btn btn-dark" type="button" id="Down">-</button>
                  <input id="totalProduct" type="text" class="form-control text-center" aria-label="Quantité de produit" value="1"  minlength="1" maxlength="2">
                  <button class="btn btn-dark" type="button" id="Up">+</button>
                </div>
                <div class="col-lg-4">
                  <button type="submit" class="btn btn-dark p-2" id="${productID}">Ajouter au panier</button>
                </div>
            </div>`;

    //creation des options lentilles de produit
    for (let i = 0; i < article.lenses.length; i++) {
      const selectElement = document.getElementById("selectLense"); // on recupere notre selecteur en le nommant selectLense
      const optionElement = document.createElement("option"); // on nomme les option qu'il y aura dedans option et on la créé avec createElement
      optionElement.setAttribute("value", `${article.lenses[i]}`); // on lui rajoute les value de tous les elements qui trouve
      optionElement.textContent = `${article.lenses[i]}`; // on lui rajoute la meme chose que au dessus mais en partie visible (texte)
      selectElement.appendChild(optionElement); // on met les optionElement dans selectElement
    }
    // creation de la gestion du nombre de d'article
    const totalProduct = document.getElementById("totalProduct"); // on recupere notre element html et on le nomme

    const btnUp = document.getElementById("Up"); // on recupere notre bouton Up et on le nome btnUp
    btnUp.addEventListener("click", function () {
      // on ecoute le boutton avec addEventListener et on lui dit que des que quelqu'un click dessus, cela active la function
      if (totalProduct.value < 99) {
        // si la quantité est inferieur à 99 =>
        totalProduct.value++; // On rajoute 1 à chaque clique
      }
    });

    const btnDown = document.getElementById("Down"); // On va chercher l'id
    btnDown.addEventListener("click", function () { // a chaque clique
      if (totalProduct.value > 1) { //si supérieur à 1
        totalProduct.value--; // On enlève 1
      }
    });

    document.getElementById(article._id).addEventListener("click", function () { // on dit que lorsque ça clique sur up ou down ça ajoute/enlève l'article en question dans le panier
      let numberTotalInput = parseInt(totalProduct.value); // on vient recupérer le nombre total qu'il y a dans le input en n'oubliant pas le PARSEINT et en le nommant
      //fonction pour le nombre d'article qui s'affiche dans le panier (on fait appelle a deux autre function)
      let numberProduct = searchProductStorage(article._id); // on lui dit que nombre produit est egale au nombre de la function appellée (donc la valeur de chaque key)
      numberProduct += numberTotalInput; // on lui dit qu'il rajoute 1 a chaque click (grace a la function click apeller au dessus )
      localStorage.setItem(article._id, numberProduct); // on lui de rajouter la key avec sa nouvelle valeur  (+1)
      upProduct(); // on appelle la function qui nous sert a afficher et aditioner la valeur a coté du mot panier de la bare de nav
    });
    upProduct(); // ici je refais appelle à la fonction qui sert d'affichage à coté de panier mais en dehors de la function (car cette function s'active au click, donc ça refresh la page tant que je click pas cela ne s'affiche pas)
  })
  .catch(function (error) {
    alert("Erreur : Veuillez réessayer plus tard \n" + error); // ici on vient rajouter une erreur si jamais la fonction ne fonctionne pas
  });

 //  fonction pour rechercher les produits dans le localStorage
 function searchProductStorage(storageProductId) { //recherche produit id du serveur
  if (localStorage.getItem(storageProductId)) { // si tu trouves l'ID
    return parseInt(localStorage.getItem(storageProductId)); //retourne la valeur
  } 
  return 0; // retourne 0 si vide
};
//  fonction pour additionner le nombre total d'articles dans le panier 
function upProduct() {
  const numberProductBasket = document.getElementById("numberProductBasket");
  if (localStorage.length < 1) {
    numberProductBasket.textContent = ""; // si panier inférieur à 1 rien d'affiché
  } else {
    let valueBasket = 0; // valeur du panier

    for (let i = 0; i < localStorage.length; i++) {
      valueBasket += parseInt(localStorage.getItem(localStorage.key(i))); // retourne la valeur +1 (un entier) du serveur à chaque ajout
    }
    if (valueBasket !== 0) {
      numberProductBasket.textContent = valueBasket; //si valeur basket différent de 0 afficher nouvelle valeur basket
    }
  }
};