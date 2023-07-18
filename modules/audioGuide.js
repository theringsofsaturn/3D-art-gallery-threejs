import * as THREE from "three";

let sound;
let bufferLoaded = false; // flag to track if audio buffer is loaded

// setup audio for the scene
export const setupAudio = (camera) => {
  // create an audio listener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add(listener);

  sound = new THREE.Audio(listener); // creating the audio source

  const audioLoader = new THREE.AudioLoader(); // create an audio loader
  audioLoader.load("sounds/tiersen.mp3", function (buffer) {
    // load the audio file
    sound.setBuffer(buffer); // set the audio source buffer
    sound.setLoop(true); // set the audio source to loop
    sound.setVolume(0.5); // set the audio source volume
    bufferLoaded = true; // set bufferLoaded flag to true once the audio buffer is loaded
  });
};

// play audio
export const startAudio = () => {
  if (sound && bufferLoaded) {
    // check if the buffer is loaded before playing
    sound.play();
  }
};

// pause audio
export const stopAudio = () => {
  if (sound) {
    sound.pause();
  }
};
