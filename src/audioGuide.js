import * as THREE from 'three';

let sound;

export const setupAudio = (camera) => {
  const listener = new THREE.AudioListener();
  camera.add(listener);

  sound = new THREE.Audio(listener);

  const audioLoader = new THREE.AudioLoader();
  audioLoader.load('sounds/tiersen.mp3', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.5);
  });
};

export const startAudio = () => {
  if (sound) {
    sound.play();
  }
};

export const stopAudio = () => {
  if (sound) {
    sound.pause();
  }
};
