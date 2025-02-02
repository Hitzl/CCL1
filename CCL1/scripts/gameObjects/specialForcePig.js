import { BaseGameObject } from "../gameObjects/baseGameObject.js";
import { global } from "../modules/global.js"

class SpecialForcePig extends BaseGameObject {

    xVelocity = 0;
    previousX = 0;
    damage = 4;
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
        
        this.animationData.animationSprites = global.preloadedImageArrays.specialForcePig;
    }  
}

export { SpecialForcePig }
