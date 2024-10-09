/*
credits:

-ChatGPT and MDN helped with step 4: 
https://chatgpt.com/share/6706d93f-51bc-8010-9158-6c8203fea11a
https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame



*/


import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pizza clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add counter, lastTime, interval
let counter: number = 0;
let lastTime = performance.now();

//add div
const div = document.createElement("div");
div.innerHTML = `${counter} pizza slices`;
app.appendChild(div);

//add button to webpage
const button = document.createElement("button");
button.innerHTML = "🍕";
app.appendChild(button);

//function to format display of counter
function formatDisplay(counter: number): string {
  if (counter === 1) {
    return `${counter} pizza slice`;
  } else {
    return `${counter} pizza slices`;
  }
}

//Increment counter once per second using frame count
function update() 
{
    const time = performance.now();
    const deltaTime = time - lastTime;
    
    counter += deltaTime / 1000;
    div.innerHTML = formatDisplay(counter);
    lastTime = time;
  
    requestAnimationFrame(update);
}
  
requestAnimationFrame(update);
  
//check for button clicks
button.addEventListener("click", () => 
{
    counter += 1;
    div.innerHTML = formatDisplay(counter);
});
