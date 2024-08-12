class StatusBar extends DrawableObject {
    percentage = 0;
    IMAGES = [];
    width = 200;
    height = 30;

    constructor() {
        super().loadImages(this.IMAGES);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.getImageIndex()];
        this.img = this.imageCache[path];
    }

    getImageIndex() {
        return Math.floor(this.percentage / 10);
    }
}