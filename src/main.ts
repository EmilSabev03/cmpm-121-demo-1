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

//check if button is clicked
button.addEventListener("click", () => 
{
    //increase counter and use proper wording
    counter += 1;
    if (counter == 1)
    {
        div.innerHTML = `${counter} pizza slice`;
    }

    else
    {
        div.innerHTML = `${counter} pizza slices`;
    }
});
