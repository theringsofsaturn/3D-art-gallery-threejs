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

// parameters we get from setupRendering where updateMovement is called. setupRendering gets the parameters from main.jsss
export const updateMovement = (delta, controls, camera, walls) => {
  const moveSpeed = 5 * delta; // moveSpeed is the distance the camera will move in one second. We multiply by delta to make the movement framerate independent. This means that the movement will be the same regardless of the framerate. This is important because if the framerate is low, the movement will be slow and if the framerate is high, the movement will be fast. This is not what we want. We want the movement to be the same regardless of the framerate.

  const previousPosition = camera.position.clone(); // clone the camera position and store it in previousPosition. We will use this to reset the camera position if there is a collision

  // cose self-explanatory
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

  // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
  if (checkCollision(camera, walls)) {
    camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement. We use `copy` instead of `set` because `set` will set the position to the same object, so if we change the previousPosition, the camera position will also change. `copy` creates a new object with the same values as the previousPosition.
  }
};

// checkCollision takes the camera and the walls as parameters and returns true if there is a collision and false if there isn't. the camera parameter is the camera object and the walls parameter is the walls group. The paramaters are passed from updateMovement function where checkCollision is called. updateMovement gets the parameters from setupRendering where it is called. setupRendering gets the parameters from main.js where setupRendering is called.
export const checkCollision = (camera, walls) => {
  const playerBoundingBox = new THREE.Box3(); // create a bounding box for the player
  const cameraWorldPosition = new THREE.Vector3(); // create a vector to hold the camera's world position
  camera.getWorldPosition(cameraWorldPosition); // get the camera's world position and store it in cameraWorldPosition. Note: The camera represents the player's position in our case.
  playerBoundingBox.setFromCenterAndSize(
    // set the playerBoundingBox to the camera's world position and size. The size is 1, 1, 1 because the camera is a single point.
    // setFromCenterAndSize takes two parameters: center and size. The center is a Vector3 that represents the center of the bounding box. The size is a Vector3 that represents the size of the bounding box. The size is the distance from the center to the edge of the bounding box in each direction. So, if the size is 1, 1, 1, the bounding box will be 2 units wide, 2 units tall, and 2 units deep. If the size is 2, 2, 2, the bounding box will be 4 units wide, 4 units tall, and 4 units deep.
    cameraWorldPosition, // center
    new THREE.Vector3(1, 1, 1) // size
  );

  for (let i = 0; i < walls.children.length; i++) {
    // loop through each wall
    const wall = walls.children[i]; // get the wall
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      // check if the playerBoundingBox intersects with the wall's bounding box. If it does, return true.
      return true;
    }
  }

  return false; // if the playerBoundingBox doesn't intersect with any of the walls, return false.
};
