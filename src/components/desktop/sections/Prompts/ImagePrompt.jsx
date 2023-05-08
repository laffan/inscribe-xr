import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

function ImagePrompt({ file }) {
  const deleteImagePrompt = useStoreActions(
    (state) => state.prompts.deleteImagePrompt
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const handleDelete = (id) => {
    setIsDeleting(true);
    deleteImagePrompt({ id });
  };

  useEffect(() => {
    const checkThumbnail = () => {
      const url = `${file.path.basepath}${file.path.basename}_400x400${file.path.tokenpath}`;
      const img = new Image();
      img.onload = () => {
        setThumbnailUrl(url);
      };
      img.src = url;
    };

    const intervalId = setInterval(checkThumbnail, 500);

    return () => clearInterval(intervalId);
  }, [file]);

  return (
    <div className="ImagePrompt" style={{ opacity: isDeleting ? 0.5 : 1 }}>
      <div className="ImagePrompt__Img">
        <img
          // style={{  maxWidth: 150 }}
          src={thumbnailUrl || "/assets/img/thumb-placeholder.jpg"}
        />
      </div>
      <button
        onClick={() => {
          handleDelete(file.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ImagePrompt;
