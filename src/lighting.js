// lighting.js
import * as THREE from 'three';

export const setupLighting = (scene, paintings) => {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // Create spotlight
  function createSpotlight(x, y, z, intensity, targetPosition) {
    const spotlight = new THREE.SpotLight(0xffffff, intensity);
    spotlight.position.set(x, y, z);
    spotlight.target.position.copy(targetPosition);
    spotlight.castShadow = true;
    spotlight.angle = Math.PI / 3;
    spotlight.penumbra = 1;
    spotlight.decay = 1.5;
    spotlight.distance = 40;
    spotlight.shadow.mapSize.width = 1024;
    spotlight.shadow.mapSize.height = 1024;
    return spotlight;
  }

  const spotlight1 = createSpotlight(0, 20, -10, 2, new THREE.Vector3(0, 2, -20));
  const spotlight2 = createSpotlight(0, 20, 10, 2, new THREE.Vector3(0, 2, 20));
  const spotlight3 = createSpotlight(-10, 20, 0, 2, new THREE.Vector3(-20, 2, 0));
  const spotlight4 = createSpotlight(10, 20, 0, 2, new THREE.Vector3(20, 2, 0));

  // Add spotlights to scene
  scene.add(spotlight1, spotlight2, spotlight3, spotlight4);
  scene.add(spotlight1.target, spotlight2.target, spotlight3.target, spotlight4.target);
};
