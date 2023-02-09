// import { loadJsonFetch } from "./fetch.js";
import { loadJsonFetch } from "./genshin-resultcard.js";
import "./genshin-resultcard.js";
import { db, likedCharacterPath, ref, set, push, pushLikedCharacterToCloud, onValue } from"./firebase.js"
// import {resultsJson} from "./fetch.js"

console.log("app page loaded");


let limitParam = "1";
const genshinURL = "https://api.genshin.dev"
const genshinCharacterURL = "/characters"
//Key for local storage
let key = "gag7616-p1-settings";
let results2;
let resultsJson;

//UI References
let btnClearAll = null,
    btnSearch = null,
    elementCardHolder = null,
    elementStatus = null,
    fieldBreed = null,
    fieldLimit = null;

//Note that this is a function, that reconstructs the dogURL everytime it is called
const characterURL = () => `${genshinURL}${genshinCharacterURL}${limitParam}`;

let queriedNames = [];

const init = () => {
    btnClearAll = document.querySelector("#btn-clear-all");
    btnSearch = document.querySelector("#btn-search");
    elementCardHolder = document.querySelector("#element-card-holder");
    elementStatus = document.querySelector("#element-status");
    fieldBreed = document.querySelector("#field-breed");
    fieldLimit = document.querySelector("#field-limit");




    // Event Handlers
    btnSearch.onclick = async (evt) => {

        await loadJsonFetch();
        evt.target.classList.add("is-loading");
        createResultCards();
        evt.target.classList.remove("is-loading");
    };
    btnClearAll.onclick = () => {
        elementCardHolder.innerHTML = "";
    }

    
    




    const createResultCards = () => {
        let newCard = document.createElement("genshin-resultcard");
        elementCardHolder.appendChild(newCard);
        console.log(`Created Result Card`);
    }


    // fieldLimit.onchange = (evt) => {
    //     limitParam = evt.target.value;
    // };




}
init();