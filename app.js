const $startZone = document.querySelector(".start-zone");
const $startButton = document.querySelector(".start-button");

const $limitedTime = document.querySelector(".limited-time");
const $countPairedCards = document.querySelector(".paired-cards");
const $cardsZone = document.querySelector(".cards-container");
const $cards = document.querySelectorAll(".cards");

const $restartZone = document.querySelector(".restart-zone");

const CSS_PROPERTIES = {
  hide: "hide"
};

let countSeconds = 120;
let timerId = null;

function printImages() {
  $cards.forEach((element) => {
    console.log(element);
  })
}

function handleclickCard(event) {
  const target = event.target;
  const targetNumber = target.dataset.number;
}

function setLimitedTime() {
  timerId = setTimeout(setLimitedTime, 1000);
  const limitedTimeText = `남은 시간 : ${countSeconds}초`;

  $limitedTime.textContent = limitedTimeText;
  countSeconds = countSeconds - 1;

  if ( countSeconds === -1) {
    clearTimeout(timerId);
    $restartZone.classList.remove(CSS_PROPERTIES.hide);
  }
}

function handleClickStart() {
  $startZone.classList.add(CSS_PROPERTIES.hide);
  timerId = setTimeout(setLimitedTime, 1000);
}

function init() {
  $startButton.addEventListener("click", handleClickStart);
  $cardsZone.addEventListener("click",handleclickCard);
}

init();
