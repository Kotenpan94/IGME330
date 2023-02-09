//Get reference to the communitiy page's references
import { db, app, likedCharacterPath, likedCharacterPath2, ref, set, push, onValue } from "./firebase.js"
import "./genshin-favoritecard.js";

let elementCardHolder = document.querySelector("#element-card-holder");



//Create array to save the read results from firebase into
let firebaseResults = [];

//Create init function to run code
const init = () => {
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    console.log(app);
    let likedCharacterPath2 = ref(db, 'characters/');
    readFirebase();



}
const likedCharacterChanged = (snapshot) => {
    // TODO: clear #favoritesList
    // favList.innerHTML = "";
    snapshot.forEach(fav => {
        let childKey = fav.key;
        let childData = fav.val();
        createLikedCharacterCards(childData.character, childData.vision, childData.image, childData.likes)
        
        console.log(childKey, childData);
        console.log(`Character Name: ${childData.character}, Character Vision: ${childData.vision}, Character Image: ${childData.image}, Character Likes: ${childData.likes}`);

        // TODO: update #favoritesList
        // favoritesList.innerHTML += `<li><b>${childData.name} </b> -  Likes:${childData.likes}</li>`
    });
};
//Create function to read from firebase
const readFirebase = () => {
    onValue(likedCharacterPath2, likedCharacterChanged);
}
const createLikedCharacterCards = (name, vision, image, likes) => {
   
    let newCard = document.createElement("genshin-favoritecard");
    newCard.setUrl(image);
    newCard.setLikes(likes);
    newCard.name = name;
    newCard.vision = vision;
    newCard.src = image;
    newCard.likes = `Likes: ${likes}`;
    console.log(`Image from Firebase Src: ${image}`);
    elementCardHolder.appendChild(newCard);

}

//Call init
init();