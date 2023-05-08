import { useState, useEffect } from "react";
import { useStoreState } from "easy-peasy";

function useCurrentDocument() {
  const [currentDoc, setCurrentDoc] = useState(false);
  const currentCollection = useStoreState((state) => state.currentCollection);
  const documents = useStoreState((state) => state.documents);

  useEffect(() => {
    const docData = documents.filter(
      (d) => d.id === currentCollection.currentDocument
    )[0];
    setCurrentDoc(docData);
  }, [currentCollection, documents]);

  return currentDoc;
}

export default useCurrentDocument;