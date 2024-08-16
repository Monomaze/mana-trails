class Enemies extends MovableObject {
    sizeMultiplier = 1;
    width = 100;
    height = 100;
    y = 410 - this.height;
    IMAGES_WALK = [];
    IMAGES_DEATH = [];
    health = 10;
    world;
    collisionDamage = 10;

    constructor() {
        super().animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.lastImageOfAnimation(this.IMAGES_DEATH)) {
                    this.IMAGES_DEATH = [this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1]];
                }
            } else {
                this.playAnimation(this.IMAGES_WALK);
            }
        }, 150)
    }

    takeDamage() {
        if (this.health < 0) {
            this.health = 0;
        } else if (this.health > 0) {
            this.health -= 10;
        }
    }
}