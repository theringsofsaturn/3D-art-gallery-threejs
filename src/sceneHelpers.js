export const addObjectsToScene = (scene, objects) => {
  objects.forEach((object) => {
    scene.add(object);
  });
};
