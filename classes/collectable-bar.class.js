class CollectableBar extends StatusBar {
    percentage = 10;
    width = 48 * 2;
    heigth = 16 * 2;
    IMAGES = [
        'img/UI/collectable_bar/scrolls-progress00.png',
        'img/UI/collectable_bar/scrolls-progress01.png',
        'img/UI/collectable_bar/scrolls-progress02.png',
        'img/UI/collectable_bar/scrolls-progress03.png'
    ];

    constructor() {
        super().loadImages(this.IMAGES);
        this.x = 30;
        this.y = 100;
        this.setPercentage(this.percentage);
    }
}