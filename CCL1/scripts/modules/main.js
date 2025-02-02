import { global } from "./global.js";
import { Spaceship } from "../gameObjects/spaceship.js";
import { Soldier1 } from "../gameObjects/soldier1.js";
import { Projectile } from "../gameObjects/projectile.js";
import { Soldier2 } from "../gameObjects/soldier2.js";
import { SpecialForcePig } from "../gameObjects/specialForcePig.js";
import { EnemyProjectile } from "../gameObjects/enemyProjectile.js";
import { CommanderPig } from "../gameObjects/generalPig.js";
import { Porkatron } from "../gameObjects/porkatron.js";
import { PorkatronLeftArm } from "../gameObjects/porkatronLeftArm.js";
import { PorkatronRightArm } from "../gameObjects/porkatronRightArm.js";
import { Health } from "../gameObjects/health.js";
import { UsedHealth } from "../gameObjects/usedHealth.js";
import { PorkatronLaser } from "../gameObjects/porkatronLaser.js";


function gameLoop(totalRunningTime) { 
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].damageTaken();
            global.allGameObjects[i].draw();
        }
    }

    //Change Level
    changeLevel(); 

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}


function createEnemyProjectiles() {
    for (var i = 0; i < global.allGameObjects.length; i++) {
        let gameObject = global.allGameObjects[i];
        if (gameObject.genre === "enemy" && gameObject.y > 10 && global.levelStarted == true && gameObject.active === true && global.randomNumber < 5000) {
            new EnemyProjectile(gameObject.x + 20, gameObject.y, 10, 40);
        }
    }
}

function createPorkatronProjectiles() {
    for (var i = 0; i < global.allGameObjects.length; i++) {
        let gameObject = global.allGameObjects[i];
        if (gameObject.name === "leftArm" && gameObject.active === true) {
            new PorkatronLaser(gameObject.x + 15, gameObject.y + 300, 10, 40);
          
        }
    }
    for (var i = 0; i < global.allGameObjects.length; i++) {
        let gameObject = global.allGameObjects[i];
        if (gameObject.name === "rightArm" && gameObject.active === true) {
            new PorkatronLaser(gameObject.x + 80, gameObject.y + 300, 10, 40);
            
            
        }
    }
    for (var i = 0; i < global.allGameObjects.length; i++) {
        let gameObject = global.allGameObjects[i];
        if (gameObject.name === "porkatron" && gameObject.active === true && global.enemyCounter == 1 && global.randomNumber < 7000) {
            new PorkatronLaser(gameObject.x + 120, gameObject.y + 200, 10, 40);
        }
    }


}



setInterval(createEnemyProjectiles, 2500);

setInterval(createPorkatronProjectiles, 200);



//Check if no enemys left if yes changeLevel
function changeLevel() {

        if (global.gameState == 1 && global.enemyCounter == 0 && global.changeLevel == true) {
            setTimeout(level2, 5000);
            global.changeLevel = false;
        }

        if (global.gameState == 2 && global.enemyCounter == 0 && global.changeLevel == true) {
            setTimeout(level3, 5000);
            global.changeLevel = false;
        }

        if (global.gameState == 3 && global.enemyCounter == 0 && global.changeLevel == true) {
            setTimeout(level4, 5000);
            global.changeLevel = false;
        }

        if (global.gameState == 4 && global.enemyCounter == 0 && global.changeLevel == true) {
            setTimeout(level5, 5000);
            global.changeLevel = false;
        }
        if (global.gameState == 5 && global.enemyCounter == 0 && global.changeLevel == true) {
            setTimeout(level6, 5000);
            global.changeLevel = false;
        }

        if (global.gameState == 6 && global.enemyCounter == 0 && global.changeLevel == true) {
            setTimeout(endfight, 5000);
            global.changeLevel = false;
        }

        if (global.playerObject.damageCounter === 3 && global.changeLevel === true) {
            gameOver();
            global.changeLevel = false;
        }

        if (global.gameState == 6 && global.enemyCounter == 0 && global.changeLevel === true) {           
            endScreen();
            global.changeLevel = false;
        } 

        if (global.gameState == 10 && global.changeLevel === true) {
            endScreen();
            global.changeLevel = false;
        }


    
}


  /*<new>*/
  function startImageLoading() {

    const fullStatusBarWidth = 20;
    const statusBarDiv = document.createElement("div");
    
    global.preloadedImageArrays.generalPig = global.preLoadImagesFromSpritesheet("./images/Characters/Sprites/GeneralPig.png", 4, 1);
    global.preloadedImageArrays.soldier1 = global.preLoadImagesFromSpritesheet("./images/Characters/Sprites/Soldier1.png", 4, 1);
    global.preloadedImageArrays.soldier2 = global.preLoadImagesFromSpritesheet("./images/Characters/Sprites/Soldier2.png", 4, 1);
    global.preloadedImageArrays.spaceShip = global.preLoadImagesFromSpritesheet("./images/Characters/Sprites/spaceship.png", 3, 1);
    global.preloadedImageArrays.specialForcePig = global.preLoadImagesFromSpritesheet("./images/Characters/Sprites/SpecialForcePig.png", 4, 1);

    statusBarDiv.style.position = "absolute";
    statusBarDiv.style.top = "100px";
    statusBarDiv.style.height = "10px";
    statusBarDiv.style.color = "#ccc";
    statusBarDiv.style.fontFamily = "sans-serif";
    statusBarDiv.style.fontSize = "20px";

    const statusBarBGDiv = statusBarDiv.cloneNode();
    const statusBarTextDiv = statusBarDiv.cloneNode();
    
    global.gameContainer.position = "relative";
    global.gameContainer.appendChild(statusBarBGDiv);
    global.gameContainer.appendChild(statusBarDiv);
    global.gameContainer.appendChild(statusBarTextDiv);

    statusBarDiv.style.backgroundColor = "green";
    statusBarBGDiv.style.backgroundColor = "#ccc";
    statusBarBGDiv.style.width = fullStatusBarWidth + "%";
    statusBarTextDiv.style.paddingTop = "20px";
    statusBarTextDiv.innerHTML = "Loading images..."

    loadImagesStatus(global.queuedImages, fullStatusBarWidth, statusBarDiv, statusBarBGDiv, statusBarTextDiv);
}

