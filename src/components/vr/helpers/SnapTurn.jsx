import { useXR, useController } from "@react-three/xr";
import { useFrame } from "@react-three/fiber";
import { useState, useEffect } from "react";

function degToRad(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

function SnapTurn({
  hand = "right",
  repeatThreshold = 300,
  turnDegrees = 30,
}) {
  const { player } = useXR();
  const controller = useController(hand);
  const [actionAllowed, setActionAllowed] = useState(true);

  useEffect(() => {
    if (!actionAllowed) {
      setTimeout(function () {
        // console.log("Restting action");
        setActionAllowed(true);
      }, repeatThreshold);
    }
  }, [actionAllowed]);

  useFrame(() => {
    if (controller && player && controller.inputSource.gamepad) {
      const { axes } = controller.inputSource.gamepad;
      if (Math.abs(axes[2]) && actionAllowed) {
        player.rotation.y -=
          axes[2] > 0 ? degToRad(turnDegrees) : -degToRad(turnDegrees);
        setActionAllowed(false);
      }
    }
  });
  return <></>;
}

export default SnapTurn;
