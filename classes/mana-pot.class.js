class ManaPot extends CollectableObject {
    IMAGES_SPIN = [
        'img/items/mana_pot/mana_pot01.png',
        'img/items/mana_pot/mana_pot02.png',
        'img/items/mana_pot/mana_pot03.png',
        'img/items/mana_pot/mana_pot04.png',
        'img/items/mana_pot/mana_pot05.png',
        'img/items/mana_pot/mana_pot06.png',
        'img/items/mana_pot/mana_pot07.png',
        'img/items/mana_pot/mana_pot08.png'
    ];

    constructor(x) {
        super().loadImage('img/items/mana_pot/mana_pot01.png');
        this.loadImages(this.IMAGES_SPIN);
        this.x = x;
        this.y = 410 - this.height;
        this.animate();
    }
}