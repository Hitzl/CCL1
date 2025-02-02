import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class UsedHealth extends BaseGameObject {

    active = true;
    yVelocity = 0;
    genre = "allyItem";


    update = function () { 
        if (this.y < 500) {
            this.y += this.yVelocity * global.deltaTime;
        }
    }; 

    
/*
    reactToCollision = function(collidingObject) {
        if (collidingObject.genre === "ally") {
            this.active = false;
        }
        
    }
*/
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Items/usedHealth.png"]);

    }  
}

export { UsedHealth }