import Jump from "./jump.js";
import Bug from "./bug.js";
import Obstacles from "./obstacles.js";
import Wires from "./wires.js";

let canvas = document.querySelector("#gameCanvas");
canvas.height = 600;
canvas.width = 800;

if (canvas.getContext) {
    // Enabling Intellisense of VS code for canvas
    /** @type {CanvasRenderingContext2D} */

    let ctx = canvas.getContext("2d");
    let gameOver = false;

    // Initializing imported Classes
    let jumpObj = new Jump();
    let obstacleObj = new Obstacles(ctx, canvas);
    let wireObj = new Wires(ctx, canvas);
    let bugObj = new Bug(canvas, ctx, wireObj);

    // collision Detection function
    function collisionDetection() {
        for (let i = 0; i < obstacleObj.obstaclesList.length; i++) {
            // same wire index and same y position of obstacle and bug will end the game
            if (obstacleObj.obstaclesList[i].y + obstacleObj.obstaclesList[i].h * 1.695 >= bugObj.bug.y
                && obstacleObj.obstaclesList[i].wireIndex === bugObj.wireIndex
                && !jumpObj.isJumping) {
                gameOver = true;
            }
        }
    }

    // Event listner to check key presses
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            if (!jumpObj.isJumping) {
                if (bugObj.wireIndex === 3) bugObj.wireIndex = 3;
                else bugObj.wireIndex++;
            }
        }

        else if (e.key === "ArrowLeft") {
            if (!jumpObj.isJumping) {
                if (bugObj.wireIndex === 0) bugObj.wireIndex = 0;
                else bugObj.wireIndex--;
            }
        }

        else if (e.key === " ") {
            if (!jumpObj.isJumping) {
                jumpObj.jumpBug(bugObj.bug);
            }
        }
    })

    // Restart game after game over
    function restart() {
        gameOver = false;
        jumpObj.isJumping = false;

        obstacleObj.obstaclesList = [];

        bugObj.wireIndex = Math.floor(bugObj.bug.x / bugObj.wireDistance);
    }

    // main function
    function main() {

        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wireObj.drawWires();
            obstacleObj.drawObstacles();
            bugObj.drawBug();

            if (Math.random() < 0.04) {
                obstacleObj.createObstacles();
            }

            obstacleObj.moveObstacle();
            collisionDetection();

            requestAnimationFrame(main);
        }

        else {
            alert("Game Over !");
            restart();
            requestAnimationFrame(main);
        }
    }

    main();
}

