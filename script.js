const words = getWords();
let visibleWords = [];
let lastEnteredLetter = "";
let selectedWord = false;
let currentCharColor = SELECTED_WORD_COLOR;
let spawningInterval = INITIAL_SPAWNING_INTERVAL;
let scoreText = {
    x:10,
    y:70,
    score: 0
}

function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    textSize(FONT_SIZE);
    words.forEach((item) => {
        item.x = random(0, SCREEN_WIDTH-textWidth(item.text));
        item.y = 0;
    })
    textFont(TEXT_FONT); // Use the font-family defined in the CSSplaySound
    setTimeout(AddWord(), spawningInterval);

}

function draw() {
    background(BACKGROUD_COLOR);

    let deltaTime = 1/frameRate();

    for(let word of visibleWords) {
        if(word == undefined) continue;
        let textToDraw;
        if(word.text == selectedWord.text){
            textToDraw = [{text : selectedWord.text.slice(0, selectedWord.index), color : SELECTED_WORD_COLOR_SUCCEED},
                {text : selectedWord.text[selectedWord.index], color: currentCharColor},
                {text : selectedWord.text.slice(selectedWord.index+1, selectedWord.text.length), color : SELECTED_WORD_COLOR}]
        }else{
            textToDraw = [{text : word.text,color : UNSELECTED_WORD_COLOR}]
        }

        let x = word.x;
        for(let wordToDraw of textToDraw){
            textSize(FONT_SIZE);
            fill(wordToDraw.color);
            text(wordToDraw.text, x, Math.floor(word.y));
            x+=textWidth(wordToDraw.text);
        }
        word.y += WORD_SPEED*deltaTime;
    }
    if(visibleWords[0] != undefined && visibleWords[0].y > SCREEN_HEIGHT) lose();
    fill("#023e8a");
    text("Your score is " + scoreText.score, scoreText.x, scoreText.y);
}


function win(intervalId) {
    clearInterval(intervalId);
    noLoop();
    alert("You won");
}
//str.slice(0, index)
function selectWord(firstLetter){
    for(word of visibleWords) if(word.text[0] == firstLetter) return word;
    return false;
}

function keyTyped() {
    if(selectedWord == false) selectedWord = selectWord(key);
    fillSelectedWord(key);
}
function fillSelectedWord(letter){
    if(selectedWord == false) return;

    let expectedLetter = selectedWord.text[selectedWord.index]
    currentCharColor = expectedLetter == letter ? SELECTED_WORD_COLOR : SELECTED_WORD_COLOR_FAILED;

    if(expectedLetter == letter) selectedWord.index++;
    if(selectedWord.index == selectedWord.text.length) completeWord();
}
function completeWord(){
    scoreText.score++;
    playSound(MUSIC_WORD_COMPLETE);
    let word = 0;
    for(word in visibleWords) if(visibleWords[word].text == selectedWord.text) break;

    visibleWords.splice(word, 1);
    selectedWord = false;
}
function getWords() {
    const words = WORDS.filter(word => word.length <= MAX_LETTER_COUNT && word.length >= MIN_LETTER_COUNT)
    shuffle(words);

    return words.map((word) => ({
        text: word,
        index: 0,
        x: 0,
        y: 0,
    }));
}

let AddWord = () => {
    visibleWords.push(words.pop());
    spawningInterval = Math.max(spawningInterval+SPAWNING_INTERVAL_ACCELERATION, SPAWNING_INTERVAL_MIN)
    if(words.length <= 0 && visibleWords.length <= 0) return win();
    setTimeout(AddWord, spawningInterval);
}

const playSound = (path) => {
    let audio = new Audio(path);

    audio.mozPreservesPitch = false;
    audio.playbackRate =(Math.random()+1);
    audio.play();
}



function win(){
    alert("You won!");
}
function lose(){
    noLoop();
    alert("You lose!")
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}
