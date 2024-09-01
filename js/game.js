let canvas;
let world;
let keyboard = new Keyboard();
let muted;
let lastTouchEnd = 0;

let bg_music = new Audio('audio/retro_mystic.ogg');
let pickup_sound = new Audio('audio/pickup.ogg');
let attack_sound = new Audio('audio/attack.wav');
let enemy_hit_sound = new Audio('audio/enemy_hit.wav');
let walking_sound = new Audio('audio/footstep_grass.ogg');
let hurt_sound = new Audio('audio/hurt.ogg');

let maxHeight = window.matchMedia("(max-height: 480px)");


/**
 * Initialises the game world.
 */
function init() {
    canvas = document.getElementById('canvas');
    createLevel();
    world = new World(canvas, keyboard);
}

/**
 * Starts the game by initializing the keyboard, call the init() function for the game world and showing the canvas.
 */
function startGame() {
    keyboard = new Keyboard();
    init();
    checkMutedGameState();
    checkIfMobile();
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('play-button').disabled = true;
    document.getElementById('unmuted-btn').classList.remove('d-none');
}

/**
 * Checks if screen is a specific maxHeight to determine if user is playing on mobile or desktop. If true, it calls a function to initialise the mobile buttons
 * and shows the mobile buttons afterwards.
 */
function checkIfMobile() {
    if (maxHeight.matches) {
        initMobileButtons();
        document.getElementById('mobile-buttons').classList.remove('d-none');
    }
}

/**
 * Calls all necessary functions to restart the game and hides the winning screen or game over screen.
 */
function restartGame() {
    world.deleteWorld();
    world.clearCanvas();
    clearAllIntervals();

    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('winning-screen').classList.add('d-none');
    init();
    checkMutedGameState();
}

/**
 * Calls all necessary functions to set the game state back to the beginning, shows the main menu and disables the keyboard inputs.
 */
function backToMenu() {
    restartGame();
    init();
    muteGame();
    hideOverlayButtons();
    clearAllIntervals();
    document.getElementById('play-button').disabled = false;
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('mobile-buttons').classList.add('d-none');
    muted = false;
    keyboard = false;
}

/**
 * Hides the mute button.
 */
function hideOverlayButtons() {
    document.getElementById('unmuted-btn').classList.add('d-none');    
    document.getElementById('muted-btn').classList.add('d-none');
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
    }
}

/**
 * @returns muted as true
 */
function isMuted() {
    return muted == true;
}

/**
 * Shows the muted audio button, sets muted state to true and mutes all audio.
 */
function muteGame() {
    document.getElementById('unmuted-btn').classList.add('d-none');
    document.getElementById('muted-btn').classList.remove('d-none');
    muted = true;
    pauseAudio();
}

/**
 * Shows the unmuted audio button, sets muted state to false and unmutes all audio.
 */
function unmuteGame() {
    document.getElementById('muted-btn').classList.add('d-none');
    document.getElementById('unmuted-btn').classList.remove('d-none');
    unpauseAudio();
    muted = false;
}


/**
 * Pauses audio or sets the volume to 0.
 */
function pauseAudio() {
    bg_music.pause();
    pickup_sound.volume = 0;
    walking_sound.volume = 0;
    hurt_sound.volume = 0;
    attack_sound.volume = 0;
    enemy_hit_sound.volume = 0;
}

/**
 * Unpauses audio or sets the volume to 1.
 */
function unpauseAudio() {
    bg_music.play();
    pickup_sound.volume = 1;
    walking_sound.volume = 1;
    hurt_sound.volume = 1;
    attack_sound.volume = 1;
    enemy_hit_sound.volume = 1;
}

/**
 * Checks muted state and mutes or unmutes game depending on it.
 */
function checkMutedGameState() {
    if (isMuted()) {
        muteGame();
    } else {
        unmuteGame();
    }
}

/**
 * Event listener for keydown events.
 */
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

/**
 * Event listener for keyup events.
 */
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

/**
 * Initialises the mobile button event listeners.
 */
function initMobileButtons() {
    addEventListenersForMovementButtons();
    addEventListenersForActionButtons();
}

/**
 * Adds event listeners for movement mobile buttons.
 */
function addEventListenersForMovementButtons() {
    document.getElementById('left-button').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.LEFT = true;
        document.getElementById('left-button').style.opacity = 1;
    });
    document.getElementById('left-button').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.LEFT = false;
        document.getElementById('left-button').style.opacity = 0.5;
    });

    document.getElementById('right-button').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.RIGHT = true;
        document.getElementById('right-button').style.opacity = 1;
    });
    document.getElementById('right-button').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.RIGHT = false;
        document.getElementById('right-button').style.opacity = 0.5;
    });
}

/**
 * Adds event listeners for action mobile buttons.
 */
function addEventListenersForActionButtons() {
    document.getElementById('attack-button').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = true;
        document.getElementById('attack-button').style.opacity = 1;
    });
    document.getElementById('attack-button').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.SPACE = false;
        document.getElementById('attack-button').style.opacity = 0.5;
    });

    document.getElementById('jump-button').addEventListener('touchstart', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.UP = true;
        document.getElementById('jump-button').style.opacity = 1;
    });
    document.getElementById('jump-button').addEventListener('touchend', (e) => {
        if (e.cancelable) e.preventDefault();
        keyboard.UP = false;
        document.getElementById('jump-button').style.opacity = 0.5;
    });
}

/**
 * Prevents default of unhandled rejection errors.
 */
window.addEventListener('unhandledrejection', event => {
    event.preventDefault();
});