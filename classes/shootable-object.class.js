class ShootableObject extends MovableObject {
    world;
    range = 0;

    /**
     * Initialises the Shootable object by loading all images, setting x and y position, setting width and height, setting the shooting direction,
     * setting the shooting range and calling the shoot function.
     * @param {number} x - x position of object
     * @param {number} y - y position of object
     * @param {boolean} playerDirection - shooting direction
     */
    constructor(x, y, playerDirection) {
        super().loadImage('img/player_character/attack/projectile.png');
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;
        this.otherDirection = playerDirection;
        this.range = this.x + 300;
        this.shoot();
    }
    
    /**
     * Determines in which direction and at what speed the object is shot.
     */
    shoot() {
        this.speed = 10;
        setInterval(() => {
            if (this.otherDirection === false) {
                this.x += this.speed; 
            } else if (this.otherDirection === true) {
                this.x -= this.speed; 
            }
        }, 20);
    }
}