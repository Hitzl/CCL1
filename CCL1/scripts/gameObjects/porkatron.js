import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class Porkatron extends BaseGameObject {

    xVelocity = 150;
    damage = 40;
    genre = "endboss";
    name = "porkatron";

    reactToCollision = function(collidingObject) {
        if (global.enemyCounter === 1 && collidingObject.genre === "allyWeapon") {
            this.damageCounter++;
            global.speedcounter += 15;
            global.gameState = 8;
        }
    }

   
    
    
    update = function () { 

        
        if (this.x <= this.leftBoundary - global.speedcounter / 2) {
            this.xVelocity = 150 + global.speedcounter; // Move right
        } else if (this.x >= this.rightBoundary + global.speedcounter / 2) {
            this.xVelocity = -150 - global.speedcounter; // Move left
        }

        if (this.damageCounter == this.damage - 1) {
            for (var i = 0; i < global.allGameObjects.length; i++) {
                global.allGameObjects[i].active = false;
                global.porkatronGrunt.play();
               setInterval(global.gameState = 10, 2000);
            }
            console.log(global.gameState);
            global.changeLevel = true;
        }

        this.x += this.xVelocity * global.deltaTime;
    }; 

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.rightBoundary = this.x + 250;
        this.leftBoundary = this.x;
        this.loadImages(["./images/Characters/Porkatron/porkatron.png"]);

    }  
}

export { Porkatron }
