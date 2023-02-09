import { loadJsonFetch } from "./genshin-resultcard.js";
import "./genshin-favoritecard.js";
import { getLocalStorage, clearLocalStorage } from "./local-storage-favorites.js";

let favorites = [];

function init () {
    loadFavorites();
}

let elementCardHolder = document.querySelector("#element-card-holder");
let clearButton = document.querySelector("#btn-clear-all")
clearButton.onclick = () => {
    elementCardHolder.innerHTML = "";
    clearLocalStorage();
    
}
const loadFavorites = async() => {
    console.log("** In app.js - Now we can call any method we want to here");
        // TODO: now add this dog to favorites
        favorites = await getLocalStorage();
        console.log(favorites);
        for (let favorite of favorites){
            let newCard = document.createElement("genshin-favoritecard");
            newCard.setUrl(favorite.character_src);
            newCard.name = favorite.character_name;
            newCard.vision = ` ${favorite.character_vision}`;
            newCard.src = favorite.character_src;
            newCard.likes = "";
            console.log (`Fav Src: ${newCard.src}`);
            elementCardHolder.appendChild(newCard);

        }
        
        // localStorage.setItem("gag7616", url);
}

init();
// addEventListener('onload', loadFavorites);
