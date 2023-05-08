/* TransformTracker.js
 * -------------------
 * Tools to keep track of enetities with key attribute.
 */

import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStoreActions } from "easy-peasy";

function TransformTracker() {
  const { scene } = useThree();

  const saveTransformsToState = useStoreActions(
    (state) => state.scenes.saveTransforms
  );

  /*
   * scanTransforms
   * Return object with all entities in scene with transformTrack attribute.
   */
  const scanTransforms = () => {
    const meshes = [];
    scene.traverse((child) => {
      if (child.transformTrack) {
        // save to obj
        meshes.push(child);
      }
    });

    const uniqueKeys = new Set(); // Create a Set to store unique keys
    const meshObjects = meshes.reduce((acc, mesh) => {
      const { transformTrack } = mesh;
      const { key } = transformTrack;

      // Check if the key is already in the Set
      if (!uniqueKeys.has(key)) {
        uniqueKeys.add(key); // Add the key to the Set

        const rotation = {
          x: mesh.rotation.x,
          y: mesh.rotation.y,
          z: mesh.rotation.z,
        };
        const position = {
          x: mesh.position.x,
          y: mesh.position.y,
          z: mesh.position.z,
        };

        // Add the mesh object to the accumulator array
        acc.push({ position, rotation, key });
      }
      return acc;
    }, []);

    console.log( meshObjects)
    return meshObjects;
  };

  /*
   * applyTransforms
   * Receive savedTransforms array & apply to scene.
   */

  const applyTransforms = (savedTransforms) => {
    scene.traverse((child) => {
      if (child.transformTrack) {
        // Apply saved transforms
        const savedTransform = savedTransforms.find(
          (t) => t.key === child.transformTrack.key
        );
        if (savedTransform) {
          child.position.copy(savedTransform.position);

          const eulerRotation = new THREE.Euler(
            savedTransform.rotation.x,
            savedTransform.rotation.y,
            savedTransform.rotation.z,
            "XYZ"
          );
          child.setRotationFromEuler(eulerRotation);
        }
      }
    });
  };

  /*
   * saveTransforms
   * Save transforms to state object
   */

  const saveTransforms = () => {
    const transforms = scanTransforms();
    console.log(transforms);
    saveTransformsToState(transforms);
  };

  return {
    scanTransforms,
    saveTransforms,
    applyTransforms,
  };
}

export default TransformTracker;
