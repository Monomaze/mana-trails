class Mushroom extends MovableObject {


    constructor() {
        super().loadImage('../img/enemies/mushroom_idle.png');
        this.width = 56 * 1.5;
        this.height = 72 * 1.5;
        this.x = 200 + Math.random() * 500;
        this.y = 480 - this.height - 70; 
    }

}