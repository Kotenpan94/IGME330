const loadJsonFetch = async () => {
    
    let input = document.querySelector(".character-storage").value;
    //Trims down to get rid of any extra white space
    input = input.trim().toLowerCase();
    //Console Line for testing purposes
    let baseURL = "https://api.genshin.dev/";
    if (input.length > 0) {
        baseURL += `characters/${input}`;
    }
    console.log(baseURL);
    let results, resultsJson;
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
    console.log(`Input:${input}`);
    console.log(`Results:${resultsJson.toString()}`);
    console.log(`${results.url}/gacha-splash.png`);
    console.log(results);
    console.log(resultsJson.vision);
    document.querySelector("#results-name").innerHTML = resultsJson.name;
    // document.querySelector("#results-vision").innerHTML = resultsJson.vision;
    document.querySelector("#results-image").src = `${results.url}/gacha-splash.png`;

    return resultsJson;


    
}
export {loadJsonFetch};
