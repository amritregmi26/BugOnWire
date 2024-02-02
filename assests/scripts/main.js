import Jump from "./jump.js";

let canvas = document.querySelector("#gameCanvas");
canvas.height = 600;
canvas.width = 800;
if (canvas.getContext) {
    // Enabling Intellisense of VS code for canvas
    /** @type {CanvasRenderingContext2D} */

    const ctx = canvas.getContext("2d");
    let gameOver = false;
    let jump = new Jump();


    // Initial bug logic
    const bug = {
        x: canvas.width / 2, // 400
        y: canvas.height - 30, // 550
        width: 50,// Jumping up by using scaling method
        height: 50,
        color: "green"
    }

    // Initial wire logic
    const wires = [
        { x: canvas.width / 5 },
        { x: (2 * canvas.width) / 5 },
        { x: (3 * canvas.width) / 5 },
        { x: (4 * canvas.width) / 5 }
    ]

    // Initial obstacle logic
    const obstacle = {
        x: [
            { wire: canvas.width / 5 },
            { wire: (2 * canvas.width) / 5 },
            { wire: (3 * canvas.width) / 5 },
            { wire: (4 * canvas.width) / 5 }
        ],
        y: 10,
        width: 30,
        height: 30
    };

    let obstaclesList = [];

    // wire index and distance calculation for bug movement and collision detection
    let wireDistance = canvas.width / wires.length;
    let wireIndex = Math.floor(bug.x / wireDistance);


    // Bug drawing Logic
    function drawBug() {
        ctx.fillStyle = bug.color;

        const bugX = wires[wireIndex].x;
        let x = bugX - (bug.width / 2) + jump.jumpBugX;
        let y = bug.y - (bug.height / 2) + jump.jumpBugY;
        let width = bug.width;
        let height = bug.height;

        ctx.fillRect(x, y, width, height);
    }

    // Drawing wires
    function drawWires() {
        ctx.fillStyle = "#000";
        for (let item of wires) {
            ctx.fillRect(item.x, 0, 3, canvas.height);
        }
    }

    // Drawing obstacle that are created already
    function drawObstacles() {
        ctx.fillStyle = "red";
        for (const obs of obstaclesList) {
            ctx.fillRect(obs.x - (obstacle.width / 2), obs.y, obs.w, obs.h);
        }
    }

    // Obstacle creation 
    function createObstacles() {
        let random = Math.floor(Math.random() * 4)
        let obs = {
            x: obstacle.x[random].wire,
            y: obstacle.y,
            w: obstacle.width,
            h: obstacle.height,
            wireIndex: random
        }
        obstaclesList.push(obs);
    }

    // Moving obstacles
    function moveObstacle() {
        for (let i = 0; i < obstaclesList.length; i++) {
            obstaclesList[i].y += 5;
            // removing obstacle if it crosses viewing area
            if (obstaclesList[i].y > canvas.height + obstaclesList[i].h / 2) {
                obstaclesList.splice(i, 1);
                i--;
            }
        }
    }

    // collision Detection function
    function collisionDetection() {
        for (let i = 0; i < obstaclesList.length; i++) {
            // same wire index and same y position of obstacle and bug will end the game
            if (obstaclesList[i].y + obstaclesList[i].h >= bug.y
                && obstaclesList[i].wireIndex === wireIndex
                && !jump.isJumping) {
                gameOver = true;
            }
        }
    }

    // Event listner to check key presses
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            if (!jump.isJumping) {
                if (wireIndex === 3) wireIndex = 3;
                else wireIndex++;
            }
        }

        else if (e.key === "ArrowLeft") {
            if (!jump.isJumping) {
                if (wireIndex === 0) wireIndex = 0;
                else wireIndex--;
            }
        }

        else if (e.key === " ") {
            if (!jump.isJumping) 
            {
                jump.jumpBug();
            }
        }
    })

    // Restart game after game over
    function restart() {
        gameOver = false;
        jump.isJumping = false;

        obstaclesList = [];

        wireIndex = Math.floor(bug.x / wireDistance);
    }

    // main function
    function main() {

        if (!gameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawWires();
            drawObstacles();
            drawBug();

            if (Math.random() < 0.04) {
                createObstacles();
            }

            moveObstacle();
            collisionDetection();

            requestAnimationFrame(main);
        }

        else {
            alert("Game Over !");
            restart();
            main();
        }
    }

    main();
}

