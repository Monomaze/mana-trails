class Player extends MovableObject {

    width = 64 * 1.5;
    height = 96 * 1.5;
    y = 480 - this.height - 70; 
    IMAGES_IDLE = [
        'img/player_character/idle/player_idle1.png',
        'img/player_character/idle/player_idle2.png',
        'img/player_character/idle/player_idle3.png',
        'img/player_character/idle/player_idle4.png',
        'img/player_character/idle/player_idle5.png',
        'img/player_character/idle/player_idle6.png'
    ];
    IMAGES_WALK = [
        'img/player_character/walk/player_walk1.png',
        'img/player_character/walk/player_walk2.png',
        'img/player_character/walk/player_walk3.png',
        'img/player_character/walk/player_walk4.png',
        'img/player_character/walk/player_walk5.png',
        'img/player_character/walk/player_walk6.png',
        'img/player_character/walk/player_walk7.png',
        'img/player_character/walk/player_walk8.png'
    ];
    world;
    speed = 3;

    constructor() {
        super().loadImage('../img/player_character/idle/player_idle1.png');
        // this.loadImages(this.IMAGES_WALK);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }


        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.loadImages(this.IMAGES_WALK);
                this.width = 80 * 1.5;
                let index = this.currentImage % this.IMAGES_WALK.length;
                let path = this.IMAGES_WALK[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            } else {
                this.loadImages(this.IMAGES_IDLE);
                this.width = 64 * 1.5;
                let index = this.currentImage % this.IMAGES_IDLE.length;
                let path = this.IMAGES_IDLE[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 150);

    }

    jump() {
        console.log('Jumping');
    }
}