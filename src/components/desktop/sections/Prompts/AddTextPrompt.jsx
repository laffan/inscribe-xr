import React, { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
function AddTextPrompt() {
  const [promptText, setPromptText] = useState("");
  const saveTextPrompt = useStoreActions((actions) => actions.prompts.saveTextPrompt);

  const handleButtonClick = () => {
    saveTextPrompt(promptText);
    setPromptText("")
  };

  return (
    <div className="AddTextPrompt">
      <textarea
        value={promptText}
        onChange={(e) => {
          setPromptText(e.target.value < 140 ? e.target.value : e.target.value.substring(0, 140));
        }}
        placeholder="How could I ..."
      ></textarea>
      <button onClick={handleButtonClick}>Save</button>
    </div>
  );
}

export default AddTextPrompt;


