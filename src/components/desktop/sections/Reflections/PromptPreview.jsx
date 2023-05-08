import { useStoreState } from "easy-peasy";

function PromptPreview({ promptId, context }) {
  const prompts = useStoreState((state) => state.prompts);
  const prompt = prompts.find((p) => p.id === promptId);

  const imgUrl = prompt && 
    prompt.type === "image"
      ? `${prompt.path.basepath}${prompt.path.basename}_400x400${prompt.path.tokenpath}`
      : null;

  return prompt && (
    <div className={`PromptPreview PromptPreview--${context}`}>
      {prompt.type === "image" ? (
        <div
          className="PromptPreview__Image"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        ></div>
      ) : (
        <div className="PromptPreview__Text">{prompt.content}</div>
      )}
    </div>
  );
}

export default PromptPreview;
