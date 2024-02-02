export default class Wires {

    constructor(ctx, c) {
        this.canvas = c;
        this.ctx = ctx;
        this.wires = [
            { x: this.canvas.width / 5 },
            { x: (2 * this.canvas.width) / 5 },
            { x: (3 * this.canvas.width) / 5 },
            { x: (4 * this.canvas.width) / 5 }
        ]
    }

    // Drawing wires
    drawWires() {
        this.ctx.fillStyle = "#000";
        for (let item of this.wires) {
            this.ctx.fillRect(item.x, 0, 3, this.canvas.height);
        }
    }
}