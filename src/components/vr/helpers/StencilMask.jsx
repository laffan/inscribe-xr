import * as React from 'react'
import * as THREE from 'three'


export default function PlaneMask({
  children,
  stencilRef,
  size,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  return (
    <>
      {children}
      <mesh position={position} rotation={rotation} renderOrder={1}>
        <planeGeometry args={size} />
        <meshBasicMaterial
          colorWrite={false}
          depthWrite={false}
          stencilWrite
          stencilRef={stencilRef}
          // stencilFuncMask={0xff}
          stencilFunc={THREE.AlwaysStencilFunc}
          // stencilFail={THREE.KeepStencilOp}
          // stencilZFail={THREE.KeepStencilOp}
          stencilFail={THREE.ReplaceStencilOp}
          stencilZFail={THREE.ReplaceStencilOp}
          stencilZPass={THREE.ReplaceStencilOp}
        />
      </mesh>
    </>
  )
}
