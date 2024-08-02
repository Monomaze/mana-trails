class Level {
    enemies;
    parallaxBackgrounds;
    backgroundObjects;
    levelEndX = 700;

    constructor(enemies, parallaxBackgrounds, backgroundObjects) {
        this.enemies = enemies;
        this.parallaxBackgrounds = parallaxBackgrounds;
        this.backgroundObjects = backgroundObjects;
    }
}