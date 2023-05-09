import * as THREE from 'three';

export const setupFloor = (scene) => {
  const textureLoader = new THREE.TextureLoader();
  const floorTexture = textureLoader.load('img/floor.png');
  floorTexture.wrapS = THREE.RepeatWrapping;
  floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(20, 20);

  const planeGeometry = new THREE.PlaneGeometry(45, 45);
  const planeMaterial = new THREE.MeshPhongMaterial({
    map: floorTexture,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI;

  scene.add(floorPlane);
};
