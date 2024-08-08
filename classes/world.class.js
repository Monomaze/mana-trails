class World {
    player = new Player();
    level = level1;
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
        this.checkCollisions();
    }

    setWorld() {
        this.player.world = this;

        for (let i = 0; i < this.level.parallaxBackgrounds.length; i++) {
            this.level.parallaxBackgrounds[i].world = this;
        }
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.player.isColliding(enemy)) {
                    console.log('Collision with Character ', enemy);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.parallaxBackgrounds);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.player);
        this.addObjectsToMap(this.level.enemies);

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
            moveableObject.draw(this.ctx);
            moveableObject.drawRect(this.ctx, 'blue');
            if (moveableObject.otherDirection) {
                this.flipImageBack(moveableObject);
            }
        } else {
            moveableObject.draw(this.ctx);
            moveableObject.drawRect(this.ctx, 'red');
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