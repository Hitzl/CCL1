import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class Spaceship extends BaseGameObject {

   
    damage = 3;
    damageCounter = 0;
    genre = "ally";
    xVelocity = 0;
    yVelocity = 0;
   
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 2,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };


    reactToCollision = function(collidingObject) {
        if (collidingObject.genre === "enemyWeapon" || collidingObject.genre === "enemy") {
            this.damageCounter++; 
        }

    }

    update = function () { 
          
        //Cant go out of the canvas
        if (this.x <= 6) {
            this.xVelocity = 0;
            this.x = 7;
        }
        if (this.x >= 1025) {
            this.xVelocity = 0;
            this.x = 1024;
        }
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;   
    }; 

    
    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/PacMan0.png", "./images/PacMan1.png", "./images/PacMan2.png"]);

         /*<new>*/
        //commented this line out: this.loadImagesFromSpritesheet("./images/Characters/Sprites/spaceship.png", 3, 1);
        this.animationData.animationSprites = global.preloadedImageArrays.spaceShip;
        /*</new>*/

    }  
}

export { Spaceship }