let canvas;
let world;
let keyboard = new Keyboard();
let muted;
let restart;

let bg_music = new Audio('audio/retro_mystic.ogg');
let pickup_sound = new Audio('audio/pickup.ogg');
let attack_sound = new Audio('audio/attack.wav');
let enemy_hit_sound = new Audio('audio/enemy_hit.wav');
let walking_sound = new Audio('audio/footstep_grass.ogg');
let hurt_sound = new Audio('audio/hurt.ogg');

function init() {
    canvas = document.getElementById('canvas');
    createLevel();
    world = new World(canvas, keyboard);

}

function startGame() {
    keyboard = new Keyboard();
    init();
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('play-button').disabled = true;
    document.getElementById('unmuted-btn').classList.remove('d-none');
    checkMutedGameState();
}

function restartGame(state) {
    restart = state;
    world.deleteWorld();
    world.clearCanvas();
    clearAllIntervals();

    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('winning-screen').classList.add('d-none');
    checkMutedGameState();
}

function backToMenu() {
    disableOverlayButtons();
    restartGame(false);
    init();
    muteGame();
    disableOverlayButtons();
    clearAllIntervals();
    document.getElementById('play-button').disabled = false;
    document.getElementById('canvas').classList.add('d-none');
    keyboard = false;
}

function isRestarted() {
    return restart == true;
}

function disableOverlayButtons() {
    document.getElementById('unmuted-btn').classList.add('d-none');    
    document.getElementById('muted-btn').classList.add('d-none');
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
    pauseAudio();
}

function unmuteGame() {
    document.getElementById('muted-btn').classList.add('d-none');
    document.getElementById('unmuted-btn').classList.remove('d-none');
    unpauseAudio();
    muted = false;
}

function pauseAudio() {
    bg_music.pause();
    pickup_sound.volume = 0;
    walking_sound.volume = 0;
    hurt_sound.volume = 0;
    attack_sound.volume = 0;
    enemy_hit_sound.volume = 0;
}

function unpauseAudio() {
    bg_music.play();
    pickup_sound.volume = 1;
    walking_sound.volume = 1;
    hurt_sound.volume = 1;
    attack_sound.volume = 1;
    enemy_hit_sound.volume = 1;
}

function checkMutedGameState() {
    if (isRestarted()) {
        init();
            if (isMuted()) {
                muteGame();
            }
    }
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

window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
});