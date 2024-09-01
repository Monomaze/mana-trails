class BackgroundObject extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * Initialises Background object by loading the images and setting the canvas position.
     * @param {*} imagePath - Path of the image.
     * @param {*} x - Canvas position of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}