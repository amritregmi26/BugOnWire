let canvas = document.querySelector("#gameCanvas");
canvas.height = 600;
canvas.width = 800;
if (canvas.getContext) {
    // Enabling Intellisense of VS code for canvas
    /** @type {CanvasRenderingContext2D} */

    const ctx = canvas.getContext("2d");
    let gameOver = false;

    // Initial bug logic
    const bug = {
        x: canvas.width / 2, // 400
        y: canvas.height - 50, // 550
        width: 50,
        height: 50,
        color: "green",
        scale: 2
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
        y: 20,
        width: 30,
        height: 30
    };

    const obstaclesList = [];

    // wire index and distance calculation for bug movement and collision detection
    let wireDistance = canvas.width / wires.length;
    let wireIndex = Math.floor(bug.x / wireDistance);


    // Bug drawing Logic
    function drawBug() {
        ctx.fillStyle = bug.color;

        const bugX = wires[wireIndex].x;
        let x = bugX - (bug.width / 2) * bug.scale / 2;
        let y = bug.y - (bug.height / 2) * bug.scale / 2;
        let width = bug.width * bug.scale / 2;
        let height = bug.height * bug.scale / 2;

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

    // Jumping up by using scaling method
    function jumpBug() {
        bug.scale += 0.5
        setTimeout(() => {
            bug.scale = 2;
        }, 700)
    }

    // collision Detection function
    function collisionDetection() {
        for (let i = 0; i < obstaclesList.length; i++) {
            // same wire index and same y position of obstacle and bug will end the game
            if (obstaclesList[i].y + obstaclesList[i].h === bug.y
                && obstaclesList[i].wireIndex === wireIndex) {
                gameOver = true;
            }
        }
    }

    // Event listner to check key presses
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            if (wireIndex === 3) wireIndex = 3;
            else wireIndex++;
        }

        else if (e.key === "ArrowLeft") {
            if (wireIndex === 0) wireIndex = 0;
            else wireIndex--;
        }

        else if (e.key === " ") {
            jumpBug();
        }
    })

    // main Function
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
            gameOver = false;
        }
    }

    main();
}

