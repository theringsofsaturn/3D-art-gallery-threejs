// statue.js
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export const loadStatueModel = (scene) => {
  const loader = new GLTFLoader();

  loader.load(
    "../public/models/statue/scene.gltf",
    (gltf) => {
      const statue = gltf.scene;

      console.log("STATUE", statue);

      // Position the statue at the center of the floor
      statue.position.set(0, -3.2, 0);

      // Scale if necessary
      statue.scale.set(0.06, 0.06, 0.06);

      // Iterate through all the meshes in the statue and update their materials
      statue.traverse((child) => {
        if (child.isMesh) {
          map: child.material.map,
            // Modify child.material here to improve appearance
            // For example, set the metalness and roughness
            //   child.material.metalness = 0.9;
            (child.material.roughness = 0.1);
          console.log("Material:", child.material);
        }
      });

      statue.castShadow = true;

      // Add the statue to the scene
      scene.add(statue);
    },
    undefined,
    (error) => {
      console.error("An error occurred while loading the model.", error);
    }
  );
};
