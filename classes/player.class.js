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

    /**
     * Initialises the Player object by loading all images and calling the applyGravity and animate functions.
     */
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

    /**
     * Moving the object and plays sounds depending on player inputs. 
     * Animates the object depending on game state.
     * Set the camera to the player.
     */
    animate() {
        setInterval(() => {
            walking_sound.pause();

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            this.handleMovementInputs();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            this.handleAnimations();
        }, 150);
    }

    /**
     * Handles all the animation states.
     */
    handleAnimations() {
        if (this.isDead()) {
            this.playDeathAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playJumpAnimation();
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playWalkAnimation();
            } else {
                this.playIdleAnimation();
            }
        }
    }

    /**
     * Plays the idle animation.
     */
    playIdleAnimation() {
        this.width = 64 * this.sizeMultiplier;
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Plays the walking animation.
     */
    playWalkAnimation() {
        this.width = 80 * this.sizeMultiplier;
        this.playAnimation(this.IMAGES_WALK);
    }

    /**
     * Plays the death animation.
     */
    playDeathAnimation() {
        this.playAnimation(this.IMAGES_DEATH);
        if (this.lastImageOfAnimation(this.IMAGES_DEATH)) {
            this.width = 96 * this.sizeMultiplier;
            this.IMAGES_DEATH = [this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1]];
            this.world.keyboard = false;
        }
    }

    /**
     * Plays the getting hurt animation.
     */
    playHurtAnimation() {
        this.width = 80 * this.sizeMultiplier;
        this.playAnimation(this.IMAGES_HURT);
        hurt_sound.play();
    }

    /**
     * Plays the jumping animation.
     */
    playJumpAnimation() {
        this.width = 72 * this.sizeMultiplier;
        this.playAnimation(this.IMAGES_JUMP);
    }

    /**
     * Handles the basic movement inputs from player (left / right).
     */
    handleMovementInputs() {
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
    }

    /**
     * Stops playing walking_sound when player is in the air.
     */
    playWalkingSoundIfOnGround() {
        if (!this.isAboveGround()) {
            walking_sound.play();
        }
    }

    /**
     * Reduces player mana.
     */
    consumeMana() {
        this.mana -= 10;
        if (this.mana < 0) {
            this.mana = 0;
        } 
    }

    /**
     * Increses player mana.
     */
    gainMana() {
        this.mana += 60;
        if (this.mana > 100) {
            this.mana = 100;
        }
    }
}