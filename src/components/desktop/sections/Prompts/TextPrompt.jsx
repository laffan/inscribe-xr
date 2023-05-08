import { useStoreActions } from "easy-peasy";

function TextPrompt({ prompt }) {
  const deleteTextPrompt = useStoreActions(
    (actions) => actions.prompts.deleteTextPrompt
  );

  const handleDelete = () => {
    deleteTextPrompt(prompt.id);
  };

  return (
    <div className="TextPrompt">
      <div className="TextPrompt__Content">{prompt.content.length < 80 ? prompt.content : `${prompt.content.substring(0, 80)}...`}</div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TextPrompt;
