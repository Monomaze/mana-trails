class Player extends MovableObject {
    width = 64 * 1.5;
    height = 96 * 1.5;
    y = 480 - this.height - 70; 

    constructor() {
        super().loadImage('../img/player_character/player_idle.png');
    }

    jump() {
        console.log('Jumping');
    }
}