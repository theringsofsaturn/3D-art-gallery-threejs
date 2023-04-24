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

// Ambient light is a soft light that lights up all the objects in the scene equally
const ambientLight = new THREE.AmbientLight(0xffffff, 1.0); // color, intensity, distance, decay
scene.add(ambientLight);

// Directional light is a light source that acts like the sun, that illuminates all objects in the scene equally from a specific direction.
const sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity, distance, decay
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({ color: 'blue' }); // MeshBasicMaterial is the look of the object (color or texture)
const cube = new THREE.Mesh(geometry, material); // create cube with geometry and material
scene.add(cube); // add cube to scene

// Controls
// Event Listenet for when we press the keys
document.addEventListener('keydown', onKeyDown, false);

// Texture of the floor
const textureLoader = new THREE.TextureLoader();
const floorTexture = textureLoader.load('img/Floor.jpg');
floorTexture.wrapS = THREE.RepeatWrapping; // wrapS is horizonatl direction
floorTexture.wrapT = THREE.RepeatWrapping; // wrapT the vertical direction
floorTexture.repeat.set(20, 20); // how many times to repeat the texture

// let floorTexture = new THREE.TextureLoader().load('img/Floor.jpg');
// textureLoader.load('img/Floor.jpg');cds

// Create the floor plane.
const planeGeometry = new THREE.PlaneGeometry(45, 45); // BoxGeometry is the shape of the object
const planeMaterial = new THREE.MeshBasicMaterial({
  // MeshBasicMaterial is the look of the object (color or texture)
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

// Front Wall
const frontWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(50, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({ color: 'green' }) // Lambert material is for non-shiny surfaces
);

frontWall.position.z = -20; // push the wall forward in the Z axis

// Left Wall
const leftWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(50, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({
    //  Lambert material is for non-shiny surfaces
    color: 'red',
  })
);

leftWall.rotation.y = Math.PI / 2; // this is 90 degrees
leftWall.position.x = -20; // -20 is for 20 units left

// Right Wall
const rightWall = new THREE.Mesh( // Mesh class that has geometry and material inside
  new THREE.BoxGeometry(50, 20, 0.001), // geometry
  new THREE.MeshLambertMaterial({
    // Lambert material is for non-shiny surfaces
    color: 'yellow',
  })
);

rightWall.position.x = 20;
rightWall.rotation.y = Math.PI / 2; // this is 90 degrees

wallGroup.add(frontWall, leftWall, rightWall); // add the walls to the group

// Loop through each wall and create the bounding box
for (let i = 0; i < wallGroup.children.length; i++) {
  wallGroup.children[i].BBox = new THREE.Box3();
  wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

// Create the ceiling
const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
const ceilingMaterial = new THREE.MeshLambertMaterial({
  // Lambert material is for non-shiny surfaces
  color: 'blue',
});
const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial); // create ceiling with geometry and material

ceilingPlane.rotation.x = Math.PI / 2; // this is 90 degrees
ceilingPlane.position.y = 12;

scene.add(ceilingPlane);

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

scene.add(painting1, painting2);

// Controls
const controls = new PointerLockControls(camera, document.body);

// Lock the pointer (controls are activated) and hide the menu when the experience starts
function startExperience() {
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

// Add the movement (left/right/forward/backward) to the scene. Press the arrow keys or WASD to move
function onKeyDown(event) {
  let keycode = event.which;

  // right arrow key
  if (keycode === 39 || keycode === 68) {
    controls.moveRight(0.08);
  }
  // left arrow key
  else if (keycode === 37 || keycode === 65) {
    controls.moveRight(-0.08);
  }
  // up arrow key
  else if (keycode === 38 || keycode === 87) {
    controls.moveForward(0.08);
  }
  // down arrow key
  else if (keycode === 40 || keycode === 83) {
    controls.moveForward(-0.08);
  }
}

let render = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera); //renders the scene

  requestAnimationFrame(render);
};

render();
