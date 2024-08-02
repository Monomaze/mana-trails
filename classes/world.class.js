class World {
    player = new Player();
    enemies = level1.enemies;
    parallaxBackgrounds = level1.parallaxBackground;
    backgroundObjects = level1.backgroundObjects;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.player.world = this;

        for (let i = 0; i < this.parallaxBackgrounds.length; i++) {
            this.parallaxBackgrounds[i].world = this;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.parallaxBackgrounds);
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.player);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);

        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addToMap(moveableObject) {
        if (moveableObject === this.player) {
            if (moveableObject.otherDirection) {
                this.flipImage(moveableObject);
            }
            this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
            if (moveableObject.otherDirection) {
                this.flipImageBack(moveableObject);
            }
        } else {
            this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
        }
    }

    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}