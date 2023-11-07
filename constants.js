const BACKGROUD_COLOR = "#50386a";
const LETTER_SIZE = 16;

const WORDS = ["hen", "tumour", "morsel", "lend", "agent", "collar", "hook", "violation", "courage", "throne", "rape", "track", "handicap", "trouser", "heaven", "public", "asylum", "hospital", "broccoli", "ball", "morale", "wage", "reservoir", "composer", "owner", "lane", "shatter", "confuse", "dinner", "linear", "build", "national", "inspector", "shot", "hall", "horoscope", "belly", "joint", "bird", "wander", "slow", "ash", "squash", "tasty", "dance", "remark", "carry", "fate", "village", "fly"];
const WORD_SPEED = 1;

const MAX_LETTER_COUNT = 10;
const MAX_WORD_SIZE = LETTER_SIZE * MAX_LETTER_COUNT;
const MAX_WORD_X = window.innerWidth - MAX_WORD_SIZE;
const INITIAL_SPAWNING_INTERVAL = 3000; // 3s
const SPAWNING_INTERVAL_ACCELERATION = 1000; // 0.1s