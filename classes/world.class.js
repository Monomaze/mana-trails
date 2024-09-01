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

    shootingCooldown = false;
    invulnerabilityCooldown = false;
    bossHealthBar;
    bossSpawned = false;

    /**
     * Initialises the World object by getting the drawing contect for the canvas, setting the canvas and keyboard,
     * calling several function (draw, setWorld, run) and playing the background music.
     * Also disables smoothing of images to retain pixelated look.
     * @param {element} canvas - Canvas element
     * @param {object} keyboard - Keyboard object
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled = false;
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        bg_music.play();
        bg_music.loop = true;
    }

    /**
     * Sets the world properties of other objects to this object.
     */
    setWorld() {
        this.player.world = this;

        this.level.enemies.forEach((enemy) => {
            enemy.world = this;
        })

        this.level.parallaxBackgrounds.forEach((background) => {
            background.world = this;
        });
    }

    /**
     * Checks all the collision and shows winning screen or game over screen depending on win or lose condiitions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkShootableObjects()
            this.checkCollectableCollision();
            if (this.player.isDead()) {
                setTimeout(() => {
                    this.showGameOverScreen();
                }, 1000);
            } else if (this.level.enemies[this.level.enemies.length -1].isDead() && this.bossSpawned == true) {
                setTimeout(() => {
                    this.showWinningScreen();
                }, 1000);
            }
        }, 100);
    }

    /**
     * Checks if player has enough mana. 
     * Initialises new ShootableObject depending on player input and timer.
     * Determines spawn location of object depending on player position.
     */
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

    /**
     * Unhides game over screen.
     */
    showGameOverScreen() {
        document.getElementById('game-over-screen').classList.remove('d-none');
    }

    /**
     * Unhides winning screen.
     */
    showWinningScreen() {
        document.getElementById('winning-screen').classList.remove('d-none');
    }

    /**
     * Clears complete canvas.
     */
    clearCanvas() {
        this.ctx = canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Removes all objects.
     * Stops audio.
     */
    deleteWorld() {
        pauseAudio();
        this.level = [];
        this.bossHealthBar = [];
        this.healthBar = [];
        this.manaBar = [];
        this.collectableBar = [];
        this.boss = [];
        this.player = [];
        this.bossSpawned = false;
    }

    /**
     * Handles all of ShootableObject after shooting
     * - reduces players mana
     * - setting new percantage for mana bar of player
     * - check if projectile has reached its max range
     * - setting shooting cooldown
     * @param {object} projectile - Shootable object
     */
    handleProjectile(projectile) {
        projectile.world = this;
        attack_sound.play();
        this.shootableObjects.push(projectile);
        this.player.consumeMana();
        this.manaBar.setPercentage(this.player.mana);
        this.checkProjectileRange(projectile);
        this.shootingCooldown = true;
        this.setShootingCooldown();
    }

    /**
     * Setting a cooldown timer after shooting.
     */
    setShootingCooldown() {
        setTimeout(() => {
            this.shootingCooldown = false;
            attack_sound.pause();
            attack_sound.currentTime = 0;
        }, 500);
    }

    /**
     * Setting a cooldown timer after getting hit.
     */
    setInvulnerabilityCooldown() {
        setTimeout(() => {
            this.invulnerabilityCooldown = false;
        }, 150);
    }

    /**
     * Deletes object if it reaches a predefined range.
     * @param {object} projectile - Shootable object
     */
    checkProjectileRange(projectile) {
        setInterval(() => {
            if (projectile.x == projectile.range) {
                this.killObjectFromArray(this.shootableObjects, projectile);
            }
        }, 100);
    } 

    /**
     * Delets first entry in the Shootable object array.
     * @param {array} array - Array of all Shootable objects currently in the game world
     * @param {object} entry - Entry in Shootable object array
     */
    killObjectFromArray(array, entry) {
        let index = array.indexOf(entry);
        if (index >= 0) {
            array.splice(index, 1);
        }
    }
 
    /**
     * Checks if player collides with enemy, reduces players health, sets invulnerablity cooldown timer and sets new healthbar percantage.
     * Checks if ShootableObject collides with enemy, plays hit sound, reduces enemys health and sets new boss healthbar percantage.
     * Deletes Shootable object after hitting an enemy.
     */
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
                    enemy_hit_sound.play();
                    enemy.takeDamage();
                    if (enemy instanceof Boss) {
                        this.bossHealthBar.setPercentage(enemy.health);
                    }
                    this.killObjectFromArray(this.shootableObjects, projectile);
                }
            });
        });
    }

    /**
     * Checks if player is colliding with an collectable item.
     * When the item is a ManaPot, player gains health and the ManaBar gets updated.
     * When the item is a scroll, the CollectableBar gets updated. When the bar is full, the boss spawns.
     * Deletes CollectableObject after collision.
     */
    checkCollectableCollision() {
        this.level.items.forEach(item => {
           if(this.player.isColliding(item)) {
                if (item instanceof ManaPot && this.player.mana < 100) {
                    this.player.gainMana();
                    this.manaBar.setPercentage(this.player.mana);
                    this.killObjectFromArray(this.level.items, item);
                    pickup_sound.play();
                } else if (item instanceof Scroll) {
                    this.collectableBar.setPercentage(this.collectableBar.percentage + 10);
                    this.killObjectFromArray(this.level.items, item);
                    pickup_sound.play();
                    if (this.collectableBar.percentage == 30 && this.bossSpawned == false) {
                        this.spawnBoss();
                    }
                }
           } 
        });
    }

    /**
     * Initialises the Boss object and the BossHealthBar.
     */
    spawnBoss() {
        this.bossSpawned = true;
        let boss = new Boss();
        boss.world = this;
        this.level.enemies.push(boss);
        this.bossHealthBar = new BossHealthBar();
    }

    /**
     * Draws every object on the canvas.
     */
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
    
    /**
     * Adds all MoveableObject to canvas.
     */
    addMovableObjects() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.player);
        this.addObjectsToMap(this.shootableObjects);
    }

    /**
     * Adds all UI elements to canvas.
     */
    addUIElements() {
        this.addToMap(this.healthBar);
        this.addToMap(this.manaBar);
        this.addToMap(this.collectableBar);
        if (this.bossHealthBar instanceof BossHealthBar) {
            this.addToMap(this.bossHealthBar);
        }
    }

    /**
     * Adds all Background objects to canvas.
     */
    addBackgrounds() {
        this.addObjectsToMap(this.level.parallaxBackgrounds);
        this.addObjectsToMap(this.level.backgroundObjects);
    }

    /**
     * Draws a single MovableObject to canvas.
     * Can draw rectangles around MovableObjects.
     * Flips images of Boss and Player depending on looking direction.
     * @param {object} moveableObject - MovableObject that gets added to canvas.
     */
    addToMap(moveableObject) {
        if (moveableObject instanceof Player || moveableObject instanceof Boss) {
            if (moveableObject.otherDirection) {
                this.flipImage(moveableObject);
            }
            moveableObject.draw(this.ctx);
            // moveableObject.drawRect(this.ctx, 'blue');
            if (moveableObject.otherDirection) {
                this.flipImageBack(moveableObject);
            }
        } else {
            moveableObject.draw(this.ctx);
            // moveableObject.drawRect(this.ctx, 'red');
        }
    }

    /**
     * Flips images of the object.
     * @param {object} object - Object for which the image must be flipped
     */
    flipImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * Flips images of the object back to normal.
     * @param {object} object - Object for which the image must be flipped back
     */
    flipImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * Draws multiple MovableObjects to canvas.
     * @param {array} objects - Array of MovableObject that gets added to canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
}