class Enemies extends MovableObject {
    sizeMultiplier = 1;
    width = 100;
    height = 100;
    y = 410 - this.height;
    IMAGES_WALK = [];
    IMAGES_DEATH = [];
    health = 5;
    world;

    constructor() {
        super().loadImages(this.IMAGES_WALK);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 150)
    }

    takeDamage() {
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.health -= 5;
        }
    }
}