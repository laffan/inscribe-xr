// See options at : https://github.com/JMBeresford/r3f-form

import * as THREE from "three";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";
import { Form, Input, Textarea } from "r3f-form";
import InteractShared from "../../../helpers/InteractShared";
import { useStoreActions } from "easy-peasy";
import { throttle } from "lodash";

function ReflectionText({ reflection }) {
  console.log(reflection);
  const [inputText, setInputText] = useState(reflection.content);
  // const [backupText, setBackupText] = useState(doc.content);
  // const [docID, setDocId] = useState(doc.id);
  // const { saveDocument } = functions();
  const saveCurrentReflection = useStoreActions(
    (actions) => actions.reflections.saveCurrentReflection
  );

  const throttledSave = useMemo(
    () =>
      throttle((text) => {
        saveCurrentReflection({
          reflectionId: reflection.id,
          content: text,
        });
      }, 300),
    []
  );

  function handleSelect(e) {
    ref.current.focus(); // focus the DOM element -> triggers the 3D element as well
  }

  function handleOnChange(e) {
    setInputText(e.target.value);
    throttledSave(e.target.value);
  }

  function handleSelectMissed() {
    ref.current.blur(); // unfocus the DOM element -> also triggers 3D elem
  }

  useEffect(() => {
    console.log("ADD SOME SAVE FUNCTION IF ID IS NEW");
    setInputText(reflection.content);
  }, [reflection.id]);

  const ref = useRef();

  return (
    <InteractShared onSelect={handleSelect} onSelectMissed={handleSelectMissed}>
      <Textarea
        ref={ref}
        position={[0,1.1,0.01]}
        rows={11} // height
        width={1.1}
        padding={[0.1, 0.1]}
        backgroundOpacity={0}
        onChange={handleOnChange}
        defaultValue={inputText}
      />
    </InteractShared>
  );
}

export default ReflectionText;
