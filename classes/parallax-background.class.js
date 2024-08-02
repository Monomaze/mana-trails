class ParallaxBackground extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    speed = 0.10;
    world;
    direction;

    constructor(imagePath, x, direction) {
        super().loadImage(imagePath);
        this.x = x;
        this.direction = direction;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.world.player.x < this.world.level.levelEndXRight) {
                if (this.direction === 'right') {
                    this.x += this.speed;
                } else if (this.direction === 'left') {
                    this.x -= this.speed + 0.10;
                }
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.world.player.x > this.world.level.levelEndXLeft) {
                if (this.direction === 'right') {
                    this.x -= this.speed + 0.10;
                } else if (this.direcition === 'left') {
                    this.x += this.speed;
                }
                this.otherDirection = true;
            }
        }, 1000 / 60);
    }
}