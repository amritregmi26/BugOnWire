export default class Jump {

    constructor() {
        this.isJumping = false;
        this.jumpBugX = 0;
        this.jumpBugY = 0;
    }


    jumpBug() {
        this.jumpBugX = 20;
        this.jumpBugY = 100;
        setTimeout(() => {
            this.jumpBugX = 0;
            this.jumpBugY = 0;
            this.isJumping = false;
        }, 400)
        this.fall();
    }


    fall() {
        this.jumpBugX = -20;
        this.jumpBugY = -100;
        setTimeout(() => {
            this.jumpBugX = 0;
            this.jumpBugY = 0;
            this.isJumping = false;
        }, 400)
        this.isJumping = true;
    }
}