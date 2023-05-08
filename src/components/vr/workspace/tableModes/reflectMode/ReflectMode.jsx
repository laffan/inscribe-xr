import { Model as Editor } from "./Editor";
import ReflectionText from "./ReflectionText";
import ReflectionPrompt from "./ReflectionPrompt";
import { useStoreState } from "easy-peasy";
import Grab from "../../../helpers/Grab";

function ReflectMode(props) {
  const reflectionId = useStoreState(
    (state) => state.user.state.currentReflection
  );
  const reflections = useStoreState((state) => state.reflections);
  const currentReflection = reflections.find((d) => d.id === reflectionId);

  return !!currentReflection && (
    <group position={[0, 0, 0]} rotation={[-33 * (Math.PI / 180), 0, 0]}>
      { !!currentReflection.promptId && (
        <Grab
          isNested={true}
          fixed={{
            y: true,
            z: true,
          }}
          limits={{
            x: [-0.5, 0.5],
          }}
        >
          <ReflectionPrompt promptId={currentReflection.promptId} />
        </Grab>
      )}
      <Grab
        isNested={true}
        fixed={{
          y: true,
          z: true,
        }}
        limits={{
          x: [-0.5, 0.5],
        }}
      >
        <group>
          <ReflectionText reflection={currentReflection} />
          <Editor />
        </group>
      </Grab>
    </group>
  );
}

export default ReflectMode;
