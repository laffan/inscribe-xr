/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 default-garden.gltf --transform -R 8192
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/assets/models/gardens/default-garden.glb')
    return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group name="world_root" position={[-9.4, -2.18, -25.06]} rotation={[Math.PI / 2, 0, 0]} scale={0.03}>
          <mesh name="Aset_nature_rock_L_wjssaf3_00_LOD4001" geometry={nodes.Aset_nature_rock_L_wjssaf3_00_LOD4001.geometry} material={materials.SlabBMat} />
        </group>
        <mesh name="lawn" geometry={nodes.lawn.geometry} material={materials.lawn} />
        <mesh name="tree-1" geometry={nodes['tree-1'].geometry} material={materials['tree-1']} />
        <mesh name="tree-4" geometry={nodes['tree-4'].geometry} material={materials['tree-4']} />
        <mesh name="tree-2001" geometry={nodes['tree-2001'].geometry} material={materials['tree-2']} position={[0, -0.2, 0]} />
        <mesh name="Plane" geometry={nodes.Plane.geometry} material={materials.GardenSurface} />
        <mesh name="tree-4001" geometry={nodes['tree-4001'].geometry} material={materials['tree-4']} />
        <mesh name="lawn001" geometry={nodes.lawn001.geometry} material={materials.lawn} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/gardens/default-garden.glb')
