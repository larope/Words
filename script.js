const words = getWords();
let visibleWords = [];
let selectedWord = false;
let currentCharColor = COLOR_SELECTED_WORD;
let spawningInterval = INITIAL_SPAWNING_INTERVAL;
let scoreText = {
    x:10,
    y:42,
    score: 0
}
let accuracyText = {
    x:10,
    y:42,
    score: 0
}
let maxScoreTextWidth;
let accuracy = 100;
let triedToTypeCharacters = 0;
let failed = 0;

function setup() {
    noStroke();
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    textSize(SCORE_TEXT_SIZE);
    maxScoreTextWidth = textWidth("Your score is 1000000")

    scoreText.y = textAscent();
    accuracyText.y = textAscent()*2.5;

    textSize(TEXT_SIZE);
    textFont(TEXT_FONT);

    words.forEach((item) => {
        item.x = random(maxScoreTextWidth, SCREEN_WIDTH-textWidth(item.text)-20);
        item.y = 0;
    })
    setTimeout(AddWord(), spawningInterval);


}
//"#283618"
function draw() {
    background(COLOR_BACKGROUD);

    accuracy = 100-(failed/(triedToTypeCharacters/100))
    console.log(accuracy);
    fill(COLOR_UNSELECTED_WORD);
    rect(0,0, maxScoreTextWidth, SCREEN_HEIGHT);
    let deltaTime = 1/frameRate();
    textSize(TEXT_SIZE);
    let haveBeen = false;
    for(let word of visibleWords) {
        if(word === undefined) continue;
        let textToDraw;
        if(word.text === selectedWord.text && haveBeen == false){
            haveBeen = true;
            textToDraw = [{text : selectedWord.text.slice(0, selectedWord.index), color : COLOR_SELECTED_WORD_SUCCEED},
                {text : selectedWord.text[selectedWord.index], color: currentCharColor},
                {text : selectedWord.text.slice(selectedWord.index+1, selectedWord.text.length), color : COLOR_SELECTED_WORD}]
        }else{
            textToDraw = [{text : word.text,color : COLOR_UNSELECTED_WORD}]
        }

        let x = word.x;
        for(let wordToDraw of textToDraw){
            fill(wordToDraw.color);
            text(wordToDraw.text, x, Math.floor(word.y));
            x+=textWidth(wordToDraw.text);
        }
        word.y += WORD_SPEED*deltaTime;
    }
    if(visibleWords[0] != undefined && visibleWords[0].y > SCREEN_HEIGHT) lose();
    fill(COLOR_BACKGROUD);
    textSize(SCORE_TEXT_SIZE);
    text("Your score is " + scoreText.score, scoreText.x, scoreText.y);

    textSize(SCORE_TEXT_SIZE*0.75);
    fill(COLOR_BACKGROUD);
    text("Your accuracy is " + Math.ceil((isNaN(accuracy) ? 100 : accuracy) *100)/100 + "%", accuracyText.x, accuracyText.y);
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
    if(selectedWord === false) return;
    let expectedLetter = selectedWord.text[selectedWord.index]

    if(currentCharColor !== COLOR_SELECTED_WORD_FAILED) triedToTypeCharacters++;

    if(expectedLetter == letter) selectedWord.index++;
    else if(currentCharColor !== COLOR_SELECTED_WORD_FAILED) failed++;

    if(selectedWord.index == selectedWord.text.length) completeWord();
    currentCharColor = expectedLetter === letter ? COLOR_SELECTED_CURRENT_LETTER : COLOR_SELECTED_WORD_FAILED;

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
    audio.playbackRate =(Math.random()*1.5+0.1);
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
