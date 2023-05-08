import React, { useEffect, useState, useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { Text } from "@react-three/drei";
import InteractShared from "./InteractShared";

function LabeledButton({ onSelect, icon, text, textBg, ...rest }) {
  const icons = useRef();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (icons.current) {
      icons.current.children.forEach((child) => {
        child.visible = child.name === icon;
      });
    }
  }, [icon]);

  const handleHover = () => {
    setIsHovering(true);
  };
  const handleBlur = () => {
    setIsHovering(false);
  };

  const textBgMaterial = useMemo(() => {
    return new MeshStandardMaterial({ color: "#" + textBg });
  }, [textBg]);

  const { nodes, materials } = useGLTF(
    "/assets/models/editor/labeled-button.glb"
  );
  return (
    <group {...rest} dispose={null}>
      <group name="Scene">
        <InteractShared
          onHover={handleHover}
          onBlur={handleBlur}
          onSelect={onSelect}
        >
          {isHovering && (
            <group>
              <mesh
                name="circle-ring"
                geometry={nodes["circle-ring"].geometry}
                material={materials.buttonBorderMat}
                position={[-0.18, 0, 0.03]}
              />
              <Text
                color="white"
                anchorX="left"
                anchorY="middle"
                fontSize={0.06}
                position={[-0.07, -0.01, 0.03]}
              >
                {text}
              </Text>
              <mesh
                name="text-background"
                geometry={nodes["text-background"].geometry}
                material={textBgMaterial}
                position={[0.01, 0, 0.02]}
              />
            </group>
          )}
          <group ref={icons} name="icons">
            <mesh
              name="icon-add"
              geometry={nodes["icon-add"].geometry}
              material={materials["iconMat.003"]}
              position={[-0.18, 0, 0.04]}
            />
            <mesh
              name="icon-close"
              geometry={nodes["icon-close"].geometry}
              material={materials["iconMat.003"]}
              position={[-0.18, 0, 0.04]}
            />

            <mesh
              name="icon-finish"
              geometry={nodes["icon-finish"].geometry}
              material={materials["iconMat.002"]}
              position={[-0.18, 0, 0.04]}
            />
            <mesh
              name="icon-trash"
              geometry={nodes["icon-trash"].geometry}
              material={materials["iconMat.001"]}
              position={[-0.18, 0, 0.04]}
            />
          </group>
          <mesh
            name="circle-bg"
            geometry={nodes["circle-bg"].geometry}
            material={materials.buttonMat}
            position={[-0.18, 0, 0.03]}
          />
        </InteractShared>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/editor/labeled-button.glb");

export default LabeledButton;
