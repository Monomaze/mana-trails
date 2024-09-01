class DrawableObject {
    x = 0;
    y = 0;
    img;
    width;
    height;
    imageCache = [];
    currentImage = 0;
    sizeMultiplier = 1;
    offsetTop = 0;
    offsetLeft = 0;
    offsetRight = 0;
    offsetBottom = 0;
    
    /**
     * Sets the img to the current image path and increments the currentImage variable. 
     * If the currentImage variable exceeds or equals the length of the array, currentImage gets reset to 0.
     * @param {array} images - Array of image paths
     */
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
        if (this.currentImage >= images.length) {
            this.currentImage = 0;
        }
    }

    /**
     * Checks of the currentImage is the last image of the array.
     * @param {array} array - Array of image paths
     * @returns {boolean} true when currentImage equals length of array minus 1.
     */
    lastImageOfAnimation(array) {
        return this.currentImage == array.length - 1;
    }

    /**
     * Creates new Image object and sets the source of the image.
     * @param {string} path - Path to an image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Creates multiple new Image objects based on array length and sets the source of every Image.
     * @param {array} arr - Array of image paths
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws images on canvas.
     * @param {drawing context} ctx - Context of Canvas/2D
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image.');
            console.log('Could not load image ', this.img);
        }

    }

    /**
     * Draws rectangle around instances of player and enemies.
     * @param {drawing context} ctx - Context of Canvas/2D
     * @param {string} color - Color for the rectangle
     */
    drawRect(ctx, color) {
        if (this instanceof Player || this instanceof Mushroom || this instanceof Boss || this instanceof Goblin) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = color;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}


