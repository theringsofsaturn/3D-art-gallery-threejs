// lighting.js
import * as THREE from 'three';

// add paintings as a parameter that will be passed in from main.js where setupLighting is called
export const setupLighting = (scene, paintings) => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight); // add the ambient light to the scene

  // create spotlights
  // create a function that takes x, y, z, intensity, and targetPosition as arguments that will be passed in from main.js where createSpotLight is called
  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity); // create a spotlight
    spotlight.position.set(x, y, z); // position the spotlight
    spotlight.target.position.copy(targetPosition); // set the spotlight target position
    spotlight.castShadow = true; // set the spotlight to cast a shadow
    spotlight.angle = Math.PI / 3; // set the spotlight angle to 60 degrees. Math.PI is 180 degrees
    spotlight.penumbra = 1; // set the spotlight penumbra to 1. The penumbra is the soft edge of the spotlight
    spotlight.decay = 1.5; //  determines how the light attenuates with distance. The higher the value of decay, the faster the light intensity diminishes with distance
    spotlight.distance = 40; // set the spotlight distance to 40 units
    spotlight.shadow.mapSize.width = 1024; // the shadow map size is the resolution of the shadow. The higher the number, the higher the resolution
    spotlight.shadow.mapSize.height = 1024;
    return spotlight; // return the spotlight
  }

  // create spotlights by calling the createSpotlight function and passing in the parameters
  const spotlight1 = createSpotlight(
    0,
    20,
    -10,
    2,
    new THREE.Vector3(0, 2, -20)
  );
  const spotlight2 = createSpotlight(0, 20, 10, 2, new THREE.Vector3(0, 2, 20));
  const spotlight3 = createSpotlight(
    -10,
    20,
    0,
    2,
    new THREE.Vector3(-20, 2, 0)
  );
  const spotlight4 = createSpotlight(10, 20, 0, 2, new THREE.Vector3(20, 2, 0));

  // Add spotlights to scene
  scene.add(spotlight1, spotlight2, spotlight3, spotlight4);
  scene.add(
    spotlight1.target,
    spotlight2.target,
    spotlight3.target,
    spotlight4.target
  );
};
