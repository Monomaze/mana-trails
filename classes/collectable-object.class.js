class CollectableObject extends DrawableObject {
    sizeMultiplier = 3;
    IMAGES_SPIN = [];

    /**
     * Initialises the Collectable object by setting the height and width.
     */
    constructor() {
        super();
        this.height = 16 * this.sizeMultiplier;
        this.width = 16 * this.sizeMultiplier;
    }

    /**
     * Shows a spinning animation for collectable objects.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPIN);
        }, 1000 / 10);
    }
}