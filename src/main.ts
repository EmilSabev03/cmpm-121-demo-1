import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//Display game name
const gameName = "Pizza Clicker";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add counter, lastTime, growthRate, upgrade, priceGrowth values
let counter: number = 0;
let lastTime = performance.now();
let growthRate: number = 0;
let A = 0,
  B = 0,
  C = 0;
let priceGrowthA = 1,
  priceGrowthB = 1,
  priceGrowthC = 1;

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
const image = document.createElement("img");
image.src =
  "assets/pnghq.com-pizza-slice-png-free-images-with-transparent-background.png";
image.style.width = "200px";
image.style.height = "200px";
click.appendChild(image);
app.appendChild(click);
const lineBreak = document.createElement("br");
app.appendChild(lineBreak);

//add upgrade buttons to webpage
const upgradeA = createUpgradeButton(
  `Extra Cheese<br>${10 * priceGrowthA}🍕`,
  true,
  app,
);
const upgradeB = createUpgradeButton(
  `Pepperoni and Sausage<br>${100 * priceGrowthB}🍕`,
  true,
  app,
);
const upgradeC = createUpgradeButton(
  `Golden Stove<br>${1000 * priceGrowthC}🍕`,
  true,
  app,
);

//display upgrade count
const amountUpgradeA = displayUpgradeCount("Extra Cheese", A, app);
const amountUpgradeB = displayUpgradeCount("Pepperoni and Sausage", B, app);
const amountUpgradeC = displayUpgradeCount("Golden Stove", C, app);

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

//Function to simplify display upgrade count
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
  upgradeA.disabled = counter < 10 * priceGrowthA;
  upgradeB.disabled = counter < 100 * priceGrowthB;
  upgradeC.disabled = counter < 1000 * priceGrowthC;

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
  priceGrowthA *= 1.15;
  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  upgradeA.innerHTML = `Extra Cheese<br>${(10 * priceGrowthA).toFixed(1)}🍕`;
  amountUpgradeA.innerHTML = `Extra Cheese: ${A}`;
});

upgradeB.addEventListener("click", () => {
  B += 1;
  counter -= 100;
  growthRate += 2;
  priceGrowthB *= 1.15;
  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  upgradeB.innerHTML = `Pepperoni and Sausage<br>${(100 * priceGrowthB).toFixed(1)}🍕`;
  amountUpgradeB.innerHTML = `Pepperoni and Sausage: ${B}`;
});

upgradeC.addEventListener("click", () => {
  C += 1;
  counter -= 1000;
  growthRate += 50;
  priceGrowthC *= 1.15;
  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  upgradeC.innerHTML = `Golden Stove<br>${(1000 * priceGrowthC).toFixed(1)}🍕`;
  amountUpgradeC.innerHTML = `Golden Stove: ${C}`;
});
