import { useStoreState } from "easy-peasy";
import ImagePrompt from "./ImagePrompt";
import TextPrompt from "./TextPrompt";
import { useEffect } from "react";

function PromptsList() {
  const prompts = useStoreState((state) => state.prompts);

  return (
    <div className="PromptList">
      {prompts.map((prompt, i) => {
        console.log ( prompt );
        return (
          <div className="PromptList__Prompt" key={`prompt${i}`}>
            {prompt.type === "text" ? (
              <TextPrompt prompt={prompt} />
            ) : (
              <ImagePrompt file={prompt} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PromptsList;
