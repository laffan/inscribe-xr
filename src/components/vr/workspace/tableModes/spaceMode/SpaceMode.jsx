import { Model as StructureScaled } from "./../../../structure/buildings/DefaultStructure";
import { Model as Knob } from "./Knob";
import Grab from "../../../helpers/Grab";
import TransformLinker from "./../../../helpers/TransformLinker";

function SpaceMode(props) {
  const { moveLinked } = TransformLinker();

  return (
    <group>
      <Grab
        isNested={true}
        fixed={{
          y: true,
          z: true,
        }}
        limits={{
          x: [0, 0.4],
        }}
        grabActive={moveLinked}
        transformLink={{ id: "wallWindowLink", controller: true }}
      >
        <group position={[.6, 0.3, 0.2]}>
          <Knob />
        </group>
      </Grab>

      <Grab
        isNested={true}
        fixed={{
          y: true,
          z: true,
        }}
        limits={{
          x: [-0.5, 0],
        }}
        grabActive={moveLinked}
        transformLink={{ id: "wallRoomLink", controller: true }}
      >
        <group position={[0, 0.3, 0.2]}>
          <Knob />
        </group>
      </Grab>
      <Grab
        isNested={true}
        fixed={{
          y: true,
          x: true,
        }}
        limits={{
          z: [-0.25, 0],
        }}
        grabActive={moveLinked}
        transformLink={{ id: "alcoveLink", controller: true }}
      >
        <group position={[0.31, 0.27, 0.31]}>
          <Knob />
        </group>
      </Grab>
      <group position={[0.3, 0, 0]} scale={0.07}>
        <StructureScaled context={"mini"} />
      </group>
    </group>
  );
}

export default SpaceMode;
