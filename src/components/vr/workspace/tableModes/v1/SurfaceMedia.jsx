import { Model as TableSurfaceMedia } from "./../models/table/TableSurfaceMedia";
import StencilMask from "./../helpers/StencilMask";
import TableImage from "./TableImage";
import { useStoreState } from "easy-peasy";
import Grab from "../helpers/Grab";
// Transform tracking should be put elsewhere at some point, but until then ...
// import TransformTracker from "./../helpers/TransformTracker";

const SurfaceMedia = () => {
  const uploadedFiles = useStoreState((state) => state.uploads);
  const { saveTransforms } = TransformTracker();

  return (
    <group>
      <StencilMask
        stencilRef={1}
        position={[-0.02, 0.05, 0]}
        size={[1.8, 1.01]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <Grab
          fixed={{ y: true }}
          transformTrack={{ key: "TableMediaSurface" }}
          grabEnd={saveTransforms}
        >
          <TableSurfaceMedia stencilRef={1} />
          <group position={[-0.5, 0.07, 0]}>
            {uploadedFiles.map((file, i) => (
              <Grab
                key={file.path.basename}
                transformTrack={{ key: file.path.basename }}
                isNested={true}
                fixed={{ y: true }}
                grabEnd={saveTransforms}
              >
                <TableImage
                  key={`img${i}`}
                  file={file}
                  stencilRef={1}
                  rotation={[(Math.PI / 180) * -90, 0, 0]}
                  pos={[0.8 * i, 0, 0]}
                />
              </Grab>
            ))}
          </group>
        </Grab>
      </StencilMask>
    </group>
  );
};

export default SurfaceMedia;
