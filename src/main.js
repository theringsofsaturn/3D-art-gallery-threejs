import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';

const scene = new THREE.Scene(); // create a new scene

// Create a camera, which defines where we're looking at.
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);
scene.add(camera); // add the camera to the scene
camera.position.z = 5; // move camera back 5 units

// Create a render and set the size and background color
const renderer = new THREE.WebGLRenderer({ antialias: false }); // antialias means smooth edges
renderer.setSize(window.innerWidth, window.innerHeight); // set size of renderer
renderer.setClearColor(0xffffff, 1); //background color
document.body.appendChild(renderer.domElement); // add renderer to html

// Create a painting
function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader();
  const paintingTexture = textureLoader.load(imageURL);
  const paintingMaterial = new THREE.MeshBasicMaterial({
    map: paintingTexture,
  });
  const paintingGeometry = new THREE.PlaneGeometry(width, height);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(position.x, position.y, position.z);
  return painting;
}

// Create paintings and add them to the scene
const painting1 = createPainting(
  '/artworks/0.jpg',
  10,
  5,
  new THREE.Vector3(-10, 5, -19.99)
);

const painting2 = createPainting(
  '/artworks/1.jpg',
  10,
  5,
  new THREE.Vector3(10, 5, -19.99)
);

// Painting on the left wall
const painting3 = createPainting(
  '/artworks/3.jpg',
  10,
  5,
  new THREE.Vector3(-19.99, 5, -10)
);
painting3.rotation.y = Math.PI / 2;

// Painting on the right wall
const painting4 = createPainting(
  '/artworks/5.jpg',
  10,
  5,
  new THREE.Vector3(19.99, 5, -10)
);
painting4.rotation.y = -Math.PI / 2;

scene.add(painting1, painting2, painting3, painting4);

// We can use a combination of ambient light and spotlights to create a more natural and immersive lighting environment.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Spotlights can be used to simulate ceiling-mounted lights or track lights that focus on specific areas or artworks.
function createSpotlight(x, y, z, intensity, targetPosition) {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.position.set(x, y, z);
  spotlight.target.position.copy(targetPosition);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 6; // 30 degrees
  spotlight.penumbra = 0.9;
  spotlight.decay = 2;
  spotlight.distance = 40;
  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  return spotlight;
}

// Add spotlights to the scene
const spotlight1 = createSpotlight(-15, 20, -10, 1.5, painting1.position);
const spotlight2 = createSpotlight(15, 20, -10, 1.5, painting2.position);
const spotlight3 = createSpotlight(-35, 20, -10, 1.5, painting3.position);
const spotlight4 = createSpotlight(35, 20, -10, 1.5, painting4.position);

// Add new spotlights to the scene
scene.add(spotlight3, spotlight4);
scene.add(spotlight3.target);
scene.add(spotlight4.target);

scene.add(spotlight1, spotlight2);
scene.add(spotlight1.target);
scene.add(spotlight2.target);

// Texture of the floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('img/floor.png');
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonatl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT the vertical direction
floorTexture.repeat.set(20, 20); // how many times to repeat the texture

// Create the floor plane.
const planeGeometry = new THREE.PlaneGeometry(45, 45); // BoxGeometry is the shape of the object
const planeMaterial = new THREE.MeshPhongMaterial({
  map: floorTexture, // the texture
  side: THREE.DoubleSide,
});

const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial); // create the floor with geometry and material

floorPlane.rotation.x = Math.PI / 2; // this is 90 degrees
floorPlane.position.y = -Math.PI; // this is -180 degrees

scene.add(floorPlane); // add the floor to the scene

// Create the walls
let wallGroup = new THREE.Group(); // create a group to hold the walls
scene.add(wallGroup); // add the group to the scene, then any child added to the group will display to the scene too

// Create wall material with realistic colors and texture
const wallTexture = textureLoader.load('img/white-texture.jpg');
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1, 1);

const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture });

