import { useStoreState } from "easy-peasy";
import { useRef } from "react";
import HoverMenu from "../../../helpers/HoverMenu";
import boundedPoints from "../../../helpers/BoundedPoints";
import ImagePrompt from "./../shared/ImagePrompt";
import TextPrompt from "./../shared/TextPrompt";
import { useStoreActions } from "easy-peasy";

function PromptsList() {
  const promptGroup = useRef();
  const prompts = useStoreState((state) => state.prompts);
  const points = boundedPoints(prompts.length, [1, 1, 1], 0.5);
  const setPrompt = useStoreActions((state) => state.reflections.setPrompt );

  const usePrompt = (id) => {
    setPrompt(id);
  };

  return (
    <group position={[-0.5, 0, -0.5]}>
      <group ref={promptGroup}>
        {prompts.map((prompt, i) => {
          return (
            <group key={`prompt${i}`} position={points[i]}>
              <HoverMenu
                options={{
                  style: "buttons",
                  id: prompt.id,
                  choices: [
                    {
                      type: "use",
                      callback: usePrompt,
                    },
                  ],
                }}
              >
                {prompt.type === "text" ? (
                  <TextPrompt prompt={prompt} />
                ) : (
                  <group scale={0.5}><ImagePrompt prompt={prompt} /></group>
                )}
              </HoverMenu>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default PromptsList;
