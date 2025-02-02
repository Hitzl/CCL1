import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class Soldier2 extends BaseGameObject {

    previousX = 0;
    damage = 2;
    genre = "enemy";

    
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.18,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 3,
        "currentSpriteIndex": 0
    };
    

    constructor(x, y, width, height) {
        super(x, y, width, height);
        
         /*<new>*/
        this.animationData.animationSprites = global.preloadedImageArrays.soldier2;
        /*</new>*/
        
    }  
}

export { Soldier2 }