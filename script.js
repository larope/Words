const words = getWords();
const visibleWords = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    words.forEach((item) => {
        item.x = random(MAX_WORD_X);
        item.y = 0;
    })
    play();
}

function draw() {
    background(BACKGROUD_COLOR);

    for(let word of visibleWords) {
        text(word.text, word.x, Math.floor(word.y));
        word.y += WORD_SPEED;
    }
}

function getWords() {
    const words = WORDS.filter(word => word.length <= MAX_LETTER_COUNT)

    return words.map((word) => ({
        text: word,
        index: 0,
        x: 0,
        y: 0,
    }));
}

function play() {
    let spawningInterval = INITIAL_SPAWNING_INTERVAL;
    const intervalId = setInterval(() => {
        visibleWords.push(words.pop());
        spawningInterval -= SPAWNING_INTERVAL_ACCELERATION;

        if(spawningInterval <= 0) {
            win(intervalId);
        }
    }, spawningInterval);
}

function win(intervalId) {
    clearInterval(intervalId);
    noLoop();
    alert("You won");
}