/* GroupSwap.js
 * -------------------
 * Tool to swap in different group visibility depending on position.
 *
 * Give the containing group a groupSwap attribute like so
 *
 * groupSwap={{bounds: [{ x: 0 }, { x: -5 }], debug: false}}
 *
 * And then pass that group in to this function whenever you want to
 * do a visibility check.
 */

import { Vector3 } from "three";
import { useThree } from "@react-three/fiber";

function GroupSwap() {
    const { scene } = useThree();

  function swapGroupVisibility(group) {
    if (!group.groupSwap) return false;
    if (group.groupSwap.debug) {
      console.log(group.position);
      return false;
    }
    // get position, groupSwapBoundary and children
    const { position, groupSwap } = group;
    const { bounds } = groupSwap;
    const childCount = group.children.length;

    // Determine the vector created by the swapBound array. The array is
    // composed of two objects that have x,y,z coordinates. For example
    // [{x: 15, y:12}, {x: 22, y: 14}]
    const pointA = new Vector3(bounds[0].x, bounds[0].y, bounds[0].z);
    const pointB = new Vector3(bounds[1].x, bounds[1].y, bounds[1].z);
    const totalDistance = pointA.distanceTo(pointB);

    // Divide the distance between the points by the number of children
    // to create zones between the two points.
    const zoneDistance = totalDistance / childCount;

    // Using the position of the group, determine what zone the group
    // is currently in.  If the group is outside the zones, use the initial
    // vector to determine which it is closest to and select that zone.
    const currentPosition = new Vector3(position.x, position.y, position.z);
    const zoneIndex = Math.min(
      Math.floor(currentPosition.distanceTo(pointA) / zoneDistance),
      childCount - 1
    );

    // Traverse the group and change the visibility of the children such
    // that only one child is showing up, and it has a name that includes
    // the index of the correct zone.
    // Loop through the children. Each should have a "name" attribute,
    // followed by a "--#", where # is the index number.

    group.children.forEach((child) => {
      if (child.name) {
        const childZone = parseInt(child.name.split("--")[1]);
        child.visible = childZone === zoneIndex + 1;
      }
    });
  }

  /*
   * scanTransforms
   * Save links to state.
   */
  const scanGroupSwaps = () => {
    const items = [];
    scene.traverse((child) => {
      if (child.groupSwap) {
        // save to obj
        swapGroupVisibility(child)
      }
    });
  }

  return {
    swapGroupVisibility,
    scanGroupSwaps
  };
}

export default GroupSwap;
