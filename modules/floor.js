import * as THREE from "three";
import floortTexture from "../public/WoodFloor040_4K-JPG/WoodFloor040_4K_Color.jpg";

export const setupFloor = (scene) => {
  const textureLoader = new THREE.TextureLoader();

  // Load the textures
  const colorTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_Color.jpg"
  );
  const displacementTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_Displacement.jpg"
  );
  const normalTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_NormalGL.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_Roughness.jpg"
  );
  const aoTexture = textureLoader.load(
    "WoodFloor040_4K-JPG/WoodFloor040_4K_AmbientOcclusion.jpg"
  );

  // Set texture parameters
  colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping;
  displacementTexture.wrapS = displacementTexture.wrapT = THREE.RepeatWrapping;
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
  aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;

  const planeGeometry = new THREE.PlaneGeometry(45, 45);
  const planeMaterial = new THREE.MeshStandardMaterial({
    map: colorTexture,
    displacementMap: displacementTexture,
    normalMap: normalTexture,
    roughnessMap: roughnessTexture,
    aoMap: aoTexture,
    displacementScale: 0.1,
    side: THREE.DoubleSide,
  });

  const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

  floorPlane.rotation.x = Math.PI / 2;
  floorPlane.position.y = -Math.PI;

  scene.add(floorPlane);
};
