class StatusBar extends DrawableObject {
    percentage = 0;
    IMAGES = [];
    width = 232;
    height = 30;

    /**
     * Intitialises the StatusBar object by loading all Images.
     */
    constructor() {
        super().loadImages(this.IMAGES);
    }

    /**
     * Shows the image based on percentage.
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Calculates the index for all status bars based on current percentage.
     * @returns the rounded result of the percentage divided by 10
     */
    getImageIndex() {
        return Math.floor(this.percentage / 10);
    }
}