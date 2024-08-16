class DrawableObject {
    x = 0;
    y = 0;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;
    sizeMultiplier = 1;
    
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
    }

    lastImageOfAnimation(array) {
        return this.currentImage == array.length - 1;
    }


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
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image.');
            console.log('Could not load image ', this.img);
        }

    }

    drawRect(ctx, color) {
        if (this instanceof Player || this instanceof Mushroom || this instanceof Boss) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = color;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}


