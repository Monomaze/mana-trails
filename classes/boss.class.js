class Boss extends Enemies {
    sizeMultiplier = 3;
    width = 64 * this.sizeMultiplier;
    height = 64 * this.sizeMultiplier;
    y = 410 - this.height;
    health = 100;
    speed = 1;
    IMAGES_WALK = [
        'img/enemies/boss/boss_walk01.png',
        'img/enemies/boss/boss_walk02.png',
        'img/enemies/boss/boss_walk03.png',
        'img/enemies/boss/boss_walk04.png',
        'img/enemies/boss/boss_walk05.png',
        'img/enemies/boss/boss_walk06.png',
        'img/enemies/boss/boss_walk07.png',
        'img/enemies/boss/boss_walk08.png'
    ];
    IMAGES_ATTACK = [
        'img/enemies/boss/boss_attack01.png',
        'img/enemies/boss/boss_attack02.png',
        'img/enemies/boss/boss_attack03.png',
        'img/enemies/boss/boss_attack04.png',
        'img/enemies/boss/boss_attack05.png',
        'img/enemies/boss/boss_attack06.png',
        'img/enemies/boss/boss_attack07.png',
        'img/enemies/boss/boss_attack08.png'
    ];
    IMAGES_DEATH = [
        'img/enemies/boss/boss_death01.png',
        'img/enemies/boss/boss_death02.png',
        'img/enemies/boss/boss_death03.png',
        'img/enemies/boss/boss_death04.png',
        'img/enemies/boss/boss_death05.png',
        'img/enemies/boss/boss_death06.png',
        'img/enemies/boss/boss_death07.png',
        'img/enemies/boss/boss_death08.png',
        'img/enemies/boss/boss_death09.png',
        'img/enemies/boss/boss_death10.png',
        'img/enemies/boss/boss_death11.png',
        'img/enemies/boss/boss_death12.png',
        'img/enemies/boss/boss_death13.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALK[0]);
        this.loadImages(this.IMAGES_WALK);
        this.x = 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 150)
    }
}