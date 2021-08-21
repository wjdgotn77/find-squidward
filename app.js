const $startZone = document.querySelector(".start-zone");
const $startButton = document.querySelector(".start-button");

const $limitedTime = document.querySelector(".limited-time");
const $countPairedCards = document.querySelector(".paired-cards");
const $cardsZone = document.querySelector(".cards-container");
const $cards = document.querySelectorAll(".cards");
const $frontImages = document.querySelectorAll(".front");

const $restartZone = document.querySelector(".restart-zone");
const $restartButton = document.querySelector(".restart-button");
const $resultText = document.querySelector(".game-result");
const $resultImage = document.querySelector(".result-message");

const imageList = [
  "./asset/images/squidward_1.jpg",
  "./asset/images/squidward_1.jpg",
  "./asset/images/squidward_2.jpg",
  "./asset/images/squidward_2.jpg",
  "./asset/images/squidward_3.jpg",
  "./asset/images/squidward_3.jpg",
  "./asset/images/squidward_4.jpg",
  "./asset/images/squidward_4.jpg",
  "./asset/images/squidward_5.jpg",
  "./asset/images/squidward_5.jpg",
  "./asset/images/squidward_6.jpg",
  "./asset/images/squidward_6.jpg",
  "./asset/images/squidward_7.jpg",
  "./asset/images/squidward_7.jpg",
  "./asset/images/squidward_8.jpg",
  "./asset/images/squidward_8.jpg"
];

const GAME_PROPERTIES = {
  HIDE: "hide",
  WIN_image: "./asset/images/win.jpg",
  WIN_text: "PERFECT!!!🎷",
  TIMEOUT_image: "./asset/images/timeout.jpg",
  TIMEOUT_text: "TIME OUT!!!!!⏰"
};

const MAIN_AUDIO = new Audio("./asset/audio/main.mp3");
const WIN_AUDIO = new Audio("./asset/audio/win.mp3");

let randomImageList = [];
let clickedCards = [];
let countMatch = 0;

let countTime = 25;
let timerId = null;
let timerAutoFlip = null;

let CLICKED_COUNT = 2;

$startButton.addEventListener("click", handleClickStart);
$cardsZone.addEventListener("click", handleClickCard);
$restartButton.addEventListener("click", handleClickRestart);
shuffleImages(imageList);

function handleClickStart() {
  $startZone.classList.add(GAME_PROPERTIES.HIDE);
  timerId = setTimeout(setLimitiedTimer, 1000);
  shuffleImages(imageList);
  printShuffleImages();
  MAIN_AUDIO.play();
}

function shuffleImages(array) {
  for (let i = array.length - 1; i > -1; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    randomImageList.push(array[i]);
  }
  return randomImageList;
}

function printShuffleImages() {
  $cards.forEach((item, number) => {
    const createBackImage = document.createElement("img");
    createBackImage.setAttribute("class", "back");
    createBackImage.setAttribute("src", randomImageList[number] );
    item.appendChild(createBackImage);
  });
}

function handleClickCard(event) {
  const target = event.target;
  const targetId = target.id;
  const imageFront = target.classList.contains("front");
  const imageBack = target.classList.contains("back");

  if (imageBack || !imageFront) return;

  target.classList.add(GAME_PROPERTIES.HIDE);
  clickedCards.push([Number(targetId), randomImageList[targetId]]);

  checkedCardsMatch();
}

function checkedCardsMatch() {
  if (clickedCards.length === CLICKED_COUNT) {

    if (clickedCards[0][1] === clickedCards[1][1]) {
      countMatch++;
      clickedCards = [];
      $countPairedCards.textContent = `찾은 징징이 : ${countMatch} 쌍`;

      winningResult();
    } else {
      timerAutoFlip = setTimeout(flippedCards, 300);
    }
  }
}

function flippedCards() {
  for (let i = 0; i < CLICKED_COUNT; i++) {
    $frontImages[clickedCards[i][0]].classList.remove(GAME_PROPERTIES.HIDE);
  }
  clickedCards = [];
}

function setLimitiedTimer() {
  timerId = setTimeout(setLimitiedTimer, 1000);
  $limitedTime.textContent = `남은 시간: ${countTime} 초`;
  countTime--;

  if (countTime !== 0) return;

  timeoutResult();
}


// 마지막 버튼을 클릭했을 때 WIN.mp3 재생.
function winningResult() {

  if (countMatch !== 8) return;

  clearTimeout(timerId);
  $restartZone.classList.remove(GAME_PROPERTIES.HIDE);
  $resultText.textContent = GAME_PROPERTIES.WIN_text;

  const createWinningImage = document.createElement("img");
  createWinningImage.setAttribute("src", GAME_PROPERTIES.WIN_image);
  $resultImage.appendChild(createWinningImage);

  MAIN_AUDIO.pause();
}

function timeoutResult() {
  $limitedTime.textContent = `남은 시간: ${countTime}`;
  clearTimeout(timerId);
  $restartZone.classList.remove(GAME_PROPERTIES.HIDE);
  $resultText.textContent = GAME_PROPERTIES.TIMEOUT_text;

  const createTimeoutImage = document.createElement("img");
  createTimeoutImage.setAttribute("src", GAME_PROPERTIES.TIMEOUT_image);
  $resultImage.appendChild(createTimeoutImage);

  MAIN_AUDIO.pause();
}

function handleClickRestart() {
  $restartZone.classList.add(GAME_PROPERTIES.HIDE);
  $startZone.classList.remove(GAME_PROPERTIES.HIDE);
  clearContents();
}

function clearContents() {
  const $deleteBackImage = document.querySelectorAll(".back");
  $deleteBackImage.forEach((element) => {
    element.remove();
  });

  const imageForResult = $resultImage.querySelector("img");
  imageForResult.remove();

  randomImageList = [];
  clickedCards = [];
  countMatch = 0;
  countTime = 25;
  timerId = null;
  timerAutoFlip = null;
}

// 1. restart 함수 작성  OK!
// 2. audio 파일 집어넣기
// 3. css 보강
