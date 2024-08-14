class CollectableObject extends DrawableObject {
    sizeMultiplier = 3;
    IMAGES_SPIN = [];

    constructor() {
        super();
        this.height = 16 * this.sizeMultiplier;
        this.width = 16 * this.sizeMultiplier;
        this.x = 300;
        this.y = 410 - this.height;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPIN);
        }, 1000 / 15);
    }
}