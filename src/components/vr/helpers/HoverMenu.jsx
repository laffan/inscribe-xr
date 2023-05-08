import { useState, useRef, createContext, useContext, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import { Interactive } from "@react-three/xr";

const textureLoader = new THREE.TextureLoader();
const deleteTexture = textureLoader.load(
  "/assets/img/button-texture-delete.png"
);
const useTexture = textureLoader.load("/assets/img/button-texture-open.png");

/*


  Hover menu should accept the kind and (firebase) ID of the item
  being hovered so the appropraite actions can be passed on to the
  buttons.

  - Images : delete, use (not vital)
  - Documents : open, delete


*/

function SquareButton({
  isHovering,
  offset,
  imageTexture,
  onSelect,
  rotation,
  id,
}) {
  const spacing = 7;
  const spring = useSpring({
    position: isHovering
      ? [offset / spacing, 0, 0.01]
      : [offset / spacing, 0, -0.1],
  });

  const materials = [
    new THREE.MeshBasicMaterial({ color: "white" }),
    new THREE.MeshBasicMaterial({ color: "white" }),
    new THREE.MeshBasicMaterial({ map: imageTexture }),
    new THREE.MeshBasicMaterial({ color: "white" }),
    new THREE.MeshBasicMaterial({ color: "white" }),
    new THREE.MeshBasicMaterial({ color: "white" }),
  ];

  return (
    <Interactive
      onHover={() => {
        // console.log("Hover Action!");
      }}
      onBlur={() => {
        // console.log("Blur Action!");
      }}
      onSelect={()=>{
        // console.log("onSelect")
        // console.log(id);
        onSelect(id)
      }}
    >
      <animated.mesh
        position={spring.position}
        rotation={rotation}
        material={materials}
      >
        <boxGeometry args={[0.1, 0.01, 0.1]} />
      </animated.mesh>
    </Interactive>
  );
}

const HoverMenu = ({ children, options, ...rest }) => {
  const hoverRef = useRef();
  const [isHovering, setIsHovering] = useState(false);
  const iconWidth = 0.035;

  const handleHover = () => {
    setIsHovering(true);
  };
  const handleBlur = () => {
    setIsHovering(false);
  };

  /* =============================================
  Return
  */

  return (
    <Interactive onHover={handleHover} onBlur={handleBlur} {...rest}>
      <group position={[-options.choices.length * iconWidth, 0, 0]}>
        {options.choices.map((choice, i) => {

          // "choices" must come from predefined array of options
          // 'use', 'delete'are the current avaiable options.

          let texture;
          switch (choice.type) {
            case "delete":
              texture = deleteTexture;
              break;
            case "use":
              texture = useTexture;
              break;
            default:
            // code block
          }
          return (
            <SquareButton
              key={`hoverMenu${i}`}
              isHovering={isHovering}
              imageTexture={texture}
              onSelect={choice.callback}
              id={options.id}
              offset={i}
              rotation={[Math.PI / 2, 0, 0]}
            />
          );
        })}
      </group>
      <group ref={hoverRef}>{children}</group>
    </Interactive>
  );
};

export default HoverMenu;
