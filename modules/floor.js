import * as THREE from 'three';

// the scene is passed in main.js where setupFloor is called
export const setupFloor = (scene) => {
  const textureLoader = new THREE.TextureLoader(); // create a textureLoader
  const floorTexture = textureLoader.load('img/floor.png'); // load the texture

  // `wrapS` and `wrapT` are properties of a texture that define how the texture should be wrapped horizontally and vertically. `RepeatWrapping` is a property of the `THREE` object that tells the texture to repeat when it reaches the end of the geometry
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);

  const planeGeometry = new THREE.PlaneGeometry(45, 45); // create the geometry
  const planeMaterial = new THREE.MeshPhongMaterial({
    // MeshPhongMaterial is a material that uses a reflection model to simulate shiny surfaces. It's used for things like metal, plastic, and other shiny surfaces. It is more computationally expensive than MeshBasicMaterial, MeshLambertMaterial, and MeshNormalMaterial, so use it sparingly, so use it only when neccessary for performance reasons
    map: floorTexture, // `map` is a property of the material which takes a texture and applies it to the surface of the geometry
    side: THREE.DoubleSide, // `side` is a property of the material that defines which side of the geometry should be rendered. `THREE.DoubleSide` is a property of the `THREE` object that tells the material to render both sides of the geometry
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial); // Mesh is an object that takes a geometry and a material and combines them to create the final rendered object

  floorPlane.rotation.x = Math.PI / 2; // rotate the plane 90 degrees so that it is flat and horizontal (the default rotation is 0, 0, 0). Math.PI is 180 degrees
  floorPlane.position.y = -Math.PI; // move the plane up 10 units in the Y axis

  scene.add(floorPlane); // add the plane to the scene
};
