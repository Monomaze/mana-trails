class Mushroom extends Enemies {
    sizeMultiplier = 2.2;
    width = 32 * this.sizeMultiplier;
    height = 48 * this.sizeMultiplier;
    y = 410 - this.height;
    offsetTop = this.height * 0.35;
    offsetLeft = this.width * 0.2;
    offsetRight = this.width * 0.2;
    offsetBottom = 0;
    IMAGES_WALK = [
        'img/enemies/mushroom/mushroom_walk1.png',
        'img/enemies/mushroom/mushroom_walk2.png',
        'img/enemies/mushroom/mushroom_walk3.png',
        'img/enemies/mushroom/mushroom_walk4.png',
        'img/enemies/mushroom/mushroom_walk5.png',
        'img/enemies/mushroom/mushroom_walk6.png',
        'img/enemies/mushroom/mushroom_walk7.png',
        'img/enemies/mushroom/mushroom_walk8.png'
    ];
    IMAGES_DEATH = [
        'img/enemies/mushroom/mushroom_death01.png',
        'img/enemies/mushroom/mushroom_death02.png',
        'img/enemies/mushroom/mushroom_death03.png',
        'img/enemies/mushroom/mushroom_death04.png'
    ];

    /**
     * Initialises the Mushroom object by loading all images and setting the starting point and movement speed with a randomness factor.
     * @param {number} startingPoint - Starting point on x axis on canvas
     */
    constructor(startingPoint) {
        super().loadImage('../img/enemies/mushroom/mushroom_idle.png');
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_DEATH);

        this.x = startingPoint + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.6;

        this.animate();
    }
}