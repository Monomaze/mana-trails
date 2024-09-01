class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    health = 100;
    mana = 100;
    lastHit = 0;

    /**
     * Applys gravity when object is above the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y > 410 - this.height) {
                    this.y = 410 - this.height;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks if y position of object is higher than normal y position of the object.
     * @returns {boolean} when true, y position is higher than the normal y position of the object
     */
    isAboveGround() {
        return this.y < 410 - this.height;
    }

    /**
     * Reduces the x position of object depending on the object speed value.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Increases the x position of object depending on the object speed value.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Increases the y position of object.
     */
    jump() {
        return this.speedY = 30;
    }

    /**
     * Checks if an object collides with another object.
     * @param {object} obj - Object with which a collision occurs  
     * @returns {boolean} when true, one object is colling with another obj
     */
    isColliding(obj) {
        return  (this.x + this.width - this.offsetRight) >= obj.x + obj.offsetLeft && 
                this.x + this.offsetLeft <= (obj.x + obj.width - obj.offsetRight) && 
                (this.y + this.height - this.offsetBottom) >= obj.y + obj.offsetTop &&
                (this.y + this.offsetTop) <= (obj.y + obj.height - obj.offsetBottom);
    }

    /**
     * Reduces player health and sets a time when player got last hit.
     * @param {number} damage - Amount of damage received
     */
    hit(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether a defined amount of time has passed since the last hit.
     * @returns {boolean} when false, player can get hurt again.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    /**
     * Checks if health is 0.
     * @returns {boolean} when true, health of player/enemy is 0
     */
    isDead() {
        return this.health == 0;
    }
}