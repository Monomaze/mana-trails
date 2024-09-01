let level1;

function createLevel() {
    level1 = new Level(
        [
            new Mushroom(500),
            new Mushroom(700),
            new Mushroom(800),
            new Mushroom(1100),
            new Mushroom(1200),
            new Mushroom(1300),
            new Mushroom(1700),
            new Mushroom(1800),
            new Goblin(600),
            new Goblin(800),
            new Goblin(1150),
            new Goblin(1400),
            new Goblin(1650),
            new Goblin(1850),
        ],
        [
            new ParallaxBackground('img/background/background_layer_1.png', -719, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 0, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 719, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 719 * 2, 'left'),
            new ParallaxBackground('img/background/background_layer_1.png', 719 * 3, 'left'),
    
            new ParallaxBackground('img/background/background_layer_2.png', -719, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 0, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 719, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 719 * 2, 'right'),
            new ParallaxBackground('img/background/background_layer_2.png', 719 * 3, 'right'),
    
            new ParallaxBackground('img/background/background_layer_3.png', -719, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 0, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 719, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 719 * 2, 'left'),
            new ParallaxBackground('img/background/background_layer_3.png', 719 * 3, 'left')
        ], 
        [
            new BackgroundObject('img/background/ground.png', -719),
            new BackgroundObject('img/background/ground.png', 0),
            new BackgroundObject('img/background/ground.png', 719),
            new BackgroundObject('img/background/ground.png', 719 * 2),
            new BackgroundObject('img/background/ground.png', 719 * 3)
        ],
        [
            new ManaPot(400),
            new ManaPot(800),
            new ManaPot(1150),
            new ManaPot(1450),
            new ManaPot(1800),
            new ManaPot(-250),
            new ManaPot(-550),
            new Scroll(750),
            new Scroll(1350),
            new Scroll(2000)
        ]
    );
}