// Front Wall
const frontWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(85, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

frontWall.position.z = -20; // push the wall forward in the Z axis

// Left Wall
const leftWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(80, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

leftWall.rotation.y = Math.PI / 2; // this is 90 degrees
leftWall.position.x = -20; // -20 is for 20 units left

// Right Wall
const rightWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(80, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

rightWall.position.x = 20;
rightWall.rotation.y = Math.PI / 2; // this is 90 degrees

// Back Wall
const backWall = new THREE.Mesh(
  new THREE.BoxGeometry(85, 20, 0.001),
  new THREE.MeshLambertMaterial({ map: wallTexture })
);
backWall.position.z = 20;

wallGroup.add(frontWall, backWall, leftWall, rightWall); // add the walls to the group

// Loop through each wall and create the bounding box for each wall
for (let i = 0; i < wallGroup.children.length; i++) {
  wallGroup.children[i].BoundingBox = new THREE.Box3();
  wallGroup.children[i].BoundingBox.setFromObject(wallGroup.children[i]);
}

// check if the player intersects with the wall
function checkCollision() {
  const playerBoundingBox = new THREE.Box3(); // create a bounding box for the player
  const cameraWorldPosition = new THREE.Vector3(); // create a vector to hold the camera position
  camera.getWorldPosition(cameraWorldPosition); // get the camera position and store it in the vector. Note: The camera represents the player's position in our case.
  playerBoundingBox.setFromCenterAndSize(
    // setFromCenterAndSize is a method that takes the center and size of the box. We set the player's bounding box size and center it on the camera's world position.
    cameraWorldPosition,
    new THREE.Vector3(1, 1, 1)
  );

  // loop through each wall
  for (let i = 0; i < wallGroup.children.length; i++) {
    const wall = wallGroup.children[i]; // get the wall
    if (playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      // check if the player's bounding box intersects with any of the wall bounding boxes
      return true; // if it does, return true
    }
  }

  return false; // if it doesn't, return false
}

// Create the ceiling
const ceilingTexture = textureLoader.load('img/white-texture.jpg');
const ceilingGeometry = new THREE.PlaneGeometry(45, 40);
const ceilingMaterial = new THREE.MeshLambertMaterial({ map: ceilingTexture });
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial); // create ceiling with geometry and material

ceilingPlane.rotation.x = Math.PI / 2; // this is 90 degrees
ceilingPlane.position.y = 10;

scene.add(ceilingPlane);

// Optimize the lights and shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Enable shadows on objects
floorPlane.receiveShadow = true;
ceilingPlane.receiveShadow = true;
frontWall.castShadow = true;
frontWall.receiveShadow = true;
leftWall.castShadow = true;
leftWall.receiveShadow = true;
rightWall.castShadow = true;
rightWall.receiveShadow = true;
backWall.castShadow = true;
backWall.receiveShadow = true;
painting1.castShadow = true;
painting1.receiveShadow = true;
painting2.castShadow = true;
painting2.receiveShadow = true;

// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience() {
  // Reset clock
  clock.start();
  // Lock the pointer
  controls.lock();
  // Hide the menu
  hideMenu();
}

const playButton = document.getElementById('play_button');
playButton.addEventListener('click', startExperience);

// Hide menu
function hideMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'none';
}

// Show menu
function showMenu() {
  const menu = document.getElementById('menu');
  menu.style.display = 'block';
}

controls.addEventListener('unlock', showMenu);

const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

// Event Listener for when we press the keys
document.addEventListener(
  'keydown',
  (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = true;
    }
  },
  false
);

// Event Listener for when we release the keys
document.addEventListener(
  'keyup',
  (event) => {
    if (event.key in keysPressed) {
      keysPressed[event.key] = false;
    }
  },
  false
);

// Add the movement (left/right/forward/backward) to the scene. Press the arrow keys or WASD to move
const clock = new THREE.Clock();

function updateMovement(delta) {
  const moveSpeed = 5 * delta;
  const previousPosition = camera.position.clone(); // clone the camera position before the movement

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

  // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through wallsss
  if (checkCollision()) {
    camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement.
  }
}

let render = function () {
  const delta = clock.getDelta();
  updateMovement(delta);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
