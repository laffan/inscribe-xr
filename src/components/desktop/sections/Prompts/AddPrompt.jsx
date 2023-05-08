import { useState } from "react";
import AddTextPrompt from "./AddTextPrompt";
import AddImagePrompt from "./AddImagePrompt";
function AddPrompt() {
  const [promptStyle, setPromptStyle] = useState("image");

  return (
    <main className="AddPrompt">
      <div className="AddPrompt__Types">
        <div
          className={promptStyle === "text" ? "AddPrompt__Types--Active" : ""}
        >
          <button
            onClick={() => {
              setPromptStyle("text");
            }}
          >
            Text
          </button>
        </div>
        <div
          className={promptStyle === "image" ? "AddPrompt__Types--Active" : ""}
        >
          <button
            onClick={() => {
              setPromptStyle("image");
            }}
          >
            Image
          </button>
        </div>
      </div>
      <div className="AddPrompt__Dialog">
        {promptStyle === "text" && <AddTextPrompt />}
        {promptStyle === "image" && <AddImagePrompt />}
      </div>
    </main>
  );
}

export default AddPrompt;
