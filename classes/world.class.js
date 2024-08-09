class World {
    player = new Player();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    shootableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.player.world = this;

        this.level.parallaxBackgrounds.forEach((background) => {
            background.world = this;
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkShootableObjects()
        }, 200);
    }

    checkShootableObjects() {
        if (this.keyboard.SPACE) {
            let projectile = new ShootableObject(this.player.x + 100, this.player.y +50);
            this.shootableObjects.push(projectile);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.player.isColliding(enemy)) {
                this.player.hit();
                this.statusBar.setPercentage(this.player.health);
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.parallaxBackgrounds);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        /* ====== Space for fixed objects ====== */
        this.addToMap(this.statusBar);
        /* ===================================== */
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.player);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);

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