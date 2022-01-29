// base arrays
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
const suits = [`spades`, `clubs`, `hearts`, `diamonds`];
let deck = [];
drawnCards = [];
bankAmount = 10;
bidAmount = 0;
let dealerHand = [];
let playerHand = [];

// creating variables from html page
const hitMeBtn = document.querySelector(".hitMe");
const standBtn = document.querySelector(".stand");
const container = document.querySelector(".page");
const newGame = document.querySelector(".NewGame");
const subBtn = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const bidUp = document.querySelector(".upBtn");
const bidDown = document.querySelector(".downBtn");
const bidinput = document.querySelector(".bidAmount");
const bid = document.querySelector(".bid");
const dealbtn = document.querySelector(`.deal`);
const bankNum = document.querySelector(`.bankAmount`);
let total = document.querySelector(`.currTotAmo`);
let dealerTot = document.querySelector(".dealTot");
let playerTot = document.querySelector(".currTot");
let nextBtn = document.querySelector(`.nHBtn`);
let firstName = document.querySelector(".firstName");
let lastName = document.querySelector(".lastName");
let userName = document.querySelector(`.userName`);

// Aces
function getAllIndexes(arr, Value) {
  let indexes = [],
    i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === "A") indexes.push(i);
    return indexes;
  }
}

// player total counts
let temp = "0";
function totals() {
  temp = [];
  for (let i = 0; i < playerHand.length; i++) {
    if (
      playerHand[i].Value === "K" ||
      playerHand[i].Value === "Q" ||
      playerHand[i].Value === "J"
    ) {
      temp = Number(temp) + 10;
      upd();
    } else if (playerHand[i].Value === "A") {
      temp = Number(temp) + 1;
      if (temp < 12) {
        temp = Number(temp) + 10;
      }
      upd();
    } else {
      temp = Number(temp) + Number(playerHand[i].Value);
      upd();
    }
  }
}
function upd() {
  document.querySelector(".currTot").textContent = `Current total: ${temp}`;
}

// keep bank and move to the next hand
nextBtn.addEventListener("click", function () {
  refresh();
  if (bankAmount === 0) {
    alert(`GAME OVER!`);
    nameCheck();
  } else {
    bidinput.textContent = ` 0`;
    playerHand = [];
    dealerHand = [];
    upd();
    updDealer();
    totals(playerHand);
    dealerGrab(dealerHand);
    bidUp.classList.remove("hidden");
    bidDown.classList.remove("hidden");
    nextBtn.classList.add("hidden");
    standBtn.classList.remove("red");
    dealbtn.classList.remove("hidden");
    hitMeBtn.classList.remove("moveHitBtn");
    standBtn.classList.remove("moveStanBtn");
  }
});

// building the Deck
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
  src = "/deck.jpg";
  for (let i = 0; i < playerHand.length; i++) {
    document.querySelector(
      `.card-${i + 6}`
    ).src = `/${playerHand[i].Suit}-${playerHand[i].Value}.PNG`;
  }
  return card;
}

function start() {
  refresh();
  document.querySelector(".bankAmount").textContent = 10;
  document.querySelector(".currTot").textContent = `Current total: 0`;
  totals(playerHand);
}

// start over button
newGame.addEventListener("click", (e) => {
  nextBtn.classList.add("hidden");
  bankAmount = 10;
  upd();
  updDealer();
  refresh();
  bidUp.classList.remove("hidden");
  bidDown.classList.remove("hidden");
  deck = [];
  makeDeck();
  document.querySelector(".currTot").textContent = `Current total: 0`;
  for (let i = 1; i <= 1000; i++) {
    shuffle(i);
  }
  start();
  standBtn.classList.remove("red");
  hitMeBtn.classList.remove("hidden");
  playerHand = [];
  dealerHand = [];
  temp = [];
  refresh();
  dealbtn.classList.remove("hidden");
  hitMeBtn.classList.remove("moveHitBtn");
  standBtn.classList.remove("moveStanBtn");
});

// give player a new card button
hitMeBtn.addEventListener("click", (e) => {
  if (temp > 21) {
    refresh();
    playerTot.classList.add("red");
    hitMeBtn.classList.add("hidden");
    console.log(`loss`);
  } else {
    drawCard();
    totals(playerHand);
  }
});

// stay at current total, dealer then takes turn
standBtn.addEventListener("click", (e) => {
  totals(playerHand);
  checkPlayer();
  hitMeBtn.classList.add("hidden");
  standBtn.classList.add("red");
  for (let i = 0; i < dealerHand.length; i++) {
    document.querySelector(
      `.card-${i + 1}`
    ).src = `/${dealerHand[i].Suit}-${dealerHand[i].Value}.PNG`;
  }
});

