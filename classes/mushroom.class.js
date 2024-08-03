class Mushroom extends MovableObject {
    sizeMultiplier = 2.2;
    width = 32 * this.sizeMultiplier;
    height = 48 * this.sizeMultiplier;
    y = 480 - this.height - 70; 
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

    constructor() {
        super().loadImage('../img/enemies/mushroom/mushroom_idle.png');
        this.loadImages(this.IMAGES_WALK);

        this.x = 500 + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.6;

        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 150)
    }
}