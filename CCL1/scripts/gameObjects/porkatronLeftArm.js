import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class PorkatronLeftArm extends BaseGameObject {

    xVelocity = 0;
    yVelocity = 0;
    damage = 15;
    name = "leftArm";
    genre = "endbossWeapon";
   
    
    reactToCollision = function(collidingObject) {
        if (collidingObject.genre === "allyWeapon") {
            this.damageCounter++; 
        }
    }
    
    update = function () { 
        if (this.x <= this.leftBoundary) {
            this.xVelocity = 150; // Move right
        } else if (this.x >= this.rightBoundary) {
            this.xVelocity = -150; // Move left
        }
        this.x += this.xVelocity * global.deltaTime;
    }; 

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.rightBoundary = x + 250;
        this.loadImages(["./images/Characters/Porkatron/porkatronLeftArm.png"]);

    }  
}

export { PorkatronLeftArm }

