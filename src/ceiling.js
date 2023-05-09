import * as THREE from 'three';

export const createCeiling = (scene, textureLoader) => {
  const ceilingTexture = textureLoader.load('img/white-texture.jpg');
  const ceilingGeometry = new THREE.PlaneGeometry(45, 40);
  const ceilingMaterial = new THREE.MeshLambertMaterial({
    map: ceilingTexture,
  });
  const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);

  ceilingPlane.rotation.x = Math.PI / 2; 
  ceilingPlane.position.y = 10;

  scene.add(ceilingPlane);
};
