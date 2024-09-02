let level1;
let enemyArray = [];
let pBgArray = [];

/**
 * Initializes all starting objects for the level.
 */
function createLevel() {
    level1 = new Level(
        initialiseEnemies(),
        initialiseParallaxBackgrounds(), 
        initialiseBackgrounds(),
        initialiseCollectables()
    );
    enemyArray = [];
    pBgArray = [];
}

/**
 * Handles initialising of enemies.
 */
function initialiseEnemies() {
    initialiseMushroomEnemies();
    initialiseGoblinEnemies();

    return enemyArray;
}


/**
 * Initializes all mushroom enemy types for the level.
 */
function initialiseMushroomEnemies() {
    enemyArray.push(
        new Mushroom(500),
        new Mushroom(700),
        new Mushroom(1100),
        new Mushroom(1200),
        new Mushroom(1300),
        new Mushroom(1680),
        new Mushroom(1830),
        new Mushroom(2000),
        new Mushroom(2030),
        new Mushroom(2150),
        new Mushroom(2250),
        new Mushroom(2400)
    )
}

/**
 * Initializes all goblin enemy types for the level.
 */
function initialiseGoblinEnemies() {
    enemyArray.push(
        new Goblin(600),
        new Goblin(800),
        new Goblin(1150),
        new Goblin(1400),
        new Goblin(1650),
        new Goblin(1850),
        new Goblin(2450),
        new Goblin(2750)
    )
}

/**
 * Handles initialising of ParallaxBackgrounds.
 */
function initialiseParallaxBackgrounds() {
    initialiseParallaxBackgroundsLayer1();
    initialiseParallaxBackgroundsLayer2();
    initialiseParallaxBackgroundsLayer3();

    return pBgArray;
}


/**
 * Initializes the first layer of ParallaxBackgrounds.
 */
function initialiseParallaxBackgroundsLayer1() {
    pBgArray.push(
            new ParallaxBackground('img/background/background_layer_1.png', -719, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 0, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 719, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 719 * 2, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 719 * 3, 'left')
    )
}

/**
 * Initializes the second layer of ParallaxBackgrounds.
 */
function initialiseParallaxBackgroundsLayer2() {
    pBgArray.push(
            new ParallaxBackground('img/background/background_layer_2.png', -719, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 0, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 719, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 719 * 2, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 719 * 3, 'right'),
    )
}

/**
 * Initializes the third layer of ParallaxBackgrounds.
 */
function initialiseParallaxBackgroundsLayer3() {
    pBgArray.push(
            new ParallaxBackground('img/background/background_layer_3.png', -719, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 0, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 719, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 719 * 2, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 719 * 3, 'left')
    )
}


/**
 * Initializes all static backgrounds.
 */
function initialiseBackgrounds() {
    return [
        new BackgroundObject('img/background/ground.png', -719),
        new BackgroundObject('img/background/ground.png', 0),
        new BackgroundObject('img/background/ground.png', 719),
        new BackgroundObject('img/background/ground.png', 719 * 2),
        new BackgroundObject('img/background/ground.png', 719 * 3)
    ]
}

/**
 * Initializes all collectable objects.
 */
function initialiseCollectables() {
    return [
        new ManaPot(650),
        new ManaPot(1150),
        new ManaPot(1800),
        new ManaPot(-250),
        new ManaPot(-550),
        new Scroll(750),
        new Scroll(1350),
        new Scroll(2000)
    ]
}