class Level {
    enemies;
    parallaxBackgrounds;
    backgroundObjects;
    items;
    levelEndXLeft = -600;
    levelEndXRight = 2100;

    constructor(enemies, parallaxBackgrounds, backgroundObjects, items) {
        this.enemies = enemies;
        this.parallaxBackgrounds = parallaxBackgrounds;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }
}