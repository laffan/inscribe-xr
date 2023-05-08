import * as THREE from "three";
import { useEffect, useRef } from "react";
import { TextureLoader } from "three";
import HoverMenu from "../helpers/HoverMenu";

function TableImage({ pos, file, stencilRef, rotation }) {
  const mesh = useRef();
  const material = useRef(
    new THREE.MeshStandardMaterial({ map: new THREE.Texture() })
  );

  const textureUrl = `${file.path.basepath}${file.path.basename}_1500x1500.jpeg${file.path.tokenpath}`;

  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  useEffect(() => {
    // Thanks to Thanh Minh for this technique
    // https://codesandbox.io/s/elated-fire-198px

    const textureLoader = new TextureLoader();

    textureLoader.load(textureUrl, (t) => {
      // Get image size to scale mesh appropriately
      const landscape = t.image.width > t.image.height;
      const ratio = landscape
        ? t.image.width / t.image.height
        : t.image.height / t.image.width;
      // Scale mesh
      landscape
        ? (mesh.current.scale.x = ratio)
        : (mesh.current.scale.y = ratio);
      // Set material
      material.current.map = t;
      material.current.needsUpdate = true;
    });
  }, []);

  return (
    <group position={pos}>
      <HoverMenu
        options={{
          style: "buttons",
          choices: ["open", "delete"],
        }}
      >
        <group scale={0.3}>
          <mesh
            renderOrder={2}
            ref={mesh}
            rotation={rotation}
            geometry={planeGeometry}
          >
            <meshStandardMaterial
              map={material.current?.map}
              stencilWrite
              stencilRef={stencilRef}
              // stencilFuncMask={0xff}
              stencilFunc={THREE.EqualStencilFunc}
              stencilFail={THREE.KeepStencilOp}
              stencilZFail={THREE.KeepStencilOp}
              stencilZPass={THREE.ReplaceStencilOp}
            />
          </mesh>
        </group>
      </HoverMenu>
    </group>
  );
}

export default TableImage;
