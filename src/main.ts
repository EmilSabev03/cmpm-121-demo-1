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
  name: string,
  cost: number,
  rate: number,
  priceGrowth: number,
  count: number,
};


//Add items
const availableItems : Item[] = [
  {name: "Extra Cheese", cost: 10, rate: 0.1, priceGrowth: 1, count: 0},
  {name: "Pepperoni and Sausage", cost: 100, rate: 2, priceGrowth: 1, count: 0},
  {name: "Golden Oven", cost: 1000, rate: 50, priceGrowth: 1, count: 0},
];


//add counter, lastTime, growthRate, upgrade, priceGrowth values
let counter: number = 0;
let lastTime = performance.now();
let growthRate: number = 0;


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
  `Extra Cheese<br>${availableItems[0].cost * availableItems[0].priceGrowth}🍕`,
  true,
  app,
);
const upgradeB = createUpgradeButton(
  `Pepperoni and Sausage<br>${availableItems[1].cost * availableItems[1].priceGrowth}🍕`,
  true,
  app,
);
const upgradeC = createUpgradeButton(
  `Golden Stove<br>${availableItems[2].cost * availableItems[2].priceGrowth}🍕`,
  true,
  app,
);


//display upgrade count
const amountUpgradeA = displayUpgradeCount("Extra Cheese", availableItems[0].count, app);
const amountUpgradeB = displayUpgradeCount("Pepperoni and Sausage", availableItems[1].count, app);
const amountUpgradeC = displayUpgradeCount("Golden Stove", availableItems[2].count, app);


//Check for pizza button clicks
click.addEventListener("click", () => {
  counter += 1;
  div.innerHTML = formatDisplay(counter);
});


//Check for upgrade button clicks
upgradeA.addEventListener("click", () => upgradeEventListener(upgradeA, 0, "Extra Cheese", amountUpgradeA));
upgradeB.addEventListener("click", () => upgradeEventListener(upgradeB, 1, "Pepperoni and Sausage", amountUpgradeB));
upgradeC.addEventListener("click", () => upgradeEventListener(upgradeC, 2, "Golden Stove", amountUpgradeC));


//Function to format the display
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
  upgradeA.disabled = counter < availableItems[0].cost * availableItems[0].priceGrowth;
  upgradeB.disabled = counter < availableItems[1].cost * availableItems[1].priceGrowth;
  upgradeC.disabled = counter < availableItems[2].cost * availableItems[2].priceGrowth;

  const time = performance.now();
  const deltaTime = time - lastTime;

  counter += growthRate * (deltaTime / 1000);
  div.innerHTML = formatDisplay(counter);
  lastTime = time;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);


//Function to handle upgrade button clicks
function upgradeEventListener(upgrade: HTMLElement, index: number, name: string, amountUpgrade: HTMLElement)
{
  availableItems[index].count += 1;
  counter -= availableItems[index].cost;
  growthRate += availableItems[index].rate;
  availableItems[index].priceGrowth *= 1.15;

  div.innerHTML = formatDisplay(counter);
  growthRateDiv.innerHTML = `${growthRate.toFixed(1)} slices/sec`;
  upgrade.innerHTML = `${name}<br>${(availableItems[index].cost * availableItems[index].priceGrowth).toFixed(1)}🍕`;
  amountUpgrade.innerHTML = `${name}: ${availableItems[index].count}`;
}