import * as THREE from 'three';

export const setupLighting = (scene, paintings) => {
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

  // The spotlight target is the painting position
  const spotlight1 = createSpotlight(-15, 20, -10, 3, paintings[0].position);
  const spotlight2 = createSpotlight(15, 20, -10, 3, paintings[1].position);
  const spotlight3 = createSpotlight(-15, 20, -14, 3, paintings[2].position);
  const spotlight4 = createSpotlight(15, 20, -14, 3, paintings[3].position);
  const spotlight5 = createSpotlight(-15, 20, 14, 3, paintings[4].position);
  const spotlight6 = createSpotlight(15, 20, 14, 3, paintings[5].position);
  const spotlight7 = createSpotlight(-15, 20, 10, 3, paintings[6].position);
  const spotlight8 = createSpotlight(15, 20, 10, 3, paintings[7].position);

  // add the lights to the scene
  scene.add(
    ambientLight,
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
};
