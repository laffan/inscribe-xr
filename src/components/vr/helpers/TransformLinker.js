/* TransformLinker.js
 * -------------------
 * Tool to link two object positions with the option for mesh swapping.
 * There is a control item that is tracked and triggers the movement
 * of however many other meshes have the same ID.
 *
 * To set up a control item add a `transformLink` attribute like so:
 *
 * <mesh transformLink={{id: 'uniqueId', controller: true }} />
 *
 * The controlled items have a similar function that includes a
 * multiplier to determine how they move relative to the control item.
 *
 * <mesh transformLink={{id: 'uniqueId', movementMultiplier: 3 }} />
 *
 */

import { useThree } from "@react-three/fiber";
import _ from "lodash"; // for throttling GrabActive
import { useStoreActions, useStoreState } from "easy-peasy";
import GroupSwap from "./GroupSwap"; // not part of TransformLinker. Can be removed in other projects.

function TransformLinker(targetRef) {
  const { scene } = useThree();
  const { swapGroupVisibility } = GroupSwap();

  const setTransformLinks = useStoreActions(
    (state) => state.manager.setTransformLinks
  );
  const transformLinks = useStoreState((state) => state.manager.transformLinks);

  const moveLinked = _.throttle((targetRef) => {
    if (!targetRef || !targetRef.current) {
      console.error("Error: targetRef or targetRef.current is undefined");
      return;
    }
    const controlPos = targetRef.current.position;
    const targets = transformLinks.filter(
      (l) => l.id === targetRef.current.transformLink.id
    )[0];

    if (!targets || !targets.controls) {
      console.error("Error: targets or targets.controls is undefined");
      console.log(targets)
      return;
    }

    targets.controls.forEach((target) => {
      let targetObj;

      // TODO : Refactor/optimize this bit.
      // Traversing the scene every 100ms is nuts.
      // Trying saving refs @ init

      scene.traverse((object) => {
        if (object.uuid === target.uuid) {
          targetObj = object;
        }
      });

      if (!targetObj) {
        console.error(
          `Error: target object with UUID ${target.uuid} not found`
        );
        return;
      }

      const newTargetPos = controlPos
        .clone()
        .multiplyScalar(target.movementMultiplier);

      swapGroupVisibility(targetObj);

      targetObj.position.copy(newTargetPos);
    });
  }, 10); // throttled b/c it's being called on every frame

  /*
   * scanTransforms
   * Save links to state.
   */
  const scanTransformLinks = () => {
    const items = [];
    scene.traverse((child) => {
      if (child.transformLink) {
        // save to obj
        items.push(child);
      }
    });

    // Sort items by their link ID
    // (100% ChatGPT for this one .)

    const sorted = items.reduce((acc, item) => {
      const { uuid, transformLink } = item;
      const { id } = transformLink;

      // Check if an object with the id already exists in the accumulator
      const group = acc.find((g) => g.id === id);

      // If the group doesn't exist, create it and add it to the accumulator
      if (!group) {
        acc.push({
          id,
          controllerUUID: transformLink.controller ? uuid : null,
          controls: transformLink.movementMultiplier
            ? [{ uuid, movementMultiplier: transformLink.movementMultiplier }]
            : [],
        });
      }
      // If the group exists, add the item to the controls array
      else {
        if (transformLink.controller) {
          group.controllerUUID = uuid;
        } else if (transformLink.movementMultiplier) {
          group.controls.push({
            uuid,
            movementMultiplier: transformLink.movementMultiplier,
          });
        }
      }

      return acc;
    }, []);

    // Save sorted array to easyPeasy

    setTransformLinks(sorted);
  };
  /*

  1. On scene load, loop though scene and create TransformLinks with movementMultipliers.
  2. Save linkList to easypeasy 
  3. On (throttled) useFrame, ping association/movementMultiplier and move linked item.

  */

  return {
    scanTransformLinks,
    moveLinked,
  };
}

export default TransformLinker;
