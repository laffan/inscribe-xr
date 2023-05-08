import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useStoreActions, useStoreState } from "easy-peasy";

function AddImagePrompt() {
  const [addedFiles, setAddedFiles] = useState([]);
  const saveImagePrompt = useStoreActions(
    (state) => state.prompts.saveImagePrompt
  );

  const handleSubmit = async () => {
    console.log("Uploading", addedFiles);
    saveImagePrompt({ files: addedFiles });
    setAddedFiles([]);
  };
  const handleCancel = async () => {
    setAddedFiles([]);
  };

  const onDrop = useCallback(
    (acceptedFiles) =>
      setAddedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      ),
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
    },
  });

  return (
    <div className="AddImagePrompt">
      {!!addedFiles.length ? (
        <div className="AddImagePrompt__NewFiles">
          {addedFiles.map((file, i) => (
            <div className="Prompts__NewFile" key={`file${i}`}>
              <img
                style={{ maxHeight: 100, maxWidth: 100 }}
                src={`${file.preview}`}
              />
            </div>
          ))}
          <div className="AddImagePrompt__UploadButtons">
            <button onClick={handleSubmit}>Upload</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div
          className="AddImagePrompt__DragArea"
          {...getRootProps()}
          style={{ background: isDragActive ? "#E5EFFF" : "none" }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ margin: 0 }}>Drop the files here ...</p>
          ) : (
            <>
              <p style={{ margin: 0 }}>
                Drag image here, or click to open a file browser.
              </p>
              <p style={{ fontSize: 12, margin: 0, opacity: 0.5 }}>
                (PNG or JPG files only.)
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AddImagePrompt;
