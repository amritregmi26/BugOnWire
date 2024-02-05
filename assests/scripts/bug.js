export default class Bug {
    constructor(c, ctx, wires) {
        this.canvas = c;
        this.ctx = ctx;
        this.wires = wires;
        this.isJumping = false;
        this.bug = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 48,
            width: 80, 
            height: 80,
            scale: 2
        };
        this.wireDistance = this.canvas.width / this.wires.length;
        this.wireIndex = Math.floor(this.bug.x / this.wireDistance);

        this.loadBugImage();
    }

    // Load bug image from file
    loadBugImage() {
        this.bugImage = new Image();
        this.bugImage.src = 'assests/img/bug.png';
    }

    // Bug drawing Logic
    drawBug() {
        const bugX = this.wires[this.wireIndex].x;
        let x = bugX - (this.bug.width / 2) * this.bug.scale / 2;
        let y = this.bug.y - (this.bug.height / 2) * this.bug.scale / 2;
        let width = this.bug.width * this.bug.scale / 2;
        let height = this.bug.height * this.bug.scale / 2;

        this.ctx.drawImage(this.bugImage, x-5, y, width, height);
        
    }

    jumpBug() {
        this.bug.scale += 0.5
        this.isJumping = true;

        setTimeout(() => {
            this.bug.scale = 2;
            this.isJumping = false;
        }, 700)
    }

}
