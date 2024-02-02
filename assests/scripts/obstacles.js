export default class Obstacles {
    constructor(ctx, c) {
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
            width: 30,
            height: 30
        };
    }
    // Drawing obstacle that are created already
    drawObstacles() {
        this.ctx.fillStyle = "red";
        for (const obs of this.obstaclesList) {
            this.ctx.fillRect(obs.x - (this.obstacle.width / 2), obs.y, obs.w, obs.h);
        }
    }

    // Obstacle creation 
    createObstacles() {
        let random = Math.floor(Math.random() * 4)
        let obs = {
            x: this.obstacle.x[random].wire,
            y: this.obstacle.y,
            w: this.obstacle.width,
            h: this.obstacle.height,
            wireIndex: random
        }
        this.obstaclesList.push(obs);
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


