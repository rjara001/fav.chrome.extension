import { shortcutValue, showBalloon } from "./box.util.js";
import { getShadowRoot } from "./global/index.js";

let isDragging: boolean = false;
let initialX: number;
let initialY: number;
let positionMouseX: number;
let positionMouseY: number;

export function loadMoveEvents() {
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);
}

export function startDragging(event: any) {
  let box = getShadowRoot().getElementById("balloon");
  isDragging = true;

  initialX = event.clientX - box.offsetLeft;
  initialY = event.clientY - box.offsetTop;
}

function drag(event: any) {
  positionMouseX = event.clientX;
  positionMouseY = event.clientY;

  if (isDragging) {
    let box = getShadowRoot().getElementById("balloon");
    let newX = event.clientX - initialX;
    let newY = event.clientY - initialY;
    box.style.left = newX + 'px';
    box.style.top = newY + 'px';
  }
}

function stopDragging() {
  isDragging = false;
}

export function handleKeyDown(event: any) {
  // Check if the user presses Ctrl (Cmd on Mac) + F

  if (shortcutValue(event)) {
    if (positionMouseX && positionMouseY)
      showBalloon(positionMouseX, positionMouseY);
    else
      showBalloon();
  }


}