import { keysPressed } from './movement.js'; // import the keysPressed object
import { showMenu } from './menu.js'; // import the showMenu function
import { startAudio, stopAudio } from './audioGuide.js';

// add the controls parameter which is the pointer lock controls and is passed from main.js where setupEventListeners is called
export const setupEventListeners = (controls) => {
  // add the event listeners to the document which is the whole page
  document.addEventListener('keydown', onKeyDown, false); // keydown event is when the key is pressed
  document.addEventListener('keyup', onKeyUp, false); // keyup event is when the key is released
  controls.addEventListener('unlock', showMenu); // add the event listener to the controls to show the menu when the pointer is unlocked

  // Add event listeners for the audio guide buttons
  document.getElementById('start_audio').addEventListener('click', startAudio); 
  document.getElementById('stop_audio').addEventListener('click', stopAudio);
};

function onKeyDown(event) {
  // event is the event object that has the key property
  if (event.key in keysPressed) {
    // check if the key pressed by the user is in the keysPressed object
    keysPressed[event.key] = true; // if yes, set the value of the key pressed to true
  }
}

function onKeyUp(event) {
  // same but for keyup
  if (event.key in keysPressed) {
    keysPressed[event.key] = false; // set to false when the key is released
  }
}
