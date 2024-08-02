class Level {
    enemies;
    parallaxBackgrounds;
    backgroundObjects;
    levelEndXLeft = -600;
    levelEndXRight = 1200;

    constructor(enemies, parallaxBackgrounds, backgroundObjects) {
        this.enemies = enemies;
        this.parallaxBackgrounds = parallaxBackgrounds;
        this.backgroundObjects = backgroundObjects;
    }
}