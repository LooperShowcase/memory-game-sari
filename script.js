const Cardscontainer = document.getElementById("cards");
let cards = [];
let firstcard, secondcard;
let lockboard = false;
let score = 0;

document.getElementById("score").textContent = score;
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffelcard();
    generateCards();
    console.log(cards);
  });
function shuffelcard() {
  let currentindex = cards.length;
  let randomindex;
  let tempvalue;
  while (currentindex !== 0) {
    randomindex = Math.floor(Math.random() * currentindex);
    currentindex--;
    tempvalue = cards[currentindex];
    cards[currentindex] = cards[randomindex];
    cards[randomindex] = tempvalue;
  }
}
function generateCards() {
  for (let card of cards) {
    const cardelement = document.createElement("div");
    cardelement.classList.add("card");
    cardelement.setAttribute("data-name", card.name);
    cardelement.innerHTML = `
    <div class="front">
    <img class="front-image" src=${card.image}> </div>
    <div class="back"></div>`;
    cardelement.addEventListener("click", flipcard);
    cardelement.addEventListener("touch", flipcard);
    Cardscontainer.appendChild(cardelement);
  }
}
function flipcard() {
  if (lockboard) return;
  if (this === firstcard) return;
  this.classList.add("flipped");

  if (!firstcard) {
    firstcard = this;
    return;
  }
  secondcard = this;
  lockboard = true;
  checkformatch();
}
function checkformatch() {
  let ismatch = firstcard.dataset.name === secondcard.dataset.name;
  if (ismatch) disablecards();
  else unflipcard();
}
function disablecards() {
  firstcard.removeEventListener("click", flipcard);
  firstcard.removeEventListener("touch", flipcard);
  secondcard.removeEventListener("click", flipcard);
  secondcard.removeEventListener("touch", flipcard);

  score++;
  unlockboard();
}
function unflipcard() {
  setTimeout(() => {
    firstcard.classList.remove("flipped");
    secondcard.classList.remove("flipped");
    unlockboard();
  }, 1000);
}
function unlockboard() {
  firstcard = null;
  secondcard = null;
  lockboard = false;
}
function restart() {
  Cardscontainer.innerHTML="";
  shuffelcard();
  generateCards();
  score = 0;
  document.getElementById("score").textContent = score;
  lockboard = false;
}
