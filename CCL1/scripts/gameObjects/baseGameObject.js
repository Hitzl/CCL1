import { global } from "../modules/global.js"


class BaseGameObject {
    active = true;
    name = "";
    x = 100;
    y = 500;
    previousX = 0;
    previousY = 0;
    width = 50;
    height = 50;
    useGravityForces = false;
    blockGravityForces = false;
    prevFallingVelocity = 0;
    index = -1;
    damageCounter = 0;
    damage = 10000;
    genre = "";
    xVelocity = 0;
    yVelocity = 0;
    

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    storePositionOfPreviousFrame = function () {
        this.previousX = this.x;
        this.previousY = this.y;
    };

    //Count damage to make the enemy inactive
    damageTaken = function () {
        if (this.damageCounter == this.damage){
            this.active = false;
            global.enemyCounter--;
            global.grunt.currentTime = 0;
            global.grunt.play();
        }

    }

    
    
    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    update = function () { 
        //If Player looses all Lifes set all gameObjects inactive
        if (global.playerObject.damageCounter >= 3) {
            for (var i = 0; i < global.allGameObjects.length; i++) {
                global.allGameObjects[i].active = false;
            }
            global.changeLevel = true;
        }

        //Pigs fly out of screen -> Game Over
        if (this.genre === "enemy" && this.y > 800) {
            for (var i = 0; i < global.allGameObjects.length; i++) {
                global.allGameObjects[i].active = false;
            }
            global.changeLevel = true;
            global.playerObject.damageCounter = 3;
        }

     
        
        if (this.genre === "enemy") {
            if (this.y > 200) {
                global.levelStarted = true;
            }
            //slowly move to the bottom of the screen
            if (global.levelStarted == false) {
                this.yVelocity = 60;
            } else {
                this.yVelocity = 10;
            }

            if (this.x <= this.leftBoundary) {
                this.xVelocity = 100; // Move right
            } else if (this.x >= this.rightBoundary) {
                this.xVelocity = -100; // Move left
            }
               
        }
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
    };


    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };


    loadImages = function (imageSources) {
        /* first load images from path */

        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];
    
            /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
            this.animationData.animationSprites.push(image);
        }

    };

    

    loadImagesFromSpritesheet(spritesheetPath, cols, rows) {
        // Calculate the number of rows and columns
        //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
        //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
        const totalSprites = cols * rows;
    
        // Pre-create an array with `Image` objects for all sprites
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());
    
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
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }

    switchCurrentSprites = function (firstSpriteIndex, lastSpriteIndex) {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    reactToCollision = function(collidingObject) {
        // If enemy colliding with spaceship projectile -> damagecounter up
        if (this.genre === "enemy") {
    
            if (collidingObject.genre === "allyWeapon" && global.levelStarted == true) {
                this.damageCounter++;
            }
        }

    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.leftBoundary = x; // Left boundary is starting x position
        this.rightBoundary = x + 100; // Right boundary is 100px to the right
        global.allGameObjects.push(this);
        this.index = global.allGameObjects.length - 1;
    }

}

export {BaseGameObject}