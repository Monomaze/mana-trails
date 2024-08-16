class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    health = 100;
    mana = 100;
    lastHit = 0;

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

    isAboveGround() {
        return this.y < 410 - this.height;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed;
    }

    jump() {
        return this.speedY = 30;
    }

    isColliding(obj) {
        return  (this.x + this.width - this.offsetRight) >= obj.x + obj.offsetLeft && 
                this.x + this.offsetLeft <= (obj.x + obj.width - obj.offsetRight) && 
                (this.y + this.height - this.offsetBottom) >= obj.y + obj.offsetTop&&
                (this.y + this.offsetTop) <= (obj.y + obj.height - obj.offsetBottom)
    }

    hit(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 0.2;
    }

    isDead() {
        return this.health == 0;
    }
}