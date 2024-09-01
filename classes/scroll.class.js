class Scroll extends CollectableObject {
    IMAGES_SPIN = [
        'img/items/scroll/scroll01.png',
        'img/items/scroll/scroll02.png',
        'img/items/scroll/scroll03.png',
        'img/items/scroll/scroll04.png',
        'img/items/scroll/scroll05.png',
        'img/items/scroll/scroll06.png',
        'img/items/scroll/scroll07.png',
        'img/items/scroll/scroll08.png'
    ];

    constructor(x) {
        super().loadImage('img/items/scroll/scroll01.png');
        this.loadImages(this.IMAGES_SPIN);
        this.x = x;
        this.y = 410 - this.height - Math.random() * 250;
        this.animate();
    }
}