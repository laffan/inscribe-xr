
import { useStoreState } from "easy-peasy";
import ImagePrompt from "./../shared/ImagePrompt";
import TextPrompt from "./../shared/TextPrompt";


function ReflectionPrompt({ promptId }) {
  const prompts = useStoreState((state) => state.prompts);
  const prompt = prompts.find((p) => p.id === promptId);
  
  return ( prompt && 
    <group position={[-1, 1.3, -0.1]} rotation={[(Math.PI / 180) * 30, (Math.PI / 180) * 30, 0]}>
      {prompt.type === "text" ? <group>
        <TextPrompt key={prompt.id} prompt={prompt} />
      </group> :
      <group scale={1}>
        <ImagePrompt key={prompt.id} prompt={prompt} />
      </group>}
    </group>
  );
}

export default ReflectionPrompt;
