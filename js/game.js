let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is ', world.player);
}

window.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.key === ' ') {
        Keyboard.SPACE = true;
        console.log('SPACE IS TRUE: ', Keyboard.SPACE);
    }

    if (event.key === 'ArrowRight') {
        Keyboard.RIGHT = true;
        console.log('RIGHT IS TRUE: ', Keyboard.RIGHT);
    }

    if (event.key === 'ArrowLeft') {
        Keyboard.LEFT = true;
        console.log('LEFT IS TRUE: ', Keyboard.RIGHT);
    }
});

window.addEventListener("keyup", (event) => {
    console.log(event);
    if (event.key === ' ') {
        Keyboard.SPACE = false;
        console.log('SPACE IS FALSE: ', Keyboard.SPACE);
    }

    if (event.key === 'ArrowRight') {
        Keyboard.RIGHT = false;
        console.log('RIGHT IS FALSE: ', Keyboard.RIGHT);
    }

    if (event.key === 'ArrowLeft') {
        Keyboard.LEFT = false;
        console.log('LEFT IS FALSE: ', Keyboard.RIGHT);
    }
});