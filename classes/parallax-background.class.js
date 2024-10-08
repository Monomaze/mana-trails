class ParallaxBackground extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    speed = 0.15;
    world;
    direction;

    /**
     * Initialises ParallaxBackgrround object by loading all images, setting the x potion, setting the moving direction and calling the animate function.
     * @param {string} imagePath 
     * @param {number} x 
     * @param {string} direction 
     */
    constructor(imagePath, x, direction) {
        super().loadImage(imagePath);
        this.x = x;
        this.direction = direction;
        this.animate();
    }

    /**
     * Animates the object depending player inputs.
     */
    animate() {
        setInterval(() => {
            if (world !== undefined) {
                if ((this.world.keyboard.RIGHT != this.world.keyboard.LEFT)) {
                    if (this.world.keyboard.RIGHT && this.world.player.x < this.world.level.levelEndXRight && !this.world.player.isDead()) {
                        this.handleMovementDirection('normal');
                    }
    
                    if (this.world.keyboard.LEFT && this.world.player.x > this.world.level.levelEndXLeft && !this.world.player.isDead()) {
                        this.handleMovementDirection('mirrored');
                    }
                }
            }
        }, 1000 / 60);
    }

    /**
     * Handles the background movement directions.
     * @param {string} state - indicates the direction in which the background is moving
     */
    handleMovementDirection(state) {
        if (state == 'normal') {
            if (this.direction === 'right') {
                this.moveRight();
            } else if (this.direction === 'left') {
                this.moveLeft();
            }
            this.otherDirection = false;
        } else if (state == 'mirrored') {
            if (this.direction === 'right') {
                this.moveLeft();
            } else if (this.direcition === 'left') {
                this.moveRight();
            }
            this.otherDirection = true;
        }
    }
}