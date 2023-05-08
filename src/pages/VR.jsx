import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { VRButton, XR, Hands, Controllers } from "@react-three/xr";
import { Stats, useProgress } from "@react-three/drei";
import Player from "../components/vr/Player";

// import TeleportTravel from "./../components/vr/shared/TeleportTravel";
import BaseScene from "../components/vr/World";

function VR() {
  function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();
    var intProg = Math.floor(progress);
    return (
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "50px",
          }}
        >
          {intProg}%
        </div>
      </section>
    );
  }

  return (
    <Suspense fallback={<Loader />}>
      <VRButton />
      <Canvas
        camera={{ position: [0, 1.5, 0], rotation: [0, 0, 0], fov: 50 }}
      >
        <XR>
          <BaseScene />
          <Hands />
          <Controllers />
          {false && <Player />}
          <Stats />
        </XR>
      </Canvas>
    </Suspense>
  );
}

export default VR;
