class Player extends MovableObject {
    sizeMultiplier = 1.5;
    width = 64 * this.sizeMultiplier;
    height = 96 * this.sizeMultiplier;
    y = 410 - this.height;
    mana = 100;
    world;
    speed = 5;

    offsetTop = this.height * 0.3;
    offsetLeft = this.height * 0.1;
    offsetRight = this.height * 0.1;
    offsetBottom = 0;

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
    IMAGES_JUMP = [
        'img/player_character/jump/player_jump1.png',
        'img/player_character/jump/player_jump2.png'
    ]
    IMAGES_DEATH = [
        'img/player_character/death/player_death1.png',
        'img/player_character/death/player_death2.png',
        'img/player_character/death/player_death3.png',
        'img/player_character/death/player_death4.png',
        'img/player_character/death/player_death5.png',
        'img/player_character/death/player_death6.png'
    ]
    IMAGES_HURT = [
        'img/player_character/hurt/player_hurt1.png',
        'img/player_character/hurt/player_hurt2.png',
        'img/player_character/hurt/player_hurt3.png',
        'img/player_character/hurt/player_hurt4.png'
    ]

    constructor() {
        super().loadImage('../img/player_character/idle/player_idle1.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            walking_sound.pause();

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndXRight) {
                this.moveRight();
                this.otherDirection = false;
                this.playWalkingSoundIfOnGround();
            }

            if (this.world.keyboard.LEFT && this.x > this.world.level.levelEndXLeft) {
                this.moveLeft();
                this.otherDirection = true;
                this.playWalkingSoundIfOnGround();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEATH);
                if (this.lastImageOfAnimation(this.IMAGES_DEATH)) {
                    this.width = 96 * this.sizeMultiplier;
                    this.IMAGES_DEATH = [this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1]];
                    this.world.keyboard = false;
                }
            } else if (this.isHurt()) {
                this.width = 80 * this.sizeMultiplier;
                this.playAnimation(this.IMAGES_HURT);
                hurt_sound.play();
            } else if (this.isAboveGround()) {
                this.width = 72 * this.sizeMultiplier;
                this.playAnimation(this.IMAGES_JUMP);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.width = 80 * this.sizeMultiplier;
                    this.playAnimation(this.IMAGES_WALK);
                } else {
                    this.width = 64 * this.sizeMultiplier;
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 150);
    }

    playWalkingSoundIfOnGround() {
        if (!this.isAboveGround()) {
            walking_sound.play();
        }
    }

    consumeMana() {
        this.mana -= 10;
        if (this.mana < 0) {
            this.mana = 0;
        } 
    }

    gainMana() {
        this.mana += 60;
        if (this.mana > 100) {
            this.mana = 100;
        }
    }
}