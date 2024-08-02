class ParallaxBackground extends BackgroundObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    speed = 0.10;
    world;
    isParallax = true;
    direction;

    constructor(imagePath, x, direction) {
        super().loadImage(imagePath);
        this.x = x;
        this.direction = direction;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                if (this.direction === 'right') {
                    this.x += this.speed;
                } else if (this.direciotn === 'left') {
                    this.x -= this.speed + 0.20;
                }

                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                if (this.direction === 'right') {
                    this.x -= this.speed;
                } else if (this.direciotn === 'left') {
                    this.x += this.speed + 0.20;
                }
                this.otherDirection = true;
            }
        }, 1000 / 60);
    }
}