const values = [
  "A",
  "K",
  "Q",
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];
const suits = [`Spades`, `Clubs`, `Hearts`, `Diamonds`];
let deck = [];
drawnCards = [];
bankAmount = 10;
bidAmount = 0;
let dealerHand = [];
let playerHand = [];

const hitMeBtn = document.querySelector(".hitMe");
const standBtn = document.querySelector(".stand");
const container = document.querySelector(".page");
const newGame = document.querySelector(".NewGame");
const subBtn = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const bidUp = document.querySelector(".upBtn");
const bidDown = document.querySelector(".downBtn");
const bidinput = document.querySelector(".bidAmount");
const dealbtn = document.querySelector(`.deal`);
const bankNum = document.querySelector(`.bankAmount`);
let total = document.querySelector(`.currTotAmo`);

function makeDeck() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      var card = { Value: values[j], Suit: suits[i] };
      deck.push(card);
    }
  }

  return deck;
}

function shuffle() {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}

function drawCard() {
  const card = deck.pop();
  playerHand.push(card);
  return card;
}

function start() {
  document.querySelector(".bankAmount").textContent = 10;
  document.querySelector(".bidAmount").textContent = 0;
}

newGame.addEventListener("click", (e) => {
  deck = [];
  makeDeck();
  for (let i = 1; i <= 100; i++) {
    shuffle(i);
  }
  start();
  playerHand = [];
  dealerHand = [];
  temp = [];
  console.log(deck);
});

hitMeBtn.addEventListener("click", (e) => {
  drawCard();
  totals(playerHand);
  console.log(playerHand);
});

standBtn.addEventListener("click", (e) => {
  startDealer();
  console.log(`dealer turn`);
});

subBtn.addEventListener("click", function () {
  overlay.classList.add("hidden");
  makeDeck();
  start();
});

bidUp.addEventListener("click", function () {
  if (bankAmount > 0) {
    document.querySelector(".bidAmount").textContent = bidAmount + 1;
    document.querySelector(".bankAmount").textContent = bankAmount - 1;
    bidAmount += 1;
    bankAmount -= 1;
  }
  console.log(`testing testing`);
});

bidDown.addEventListener("click", function () {
  if (bidAmount > 0) {
    document.querySelector(".bidAmount").textContent = bidAmount - 1;
    document.querySelector(".bankAmount").textContent = bankAmount + 1;
    bidAmount -= 1;
    bankAmount += 1;
  }
  console.log(`testing testing`);
});

function dealing() {
  const card = deck.pop();
  dealerHand.push(card);
  return card;
}

dealbtn.addEventListener(`click`, function () {
  shuffle();
  drawCard();
  drawCard();
  dealing();
  dealing();
  console.log(playerHand);
  console.log(dealerHand);
});

sum = 0;
let temp = "";
function totals() {
  temp = [];
  for (let i = 0; i < playerHand.length; i++) {
    if (
      playerHand[i].Value === "K" ||
      playerHand[i].Value === "Q" ||
      playerHand[i].Value === "J"
    ) {
      temp = Number(temp) + 10;
    } else if (playerHand[i].Value === "A") {
      temp = Number(temp) + 10;
    } else {
      temp = Number(temp) + Number(playerHand[i].Value);
    }
  }
}
document.querySelector()
//TODO
// Display total values
// cards need to compare to dealers values and if below 21
// if player wins bid needs to * 2 and add to bank
