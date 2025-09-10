const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const wizardDimensions = { width: 353 * 1.2, height: 325 * 1.2 };


const levels = {
  5: "Assistant",
  10: "Novice Spellcaster",
  15: "Melancholy Master",
  35: "Brooding Enchanter",
  65: "Somber Sorcerer",
  105: "Gloomy Magus",
  150: "Despondent Warlock",
  250: "Sorrowful Wizard",
  450: "Weeping Archmage",
  650: "Mourning Sage",
  1000: "Forlorn Seer",
  1500: "Grieving Mystic",
  2500: "Wistful Elder",
  3500: "Lamenting Grandmaster",
  4500: "Tragic Oracle",
  10500: "Desolate Overwizard",
  20500: "Crying Spell Lord",
  30500: "Sadness Incarnate"
}

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./assets/sad-wizard.png";

const loopingWizards = 60;
const offsetDistance = 120;
let currentOffset = 0;

const movementRange = 200

const mouseOffset = {
  x: 0,
  y: 0
}

const movementOffset = {
  x: 0,
  y: 0
}

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

  let currentPercentage = (loopingWizards - loopCount) / loopingWizards
  context.drawImage(
    image,
    -wizardDimensions.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
    -wizardDimensions.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
    wizardDimensions.width + offset,
    wizardDimensions.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
  mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
  return start*(1-amount)+end*amount
}

function loopDraw() {

  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

  for (let i = loopingWizards; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  secondsCount.innerText = newTime;

  if(levels[newTime]) {
    level.innerText = levels[newTime]
  }

  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}
