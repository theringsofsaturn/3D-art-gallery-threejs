import * as THREE from 'three';

export function createWalls(scene, textureLoader) {
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

  return wallGroup;
}
