import { global } from "./global.js";
import { Projectile } from "../gameObjects/projectile.js";


function move(event) {

    //Player moves Spaceship for Right and Left Movement
    switch(event.key) {
        case "d":
           
                global.playerObject.xVelocity = 400;
                global.playerObject.animationData.firstSpriteIndex = "1";
            
                
            break;
        case "a":

                global.playerObject.xVelocity = -400;
                global.playerObject.animationData.firstSpriteIndex = "0";
            
                
            break;
    }
}

//Player stops if Keyup
function stop(event) {
    global.playerObject.xVelocity = 0;
    global.playerObject.yVelocity = 0;
    global.playerObject.animationData.firstSpriteIndex = "2";
}


function shootOnClick(event) {
    if (event.button === 0) { // Check if left mouse button is clicked
        if (global.playerObject.active == true  && global.levelStarted == true) {
            new Projectile(global.playerObject.x + 33, 620, 10, 40);
            global.laserShots.currentTime = 0;
            global.laserShots.play();
        }
    }
}


//document.addEventListener("keypress", shoot);
document.addEventListener("keypress", move);
document.addEventListener("click", shootOnClick);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);