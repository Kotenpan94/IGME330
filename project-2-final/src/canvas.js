/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils.js';
import * as background from './backgroundImage.js';

let ctx, canvasWidth, canvasHeight, gradient, analyserNode, audioData;
let BAR_WIDTH, MAX_BAR_HEIGHT, PADDING, MIDDLE_Y;
let x;
let bufferLength;
let barHeight;
let xenoblade3image = "images/xenoblade3title.jpg";
let octoImage = "images/OctopathTravelerImage.jpg";
let emblemImage = "images/fireemblemimage.jpg";



function setupCanvas(canvasElement, analyserNodeRef) {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
    // create a gradient that runs top to bottom
    gradient = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "blue" }, { percent: .25, color: "cyan" }, { percent: .5, color: "purple" }, { percent: .75, color: "rgba(207, 47, 116, 1)" }, { percent: 1, color: "magenta" }]);
    // keep a reference to the analyser node
    analyserNode = analyserNodeRef;
    // this is the array where the analyser data will be stored
    bufferLength = analyserNode.fftSize / 2;
    audioData = new Uint8Array(bufferLength);
    BAR_WIDTH = canvasWidth / bufferLength;
    MAX_BAR_HEIGHT = 200;
    PADDING = 2;
    MIDDLE_Y = ctx.canvas.height / 2;
    x = 0;
}

function draw(params = {}) {
    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference" 
    analyserNode.getByteFrequencyData(audioData);
    // OR
    //analyserNode.getByteTimeDomainData(audioData); // waveform data

    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

    // background.backgroundImageDraw(ctx,0,0, canvasWidth, canvasHeight, xenoblade3image);


    if (background.globalTracker == "Xenoblade") {
        background.backgroundImageDraw(ctx, 0, 0, canvasWidth, canvasHeight, xenoblade3image);

    }
    else if (background.globalTracker == "Octopath") {
        background.backgroundImageDraw(ctx, 0, 0, canvasWidth, canvasHeight, octoImage);
    }
    else if (background.globalTracker == "FireEmblem"){
        background.backgroundImageDraw(ctx, 0, 0, canvasWidth, canvasHeight, emblemImage);
    }


    // draw ground
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.rect(0, canvasHeight - 55, canvasWidth, canvasHeight);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgb(73, 32, 0)';
    ctx.rect(0, canvasHeight - 28, canvasWidth, canvasHeight);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

   

    // 4 - draw bars

    if (params.showBars) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 4;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 100;
        let topSpacing = 100;

        ctx.save();
        // ctx.fillStyle = 'rgba(255,255,255,.50)';
        if (background.globalTracker == "Xenoblade") {
            ctx.fillStyle = 'blue';
        }
        else if (background.globalTracker == "Octopath") {
            ctx.fillStyle = 'green';
        }
        else if (background.globalTracker == "FireEmblem"){
            ctx.fillStyle = 'pink'
        }


        ctx.strokeStyle = changeCircleBarColor();
        //loop thru data and draws
        for (let i = 0; i < audioData.length; i++) {
            ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
            ctx.strokeRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
        }
        ctx.restore();
    }

    
    if (params.showCirclesBars) {

        ctx.save();

        ctx.translate(canvasWidth / 2, MIDDLE_Y - 140);
        for (let d = 0; d < audioData.length; d++) {
            let percent = audioData[d] / 255;
            if (percent < .05) percent = .05;
            let bar = (MAX_BAR_HEIGHT) * percent;
            ctx.fillStyle = changeCircleBarColor();
            ctx.translate(BAR_WIDTH, -2);
            ctx.rotate(Math.PI * 2 / 32);
            ctx.save();
            ctx.scale(1, -.5);
            ctx.fillStyle = `rgb(${d * 4}, ${d - 200}, ${255 - d / 2}))`;
            ctx.fillRect(0, 0, BAR_WIDTH, bar);
            ctx.restore();
            ctx.translate(PADDING, 0);
        }

        ctx.restore();



    }
    if (params.fireworks) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 4;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 100;

        let barHeightTracker = document.querySelector("#slider-barheight").value;
        document.querySelector('#slider-barheight').onchange = e => {
            barHeightTracker = Number(e.target.value);
            console.log(`Bar Height Amount: ${barHeightTracker}`);
        };
        //Top Left
        drawFireworks(ctx, 0, 0, 0, barWidth, barHeight, barHeightTracker,audioData);
        //Bottom Right
        drawFireworks(ctx, 0, canvasWidth, canvasHeight, barWidth, barHeight, barHeightTracker,audioData);
        //Top Right
        drawFireworks(ctx, 0, canvasWidth, 0, barWidth, barHeight, barHeightTracker,audioData);
        //Bottom Left
        drawFireworks(ctx, 0, 0, canvasHeight, barWidth, barHeight, barHeightTracker,audioData);
        ctx.save();

        // drawRadialVisual(audioData.length,100, 152, 100, audioData);



        ctx.restore();
    }

    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i++) {
        // C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < .05) {
            data[i] = data[i + 1] = data[i + 2] = 0;
            data[i] = 255;

        } // end if

        // data[i] is the red channel
        // data[i+1] is the green channel
        // data[i+2] is the blue channel
        // data[i+3] is the alpha channel
        // zero out the red and green and blue channels
        // make the red channel 100% red
        if (params.showInvert) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
        }
    }  // end for
    if (params.showEmboss) {
        for (let i = 0; i < length; i++) {
            if (i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }


    // D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);





}
function drawRadialVisual(bufferLength, x, barWidth, barHeight, dataArray) {
    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 255;
        ctx.save();

        ctx.translate(canvasWidth / 2, canvasHeight / 2);
        ctx.rotate(i * Math.PI * 2 / bufferLength);
        const red = i * barHeight / 30;
        const green = i / 2;
        const blue = barHeight;
        ctx.scale(20, -.15);

        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, barWidth, 15);
        ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
        ctx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;

        ctx.restore();
    }
}

function drawFireworks(ctx, x, transX, transY, barWidth, barHeight, tracker, arr) {
    for (let i = 0; i < audioData.length; i++) {
        barHeight = arr[i] * tracker;
        ctx.save();

        ctx.translate(transX, transY);
        ctx.rotate(i * 2.5);
        const color = 200 + i * barHeight / 10;
        ctx.fillStyle = `hsl(${color},100%, ${barHeight / 3}%)`;
        ctx.fillRect(0, 0, barWidth, barHeight);
        x += barWidth;
        ctx.scale(300, 100);

        ctx.restore();
    }
}

function drawStar(ctx, x, y, radius, changer, number) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'green'
    ctx.translate(x, y);
    ctx.moveTo(0, 0 - radius);
    for (let i = 0; i < number; i++) {
        ctx.rotate(Math.PI / number);
        ctx.lineTo(0, 0 - (radius - changer));
        ctx.rotate(Math.PI / number);
        ctx.lineTo(0, 0 - radius);
    }
    ctx.closePath();
    ctx.scale(12, 48)
    ctx.stroke();
    ctx.fill();
    ctx.restore();
}
function changeCircleBarColor() {
    //selectors
    let red = document.querySelector("#red").value;
    let green = document.querySelector("#green").value;
    let blue = document.querySelector("#blue").value;

    let rgb = `rgb(${red}, ${green}, ${blue})`;
    return rgb;

}

export { setupCanvas, draw };