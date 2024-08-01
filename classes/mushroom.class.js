class Mushroom extends MovableObject {
    width = 56 * 1.5;
    height = 72 * 1.5;
    y = 480 - this.height - 70; 
    
    constructor() {
        super().loadImage('../img/enemies/mushroom_idle.png');
        this.x = 200 + Math.random() * 500;
    }

}