import * as THREE from 'three';

// check if objects is an array. If it's not, we assume it's a THREE.Group and set objects to objects.children. We then use forEach to loop over each object in objects and add a bounding box to it
export const createBoundingBoxes = (objects) => {
  // objects will be either paintings or walls that we pass in from main.js
  if (!Array.isArray(objects)) {
    objects = objects.children;
  }

  objects.forEach((object) => {
    object.BoundingBox = new THREE.Box3(); // create a new bounding box for each object
    object.BoundingBox.setFromObject(object); // set the bounding box to the object (painting or wall)
  });
};

// Note: Without the checking won't work!
// if (!Array.isArray(objects)) {
//     objects = objects.children;
//   }

// Checking for both THREE.Group and arrays is because the `createWalls` function is returning a THREE.Group while `createPaintings` is returning an array.

// In Three.js, a THREE.Group is a type of object used to create hierarchical (parent-child) relationships between objects. In other words, a Group is an object that can contain other objects. This is useful if we want to manipulate several objects as one.

// The children property of a Group is an array that contains all the objects (child objects) that have been added to the group. So when we add an object to a group with group.add(object), we can access that object later with group.children.

// In our code, createWalls returns a Group that contains several wall objects. When we pass this group to createBoundingBoxes, we want to create a bounding box for each wall in the group. To do that, we need to loop over the children array of the group.

// So, when we call createBoundingBoxes(walls), the objects parameter of createBoundingBoxes is a Group object. In order to loop over each wall in the group, we need to set objects to objects.children.

// However, createPaintings returns an array, not a Group. When you call createBoundingBoxes(paintings), the objects parameter of createBoundingBoxes is already an array, so you don't need to do anything.

// That's why createBoundingBoxes starts by checking if objects is an array with if (!Array.isArray(objects)). If objects is not an array, it assumes that it's a Group and sets objects to objects.children. If objects is already an array, it skips this step.

// After this check, objects is always an array, whether it was originally an array or a Group. This means that you can use objects.forEach to loop over each object in objects and add a bounding box to it, regardless of whether objects was originally an array or a Group. This is a way of making createBoundingBoxes flexible so it can work with both Groups and arrays.
