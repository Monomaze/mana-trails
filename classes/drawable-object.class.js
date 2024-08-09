class DrawableObject {
    x = 0;
    y = 0;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;
    sizeMultiplier = 1;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}


