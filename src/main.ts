import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Testing name change";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add counter
let counter: number = 0;

//add div
const div = document.createElement("div");
div.innerHTML = `${counter} pizza slices`;
app.appendChild(div);

//add button to webpage
const button = document.createElement("button");
button.innerHTML = "🍕";
app.appendChild(button);

//function to format display of counter
function formatDisplay(counter: number): string 
{
    if (counter === 1) 
    {
        return `${counter} pizza slice`;
    } 
    else 
    {
        return `${counter} pizza slices`;
    }
}

//check if button is clicked
button.addEventListener("click", () => 
{
    //increase counter and use proper wording
    counter += 1;
    div.innerHTML = formatDisplay(counter);
});

//increase counter by 1 every second
setInterval(() =>
{
    counter += 1;
    div.innerHTML = formatDisplay(counter);
}, 1000);