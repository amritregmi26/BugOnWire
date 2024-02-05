import Score from "./score.js";

export default class Obstacles {
    constructor(ctx, c) {
        this.scoreObj = new Score();
        this.obstaclesList = [];
        this.ctx = ctx;
        this.canvas = c;
        this.obstacle = {
            x: [
                { wire: this.canvas.width / 5 },
                { wire: (2 * this.canvas.width) / 5 },
                { wire: (3 * this.canvas.width) / 5 },
                { wire: (4 * this.canvas.width) / 5 }
            ],
            y: 10,
            width: 50,
            height: 50,
            color: "red"
        };

        this.pole = {
            x: this.canvas.width / 5 + 235,
            y: 10,
            w: 600,
            h: 40,
            color: "#8B4513"
        }

        this.lizardImage = new Image();
        this.lizardImage.src = 'assests/img/lizard.png';

        this.electricShockImage = new Image();
        this.electricShockImage.src = 'assests/img/electricshock.png';

        this.crowImage = new Image();
        this.crowImage.src = 'assests/img/crow.png';

        setInterval(() => {
            this.createPole();
        }, 5000)
    }
    // Drawing obstacle that are created already
    drawObstacles() {
        for (const obs of this.obstaclesList) {
            this.ctx.fillStyle = obs.color;
            if (obs.type === 'lizard') {
                this.ctx.drawImage(this.lizardImage, obs.x - (obs.w / 2)- 10, obs.y, obs.w + 25, obs.h + 30);
            } else if (obs.type === 'crow') {
                this.ctx.drawImage(this.crowImage, obs.x - (obs.w / 2) -30, obs.y, obs.w + 60, obs.h + 10);
            } else {
                // Draw pole
                this.ctx.fillRect(obs.x - (obs.w / 2), obs.y, obs.w, obs.h);
            }
        }
    }

    // Obstacle creation 
    createObstacles() {
        let randomType = Math.floor(Math.random() * 2) 
        let type;

        // Assign a type to the obstacle based on random value
        if (randomType === 0) {
            type = 'lizard';
        } else {
            type = 'crow';
        }

        let randomWire = Math.floor(Math.random() * 4);

        let obs = {
            x: this.obstacle.x[randomWire].wire,
            y: this.obstacle.y,
            w: this.obstacle.width,
            h: this.obstacle.height,
            wireIndex: randomWire,
            color: this.obstacle.color,
            type: type
        }
        this.obstaclesList.push(obs);
    }

    createPole() {
        this.obstaclesList.push({
            x: this.pole.x,
            y: this.pole.y,
            w: this.pole.w,
            h: this.pole.h,
            wireIndex: "pole",
            color: this.pole.color
        });
    }

    // Moving obstacles
    moveObstacle() {
        for (let i = 0; i < this.obstaclesList.length; i++) {
            this.obstaclesList[i].y += 5;
            // removing obstacle if it crosses viewing area
            if (this.obstaclesList[i].y > this.canvas.height - 28) {
                this.obstaclesList.splice(i, 1);
                i--;
            }
        }
    }
}


