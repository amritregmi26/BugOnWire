export default class Bug {
    
    constructor(c, ctx, wire) {
        this.canvas = c;
        this.ctx = ctx;
        this.wire = wire
        this.bug = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 28,
            width: 50,
            height: 50,
            color: "green"
        };
        // wire index and distance calculation for bug movement and collision detection
        this.wireDistance = this.canvas.width / this.wire.length;
        this.wireIndex = Math.floor(this.bug.x / this.wireDistance);
    }

    // Bug drawing Logic
    drawBug() {
        this.ctx.fillStyle = this.bug.color;

        let bugX = this.wire[this.wireIndex].x;
        let x = bugX - (this.bug.width / 2);
        let y = this.bug.y - (this.bug.height / 2);

        this.ctx.fillRect(x, y, this.bug.width, this.bug.height);
    }
}