//Save to local storage, takes a url
let savedData = {
    "favorites": []
}

const saveToStorage = async(data) => {
    // let data = await getLocalStorage();
    savedData = [data];
    // console.log(`Saved Data ${savedData}`);
    await localStorage.setItem("gag7616-p1-settings", JSON.stringify(savedData));
    
}
//Get from local storage function
const getLocalStorage = async() => {
    let local = await JSON.parse(localStorage.getItem("gag7616-p1-settings"));
    return local;
}
const tempLocal = async() => {
    await localStorage.setItem('gag7616=p1-settings', JSON.stringify([]));
}
//Clear local storage function
const clearLocalStorage = () => {
    //Clear it by saving nothing to it, essentially clearing it
    saveToStorage("");
}
//Creating an array to insert the favorite(s) into
const defaultInsert = {
    "favorites": []
}
//Export all the functions here
export {saveToStorage, getLocalStorage, clearLocalStorage};