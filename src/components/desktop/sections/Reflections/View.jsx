import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useStoreState } from "easy-peasy";
import PromptPreview from "./PromptPreview";
import ModalDelete from "./ModalDelete";

const View = () => {
  const reflections = useStoreState((state) => state.reflections);
  const currentReflectionId = useStoreState(
    (state) => state.user.state.currentReflection
  );
  const [isOpen, setIsOpen] = useState(false);
  const reflection = reflections.find((d) => d.id === currentReflectionId);

  return reflection && (
    <div className="View">
      <ModalDelete id={reflection.id} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="View__Content">
        {!!reflection.promptId && (
          <div className="View__Prompt">
            <PromptPreview promptId={reflection.promptId} context="view" />
          </div>
        )}

        <ReactMarkdown children={reflection.content} />
      </div>
      <div className="View__DocumentActions">
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default View;
