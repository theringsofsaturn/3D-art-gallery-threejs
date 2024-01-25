import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { GUI } from "lil-gui";

export const loadCeilingLampModel = (scene) => {
  const loader = new GLTFLoader();
  const gui = new GUI();

  loader.load("../public/models/ceiling-lamp/scene.gltf", (gltf) => {
    const lamp = gltf.scene;

    console.log("Ceiling Lamp", gltf);

    // Position the lamp
    lamp.position.set(0, 5.5, 0);
    lamp.scale.set(0.1, 0.1, 0.1);

    // Add the lamp to the scene
    scene.add(lamp);

    // Add GUI controls for the lamp
    const lampFolder = gui.addFolder("Ceiling Lamp");
    lampFolder.add(lamp.position, "x", -50, 50).name("X Position");
    lampFolder.add(lamp.position, "y", -50, 50).name("Y Position");
    lampFolder.add(lamp.position, "z", -50, 50).name("Z Position");
  });
};
