import * as main from "./main.js";
// File just for loading, will be used in for loading in the scripts 
// import "./app-main.js";
import "./app-footer.js";

import "./app-navbar.js"
import "./app-header.js"
window.onload = ()=>{
	console.log("window.onload called");
	// 1 - do preload here - load fonts, images, additional sounds, etc...
	
	// 2 - start up app
	main.init();
}
