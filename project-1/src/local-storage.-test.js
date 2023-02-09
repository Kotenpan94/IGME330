/* Checked by ESLint - https://eslint.org/demo */
const defaultData = {
    "favorites": []
  },
  storeName = "gag7616-p1-settings"; // TODO: change to your id (DONE)
  
  const readLocalStorage = () => {
    let allValues = null;
  
    try{
      allValues = JSON.parse(localStorage.getItem(storeName)) || defaultData;
    }catch(err){
      console.log(`Problem with JSON.parse() and ${storeName} !`);
      throw err;
    }
  
    return allValues;
  };
  
  const writeLocalStorage = (allValues) => {
    localStorage.setItem(storeName, JSON.stringify(allValues));
  };
  
  export const clearLocalStorage = () => writeLocalStorage(defaultData);
  
  export const setAppTitle = (str) => {
    const allValues = readLocalStorage();
  
    allValues.appTitle = str;
    writeLocalStorage(allValues);
  };
  
  export const getAppTitle = () => readLocalStorage().appTitle;
  
  export const addFavorite = (str) => {
    const allValues = readLocalStorage();
  
    allValues.favorites.push(str);
    writeLocalStorage(allValues);
  };
  
  export const getFavorites = () => readLocalStorage().favorites;
  
  export const clearFavorites = () => {
    const allValues = readLocalStorage();
  
    allValues.favorites = [];
    writeLocalStorage(allValues);
  };
  