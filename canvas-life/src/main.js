let canvas, ctx;
const canvasWidth = 600, canvasHeight = 400;
const cellWidth = 10;
const fps = 12;
let lifeworld;

window.onload = init;

function init(){
	canvas = document.querySelector("canvas");
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	ctx = canvas.getContext("2d");
	// TODO: init lifeworld
    lifeworld = new Lifeworld(60,40,.2);
	loop();
}

function loop(){
	setTimeout(loop,1000/fps);
	// TODO: update lifeworld
    lifeworld.step();
	drawBackground();
	drawWorld();
}

function drawBackground(){
	ctx.save();
	ctx.fillStyle = "black";
	ctx.globalAlpha = 4/fps;
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	ctx.restore();
}

function drawWorld(){
	// TODO: implement
    ctx.save();
    for (let col = 0; col < lifeworld.numCols; col++){
        drawCell(col,0,cellWidth,lifeworld.world[col][0]);
		for (let row = 0; row < lifeworld.numRows; row++){
			drawCell(0,row,cellWidth,lifeworld.world[0][row]);
		}
    }
    ctx.restore();
}

function drawCell(col,row,dimensions,alive) {
	// TODO: implement
    ctx.beginPath();
    ctx.rect(col * dimensions, row * dimensions, dimensions, dimensions);
    ctx.fillStyle = alive ? 'red' : 'rgba(0,0,0,0)';
    ctx.fill();
}