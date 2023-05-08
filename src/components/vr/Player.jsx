import { useFrame } from "@react-three/fiber";
import {
  useXR,
} from "@react-three/xr";


function Player() {
  const player = useXR((state) => state.player);
  useFrame(() => void (player.rotation.x = player.rotation.y += 0.01));
  return null;
}

export default Player;
