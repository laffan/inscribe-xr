import { Text } from "@react-three/drei";
import * as THREE from 'three'

function TextPrompt({ prompt }) {
  const height = (prompt.content.length / 25) / 10;
  const planeGeometry = new THREE.PlaneGeometry(1, height);
  console.log("THIS IS A TEXT PROMPT", prompt.id )
  return (
    <>
      <Text color="black" maxWidth={.8} fontSize={0.05} position={[0, 0, 0.01]}>
        {prompt.content}
      </Text>
      <mesh geometry={planeGeometry}>
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}

export default TextPrompt;
