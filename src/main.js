import * as THREE from 'three'; // import the entire three.js library as `THREE`
import { PointerLockControls } from 'three-stdlib'; // PointerLockControls is a class that we can use to control the camera with the mouse

const scene = new THREE.Scene(); // create a new scene

// Create a camera, which defines where we're looking at.
const camera = new THREE.PerspectiveCamera(
  60, // Field of view
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near clipping plane
  1000 // far clipping plane
);
scene.add(camera); // add the camera to the scene
camera.position.set(0, 4, 0);

// Create a render and set the size and background color
const renderer = new THREE.WebGLRenderer({ antialias: false }); // antialias means smooth edges
renderer.setSize(window.innerWidth, window.innerHeight); // set size of renderer
renderer.setClearColor(0xffffff, 1); //background color
document.body.appendChild(renderer.domElement); // add renderer to html

// Create a painting
function createPainting(imageURL, width, height, position) {
  const textureLoader = new THREE.TextureLoader(); // we need a texture loader to load the image
  const paintingTexture = textureLoader.load(imageURL); // method to load the image
  const paintingMaterial = new THREE.MeshBasicMaterial({
    // MeshBasicMaterial is a material that doesn't react to light. It's used for things like UI elements, skyboxes, and other objects that don't need to be lit.
    map: paintingTexture, // `map` is a property of the material which takes a texture and applies it to the surface of the geometry
  });
  const paintingGeometry = new THREE.PlaneGeometry(width, height); // PlaneGeometry is a flat rectangle
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial); // Mesh is an object that takes a geometry and a material and combines them to create the final rendered object
  painting.position.set(position.x, position.y, position.z); // set the position of the painting
  return painting; // this function returns the paintings
}

// Create paintings and add them to the scene using the createPainting functions
// Paonting on the front wall at the left
const painting1 = createPainting(
  '/artworks/0.jpg', // the image url or path
  10, // width
  5, // height
  new THREE.Vector3(-10, 5, -19.99) // position in x, y, z coordinates
);

// Painting on the front wall at the right
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
painting3.rotation.y = Math.PI / 2; // 90 degrees. If we don't rotate this, it will show up in the front of us instead of lying on the left wall

// Painting on the right wall (near the front wall)
const painting4 = createPainting(
  '/artworks/5.jpg',
  10,
  5,
  new THREE.Vector3(19.99, 5, -10)
);
painting4.rotation.y = -Math.PI / 2; // -90 degrees. The same as above but for the right wall

// Painting on the left wall (near the back wall)
const painting5 = createPainting(
  '/artworks/8.jpg',
  10,
  5,
  new THREE.Vector3(-19.5, 5, 10)
);
painting5.rotation.y = Math.PI / 2;

// Painting on the right wall (near the back wall)
const painting6 = createPainting(
  '/artworks/9.jpg',
  10,
  5,
  new THREE.Vector3(19.5, 5, 10)
);
painting6.rotation.y = -Math.PI / 2;

// Painting on the back wall at the left
const painting7 = createPainting(
  '/artworks/6.jpg',
  10,
  5,
  new THREE.Vector3(-10, 5, 19.5)
);
painting7.rotation.y = Math.PI; // 180 degrees.

// Painting on the back wall at the right
const painting8 = createPainting(
  '/artworks/7.jpg',
  10,
  5,
  new THREE.Vector3(10, 5, 19.5)
);
painting8.rotation.y = Math.PI;

scene.add(
  painting1,
  painting2,
  painting3,
  painting4,
  painting5,
  painting6,
  painting7,
  painting8
); // add the paintings to the scene

// We can use a combination of ambient light and spotlights to create a more natural and immersive lighting environment.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Spotlights can be used to simulate ceiling-mounted lights or track lights that focus on specific areas or artworks.
function createSpotlight(x, y, z, intensity, targetPosition) {
  const spotlight = new THREE.SpotLight(0xffffff, intensity);
  spotlight.position.set(x, y, z);
  spotlight.target.position.copy(targetPosition); // copy the target position because we want the spotlight to point to the painting
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 6; // 30 degrees because the angle is in radians and math.pi is 180 degrees
  spotlight.penumbra = 1; // the penumbra is the soft edge of the spotlight
  spotlight.decay = 1.5; //  determines how the light attenuates with distance. The higher the value of decay, the faster the light intensity diminishes with distance
  spotlight.distance = 40; // the distance of the light is 40 units away
  spotlight.shadow.mapSize.width = 1024; // the shadow map size is the resolution of the shadow. The higher the number, the higher the resolution
  spotlight.shadow.mapSize.height = 1024;
  return spotlight; // this function returns the spotlight
}

