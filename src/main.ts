import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Testing name change";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//add button to webpage
const button = document.createElement('button');

button.innerHTML = '🍕';
app.appendChild(button);

button.addEventListener('click', () => {
  console.log('Button clicked');
});
