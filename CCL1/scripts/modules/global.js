const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.gameContainer = document.getElementById("gameContainer");
global.startScreen = document.getElementById("startScreen");
global.buttonText = document.getElementById("buttonText");
global.headline = document.getElementById("headline")
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -600;
global.gravityForce = 9.8;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.enemyCounter = 0;
global.gameState = 0;
global.changeLevel = false;
global.randomNumber = 0;
global.playerHealth = [];
global.playerUsedHealth = [];
global.speedcounter = 0;
global.levelStarted = false;
global.grunt = new Audio("./images/Sounds/grunt.mp3");
global.grunt.preload;
global.porkatronGrunt = new Audio("./images/Sounds/porkatronGrunt.mp3");
global.laserShots = new Audio("./images/Sounds/Laser.mp3");
global.laserShots.preload = "auto";

/*<new>*/
global.queuedImages = 0;
global.preloadedImageArrays = {
    "soldier1": [],
    "soldier2": [],
    "generalPig": [],
    "spaceShip": [],
    "specialForcePig": [],
}
/*</new>*/

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

setInterval(() => {
    global.randomNumber = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 10000
}, 1000); // Updates every 100 milliseconds

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}



global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}


/*</new>*/
global.preLoadImages = function (imageSources) {
    /* first load images from path */
    const imagesToLoad = [];
    for (let i = 0; i < imageSources.length; i++) {
        global.queuedImages++;
        let image = new Image();
        image.src = imageSources[i];

        /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
        imagesToLoad.push(image);
        image.addEventListener("load", () => global.queuedImages--);
    }
    return imagesToLoad;

};

global.preLoadImagesFromSpritesheet = function (spritesheetPath, cols, rows) {
    // Calculate the number of rows and columns
    //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
    //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);

    const totalSprites = cols * rows;
    // Pre-create an array with `Image` objects for all sprites
    const imagesToLoad =  Array.from({ length: totalSprites }, () => new Image());

    global.queuedImages++;
    // Load the spritesheet
    const spritesheet = new Image();
    spritesheet.src = spritesheetPath;


    // Add a "load" event listener to the spritesheet
    spritesheet.addEventListener("load", () => {
        const spritesheetWidth = spritesheet.width;
        const spritesheetHeight = spritesheet.height;
        const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
        const singleSpriteHeight = Math.floor(spritesheetHeight / rows);


        // Create a temporary canvas to extract sprites from the spritesheet
        const tempSpritesheetCanvas = document.createElement("canvas");
        const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
        tempSpritesheetCanvas.width = singleSpriteWidth;
        tempSpritesheetCanvas.height = singleSpriteHeight;

        // Loop through each sprite's row and column position
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
            
                // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                tempSpritesheetCtx.drawImage(
                    spritesheet,
                    col * singleSpriteWidth,
                    row * singleSpriteHeight,
                    singleSpriteWidth,
                    singleSpriteHeight,
                    0,
                    0,
                    singleSpriteWidth,
                    singleSpriteHeight
                );

                // assign it to the corresponding Image object
                const index = row * cols + col;
                imagesToLoad[index].src = tempSpritesheetCanvas.toDataURL();
            }
        }
        global.queuedImages--;

    });
    return imagesToLoad;
}
/*</new>*/

export { global }