function loadImagesStatus(totalImagesCount, fullStatusBarWidth, statusBarDiv, statusBarBGDiv, statusBarTextDiv) {
    const widthPerImage = fullStatusBarWidth / totalImagesCount;
    const imagesLoaded = totalImagesCount - global.queuedImages;
    const currentStatusBarWidth = widthPerImage * imagesLoaded;
    statusBarDiv.style.width = currentStatusBarWidth + "%";

    if (global.queuedImages > 0) {
        setTimeout(function () {
            loadImagesStatus(totalImagesCount, fullStatusBarWidth, statusBarDiv, statusBarBGDiv, statusBarTextDiv)
        }, 50);
    }
    else {
        setTimeout(function () {
            startButton.style.visibility = "visible";
            statusBarDiv.style.display = "none";
            statusBarBGDiv.style.display = "none";
            statusBarTextDiv.style.display = "none";
            startScreen ();
        }, 800);    
    }
    
}
/*</new>*/

function startScreen () {  
    //global.backgroundSound.Stop();
    startButton.addEventListener("click", level1);
}

/*<new>*/
//startScreen();
startImageLoading();
/*</new>*/




function endScreen () {
    global.gameState = 0;
    global.enemyCounter = 0;
    for (var i = 0; i < global.allGameObjects.length; i++) {
        global.allGameObjects[i].active = false;
    }
    global.startScreen.style.display = "flex"
    global.buttonText.innerHTML = "Play Again?";
    global.headline.innerHTML = "You Won!";
}

function gameOver () {
    global.gameState = 0;
    global.enemyCounter = 0;
    for (var i = 0; i < global.allGameObjects.length; i++) {
        global.allGameObjects[i].active = false;
    }
    global.startScreen.style.display = "flex"
    global.buttonText.innerHTML = "Try Again!";
    global.headline.innerHTML = "GAME OVER";

    startButton.addEventListener("click", level1)
}


function level1() {
    //Setup Ship
    global.levelStarted = false;
    global.gameContainer.style.backgroundImage = 'url("./images/Background.png")';
    global.startScreen.style.display = "none";
   
    global.playerObject = new Spaceship(525, 650, 80, 80);
    //Setup Enemys of Level1
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                new Soldier1(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                global.enemyCounter++;
            }  
        }
    }

    //setup Healthbar of the Player and store Object into a global variable
    for (let i = 1; i < 4; i++) {
        let j = 50 * i
        global.playerHealth[i] = new Health(800 + j, 700, 150, 150);
        global.playerUsedHealth[i] = new UsedHealth(800 + j, 700, 150, 150);
    }
    global.gameState++;
    global.changeLevel = true; 
}

//level1();


function level2() {
    global.levelStarted = false; 
    //Setup Enemys of Level2   
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                //new Soldier2(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                if (i === 1) {
                    new Soldier2(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                } else {
                    new Soldier1(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                }
                global.enemyCounter++;
            }
    
        }
    }
    global.gameState++;
    global.changeLevel = true; 
}

function level3() {
    global.levelStarted = false;
    //Setup Enemys of Level3
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                new Soldier2(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                global.enemyCounter++;
                
            }
    
        }
    }
    global.gameState++;
    global.changeLevel = true; 
}

function level4() {
    global.levelStarted = false;
    //Setup Enemys of Level4
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (k === 0) {
                    new SpecialForcePig(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                } else {
                    new Soldier2(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                }
                global.enemyCounter++;
                
            }
    
        }
    }
    global.gameState++;
    global.changeLevel = true; 
}

function level5() {
    global.levelStarted = false;
    //Setup Enemys of Level4
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === 0) {
                    new CommanderPig(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                } else {
                    new SpecialForcePig(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                }
                global.enemyCounter++;
                
            }
    
        }
    }
    global.gameState++;
    global.changeLevel = true; 
}

function level6() {
    global.levelStarted = false;
    //Setup Enemys of Level4
    for (let k = 0; k < 2; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                new CommanderPig(j * 100 + k * 600 + 100, i * 100 - 300, 45, 80);
                global.enemyCounter++;
                
            }
    
        }
    }
    //setTimeout(new Porkatron(500, 500, 400, 400), 10000)
    global.gameState++;
    global.changeLevel = true; 
}

function endfight() {
    //Setup Enemys of Level4
    new Porkatron(325, 10, 300, 220);
    global.enemyCounter++;
    global.enemyCounter++;
    global.enemyCounter++;
    new PorkatronLeftArm(245, 85, 130, 300);
    new PorkatronRightArm(575, 85, 130, 300);
    global.gameState++;
    global.changeLevel = true; 
}


requestAnimationFrame(gameLoop);

/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      global.deltaTime = performance.now();
    } 
});


