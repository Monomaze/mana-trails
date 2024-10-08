class Boss extends Enemies {
    sizeMultiplier = 3;
    width = 64 * this.sizeMultiplier;
    height = 64 * this.sizeMultiplier;
    y = 410 - this.height;
    x = 2400;
    health = 100;
    speed = 2;
    offsetTop = this.height * 0.15;
    offsetLeft = this.width * 0.1;
    offsetRight = this.width * 0.1;
    offsetBottom = 0;
    collisionDamage = 20;
    IMAGES_WALK = [
        'img/enemies/boss/boss_walk01.png',
        'img/enemies/boss/boss_walk02.png',
        'img/enemies/boss/boss_walk03.png',
        'img/enemies/boss/boss_walk04.png',
        'img/enemies/boss/boss_walk05.png',
        'img/enemies/boss/boss_walk06.png',
        'img/enemies/boss/boss_walk07.png',
        'img/enemies/boss/boss_walk08.png'
    ];
    IMAGES_ATTACK = [
        'img/enemies/boss/boss_attack01.png',
        'img/enemies/boss/boss_attack02.png',
        'img/enemies/boss/boss_attack03.png',
        'img/enemies/boss/boss_attack04.png',
        'img/enemies/boss/boss_attack05.png',
        'img/enemies/boss/boss_attack06.png',
        'img/enemies/boss/boss_attack07.png',
        'img/enemies/boss/boss_attack08.png'
    ];
    IMAGES_DEATH = [
        'img/enemies/boss/boss_death01.png',
        'img/enemies/boss/boss_death02.png',
        'img/enemies/boss/boss_death03.png',
        'img/enemies/boss/boss_death04.png',
        'img/enemies/boss/boss_death05.png',
        'img/enemies/boss/boss_death06.png',
        'img/enemies/boss/boss_death07.png',
        'img/enemies/boss/boss_death08.png',
        'img/enemies/boss/boss_death09.png',
        'img/enemies/boss/boss_death10.png',
        'img/enemies/boss/boss_death11.png',
        'img/enemies/boss/boss_death12.png',
        'img/enemies/boss/boss_death13.png'
    ];

    /**
     * Initialises the Boss object by loading all images and starting the animate function.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATTACK);        
        this.animate();
    }

    /**
     * Animates the objects depending on game state.
     */
    animate() {
        setInterval(() => {
            if(!this.isDead()) {
                this.followPlayer();
            }
        }, 1000 / 60)

        setInterval(() => {
            this.handleAnimations();
        }, 150)
    }

    /**
     * Handles all the animation states.
     */
    handleAnimations() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEATH);
            if (this.lastImageOfAnimation(this.IMAGES_DEATH)) {
                this.IMAGES_DEATH = [this.IMAGES_DEATH[this.IMAGES_DEATH.length - 1]];
            }
        } else if (this.playerIsNearby()) {
            this.playAnimation(this.IMAGES_ATTACK);
        } else {
            this.playAnimation(this.IMAGES_WALK);
        }
    }

    /**
     * Sets the movement direction depending on player position.
     */
    followPlayer() {
        if (this.world.player.x < this.x) {
            this.otherDirection = false;
            this.moveLeft();
        } else if (this.world.player.x > this.x) { 
            this.otherDirection = true;
            this.moveRight();
        }
    }

    /**
     * Checks if player is nearby.
     * @returns {boolean} true when player is nearby
     */
    playerIsNearby() {
        return (this.world.player.x - this.x > 0 && this.world.player.x - this.x < 150) || (this.world.player.x - this.x < 0 && this.world.player.x - this.x > -150);
    }
}