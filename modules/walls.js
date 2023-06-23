import * as THREE from "three";

export function createWalls(scene, textureLoader) {
  let wallGroup = new THREE.Group(); // create a group to hold the walls
  scene.add(wallGroup); // add the group to the scene, then any child added to the group will display to the scene too

  // Create wall material with realistic colors and texture
  // const diffuseTexture = textureLoader.load('leather_white_4k.gltf/textures/leather_white_diff_4k.jpg');
  const normalTexture = textureLoader.load(
    "leather_white_4k.gltf/textures/leather_white_nor_gl_4k.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "leather_white_4k.gltf/textures/leather_white_rough_4k.jpg"
  );

  // Set texture parameters
  // diffuseTexture.wrapS = diffuseTexture.wrapT = THREE.RepeatWrapping; // repeat the texture on both axes
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: 0xadadae,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    side: THREE.DoubleSide,
  });
  // Front Wall
  const frontWall = new THREE.Mesh( // Mesh class that has geometry and material inside
    new THREE.BoxGeometry(85, 20, 0.001), // geometry
    wallMaterial // material
  );

  frontWall.position.z = -20; // push the wall forward in the Z axis

  // Left Wall
  const leftWall = new THREE.Mesh( // Mesh class that has geometry and material inside
    new THREE.BoxGeometry(80, 20, 0.001), // geometry
    wallMaterial // material
  );

  leftWall.rotation.y = Math.PI / 2; // this is 90 degrees
  leftWall.position.x = -20; // -20 is for 20 units left

  // Right Wall
  const rightWall = new THREE.Mesh( // Mesh class that has geometry and material inside
    new THREE.BoxGeometry(80, 20, 0.001), // geometry
    wallMaterial // material
  );

  rightWall.position.x = 20;
  rightWall.rotation.y = Math.PI / 2; // this is 90 degrees

  // Back Wall
  const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(85, 20, 0.001),
    wallMaterial // material
  );
  backWall.position.z = 20;

  wallGroup.add(frontWall, backWall, leftWall, rightWall); // add the walls to the group

  return wallGroup;
}
