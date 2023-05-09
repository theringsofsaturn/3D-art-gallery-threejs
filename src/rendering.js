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
  const clock = new THREE.Clock();

  let render = function () {
    const delta = clock.getDelta();

    // Add this line to update the movement
    updateMovement(delta, controls, camera, walls);

    const distanceThreshold = 8;

    let paintingToShow;
    paintings.forEach((painting) => {
      const distanceToPainting = camera.position.distanceTo(painting.position);
      if (distanceToPainting < distanceThreshold) {
        paintingToShow = painting;
      }
    });

    if (paintingToShow) {
      displayPaintingInfo(paintingToShow.userData.info);
    } else {
      hidePaintingInfo();
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
};
