class Enemies extends MovableObject {
    sizeMultiplier = 1;
    width = 100;
    height = 100;
    y = 410 - this.height;
    IMAGES_WALK = [];

    constructor() {
        super().loadImages(this.IMAGES_WALK);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 150)
    }
}