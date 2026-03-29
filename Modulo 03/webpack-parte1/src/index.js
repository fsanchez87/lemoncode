import "./styles.scss";

const messageToDisplay = `Hello world!`;

const messageElement = document.createElement("p");
messageElement.textContent = messageToDisplay;
messageElement.classList.add("lemon-background");
document.body.appendChild(messageElement);
