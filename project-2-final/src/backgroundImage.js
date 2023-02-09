let globalTracker = "Xenoblade";

function backgroundImageDraw (ctx,x,y,canvasWidth, canvasHeight, imageSource){
    //Creating image
    const image = new Image();
    image.src = imageSource;
    ctx.save();
    ctx.drawImage(image,x,y, canvasWidth, canvasHeight);
    ctx.restore();
}
function changeGlobalTracker (newTracker) {
    globalTracker = newTracker;
}

export {backgroundImageDraw, changeGlobalTracker, globalTracker}