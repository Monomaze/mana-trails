const level1 = new Level(
    [
        new Mushroom(),
        new Mushroom(),
        new Mushroom()
    ],
    [
        new ParallaxBackground('img/background/background_layer_1.png', -719, 'left'),
        new ParallaxBackground('img/background/background_layer_1.png', 0, 'left'),
        new ParallaxBackground('img/background/background_layer_1.png', 719, 'left'),


        new ParallaxBackground('img/background/background_layer_2.png', -719, 'right'),
        new ParallaxBackground('img/background/background_layer_2.png', 0, 'right'),
        new ParallaxBackground('img/background/background_layer_2.png', 719, 'right'),

        new ParallaxBackground('img/background/background_layer_3.png', -719, 'left'),
        new ParallaxBackground('img/background/background_layer_3.png', 0, 'left'),
        new ParallaxBackground('img/background/background_layer_3.png', 719, 'left')
    ], 
    [
        new BackgroundObject('img/background/ground.png', -719),
        new BackgroundObject('img/background/ground.png', 0),
        new BackgroundObject('img/background/ground.png', 719)
    ]
);