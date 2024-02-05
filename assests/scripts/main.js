import Bug from "./bug.js";
import Obstacles from "./obstacles.js";
import Score from "./score.js";

let canvas = document.querySelector("#gameCanvas");
canvas.height = 600;
canvas.width = 800;

if (canvas.getContext) {
    // Enabling Intellisense of VS code for canvas
    /** @type {CanvasRenderingContext2D} */

    let ctx = canvas.getContext("2d");
    let gameOver = false;

    let wires = [
        { x: canvas.width / 5 },
        { x: (2 * canvas.width) / 5 },
        { x: (3 * canvas.width) / 5 },
        { x: (4 * canvas.width) / 5 }
    ]

    // Initializing imported Classes
    let obstacleObj = new Obstacles(ctx, canvas);
    let bugObj = new Bug(canvas, ctx, wires);
    let scoreObj = new Score(canvas, wires, ctx);


    // Drawing wires
    function drawWires() {
        ctx.fillStyle = "#333";
        for (let item of wires) {
            ctx.fillRect(item.x - 12, 0, 12, canvas.height);
        }
    }

    // collision Detection function
    function collisionDetection() {
        for (let i = 0; i < obstacleObj.obstaclesList.length; i++) {
            // same wire index and same y position of obstacle and bug will end the game
            if (obstacleObj.obstaclesList[i].y + obstacleObj.obstaclesList[i].h * 1.695 >= bugObj.bug.y
                && ((obstacleObj.obstaclesList[i].wireIndex === bugObj.wireIndex) || (obstacleObj.obstaclesList[i].wireIndex === "pole"))
                && !bugObj.isJumping) {
                gameOver = true;
            }
        }
    }

    // Event listner to check key presses
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" && !bugObj.isJumping) {
            if (bugObj.wireIndex === 3) bugObj.wireIndex = 3;
            else bugObj.wireIndex++;
        }

        else if (e.key === "ArrowLeft" && !bugObj.isJumping) {
            if (bugObj.wireIndex === 0) bugObj.wireIndex = 0;
            else bugObj.wireIndex--;
        }

        else if (e.key === "ArrowUp" && !bugObj.isJumping) {
            bugObj.jumpBug(bugObj.bug);
        }

        else if (e.key === " " && gameOver) {
            restart();
        }
    })

    // Restart game after game over
    function restart() {
        gameOver = false;
        bugObj.isJumping = false;

        obstacleObj.obstaclesList = [];

        bugObj.wireIndex = Math.floor(bugObj.bug.x / bugObj.wireDistance);

        scoreObj.startTime = performance.now();

        mainLoop = setInterval(main, 16);

    }

    // main function
    function main() {

        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWires();
            obstacleObj.drawObstacles();
            scoreObj.drawScore();
            bugObj.drawBug();

            if (scoreObj.updateScore() <= 10 && Math.random() < 0) {
                obstacleObj.createObstacles();
            }

            else if (scoreObj.updateScore() > 10 && scoreObj.updateScore() <= 50 && Math.random() < 0.01) {
                obstacleObj.createObstacles();
            }

            else if (scoreObj.updateScore() > 50 && scoreObj.updateScore() <= 70 && Math.random() < 0.03) {
                obstacleObj.createObstacles();
            }

            else if (scoreObj.updateScore() > 70 && scoreObj.updateScore() <= 100 && Math.random() < 0.05) {
                obstacleObj.createObstacles();
            }

            else if (scoreObj.updateScore() > 100 && Math.random() < 0.06) {
                obstacleObj.createObstacles();
            }

            obstacleObj.moveObstacle();
            collisionDetection();
            document.querySelector(".game-control").style.display = "none";
        }

        else {
            let gameOverCard = document.querySelector(".game-control");
            let yourScore = scoreObj.updateScore();

            // Get highest score
            let highestScore = localStorage.getItem('highestScore') || 0;

            // Updating Highscore
            if (yourScore > highestScore) {
                localStorage.setItem('highestScore', yourScore);
            }

            // Displaying Game over card
            gameOverCard.style.display = "flex";
            gameOverCard.children[1].innerHTML = `Your Score is ${yourScore}`;

            gameOverCard.children[2].innerHTML = `Highest Score is ${localStorage.getItem("highestScore")}`;

            clearInterval(mainLoop);
        }
    }

    let mainLoop = setInterval(main, 16);

}