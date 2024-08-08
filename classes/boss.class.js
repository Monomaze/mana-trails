class Boss extends MovableObject {
    sizeMultiplier = 4;
    width = 64 * this.sizeMultiplier;
    height = 64 * this.sizeMultiplier;
    y = 410 - this.height;
    IMAGES_WALK = [
        'img/enemies/skeleton/skeleton_walk1.png',
        'img/enemies/skeleton/skeleton_walk2.png',
        'img/enemies/skeleton/skeleton_walk3.png',
        'img/enemies/skeleton/skeleton_walk4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.x = 2200;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 150)
    }

}