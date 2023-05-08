import { useEffect, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

// import TeleportTravel from "./../components/Interface/shared/TeleportTravel";
// import Editor from "../components/vr/workspace/tableModes/reflectMode/editor/Editor"

function Interface() {
  return (
    <>
      <Canvas linear flat shadows>
        <ambientLight intensity={1} />
        <PerspectiveCamera position={[0, -1, 3]} >
          {/* <Editor /> */}
        </PerspectiveCamera>
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default Interface;