// Add spotlights to the scene
// The spotlight target is the painting position
const spotlight1 = createSpotlight(-15, 20, -10, 3, painting1.position);
const spotlight2 = createSpotlight(15, 20, -10, 3, painting2.position);
const spotlight3 = createSpotlight(-15, 20, -14, 3, painting3.position);
const spotlight4 = createSpotlight(15, 20, -14, 3, painting4.position);
const spotlight5 = createSpotlight(-15, 20, 14, 3, painting5.position);
const spotlight6 = createSpotlight(15, 20, 14, 3, painting6.position);
const spotlight7 = createSpotlight(-15, 20, 10, 3, painting7.position);
const spotlight8 = createSpotlight(15, 20, 10, 3, painting8.position);

// add the spotlights to the scene
scene.add(
  spotlight1,
  spotlight2,
  spotlight3,
  spotlight4,
  spotlight5,
  spotlight6,
  spotlight7,
  spotlight8
);
scene.add(
  // add the spotlight target to the scene
  spotlight1.target,
  spotlight2.target,
  spotlight3.target,
  spotlight4.target,
  spotlight5.target,
  spotlight6.target,
  spotlight7.target,
  spotlight8.target
);

// Texture of the floor
const textureLoader = new THREE.TextureLoader(); // create a texture loader
const floorTexture = textureLoader.load('img/floor.png'); // load the image/texture
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonatl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT the vertical direction
floorTexture.repeat.set(20, 20); // how many times to repeat the texture

// Create the floor plane.
const planeGeometry = new THREE.PlaneGeometry(45, 45);
const planeMaterial = new THREE.MeshPhongMaterial({
  // MeshPhongMaterial is a material that uses a reflection model to simulate shiny surfaces. It's used for things like metal, plastic, and other shiny surfaces. It is more computationally expensive than MeshBasicMaterial, MeshLambertMaterial, and MeshNormalMaterial, so use it sparingly, so use it only when neccessary for performance reasons
  map: floorTexture, // the texture we loaded above
  side: THREE.DoubleSide, // render both sides of the faces
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
wallTexture.repeat.set(1, 1); // `repeat` property of a texture is a Vector2 that defines how many times the texture should be repeated in the x and y directions. sets the texture to be repeated once in both the x and y directions. This means that the texture will not be repeated and will only be displayed once on the material

const wallMaterial = new THREE.MeshLambertMaterial({ map: wallTexture }); //

// Front Wall
const frontWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(85, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture })
);

frontWall.position.z = -20; // push the wall forward in the Z axis

// Left Wall
const leftWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(80, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ map: wallTexture }) // MeshLambertMaterial is useful for simulating non-shiny objects such as wood or stone which are still affected by lighting but aren't shiny
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
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

ceilingPlane.rotation.x = Math.PI / 2; // 90 degrees
ceilingPlane.position.y = 10;

scene.add(ceilingPlane);

// Optimize the lights and shadows
renderer.shadowMap.enabled = true; // enable shadows
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // `renderer.shadowMap.type` is a property that defines the type of shadow map used by the renderer. THREE.PCFSoftShadowMap is one of the available shadow map types and stands for Percentage-Closer Filtering Soft Shadow Map. This type of shadow map uses an algorithm to smooth the edges of shadows and make them appear softer

// Enable shadows on objects
floorPlane.receiveShadow = true; // receive shadows
ceilingPlane.receiveShadow = true;
frontWall.castShadow = true;
frontWall.receiveShadow = true;
leftWall.castShadow = true; // cast shadows
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
const controls = new PointerLockControls(camera, document.body); // constrols to control the camera with the mouse

// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience() {
  // Reset clock
  clock.start();
  // Lock the pointer
  controls.lock();
  // Hide the menu
  hideMenu();
}

const playButton = document.getElementById('play_button'); // get the play button from the html
playButton.addEventListener('click', startExperience); // add the event listener `click` to the play button

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

// object to hold the keys pressed
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
  'keydown', // `keydown` is an event that fires when a key is pressed
  (event) => {
    if (event.key in keysPressed) {
      // check if the key pressed is in the keysPressed object
      keysPressed[event.key] = true; // if it is, set the value to true
    }
  },
  false
);

// Event Listener for when we release the keys
document.addEventListener(
  'keyup', // `keyup` is an event that fires when a key is released
  (event) => {
    if (event.key in keysPressed) {
      // check if the key released is in the keysPressed object
      keysPressed[event.key] = false; // if it is, set the value to false
    }
  },
  false
);

