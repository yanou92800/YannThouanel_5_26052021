// Exécution immédiate de la fonction
(async function () {
    const articles = await getAllArticles();  //Créer une variable pour les articles, await permet d'attendre la résolution d'une promesse
    for (let i = 0; i < articles.length; i++) { // Dès qu'il y a moins que la totalité des articles dans l'api ça rajoute
      displayArticle(articles[i]); // J'appelle la fonction pour rajouter les articles
    }
  })();
  
  function getAllArticles() {
    return fetch("http://localhost:3000/api/cameras")
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        alert(error);
      });
  }
  
  function displayArticle(article) { //Fonction pour rajouter article avec contenu spécifique
    const col = document.createElement("div");
    col.classList.add("col-lg-4", "container", "col-md-6", "col-sm-12", "my-3");
  
    const card = document.createElement("div"); // Créer div
    card.classList.add("card"); // Ajouter à la div une classe card
  
    const cardImage = document.createElement("img"); // Créer img
    cardImage.classList.add("card__image"); // Ajouter class image
    cardImage.src = article.imageUrl; // Mettre le lien serveur de l'image
    cardImage.alt = "Image caméra"; // Ajout alt à image
    cardImage.href = "produit.html?id=" + article._id;
    cardImage.setAttribute("height", "210");
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card__body", "m-3");
  
    const cardBodyName = document.createElement("h2"); // Créer h2
    cardBodyName.classList.add("card__body__name"); // Ajouter class card__name
    cardBodyName.innerText = article.name; // Mettre le lien serveur du name
  
    const cardBodyDescription = document.createElement("p"); // Créer p
    cardBodyDescription.classList.add("card__body__description"); // Ajouter class card__description
    cardBodyDescription.innerText = article.description; // Mettre le lien serveur description
  
    const cardBtn = document.createElement("div");
    cardBtn.classList.add("card__btn", "d-flex", "justify-content-between", "align-items-center", "m-3");
  
    const cardBtnView = document.createElement("a");
    cardBtnView.classList.add("card__btn__view", "btn", "btn-outline-primary");
    cardBtnView.innerText = "Voir le produit";
    cardBtnView.setAttribute("href", "produit.html?id=" + article._id);
  
    const cardBtnBuy = document.createElement("button");
    cardBtnBuy.classList.add("card__btn__buy", "btn", "btn-outline-primary");
    cardBtnBuy.innerText = "Acheter";
    cardBtnBuy.setAttribute("id", article._id);
  
    container.append(row);
    row.append(col);
    col.append(card); // card enfant de container
    card.append(cardImage); // img enfant de card
    card.append(cardBody);
    cardBody.append(cardBodyName); // div name enfant de card
    cardBody.append(cardBodyDescription); // div description enfant de description
    card.append(cardBtn);
    cardBtn.append(cardBtnView);
    cardBtn.append(cardBtnBuy);
  
    document.getElementById(article._id).addEventListener("click", function () {
      let numberProduct = searchProductStorage(article._id); // on lui dit que nombre produit est egale au nombre de la function apeller (donc la valeur de chaque key)
      numberProduct++;
      localStorage.setItem(article._id, numberProduct); // on lui de re ajouter la key avec ca nouvelle valeur  (+1)
      upProduct(); // on apelle la function qui nous sert a afficher et aditioner la valeur a coté du mot panier de la bare de nav
    });
    upProduct(); // ici je refais appel la fonction qui sert d'affichage a coté de panier mais en dehor de la function (car cette function sactive au click, donc en refrsh la page tent que je click pas cela ne safiche pas)
  };
  
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