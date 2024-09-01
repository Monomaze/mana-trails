class ManaBar extends StatusBar {
    percentage = 100;
    IMAGES = [
        'img/UI/mana_bar/mana_bar00.png',
        'img/UI/mana_bar/mana_bar10.png',
        'img/UI/mana_bar/mana_bar20.png',
        'img/UI/mana_bar/mana_bar30.png',
        'img/UI/mana_bar/mana_bar40.png',
        'img/UI/mana_bar/mana_bar50.png',
        'img/UI/mana_bar/mana_bar60.png',
        'img/UI/mana_bar/mana_bar70.png',
        'img/UI/mana_bar/mana_bar80.png',
        'img/UI/mana_bar/mana_bar90.png',
        'img/UI/mana_bar/mana_bar100.png'
    ];

    /**
     * Initialises ManaBar object by loading images, setting the canvas position and setting the starting mana.
     */
    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 30;
        this.y = 60;
        this.setPercentage(this.percentage);
    }
}