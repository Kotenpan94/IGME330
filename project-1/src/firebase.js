// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    // PUT YER CREDENTIALS HERE
    apiKey: "AIzaSyDOAK9AWSXHP1IHsWXtmJnOd1caNOJns5U",
    authDomain: "high-scores-1acfd.firebaseapp.com",
    databaseURL: "https://high-scores-1acfd-default-rtdb.firebaseio.com/",
    projectId: "high-scores-1acfd",
    storageBucket: "high-scores-1acfd.appspot.com",
    messagingSenderId: "913599315346",
    appId: "1:913599315346:web:066be70838492b315d154b"


};

let likedCharacterPath = "characters/";

const pushLikedCharacterToCloud = (character, vision, image) => {
    const db = getDatabase();
    const favRef = ref(db, `${likedCharacterPath}${character}`);
    set(favRef, {
        character, 
        vision,
        image,
        likes: increment(1) 
    });
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const db = getDatabase();
const likedCharacterPath2 =  ref(db, 'characters/');

export { db, app, likedCharacterPath, likedCharacterPath2, ref, set, push, pushLikedCharacterToCloud, onValue };