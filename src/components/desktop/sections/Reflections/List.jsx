import { useStoreActions, useStoreState } from "easy-peasy";
import { formatRelative } from "date-fns";
import removeMd from "remove-markdown";
import PromptPreview from "./PromptPreview";

const List = () => {
  const currentReflection = useStoreState(
    (state) => state.user.state.currentReflection
  );
  const reflections = useStoreState((state) => state.reflections);

  const saveCurrentReflection = useStoreActions(
    (state) => state.user.saveCurrentReflection
  );

  const handleSelectDocument = (id) => {
    saveCurrentReflection({ reflectionId: id });
  };
  return (
    <div className="List">
      {reflections.map((reflection, i) => {
        const formatedDate = formatRelative(
          reflection.created.toDate(),
          new Date(),
          {
            addSuffix: true,
          }
        );
        const excerpt = removeMd(reflection.content).slice(0, 20);
        return (
          <div
            key={`doc${reflection.id}`}
            onClick={() => {
              handleSelectDocument(reflection.id);
            }}
            className={`List__Reflection ${
              currentReflection === reflection.id
                ? "List__Reflection--isActive"
                : ""
            }`}
          >
            <div className="List__ReflectionDate">{formatedDate}</div>
            {reflection.promptId.length && (
              <PromptPreview promptId={reflection.promptId} context="list" />
            )}
            <div className="List__ReflectionText">{excerpt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
