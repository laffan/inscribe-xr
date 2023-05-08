import { useState, useRef, createContext, useContext, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Interactive } from "@react-three/xr";


/*
  Create a grab context to deal with parent/child grab issues
*/

const GrabContext = createContext();

const useGrabContext = () => {
  return useContext(GrabContext);
};
/*
  Return array of intersections with ray
*/

const tempMatrix = new THREE.Matrix4();
const tempVector = new THREE.Vector3();

function getIntersections(controller, target) {
  const tempMatrix = new THREE.Matrix4();
  const raycaster = new THREE.Raycaster();

  tempMatrix.identity().extractRotation(controller.matrixWorld);
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
  raycaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);

  // Perform raycasting only on the children of the target object
  return raycaster.intersectObjects(target.children, true);
}


const Grab = ({
  children,
  limits,
  fixed,
  transformTrack, // external helper
  transformLink, // external helper
  grabStart,
  grabActive,
  grabEnd,
  isNested = false,
  movementMultiplier = 1,
  ...rest
}) => {
  const controlRef = useRef();
  const initialDistance = useRef();
  const hitOffset = useRef();
  const groupRef = useRef(null);
  const originalPosition = useRef(); // overall
  const initialPosition = useRef(); // each grab
  const [parentMatrixAtGrabStart, setParentMatrixAtGrabStart] = useState(null);
  const [nestedGrabbing, setNestedGrabbing] = useState(false);

  // When the current component is a nested grabbable, siblings and parents
  // should not also be grabbed.
  const parentGrabbing = useGrabContext();
  const contextValue = isNested ? nestedGrabbing : parentGrabbing;

  useEffect(() => {
    if (groupRef.current) {
      initialPosition.current = groupRef.current.position.clone();
    }
  }, []);

  /* =============================================
  Calculations
  */

  function applyLimits(targetPosition) {
    if (!limits || !originalPosition.current) return;

    const { x, y, z } = limits;

    if (x && Array.isArray(x) && x.length === 2) {
      targetPosition.x = THREE.MathUtils.clamp(
        targetPosition.x,
        originalPosition.current.x + x[0],
        originalPosition.current.x + x[1]
      );
    }

    if (y && Array.isArray(y) && y.length === 2) {
      targetPosition.y = THREE.MathUtils.clamp(
        targetPosition.y,
        originalPosition.current.y + y[0],
        originalPosition.current.y + y[1]
      );
    }

    if (z && Array.isArray(z) && z.length === 2) {
      targetPosition.z = THREE.MathUtils.clamp(
        targetPosition.z,
        originalPosition.current.z + z[0],
        originalPosition.current.z + z[1]
      );
    }
  }

  function applyFixed(targetPosition) {
    if (!fixed || !initialPosition.current) return;

    const { x, y, z } = fixed;

    if (x) {
      targetPosition.setX(groupRef.current.position.x);
    }
    if (y) {
      targetPosition.setY(groupRef.current.position.y);
    }
    if (z) {
      targetPosition.setZ(groupRef.current.position.z);
    }
  }

  /* =============================================
  Calculations
  */

  function updateOffsets(intersections) {
    const firstIntersectionPt = intersections[0].point.clone();

    // Calculate the hitOffset vector in the controller's local space
    const controllerInverseMatrix = tempMatrix.invert(
      controlRef.current.matrixWorld
    );
    const localFirstIntersectionPt = firstIntersectionPt.applyMatrix4(
      controllerInverseMatrix
    );

    hitOffset.current = new THREE.Vector3().subVectors(
      groupRef.current.position.clone().applyMatrix4(controllerInverseMatrix),
      localFirstIntersectionPt
    );
  }
  /* =============================================
   UseFrame
  */

  useFrame(() => {
    const controller = controlRef.current;
    if (!controller) return;

    // Calculate the target position
    const controllerWorldPos = new THREE.Vector3().setFromMatrixPosition(
      controller.matrixWorld
    );

    // Account for parent scaling

    const targetPosition = controllerWorldPos
      .clone()
      .add(hitOffset.current)
      .addScaledVector(
        controller.getWorldDirection(tempVector).negate(),
        initialDistance.current
      );

    // Apply the parent matrix to the target position
    if (parentMatrixAtGrabStart) {
      targetPosition.applyMatrix4(parentMatrixAtGrabStart);
    }

    // Set the group's position to the target position without modifying
    // any of the axis' denoted in the "fixed" prop.
    applyFixed(targetPosition);

    // Limit movement based on the "limits" prop.
    applyLimits(targetPosition);

    // Determine pointer/target relationship. Higher # is more fixed to target
    groupRef.current.position.lerp(targetPosition, 1);

    if (typeof grabActive === "function") {
      grabActive(groupRef);
    }
  });

  /* =============================================
  Interaction Handles 
  */
  const handleSelectStart = (e) => {
    controlRef.current = e.target.controller;

    // Get intersections with ray
    const intersections = getIntersections(
      controlRef.current,
      groupRef.current
    );

    // If it intersects, update offsets and store the initial position of the object
    if (intersections.length > 0) {
      initialDistance.current = intersections[0].distance;
      updateOffsets(intersections);
      initialPosition.current = groupRef.current.position.clone();
      originalPosition.current = originalPosition.current ? originalPosition.current : groupRef.current.position.clone();

      if (typeof grabStart === "function") {
        grabStart(groupRef);
      }

      // Store the matrix in the parent space
      if (groupRef.current.parent) {
        setParentMatrixAtGrabStart(
          groupRef.current.matrixWorld
            .clone()
            .multiply(
              new THREE.Matrix4().getInverse(
                groupRef.current.parent.matrixWorld
              )
            )
        );
      } else {
        setParentMatrixAtGrabStart(groupRef.current.matrixWorld.clone());
      }
    }
  };

  const handleSelectEnd = (e) => {
    if (e.target.controller === controlRef.current) {
      controlRef.current = undefined;
      initialDistance.current = undefined;
      hitOffset.current = undefined;

      if (isNested) {
        setNestedGrabbing(false);
      }

      if (typeof grabEnd === "function") {
        grabEnd(groupRef);
      }
    }
  };

  /* =============================================
  Return
  */

  return (
    <GrabContext.Provider value={contextValue}>
      <Interactive
        onSelectStart={handleSelectStart}
        onSelectEnd={handleSelectEnd}
        enabled={!parentGrabbing} // Disable grabbing if parent is being grabbed
        {...rest}
      >
        <group ref={groupRef} transformLink={transformLink} transformTrack={transformTrack}>
          {children}
        </group>
      </Interactive>
    </GrabContext.Provider>
  );
};

export default Grab;
