import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three";

function Image({ position, file, rotation }) {
  const mesh = useRef();
  const material = useRef(
    new THREE.MeshStandardMaterial({ map: new THREE.Texture() })
  );

  const textureUrl = `${file.path.basepath}${file.path.basename}_1500x1500${file.path.tokenpath}`;

  const planeGeometry = new THREE.PlaneGeometry(1, 1);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const textureLoader = new TextureLoader();

    textureLoader.load(textureUrl, (t) => {
      const landscape = t.image.width > t.image.height;
      const ratio = landscape
        ? t.image.width / t.image.height
        : t.image.height / t.image.width;
      landscape
        ? (mesh.current.scale.x = ratio)
        : (mesh.current.scale.y = ratio);
      material.current.map = t;
      material.current.needsUpdate = true;
      setVisible(true);
    });
  }, []);

  return (
    <group position={position} rotation={rotation} >
      <mesh ref={mesh} geometry={planeGeometry} visible={visible}>
        <meshStandardMaterial map={material.current?.map} />
      </mesh>
    </group>
  );
}

export default Image;