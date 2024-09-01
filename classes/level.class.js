class Level {
    enemies;
    parallaxBackgrounds;
    backgroundObjects;
    items;
    levelEndXLeft = -600;
    levelEndXRight = 2100;

    /**
     * Initialises the level object by setting all objects from different arrays.
     * @param {array} enemies - Array of all enemy objects.
     * @param {array} parallaxBackgrounds - Array of all movable background objects.
     * @param {array} backgroundObjects - Array of all static objects.
     * @param {array} items - Array of all collectable objects.
     */
    constructor(enemies, parallaxBackgrounds, backgroundObjects, items) {
        this.enemies = enemies;
        this.parallaxBackgrounds = parallaxBackgrounds;
        this.backgroundObjects = backgroundObjects;
        this.items = items;
    }
}