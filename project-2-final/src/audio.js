// 1 - our WebAudio context, **we will export and make this public at the bottom of the file**
let audioCtx;

// **These are "private" properties - these will NOT be visible outside of this module (i.e. file)**
// 2 - WebAudio nodes that are part of our WebAudio audio routing graph
let element, sourceNode, analyserNode, gainNode, biquadFilter, lowShelfBquadFilter, distortionFilter;
let highshelf = false;
let lowshelf = false;
let distortion = false;
let distortionAmount = 20;

// 3 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
    gain: .5,
    numSamples: 256
});

// 4 - create a new array of 8-bit integers (0-255)
// this is a typed array to hold the audio frequency data
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);


// **Next are "public" methods - we are going to export all of these at the bottom of this file**
function setupWebaudio(filePath) {
    // 1 - The || is because WebAudio has not been standardized across browsers yet
    const audioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // 2 - this creates an <audio> element
    element = new Audio();

    // 3 - have it point at a sound file
    loadSoundFile(filePath);

    // 4 - create an a source node that points at the <audio> element
    sourceNode = audioCtx.createMediaElementSource(element);

    // 5 - create an analyser node
    // note the UK spelling of "Analyser"
    analyserNode = audioCtx.createAnalyser();
    /*
    // 6
    We will request DEFAULTS.numSamples number of samples or "bins" spaced equally 
    across the sound spectrum.
    
    If DEFAULTS.numSamples (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
    the third is 344Hz, and so on. Each bin contains a number between 0-255 representing 
    the amplitude of that frequency.
    */

    // fft stands for Fast Fourier Transform
    analyserNode.fftSize = DEFAULTS.numSamples;

    // 7 - create a gain (volume) node
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.type = "highshelf";

    lowShelfBquadFilter = audioCtx.createBiquadFilter();
    lowShelfBquadFilter.type = "lowshelf";

    distortionFilter = audioCtx.createWaveShaper();


    // 8 - connect the nodes - we now have an audio graph
    sourceNode.connect(analyserNode);
    analyserNode.connect(biquadFilter);
    biquadFilter.connect(lowShelfBquadFilter);
    lowShelfBquadFilter.connect(distortionFilter);
    distortionFilter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // I. set the initial state of the high shelf checkbox
    document.querySelector('#cb-highshelf').checked = highshelf; // `highshelf` is a boolean we will declare in a second

    // II. change the value of `highshelf` every time the high shelf checkbox changes state
    document.querySelector('#cb-highshelf').onchange = e => {
        highshelf = e.target.checked;
        toggleHighshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
    };

    // III. 
    toggleHighshelf(); // when the app starts up, turn on or turn off the filter, depending on the value of `highshelf`!

    // I. set the initial state of the low shelf checkbox
    document.querySelector('#cb-lowshelf').checked = lowshelf; // `highshelf` is a boolean we will declare in a second

    // II. change the value of `highshelf` every time the high shelf checkbox changes state
    document.querySelector('#cb-lowshelf').onchange = e => {
        lowshelf = e.target.checked;
        toggleLowshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
    };

    // III. 
    toggleLowshelf(); // when the app starts up, turn on or turn off the filter, depending on the value of `highshelf`!

     // I. set the initial state of the low shelf checkbox
     document.querySelector('#cb-distortion').checked = lowshelf; // `highshelf` is a boolean we will declare in a second

     // II. change the value of `highshelf` every time the high shelf checkbox changes state
     document.querySelector('#cb-distortion').onchange = e => {
         distortion = e.target.checked;
         toggleDistortion(); // turn on or turn off the filter, depending on the value of `highshelf`!
     };

    document.querySelector('#slider-distortion').value = distortionAmount;
    document.querySelector('#slider-distortion').onchange = e => {
        distortionAmount = Number(e.target.value);
        console.log(`Distortion Amount: ${distortionAmount}`);
        toggleDistortion();
    };
}

// make sure that it's a Number rather than a String
function loadSoundFile(filePath) {
    element.src = filePath;
}
function playCurrentSound() {
    element.play();
}
function pauseCurrentSound() {
    element.pause();
}
function setVolume(value) {
    value = Number(value);
    gainNode.gain.value = value;
}
function toggleHighshelf(value) {
    if (highshelf) {
        biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // we created the `biquadFilter` (i.e. "treble") node last time
        biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    } else {
        biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
}
function toggleLowshelf() {
    if (lowshelf) {
        lowShelfBquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        lowShelfBquadFilter.gain.setValueAtTime(15, audioCtx.currentTime);
    } else {
        lowShelfBquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
}
function toggleDistortion() {
    if (distortion) {
        distortionFilter.curve = null; // being paranoid and trying to trigger garbage collection
        distortionFilter.curve = makeDistortionCurve(distortionAmount);
    } else {
        distortionFilter.curve = null;
    }
}

// from: https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode
function makeDistortionCurve(amount = 20) {
    let n_samples = 256, curve = new Float32Array(n_samples);
    for (let i = 0; i < n_samples; ++i) {
        let x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + amount * Math.abs(x));
    }
    return curve;
}

export { audioCtx, setupWebaudio, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, biquadFilter, lowShelfBquadFilter, distortionFilter, toggleHighshelf, toggleLowshelf, analyserNode }