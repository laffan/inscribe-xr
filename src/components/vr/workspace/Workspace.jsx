import { useEffect } from "react";
import { useStoreState } from "easy-peasy";
import { Text } from "@react-three/drei";
import Grab from "./../helpers/Grab";
import { Model as Table } from "./Table";
import TransformLinker from "./../helpers/TransformLinker";
import PromptMode from "./tableModes/promptMode/PromptMode";
import ReflectMode from "./tableModes/reflectMode/ReflectMode";
import ReviewMode from "./tableModes/reviewMode/ReviewMode";
import SpaceMode from "./tableModes/spaceMode/SpaceMode";
// import TransformTracker from "../helpers/TransformTracker";

function BaseWorkspace(props) {

  const tableMode = useStoreState((state) => state.manager.current.tableMode);

  return (
    <group position={[0, 0.5, -2]}>
      <Grab
        fixed={{ x: true }}
        limits={{
          y: [-0.5, 0.5],
          z: [-0.5, 0.5],
        }}
      >

        
        <group position={[tableMode === 1 ? 0 : 100, 0, 0 ]}>
          <PromptMode />
        </group>
        <group position={[tableMode === 2 ? 0 : 100, 0, 0 ]}>
          <ReflectMode />
        </group>
        <group position={[tableMode === 3 ? 0 : 100, 0, 0 ]}>
          <ReviewMode />
        </group>
        <group position={[tableMode === 4 ? 0 : 100, 0, 0 ]}>
          <SpaceMode />
        </group>
        <Table />
      </Grab>
    </group>
  );
}

export default BaseWorkspace;
