/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';
import * as background from './backgroundImage.js';


const drawParams = {
  showGradient: true,
  showBars: true,
  showCircles: true,
  showNoise: false,
  showInvert: false,
  showEmboss: false,
  showCirclesBars: true,
  fireworks: true
};


// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/Immediate Threst.mp3"
});

function init() {
  audio.setupWebaudio(DEFAULTS.sound1);
  console.log("init called");
  // console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);
  loop();
}

function setupUI(canvasElement) {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
  //Hookup check boxes

  const barsCheckbox = document.querySelector("#barsCB");
  barsCheckbox.checked = true;

  const noiseChecckbox = document.querySelector("#noiseCB");
  noiseChecckbox.checked = false;
  const invertCheckbox = document.querySelector("#invertCB");
  invertCheckbox.checked = false;
  const embossCheckbox = document.querySelector("#embossCB");
  embossCheckbox.checked = false;
  const ciclesBarsCheckbox = document.querySelector("#circleBarCB");
  ciclesBarsCheckbox.checked = true;
  const radialBarCheckbox = document.querySelector("#radial-bar-CB");
  radialBarCheckbox.checked = true;



  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    //Check if context is in suspended state
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      audio.playCurrentSound();
      e.target.dataset.playing = "yes";
    }
    else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no";
    }
  }
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  //add .oninput event to slider
  volumeSlider.oninput = e => {
    //set the gain
    audio.setVolume(e.target.value);
    //update the value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
  };
  //set the value of the label to match the initial value of the slider
  volumeSlider.dispatchEvent(new Event("input"));

  //D - hookup track <select>
  let trackSelect = document.querySelector("#trackSelect");
  trackSelect.selectedIndex = 0;
  //add .onchange to <select>
  trackSelect.onchange = e => {
    console.log(`Track Select ${trackSelect.selectedIndex}`);
    console.log(`Global Tracker is currently ${background.globalTracker}`);

    audio.loadSoundFile(e.target.value);

    if (trackSelect.selectedIndex == 0) {
      background.changeGlobalTracker("Xenoblade")
      console.log(`Global Tracker is currently ${background.globalTracker}`);
    }
    else if (trackSelect.selectedIndex == 1) {
      background.changeGlobalTracker("Octopath")
      console.log(`Global Tracker is currently ${background.globalTracker}`);
    }
    else if (trackSelect.selectedIndex == 2) {
      background.changeGlobalTracker("FireEmblem")
    }
    //pause the current track if it is playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };
  //Check boxes UI
  //Works now!
  
  barsCheckbox.onclick = e => {
    if (e.target.checked) {
      drawParams["showBars"] = true;
    }
    else {
      drawParams["showBars"] = false;
    }
  }
  
  noiseChecckbox.onclick = e => {
    if (e.target.checked) {
      drawParams["showNoise"] = true;
    }
    else {
      drawParams["showNoise"] = false;
    }
  }
  invertCheckbox.onclick = e => {
    if (e.target.checked) {
      drawParams["showInvert"] = true;
    }
    else {
      drawParams["showInvert"] = false;
    }
  }
  embossCheckbox.onclick = e => {
    if (e.target.checked) {
      drawParams["showEmboss"] = true;
    }
    else {
      drawParams["showEmboss"] = false;
    }
  }
  ciclesBarsCheckbox.onclick = e => {
    if (e.target.checked) {
      drawParams["showCirclesBars"] = true;
    }
    else {
      drawParams["showCirclesBars"] = false;
    }
  }
  radialBarCheckbox.onclick = e => {
    if (e.target.checked) {
      drawParams["fireworks"] = true;
    }
    else {
      drawParams["fireworks"] = false;
    }
  }




} // end setupUI
function loop() {
  /* NOTE: This is temporary testing code that we will delete in Part II */
  requestAnimationFrame(loop);
  canvas.draw(drawParams);

}



export { init };