console.log('Three Object', THREE);

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
let ambientLight = new THREE.AmbientLight(0x101010, 1.0); // color, intensity, distance, decay
ambientLight.position = camera.position; //light follows camera
scene.add(ambientLight);

// Directional light is a light source that acts like the sun, that illuminates all objects in the scene equally from a specific direction.
let sunLight = new THREE.DirectionalLight(0xdddddd, 1.0); // color, intensity, distance, decay
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry is the shape of the object
const material = new THREE.MeshBasicMaterial({ color: 'blue' }); // MeshBasicMaterial is the color of the object
const cube = new THREE.Mesh(geometry, material); // create cube with geometry and material
scene.add(cube); // add cube to scene

// Controls
// Event Listenet for when we press the keys
document.addEventListener('keydown', onKeyDown, false);

// function when a key is pressed, execute this function
function onKeyDown(event) {
  let keycode = event.which;

  // right arrow key
  if (keycode === 39) {
    camera.translateX(-0.05);
  }
  // left arrow key
  else if (keycode === 37) {
    camera.translateX(0.05);
  }
  // up arrow key
  else if (keycode === 38) {
    camera.translateY(-0.05);
  }
  // down arrow key
  else if (keycode === 40) {
    camera.translateY(0.05);
  }
}

let render = function () {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera); //renders the scene

  requestAnimationFrame(render);
};

render();
