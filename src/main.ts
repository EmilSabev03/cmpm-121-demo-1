import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

//Display game name
const gameName = "Pizza Clicker";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add Item interface
interface Item {
  name: string;
  description: string;
  cost: number;
  rate: number;
  priceGrowth: number;
  count: number;
}

//define global variables
let counter: number = 0;
let lastTime = performance.now();
let growthRate: number = 0;

//const storage values
const PIZZA_EMOJI: string = "🍕";
const INITIAL_PRICE_GROWTH: number = 1;
const INITIAL_COUNT: number = 0;
const INITIAL_COSTS: number[] = [10, 100, 1000, 10000, 1000000];
const INITIAL_RATES: number[] = [0.1, 2, 50, 1500, 55000];


//Add items
const availableItems: Item[] = [
  {
    name: "Extra Cheese",
    description: "More cheese to your pizza",
    cost: INITIAL_COSTS[0],
    rate: INITIAL_RATES[0],
    priceGrowth: INITIAL_PRICE_GROWTH,
    count: INITIAL_COUNT,
  },
  {
    name: "Pepperoni and Sausage",
    description: "Adds meaty variety to your pizza",
    cost: INITIAL_COSTS[1],
    rate: INITIAL_RATES[1],
    priceGrowth: INITIAL_PRICE_GROWTH,
    count: INITIAL_COUNT,
  },
  {
    name: "Golden Oven",
    description: "The fastest pizza oven in the world",
    cost: INITIAL_COSTS[2],
    rate: INITIAL_RATES[2],
    priceGrowth: INITIAL_PRICE_GROWTH,
    count: INITIAL_COUNT,
  },
  {
    name: "Pizza Delivery",
    description: "Deliver faster!",
    cost: INITIAL_COSTS[3],
    rate: INITIAL_RATES[3],
    priceGrowth: INITIAL_PRICE_GROWTH,
    count: INITIAL_COUNT,
  },
  {
    name: "Pizza Restaurant",
    description: "Faster production in your own restaurant",
    cost: INITIAL_COSTS[4],
    rate: INITIAL_RATES[4],
    priceGrowth: INITIAL_PRICE_GROWTH,
    count: INITIAL_COUNT,
  },
];


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
click.innerHTML = PIZZA_EMOJI;
click.style.fontSize = "100px";
app.appendChild(click);
const lineBreak = document.createElement("br");
app.appendChild(lineBreak);

//add upgrade buttons to webpage
const upgradeButtons: HTMLButtonElement[] = [];

for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];
  const button = createUpgradeButton(
    `${item.name}<br>${item.description}<br>${item.cost * item.priceGrowth}🍕`,
    true,
    app,
  );
  upgradeButtons.push(button);
}

//add upgrade counts to webpage
const upgradeCount: HTMLDivElement[] = [];

for (let i = 0; i < availableItems.length; i++) {
  const item = availableItems[i];

  const amount = displayUpgradeCount(item.name, item.count, app);
  upgradeCount.push(amount);
}

//Check for pizza button clicks
click.addEventListener("click", () => {
  counter += 1;
  div.innerHTML = formatDisplay(counter);
});

//check for upgrade button clicks
for (let i = 0; i < upgradeButtons.length; i++) {
  upgradeButtons[i].addEventListener("click", () =>
    upgradeEventListener(
      upgradeButtons[i],
      i,
      availableItems[i].name,
      upgradeCount[i],
    ),
  );
}

//format the display
const formatDisplay = (number: number): string => {
  if (number === 1) {
    return Math.floor(number).toString() + " slice";
  }

  return Math.floor(number).toString() + " slices";
};

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
  for (let i = 0; i < upgradeButtons.length; i++) {
    upgradeButtons[i].disabled =
      counter < availableItems[i].cost * availableItems[i].priceGrowth;
  }

  const deltaTime = getDeltaTime();
  counter += growthRate * (deltaTime / 1000);

  div.innerHTML = formatDisplay(counter);
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

//Function to handle upgrade button clicks
function upgradeEventListener(
  upgrade: HTMLElement,
  index: number,
  name: string,
  amountUpgrade: HTMLElement,
) {
  availableItems[index].count += 1;
  counter -= availableItems[index].cost;
  growthRate += availableItems[index].rate;
  availableItems[index].priceGrowth *= 1.15;

  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  upgrade.innerHTML = `${name}<br>${availableItems[index].description}<br>${(availableItems[index].cost * availableItems[index].priceGrowth).toFixed(1)}${PIZZA_EMOJI}`;
  amountUpgrade.innerHTML = `${name}: ${availableItems[index].count}`;
}

//function that calculates delta time for counter updates
function getDeltaTime(): number {
  const time = performance.now();
  const deltaTime = time - lastTime;
  lastTime = time;
  return deltaTime;
}
