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
    shootingCooldown = false;
    invulnerabilityCooldown = false;
    bossHealthBar;
    bossSpawned = false;
    gameOver = false;

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
            this.checkCollectableCollision();
            if (this.player.isDead() && this.gameOver == false) {
                this.gameOver = true;
                setTimeout(() => {
                    this.showGameOverScreen();
                }, 1000);
            }
        }, 100);
    }

    checkShootableObjects() {
        let projectile;
        if (this.player.mana > 0) {
            if (this.keyboard.SPACE && this.player.otherDirection === false && this.shootingCooldown == false) {
                projectile = new ShootableObject(this.player.x + 100, this.player.y + 50, this.player.otherDirection);
                this.handleProjectile(projectile);
            } else if (this.keyboard.SPACE && this.player.otherDirection === true && this.shootingCooldown == false) {
                projectile = new ShootableObject(this.player.x - 40, this.player.y + 50, this.player.otherDirection);
                this.handleProjectile(projectile);
            }
        }
    }

    showGameOverScreen() {
        document.getElementById('restart-button').classList.remove('d-none');
    }

    clearCanvas() {
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    deleteWorld() {
      this.level = [];
      this.bossHealthBar = [];
      this.healthBar = [];
      this.manaBar = [];
      this.collectableBar = [];
      this.boss = [];
      this.player = [];
      this.bossSpawned = false;
    }

    handleProjectile(projectile) {
        projectile.world = this;
        this.shootableObjects.push(projectile);
        this.player.consumeMana();
        this.manaBar.setPercentage(this.player.mana);
        this.checkProjectileRange(projectile);
        this.shootingCooldown = true;
        this.setShootingCooldown();
    }

    setShootingCooldown() {
        setTimeout(() => {
            this.shootingCooldown = false;
        }, 500);
    }

    setInvulnerabilityCooldown() {
        setTimeout(() => {
            this.invulnerabilityCooldown = false;
        }, 100);
    }

    checkProjectileRange(projectile) {
        setInterval(() => {
            if (projectile.x == projectile.range) {
                this.killObjectFromArray(this.shootableObjects, projectile);
            }
        }, 100);
    } 

    killObjectFromArray(array, entry) {
        let index = array.indexOf(entry);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }
 
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.player.isColliding(enemy)) {
                if (!enemy.isDead() && this.invulnerabilityCooldown == false) {
                    this.player.hit(enemy.collisionDamage);
                    this.invulnerabilityCooldown = true;
                    this.setInvulnerabilityCooldown();
                    this.healthBar.setPercentage(this.player.health);
                }
            };
            
            this.shootableObjects.forEach((projectile) => {
                if (enemy.isColliding(projectile) && !enemy.isDead()) {
                    enemy.takeDamage();
                    if (enemy instanceof Boss) {
                        this.bossHealthBar.setPercentage(enemy.health);
                    }
                    this.killObjectFromArray(this.shootableObjects, projectile);
                }
            });
        });
    }

    checkCollectableCollision() {
        this.level.items.forEach(item => {
           if(this.player.isColliding(item)) {
                if (item instanceof ManaPot && this.player.mana < 100) {
                    this.player.gainMana();
                    this.manaBar.setPercentage(this.player.mana);
                    this.killObjectFromArray(this.level.items, item);
                } else if (item instanceof Scroll) {
                    this.collectableBar.setPercentage(this.collectableBar.percentage + 10);
                    this.killObjectFromArray(this.level.items, item);
                    if (this.collectableBar.percentage == 30 && this.bossSpawned == false) {
                        this.spawnBoss();
                    }
                }
           } 
        });
    }

    spawnBoss() {
        this.bossSpawned = true;
        let boss = new Boss();
        boss.world = this;
        this.level.enemies.push(boss);
        this.bossHealthBar = new BossHealthBar();
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
        this.addObjectsToMap(this.level.items);
        this.ctx.translate(-this.camera_x, 0);
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
    
    addMovableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.player);
        this.addObjectsToMap(this.shootableObjects);
    }

    addUIElements() {
        this.addToMap(this.healthBar);
        this.addToMap(this.manaBar);
        this.addToMap(this.collectableBar);
        if (this.bossHealthBar instanceof BossHealthBar) {
            this.addToMap(this.bossHealthBar);
        }
    }

    addBackgrounds() {
        this.addObjectsToMap(this.level.parallaxBackgrounds);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    addToMap(moveableObject) {
        if (moveableObject instanceof Player || moveableObject instanceof Boss) {
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