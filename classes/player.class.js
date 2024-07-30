class Player extends MovableObject {



    constructor() {
        super().loadImage('../img/player_character/platformChar_idle.png');
    }

    jump() {
        console.log('Jumping');
    }
}