import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//Display game name
const gameName = "Pizza Clicker";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add counter, lastTime, growthRate, upgrade values
let counter: number = 0;
let lastTime = performance.now();
let growthRate: number = 0;
let A: number = 0;
let B: number = 0;
let C: number = 0;

//display amount of slices
const div = document.createElement("div");
div.innerHTML = `${counter} pizza slices`;
app.appendChild(div);

//display growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
app.appendChild(growthRateDiv);

//add pizza clicker button to webpage
const click = document.createElement("button");
click.innerHTML = "🍕";
app.appendChild(click);

//add upgrade buttons to webpage
const upgradeA = createUpgradeButton("A", true, app);
const upgradeB = createUpgradeButton("B", true, app);
const upgradeC = createUpgradeButton("C", true, app);

//display upgrade count
const amountUpgradeA = displayUpgradeCount("A", A, app);
const amountUpgradeB = displayUpgradeCount("B", B, app);
const amountUpgradeC = displayUpgradeCount("C", C, app);

//Function to simplify creating upgrade buttons
function createUpgradeButton(
  upgrade: string,
  isDisabled: boolean,
  parentElement: HTMLElement,
): HTMLButtonElement {
  const upgradeX = document.createElement("button");
  upgradeX.disabled = isDisabled;
  upgradeX.innerHTML = upgrade;
  parentElement.appendChild(upgradeX);
  return upgradeX;
}

//Function to display upgrade count
function displayUpgradeCount(
  upgradeName: string,
  count: number,
  parentElement: HTMLElement,
): HTMLDivElement {
  const amountUpgradeX = document.createElement("div");
  amountUpgradeX.innerHTML = `${upgradeName}: ${count}`;
  parentElement.appendChild(amountUpgradeX);
  return amountUpgradeX;
}

//Function to handle upgrades and updates
function update() {
  upgradeA.disabled = counter < 10;
  upgradeB.disabled = counter < 100;
  upgradeC.disabled = counter < 1000;

  const time = performance.now();
  const deltaTime = time - lastTime;

  counter += growthRate * (deltaTime / 1000);
  div.innerHTML = formatDisplay(counter);
  lastTime = time;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

//Function to format the display
const formatDisplay = (number: number): string => {
  if (number === 1) {
    return Math.floor(number).toString() + " slice";
  }

  return Math.floor(number).toString() + " slices";
};

//Check for pizza button clicks
click.addEventListener("click", () => {
  counter += 1;
  div.innerHTML = formatDisplay(counter);
});

//Check for upgrade button clicks
upgradeA.addEventListener("click", () => {
  A += 1;
  counter -= 10;
  growthRate += 0.1;
  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  amountUpgradeA.innerHTML = `A: ${A}`;
});

upgradeB.addEventListener("click", () => {
  B += 1;
  counter -= 100;
  growthRate += 2;
  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  amountUpgradeB.innerHTML = `B: ${B}`;
});

upgradeC.addEventListener("click", () => {
  C += 1;
  counter -= 1000;
  growthRate += 50;
  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  amountUpgradeC.innerHTML = `C: ${C}`;
});
