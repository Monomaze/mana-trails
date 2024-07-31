class Player extends MovableObject {


    
    constructor() {
        super().loadImage('../img/player_character/player_idle.png');
        this.width = 64 * 1.5;
        this.height = 96 * 1.5;
        this.y = 480 - this.height - 70; 
    }

    jump() {
        console.log('Jumping');
    }
}