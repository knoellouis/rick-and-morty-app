export function createButton(name, text, onClick) {
  const buttonElement = document.createElement("button");
  buttonElement.classList.add("button", `button--${name}`);
  buttonElement.setAttribute("data-js", `button-${name}`);
  buttonElement.innerText = text;
  buttonElement.addEventListener("click", onClick);
  return buttonElement;
}
