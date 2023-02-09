import {saveToStorage, getLocalStorage, clearLocalStorage} from "./local-storage-favorites.js";
import {pushLikedCharacterToCloud} from "./firebase.js"


let globalResults, globalResultsJson;
let globalResultsEnemy, globalResultsJsonEnemy;

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<style>
img{
    border:2px solid black;
    background-color:white;
    padding:7px;
    box-shadow: 1px 1px 2px #333;
    margin:.1rem;
    width:300px;
  }
  #title::first-letter {
    text-transform:capitalize;
  }
  .card{
    height:500px;
    overflow: auto;
  }
  .enable-line-break {
    white-space: pre-wrap;
  }
  span{
    color: black;
    font-weight: bolder;
    font-family: Arial;
    font-size: 80%;
    display: flex;
    justify-content: center;
    max-width: 120%;
}   
</style>


<div class="card">
<div class="card-header-title is-size-4">
<i class="fas fa-gamepad mr-3"></i>
<span id="character-name">No Name</span>




</div>

<div class="control has-text-centered">


<div class="card-content">
  <div class="card-image has-text-centered"
    <figure class="image is-inline-block">
        <img id="character-image" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder Image">
    </figure>
</div>

<span id="character-vision"><br>No Vision</span>
<span id="character-likes"><br></span>

<div class="content pt-2">
<button 
  id="btn-favorite"
  class="button is-primary is-small"
  title="Favorite this Character Picture"
  >
  Favorite Me!
  </button>
</div>
  Click the <i><b>Favorite</b></i> Button to save me!
  </div>
  </div>
</div>

`;
class GenshinResultCard extends HTMLElement {
  static defaultImage = "https://via.placeholder.com/300x300";

  constructor() {
    super();
    this.attachShadow({ "mode": "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.characterName = this.shadowRoot.querySelector("#character-name");
    this.characterVision = this.shadowRoot.querySelector("#character-vision");
    this.characterImage = this.shadowRoot.querySelector("#character-image");

  }
  connectedCallback() {
    // this.shadowRoot.querySelector("#title").innerHTML = resultsJson.name;
    // this.shadowRoot.querySelector("#image-main").src = `${results.url}/icon.png`;
    this.characterName.innerHTML = globalResultsJson.name;
    this.characterVision.innerHTML = ` Vision:${globalResultsJson.vision}` ;
    this.characterImage.src = `${globalResults.url}/icon.png`;

    this.favoriteButton = this.shadowRoot.querySelector("#btn-favorite");
    // this.callback = this.callback || ((obj) => console.log(`Character: ${obj.title}, src: ${obj.src}`));
    // On Favorite Button being clicked, write the an object to local storagae
    // Additionally, write the name and the path to Firebase to increment likes
    this.favoriteButton.onclick = (evt) => {
      const dataObj = {
        "character_name": globalResultsJson.name,
        "character_vision": globalResultsJson.vision,
        "character_src": `${globalResults.url}/icon.png`
      };
      // this.connectedCallback(dataObj);
      saveToStorage(dataObj);
      // writeLocalStorage(dataObj);
      //Firebase
      pushLikedCharacterToCloud(globalResultsJson.name, globalResultsJson.vision, `${globalResults.url}/icon.png`);
      this.disableFavoriteButton();
      console.log(`${globalResultsJson.name} has been favorited`);
    };
  }
  disconnectedCallback() {
    // this.btnFavorite.onclick = null;
  }
  disableFavoriteButton () {
    this.favoriteButton.innerHTML = "Favorited!";
    this.favoriteButton.disabled = true;
    this.favoriteButton.classList.remove("is-primary");
    this.favoriteButton.classList.add("is-warning");
  }

}
customElements.define("genshin-resultcard", GenshinResultCard);

export async function loadJsonFetch() {
  let results, resultsJson;
  let resultsEnemy, resultsJsonEnemy;
  let input = document.querySelector(".character-storage").value;
  //Enemy text field
  let enemyInput = document.querySelector(".enemy-storage").value;
  //Trims down to get rid of any extra white space
  input = input.trim().toLowerCase();
  //Console Line for testing purposes
  let baseURL = "https://api.genshin.dev/";
  let baseURLEnemy = "https://api.genshin.dev/";

  if (input.length > 0) {
    baseURL += `characters/${input}`;
  }
  console.log(baseURL);

  try {
    results = await fetch(baseURL);
  }
  catch (err) {
    console.log(`There was an error of ${err}`);
  }
  try {
    resultsJson = await results.json();
  }
  catch (err) {
    console.log(`There was an error of ${err}`);
  }
  //Enemy
  enemyInput = enemyInput.trim().toLowerCase(); 
  if (enemyInput.length > 0) {
    baseURLEnemy += `enemies/${enemyInput}`;
  }
  console.log(baseURLEnemy);

  try {
    resultsEnemy = await fetch(baseURL);
  }
  catch (err) {
    console.log(`There was an error of ${err}`);
  }
  try {
    resultsJsonEnemy = await resultsEnemy.json();
  }
  catch (err) {
    console.log(`There was an error of ${err}`);
  }
  
  // document.querySelector("#results-name").innerHTML = resultsJson.name;
  // // document.querySelector("#results-vision").innerHTML = resultsJson.vision;
  // document.querySelector("#results-image").src = `${results.url}/gacha-splash.png`;
  globalResults = results;
  globalResultsJson = resultsJson;

  globalResultsEnemy = resultsEnemy;
  globalResultsJsonEnemy = resultsJsonEnemy;




}