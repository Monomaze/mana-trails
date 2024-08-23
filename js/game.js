let canvas;
let world;
let keyboard = new Keyboard();
let muted;

function init() {
    canvas = document.getElementById('canvas');
    createLevel();
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('play-button').disabled = true;
    document.getElementById('unmuted-btn').classList.remove('d-none');
    init();
}

function restartGame() {
    world.deleteWorld();
    world.clearCanvas();
    clearAllIntervals();

    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('winning-screen').classList.add('d-none');
    init();
    world.bgMusic.play().then(() => {
        if (isMuted()) {
            muteGame();
        }
    });
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

function isMuted() {
    return muted == true;
}

function muteGame() {
    document.getElementById('unmuted-btn').classList.add('d-none');
    document.getElementById('muted-btn').classList.remove('d-none');
    muted = true;
    world.pauseAudio();
}

function unmuteGame() {
    document.getElementById('muted-btn').classList.add('d-none');
    document.getElementById('unmuted-btn').classList.remove('d-none');
    world.unpauseAudio();
    muted = false;
}

window.addEventListener("keydown", (event) => {
    if (event.key === ' ') {
        keyboard.SPACE = true;
    }

    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (event.key === 'ArrowUp') {
        keyboard.UP = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.key === ' ') {
        keyboard.SPACE = false;
    }

    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (event.key === 'ArrowUp') {
        keyboard.UP = false;
    }
});