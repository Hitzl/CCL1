import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class Projectile extends BaseGameObject {

    active = true;
    yVelocity = -1000;
    genre = "allyWeapon";


    update = function () { 
        this.y += this.yVelocity * global.deltaTime;
    }; 

    reactToCollision = function(collidingObject) {
        if (collidingObject.genre === "enemy" || collidingObject.genre === "endboss" || collidingObject.genre === "endbossWeapon"  ) {
            this.active = false;
        }
        
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Weapons/Laser.png"]);

    }  
}

export { Projectile }