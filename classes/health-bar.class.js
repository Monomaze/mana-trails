class HealthBar extends StatusBar {
    percentage = 100;
    IMAGES = [
        'img/UI/health_bar/health_bar00.png',
        'img/UI/health_bar/health_bar10.png',
        'img/UI/health_bar/health_bar20.png',
        'img/UI/health_bar/health_bar30.png',
        'img/UI/health_bar/health_bar40.png',
        'img/UI/health_bar/health_bar50.png',
        'img/UI/health_bar/health_bar60.png',
        'img/UI/health_bar/health_bar70.png',
        'img/UI/health_bar/health_bar80.png',
        'img/UI/health_bar/health_bar90.png',
        'img/UI/health_bar/health_bar100.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 30;
        this.y = 20;
        this.setPercentage(this.percentage);
    }
}