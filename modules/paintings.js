import * as THREE from 'three';

import { paintingData } from './paintingData.js';

export function createPaintings(scene, textureLoader) {
  // create a function that takes a scene and a textureLoader as arguments that will be passed in from main.js where the createPaintings is called
  let paintings = [];

  paintingData.forEach((data) => {
    // loop through the paintingData array we get from paintingData.js
    const painting = new THREE.Mesh( // create a mesh for each painting
      new THREE.PlaneGeometry(data.width, data.height),
      new THREE.MeshLambertMaterial({ map: textureLoader.load(data.imgSrc) })
    );

    painting.position.set(data.position.x, data.position.y, data.position.z); // position the painting
    painting.rotation.y = data.rotationY; // rotate the painting

    // add a userData property to the painting that will hold the painting info
    painting.userData = {
      type: 'painting', // add a type property to the userData object so we can check if the object is a painting or not
      info: data.info, // add the painting info to the userData object. `data` is the current painting object in the forEach loop. `info` is a property of the painting object that holds the painting info
    };

    painting.castShadow = true; // set the painting to cast a shadow
    painting.receiveShadow = true; // set the painting to receive a shadow

    paintings.push(painting); // push the painting to the paintings array
  });

  return paintings; // return the paintings array
}
