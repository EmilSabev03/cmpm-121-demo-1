import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pizza Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


//add counter, lastTime, growthRate
let counter: number = 0;
let lastTime = performance.now();
let growthRate: number = 0;

//add div
const div = document.createElement("div");
div.innerHTML = `${counter} pizza slices`;
app.appendChild(div);


//add pizza clicker button to webpage
const click = document.createElement("button");
click.innerHTML = "🍕";
app.appendChild(click);


//add upgrade button to webpage
const upgrade = document.createElement("button");
upgrade.disabled = true;
upgrade.innerHTML = "Click here to upgrade";
app.appendChild(upgrade);


//Function to increment counter if counter > 10
function update() 
{
    upgrade.disabled = counter < 10;

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
    if (number === 1)
    {
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
upgrade.addEventListener("click", () => {
    counter -= 10;
    growthRate += 1;
    div.innerHTML = formatDisplay(counter);
});

