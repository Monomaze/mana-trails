class ShootableObject extends MovableObject {
    world;

    constructor(x, y, playerDirection) {
        super().loadImage('img/player_character/attack/projectile.png');
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;
        this.otherDirection = playerDirection;
        this.shoot();
    }

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