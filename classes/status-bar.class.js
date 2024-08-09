class StatusBar extends DrawableObject {
    percentage = 100;
    IMAGES = [
        'img/UI/heatlh_bar/health_bar00.png',
        'img/UI/heatlh_bar/health_bar10.png',
        'img/UI/heatlh_bar/health_bar20.png',
        'img/UI/heatlh_bar/health_bar30.png',
        'img/UI/heatlh_bar/health_bar40.png',
        'img/UI/heatlh_bar/health_bar50.png',
        'img/UI/heatlh_bar/health_bar60.png',
        'img/UI/heatlh_bar/health_bar70.png',
        'img/UI/heatlh_bar/health_bar80.png',
        'img/UI/heatlh_bar/health_bar90.png',
        'img/UI/heatlh_bar/health_bar100.png'
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 20;
        this.width = 200;
        this.height = 30;
        this.setPercentage(100);
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