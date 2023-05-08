import { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Environment } from "@react-three/drei";

import Workspace from "./workspace/Workspace";
import TransformTracker from "./helpers/TransformTracker";
import TransformLinker from "./helpers/TransformLinker";
import GroupSwap from "./helpers/GroupSwap";

import { Model as DefaultGarden } from "./garden/gardens/DefaultGarden";
import { Model as DefaultStructure } from "./structure/buildings/DefaultStructure";
import SnapTurn from "./helpers/SnapTurn";
import BackgroundAudio from "./audio/BackgroundAudio";

const World = () => {
  const scenes = useStoreState((state) => state.scenes);
  const currentSceneId = useStoreState((state) => state.manager.current.scene);
  const curScene = scenes[currentSceneId];

  // Tracking functions
  // const { saveTransforms, applyTransforms  } = TransformTracker();
  // const currentScene = useStoreState((state) => state.user.state.currentScene);
  // const trackedTransforms = scenes.find(
  //   (s) => s.id === currentScene
  // ).trackedTransforms;

  // Init transformTracker
  // useEffect(() => {
  //   if (!trackedTransforms.length) {
  //     saveTransforms();
  //   } else {
  //     applyTransforms(trackedTransforms);
  //   }
  // }, []);

  // Linking functions
  const { scanTransformLinks } = TransformLinker();
  const transformLinks = useStoreState((state) => state.manager.transformLinks);

  // Groupswap function
  const { scanGroupSwaps } = GroupSwap();

  // Init TransformLinker
  useEffect(() => {
    if (!transformLinks.length) {
      scanTransformLinks();
    }
  }, []);

  // Init groupswaps
  useEffect(() => {
    scanGroupSwaps();
  }, []);

  return (
    <>
      <Environment
        files={[
          `./assets/cubemaps/alps/px.jpg`,
          `./assets/cubemaps/alps/nx.jpg`,
          `./assets/cubemaps/alps/py.jpg`,
          `./assets/cubemaps/alps/ny.jpg`,
          `./assets/cubemaps/alps/pz.jpg`,
          `./assets/cubemaps/alps/nz.jpg`,
        ]}
        // files={[
        //   `./assets/cubemaps/${curScene.world.vista}/px.jpg`,
        //   `./assets/cubemaps/${curScene.world.vista}/nx.jpg`,
        //   `./assets/cubemaps/${curScene.world.vista}/py.jpg`,
        //   `./assets/cubemaps/${curScene.world.vista}/ny.jpg`,
        //   `./assets/cubemaps/${curScene.world.vista}/pz.jpg`,
        //   `./assets/cubemaps/${curScene.world.vista}/nz.jpg`,
        // ]}
        path={"/"}
        background
      />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
      <SnapTurn />

      <ambientLight intensity={1} />
      {curScene.world.building.model === `default-building` && (
        <DefaultStructure />
      )}
      {curScene.world.garden.model === `default-garden` && <DefaultGarden />}

      <Workspace />

      <BackgroundAudio audioFileUrl="/assets/audio/background/farm.mp3" />
    </>
  );
};

export default World;
