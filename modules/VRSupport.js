import { VRButton } from "three/examples/jsm/webxr/VRButton.js";

export const setupVR = (renderer) => {
  renderer.xr.enabled = true;

  renderer.xr.addEventListener("sessionstart", () => {
    console.log("WebXR session started");
  });

  renderer.xr.addEventListener("sessionend", () => {
    console.log("WebXR session ended");
  });

  document.body.appendChild(VRButton.createButton(renderer));
};