// submit info to start playing button
subBtn.addEventListener("click", function () {
  overlay.classList.add("hidden");
  upd();
  updDealer();
  makeDeck();
  start();
  totals(playerHand);
  newGame.classList.remove("hidden");
  dealbtn.classList.remove("hidden");
});

// change bid amount and take it from player bank
bidUp.addEventListener("click", function () {
  if (bankAmount > 0) {
    bidinput.textContent = bidAmount + 1;
    bankNum.textContent = bankAmount - 1;
    bidAmount += 1;
    bankAmount -= 1;
  }
});

bidDown.addEventListener("click", function () {
  if (bidAmount > 0) {
    bidinput.textContent = bidAmount - 1;
    bankNum.textContent = bankAmount + 1;
    bidAmount -= 1;
    bankAmount += 1;
  }
});

// give dealer his cards
function dealing() {
  const card = deck.pop();
  dealerHand.push(card);
  for (let i = 0; i < dealerHand.length; i++) {
    document.querySelector(
      `.card-${i + 1}`
    ).src = `/${dealerHand[i].Suit}-${dealerHand[i].Value}.PNG`;
  }
  return card;
}

// deals 2 cards to player and dealer
dealbtn.addEventListener(`click`, function () {
  if (bidAmount > 0) {
    hitMeBtn.classList.add("moveHitBtn");
    standBtn.classList.add("moveStanBtn");
    bidUp.classList.add("hidden");
    bidDown.classList.add("hidden");
    hitMeBtn.classList.remove("hidden");
    playerHand = [];
    delaerHand = [];
    upd();
    updDealer();
    shuffle();
    drawCard();
    drawCard();
    dealing();
    dealing();
    upd();
    updDealer();
    document.querySelector(".currTot").textContent = `Current total: ${temp}`;
    upd();
    updDealer();
    totals(playerHand);
    dealbtn.classList.add("hidden");
    standBtn.classList.remove("hidden");
    document.querySelector(".card-1").src = `/deck.jpg`;
    console.log(playerHand);
    console.log(dealerHand);
    if (deck.length < 10) {
      makeDeck();
      shuffle();
    }
  } else {
    alert("Must place a bid");
  }
});

// dealer turn functions
function startDealer() {
  while (dealerSum < temp && dealerSum < 21 && temp <= 21) {
    // const card = deck.pop();
    // dealerHand.push(card);
    dealing();
    dealerGrab(dealerHand);
    updDealer();
    checkVictor();
  }
}

// dealer totals function
dealerSum = "0";
const dealerGrab = function () {
  dealerSum = [];
  for (let i = 0; i < dealerHand.length; i++) {
    if (
      dealerHand[i].Value === "K" ||
      dealerHand[i].Value === "Q" ||
      dealerHand[i].Value === "J"
    ) {
      dealerSum = Number(dealerSum) + 10;
      updDealer();
    } else if (dealerHand[i].Value === "A") {
      dealerSum = Number(dealerSum) + 1;
      if (dealerSum < 12) {
        dealerSum = Number(dealerSum) + 10;
      }
      updDealer();
    } else {
      dealerSum = Number(dealerSum) + Number(dealerHand[i].Value);
      updDealer();
    }
  }
};

// update dealer function
function updDealer() {
  document.querySelector(".dealTot").textContent = `Dealer total: ${dealerSum}`;
}

dealerTot = `Dealer total: ${dealerSum}`;

// Who wins dealer or player
function checkVictor() {
  if (dealerSum > temp && dealerSum <= 21) {
    refresh();
    console.log(`Dealer Win`);
  } else if (dealerSum > 21) {
    bankAmount = bidAmount * 2 + bankAmount;
    bankNum.textContent = `Bank: ${bankAmount}`;
    refresh();
    console.log(`Player Victory`);
  } else if (dealerSum === temp) {
    bankAmount = bidAmount + bankAmount;
    bankNum.textContent = `Bank: ${bankAmount}`;
    refresh();
    console.log(`tied`);
  }
  document.querySelector(".nHBtn").classList.remove("hidden");
}

// checks if player is over 21 before dealers turn
function checkPlayer() {
  if (temp <= 21) {
    startDealer();
  } else if (temp > 21) {
    document.querySelector(".nHBtn").classList.remove("hidden");
    refresh();
    console.log(`Player Loss`);
  } else {
    checkVictor();
  }
}

// resets bid amount between hands
const refresh = function () {
  bidAmount = 0;
  for (let i = 0; i < playerHand.length; i++) {
    document.querySelector(`.card-${i + 6}`).src = `/deck.jpg`;
  }
  for (let j = 0; j < dealerHand.length; j++) {
    document.querySelector(`.card-${j + 1}`).src = `/deck.jpg`;
  }
};

refresh();
function nameCheck() {
  if (firstName.value !== "Josh") {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  }
}
//TODO
// fix Aces
