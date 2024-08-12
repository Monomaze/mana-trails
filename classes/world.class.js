class World {
    player = new Player();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    manaBar = new ManaBar();
    collectableBar = new CollectableBar();
    shootableObjects = [];
    bgMusic = new Audio('audio/retro_mystic.ogg');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.bgMusic.play();
        this.bgMusic.loop = true;
    }

    setWorld() {
        this.player.world = this;

        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        })

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
        let projectile;
        if (this.player.mana > 0) {
            if (this.keyboard.SPACE && this.player.otherDirection === false) {
                projectile = new ShootableObject(this.player.x + 100, this.player.y + 50, this.player.otherDirection);
                this.handleProjectile(projectile);
            } else if (this.keyboard.SPACE && this.player.otherDirection === true) {
                projectile = new ShootableObject(this.player.x - 40, this.player.y + 50, this.player.otherDirection);
                this.handleProjectile(projectile);
            }
        }
    }

    handleProjectile(projectile) {
        projectile.world = this;
        this.shootableObjects.push(projectile);
        this.player.consumeMana();
        this.manaBar.setPercentage(this.player.mana);
    }
 
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.player.isColliding(enemy)) {
                if (!enemy.isDead()) {
                    this.player.hit();
                    this.healthBar.setPercentage(this.player.health);
                }
            };
            
            this.shootableObjects.forEach((projectile) => {
                if (enemy.isColliding(projectile)) {
                    enemy.takeDamage();
                    console.log(enemy.health);
                }
            });
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addBackgrounds();
        this.ctx.translate(-this.camera_x, 0);
        /* ====== Space for fixed objects ====== */
        this.addUIElements();
        /* ===================================== */
        this.ctx.translate(this.camera_x, 0);
        this.addMovableObjects();
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
    
    addMovableObjects() {
        this.addToMap(this.player);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.shootableObjects);
    }

    addUIElements() {
        this.addToMap(this.healthBar);
        this.addToMap(this.manaBar);
        this.addToMap(this.collectableBar);
    }

    addBackgrounds() {
        this.addObjectsToMap(this.level.parallaxBackgrounds);
        this.addObjectsToMap(this.level.backgroundObjects);
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