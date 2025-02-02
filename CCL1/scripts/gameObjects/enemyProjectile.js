import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class EnemyProjectile extends BaseGameObject {

    active = true;
    yVelocity = 400;
    genre = "enemyWeapon"

    update = function () { 
        this.y += this.yVelocity * global.deltaTime;
        if (global.enemyCounter == 0) {
            this.active = false;
        }
    }; 

    
    reactToCollision = function(collidingObject) {
        if (collidingObject.genre === "ally") {
            this.active = false;
        }
        
    }
    

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Weapons/Laser2.png"]);

    }  
}

export { EnemyProjectile }