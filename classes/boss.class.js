class Boss extends MovableObject {
    sizeMultiplier = 5;
    width = 48 * this.sizeMultiplier;
    height = 48 * this.sizeMultiplier;

    IMAGES_WALK = [
       ' img/enemies/goblin/goblin_walk1.png',
        'img/enemies/goblin/goblin_walk2.png',
        'img/enemies/goblin/goblin_walk3.png',
        'img/enemies/goblin/goblin_walk4.png',
        'img/enemies/goblin/goblin_walk5.png',
        'img/enemies/goblin/goblin_walk6.png',
        'img/enemies/goblin/goblin_walk7.png',
        'img/enemies/goblin/goblin_walk8.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.x = 700;
    }

}