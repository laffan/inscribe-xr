import { useStoreState, useStoreActions } from "easy-peasy";
import removeMd from "remove-markdown";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { formatRelative } from "date-fns";
import { Interactive } from "@react-three/xr";
import boundedPoints from "../../../helpers/BoundedPoints";

function ReviewMode(props) {
  const reflections = useStoreState((state) => state.reflections);
  const saveCurrentReflection = useStoreActions(
    (state) => state.user.saveCurrentReflection
  );
  const points = boundedPoints(reflections.length, [1, 1, 1], 0.5);

  return (
    <group position={[-0.5, 0, -0.5]}>
      {reflections.map((reflection, i) => {
        const excerpt = removeMd(reflection.content).slice(0, 60);
        const height = excerpt.length / 25 / 10;
        const planeGeometry = new THREE.PlaneGeometry(0.6, height);

        return (
          <group key={`review${i}`} position={points[i]}>
            <Interactive
              key={`doc${reflection.id}`}
              onSelect={() => {
                saveCurrentReflection({ reflectionId: reflection.id });
              }}
            >
              <Text
                color="black"
                maxWidth={0.5}
                fontSize={0.05}
                position={[0, 0, 0.01]}
              >
                {excerpt}
              </Text>
              <mesh geometry={planeGeometry}>
                <meshStandardMaterial color="white" />
              </mesh>
            </Interactive>
          </group>
        );
      })}
    </group>
  );
}

export default ReviewMode;
