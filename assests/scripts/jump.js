export default class Jump {
    constructor() {
        this.isJumping = false;
        this.jumpY = 100;
    }

    jumpBug(bug) {
        this.isJumping = true;
        bug.y -= this.jumpY;
        setTimeout(() => {
            this.fall(bug);
        }, 400);
    }

    fall(bug) {
        bug.y += this.jumpY;
        this.isJumping = false;
    }
}
