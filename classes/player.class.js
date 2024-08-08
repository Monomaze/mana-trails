class Player extends MovableObject {
    sizeMultiplier = 1.5;
    width = 64 * this.sizeMultiplier;
    height = 96 * this.sizeMultiplier;
    y = 410 - this.height;
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
    speed = 5;
    walking_sound = new Audio('audio/footstep_grass.ogg');

    constructor() {
        super().loadImage('../img/player_character/idle/player_idle1.png');
        // this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndXRight) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > this.world.level.levelEndXLeft) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.loadImages(this.IMAGES_WALK);
                this.width = 80 * this.sizeMultiplier;
                this.playAnimation(this.IMAGES_WALK);
            } else {
                this.loadImages(this.IMAGES_IDLE);
                this.width = 64 * this.sizeMultiplier;
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 150);
    }

    jump() {
        console.log('Jumping');
    }
}