import { keysPressed } from './movement.js';
import { showMenu } from './menu.js';

export const setupEventListeners = (controls) => {
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  controls.addEventListener('unlock', showMenu);
};

function onKeyDown(event) {
  if (event.key in keysPressed) {
    keysPressed[event.key] = true;
  }
}

function onKeyUp(event) {
  if (event.key in keysPressed) {
    keysPressed[event.key] = false;
  }
}
