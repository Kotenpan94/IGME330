//THIS IS FOR FAVORITE CARD FOR DISPLAYING ON THE FAVORITES PAGE, NOT THE FOR RESULTS CARD (Note for Gabe)

import { saveToStorage, getLocalStorage, clearLocalStorage } from "./local-storage-favorites.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";



let globalResults, globalResultsJson;

const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
<style>
img{
    border:1px solid black;
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
<br>

</div>


<div class="card-content">
  <div class="card-image"
    <figure class="image">
        <img id="character-image" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder Image">
    </figure>
</div>

<span id="character-likes"><br></span>
<span id="character-vision">No Vision</span>



<div class="content pt-2">

  </div>
  </div>
</div>
`;
class GenshinFavoriteCard extends HTMLElement {
  static defaultImage = "https://via.placeholder.com/300x300";

  constructor() {
    super();
    this.attachShadow({ "mode": "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));


  }
  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {
    // this.btnFavorite.onclick = null;
  }
  render() {
    this.characterName = this.shadowRoot.querySelector("#character-name");
    this.characterVision = this.shadowRoot.querySelector("#character-vision");
    this.characterLikes = this.shadowRoot.querySelector("#character-likes");
    this.characterImage = this.shadowRoot.querySelector("#character-image");

    let image = this.getAttribute('data-image');

    this.characterName.innerHTML = this.name
    this.characterVision.innerHTML = ` Vision:${this.vision}`;
    this.characterLikes.innerHTML = this.likes;
    // this.characterImage.src = `${this.url}`;
    this.characterImage.src = this.url;


  }
  setUrl(imageUrl) {
    this.url = imageUrl;
  }
  setLikes(amount) {
    this.likes = amount;
  }

}
customElements.define("genshin-favoritecard", GenshinFavoriteCard);

export async function loadJsonFetch() {
  let results, resultsJson;
  let input = document.querySelector(".character-storage").value;
  //Trims down to get rid of any extra white space
  input = input.trim().toLowerCase();
  //Console Line for testing purposes
  let baseURL = "https://api.genshin.dev/";
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

  // document.querySelector("#results-name").innerHTML = resultsJson.name;
  // // document.querySelector("#results-vision").innerHTML = resultsJson.vision;
  // document.querySelector("#results-image").src = `${results.url}/gacha-splash.png`;
  globalResults = results;
  globalResultsJson = resultsJson;




}