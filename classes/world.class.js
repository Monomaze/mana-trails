class World {
    player = new Player();
    enemies = [
        new Mushroom(),
        new Mushroom(),
        new Mushroom()
    ];
    backgroundObjects = [
        new BackgroundObject('img/background/background_layer_1.png'),
        new BackgroundObject('img/background/background_layer_2.png'),
        new BackgroundObject('img/background/background_layer_3.png'),
        new BackgroundObject('img/background/ground.png')
    ]
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
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.player);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.camera_x, 0);


        // draw() wird immer wieder augerufen
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addToMap(moveableObject) {
        if (moveableObject.otherDirection) {
            this.flipImage(moveableObject);
        }
        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height)
        if (moveableObject.otherDirection) {
            this.flipImageBack(moveableObject);
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