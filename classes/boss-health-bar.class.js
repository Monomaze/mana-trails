class BossHealthBar extends StatusBar {
    percentage = 100;
    sizeMultiplier = 2;
    heigth = 16 * this.sizeMultiplier;
    width = 104 * this.sizeMultiplier;
    IMAGES = [
        'img/UI/boss_health_bar/boss_health_bar00.png',
        'img/UI/boss_health_bar/boss_health_bar10.png',
        'img/UI/boss_health_bar/boss_health_bar20.png',
        'img/UI/boss_health_bar/boss_health_bar30.png',
        'img/UI/boss_health_bar/boss_health_bar40.png',
        'img/UI/boss_health_bar/boss_health_bar50.png',
        'img/UI/boss_health_bar/boss_health_bar60.png',
        'img/UI/boss_health_bar/boss_health_bar70.png',
        'img/UI/boss_health_bar/boss_health_bar80.png',
        'img/UI/boss_health_bar/boss_health_bar90.png',
        'img/UI/boss_health_bar/boss_health_bar100.png'
    ];

    /**
     * Initialises BossHealthBar by loading the images, setting the canvas position and setting the starting health.
     */
    constructor() {
        super().loadImages(this.IMAGES);        
        this.x = 480;
        this.y = 20;
        this.setPercentage(this.percentage);
    }
}