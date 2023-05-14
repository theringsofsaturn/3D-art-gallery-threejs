// rendering.js
import * as THREE from 'three';
import { displayPaintingInfo, hidePaintingInfo } from './paintingInfo.js';
import { updateMovement } from './movement.js';

export const setupRendering = (
  scene,
  camera,
  renderer,
  paintings,
  controls,
  walls
) => {
  const clock = new THREE.Clock(); // create a clock to keep track of the time between frames

  let render = function () {
    const delta = clock.getDelta(); // getDelta returns the time in seconds since the last frame

    // Add this line to update the movement
    updateMovement(delta, controls, camera, walls); // parameters we get from setupRendering above, which it gets from main.js where setupRendering is called

    const distanceThreshold = 8; // set a distance threshold (8 units)

    let paintingToShow;
    paintings.forEach((painting) => { 
      // loop through all paintings
      const distanceToPainting = camera.position.distanceTo(painting.position); // get distance to painting
      if (distanceToPainting < distanceThreshold) {
        // if distance is less than threshold (8 units)
        paintingToShow = painting; // set paintingToShow to this painting (painting will show!)
      }
    });

    if (paintingToShow) {
      // if there is a painting to show
      displayPaintingInfo(paintingToShow.userData.info); // display the painting info
    } else {
      hidePaintingInfo(); // otherwise hide the painting info
    }

    renderer.render(scene, camera); // render the scene
    requestAnimationFrame(render); // it calls the render function again, so it runs over and over
  };

  render();
};
