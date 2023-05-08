import { Model as TableSurfaceMedia } from "./../models/table/TableSurfaceMedia";
import StencilMask from "./../helpers/StencilMask";
import { Model as DefaultStructureMini } from "./../models/buildings/DefaultStructureMini";


const SurfaceControls = () => {

  return (
    <group position={[0,.06,0]}>
      <DefaultStructureMini />
    </group>
  );
};

export default SurfaceControls;
