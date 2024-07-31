class MovableObject {
    x = 120;
    y = 272;
    img;
    width;
    height;

    /*
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    } */

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        console.log('Moving left');
    }
}