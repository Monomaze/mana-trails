class Player extends MovableObject {

    width = 64 * 1.5;
    height = 96 * 1.5;
    y = 480 - this.height - 70; 
    IMAGES_IDLE = [
        'img/player_character/player_idle1.png',
        'img/player_character/player_idle2.png',
        'img/player_character/player_idle3.png',
        'img/player_character/player_idle4.png',
        'img/player_character/player_idle5.png',
        'img/player_character/player_idle6.png'
    ];
    world;

    constructor() {
        super().loadImage('../img/player_character/player_idle1.png');
        this.loadImages(this.IMAGES_IDLE)

        this.animate();
    }

    animate() {
        setInterval(() => {
            let index = this.currentImage % this.IMAGES_IDLE.length;
            let path = this.IMAGES_IDLE[index];
            this.img = this.imageCache[path];
            this.currentImage++;
        }, 200)

    }

    jump() {
        console.log('Jumping');
    }
}