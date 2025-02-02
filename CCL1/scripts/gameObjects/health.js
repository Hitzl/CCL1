import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class Health extends BaseGameObject {

    active = true;
    yVelocity = 0;
    genre = "allyItem";


    update = function () { 
        if (this.y < 500) {
            this.y += this.yVelocity * global.deltaTime;
        }
       this.playerHealth();
    }; 

    playerHealth = function () {
        if (global.playerObject.damageCounter === 1) {
            global.playerHealth[3].active = false;
        }

        if (global.playerObject.damageCounter === 2) {
            global.playerHealth[2].active = false;
        }

        if (global.playerObject.damageCounter === 3) {
            global.playerHealth[1].active = false;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Items/health.png"]);

    }  
}

export { Health }