import * as THREE from 'three';

// create a function that takes a scene and a textureLoader as arguments that will be passed in from main.js where the createCeiling is called
export const createCeiling = (scene, textureLoader) => {
  const ceilingTexture = textureLoader.load('img/white-texture.jpg'); // load the texture
  const ceilingGeometry = new THREE.PlaneGeometry(45, 40); // create the geometry
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    // MeshLambertMaterial is useful for simulating non-shiny objects such as wood or stone which are still affected by lighting but aren't shiny
    map: ceilingTexture, // `map` is a property of the material which takes a texture and applies it to the surface of the geometry
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial); // Mesh is an object that takes a geometry and a material and combines them to create the final rendered object

  ceilingPlane.rotation.x = Math.PI / 2; // rotate the plane 90 degrees so that it is flat and horizontal (the default rotation is 0, 0, 0). Math.PI is 180 degrees
  ceilingPlane.position.y = 10; // move the plane up 10 units in the Y axis

  scene.add(ceilingPlane); // add the plane to the sceness
};