// Add the movement (left/right/forward/backward) to the scene. Press the arrow keys or WASD to move
const clock = new THREE.Clock(); // create a clock to keep track of the time between frames

function updateMovement(delta) {
  const moveSpeed = 5 * delta; // moveSpeed is the distance the camera will move in one second. We multiply by delta to make the movement framerate independent. This means that the movement will be the same regardless of the framerate. This is important because if the framerate is low, the movement will be slow and if the framerate is high, the movement will be fast. This is not what we want. We want the movement to be the same regardless of the framerate.
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

  // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
  if (checkCollision()) {
    camera.position.copy(previousPosition); // reset the camera position to the previous position. The `previousPosition` variable is a clone of the camera position before the movement.
  }
}

painting1.userData = {
  type: 'painting',
  info: {
    title: 'Painting 1',
    artist: 'Artist 1',
    year: 'Year 1',
  },
};

painting2.userData = {
  type: 'painting',
  info: {
    title: 'Painting 2',
    artist: 'Artist 2',
    year: 'Year 2',
  },
};

painting3.userData = {
  type: 'painting',
  info: {
    title: 'Painting 3',
    artist: 'Artist 3',
    year: 'Year 3',
  },
};

painting4.userData = {
  type: 'painting',
  info: {
    title: 'Painting 4',
    artist: 'Artist 4',
    year: 'Year 4',
  },
};

painting5.userData = {
  type: 'painting',
  info: {
    title: 'Painting 5',
    artist: 'Artist 5',
    year: 'Year 5',
  },
};

painting6.userData = {
  type: 'painting',
  info: {
    title: 'Painting 6',
    artist: 'Artist 6',
    year: 'Year 6',
  },
};

painting7.userData = {
  type: 'painting',
  info: {
    title: 'Painting 7',
    artist: 'Artist 7',
    year: 'Year 7',
  },
};

painting8.userData = {
  type: 'painting',
  info: {
    title: 'Painting 8',
    artist: 'Artist 8',
    year: 'Year 8',
  },
};

function displayPaintingInfo(info) {
  const infoElement = document.getElementById('painting-info');
  infoElement.innerHTML = `
    <h3>${info.title}</h3>
    <p>Artist: ${info.artist}</p>
    <p>Year: ${info.year}</p>
  `;
  infoElement.style.display = 'block';
}

function hidePaintingInfo() {
  const infoElement = document.getElementById('painting-info');
  infoElement.style.display = 'none';
}

// Used to render the scene
let render = function () {
  const delta = clock.getDelta(); // get the time between frames
  updateMovement(delta); // update the movement with the time between frames

  // Check the distance between the camera and the paintings
  const distanceThreshold = 8; // Set the distance threshold for displaying the painting information
  const distanceToPainting1 = camera.position.distanceTo(painting1.position);
  const distanceToPainting2 = camera.position.distanceTo(painting2.position);
  const distanceToPainting3 = camera.position.distanceTo(painting3.position);
  const distanceToPainting4 = camera.position.distanceTo(painting4.position);
  const distanceToPainting5 = camera.position.distanceTo(painting5.position);
  const distanceToPainting6 = camera.position.distanceTo(painting6.position);
  const distanceToPainting7 = camera.position.distanceTo(painting7.position);
  const distanceToPainting8 = camera.position.distanceTo(painting8.position);

  if (distanceToPainting1 < distanceThreshold) {
    displayPaintingInfo(painting1.userData.info);
  } else if (distanceToPainting2 < distanceThreshold) {
    displayPaintingInfo(painting2.userData.info);
  } else if (distanceToPainting3 < distanceThreshold) {
    displayPaintingInfo(painting3.userData.info);
  } else if (distanceToPainting4 < distanceThreshold) {
    displayPaintingInfo(painting4.userData.info);
  } else if (distanceToPainting5 < distanceThreshold) {
    displayPaintingInfo(painting5.userData.info);
  } else if (distanceToPainting6 < distanceThreshold) {
    displayPaintingInfo(painting6.userData.info);
  } else if (distanceToPainting7 < distanceThreshold) {
    displayPaintingInfo(painting7.userData.info);
  } else if (distanceToPainting8 < distanceThreshold) {
    displayPaintingInfo(painting8.userData.info);
  } else {
    hidePaintingInfo();
  }

  renderer.render(scene, camera); // render the scene
  requestAnimationFrame(render); // requestAnimationFrame is a method that calls the render function before the next repaint. This is used to render the scene at 60 frames per second and is more efficient than using setInterval because it only renders when the browser is ready to repaint.
};

render();
