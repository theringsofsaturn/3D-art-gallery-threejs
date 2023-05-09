import * as THREE from 'three';

// object to hold the keys pressed
export const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

export const updateMovement = (delta, controls, camera, walls) => {
  const moveSpeed = 5 * delta;
  const previousPosition = camera.position.clone();

  if (keysPressed.ArrowRight || keysPressed.d) {
    controls.moveRight(moveSpeed);
  }
  if (keysPressed.ArrowLeft || keysPressed.a) {
    controls.moveRight(-moveSpeed);
  }
  if (keysPressed.ArrowUp || keysPressed.w) {
    controls.moveForward(moveSpeed);
  }
  if (keysPressed.ArrowDown || keysPressed.s) {
    controls.moveForward(-moveSpeed);
  }

  if (checkCollision(camera, walls)) {
    camera.position.copy(previousPosition);
  }
};

export const checkCollision = (camera, walls) => {
  const playerBoundingBox = new THREE.Box3();
  const cameraWorldPosition = new THREE.Vector3();
  camera.getWorldPosition(cameraWorldPosition);
  playerBoundingBox.setFromCenterAndSize(
    cameraWorldPosition,
    new THREE.Vector3(1, 1, 1)
  );

  for (let i = 0; i < walls.children.length; i++) {
    const wall = walls.children[i]; // get the wall
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      return true;
    }
  }

  return false;
};
