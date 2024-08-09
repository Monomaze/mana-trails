class ShootableObject extends MovableObject {


    constructor(x, y) {
        super().loadImage('img/player_character/attack/projectile.png');
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;
        this.shoot();
    }

    shoot() {
        this.speed = 10;
        setInterval(() => {
           this.x += this.speed; 
        }, 20);
    }
}