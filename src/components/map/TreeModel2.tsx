import { useGLTF, Merged } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  positions: Array<{ x: number; y: number; z: number }>;
}

export function InstancedTrees({ positions }: Props) {
  // @ts-ignore
  const { nodes } = useGLTF("assets/models/tree-transformed.glb");
  console.log(nodes);
  const { gl } = useThree();

  useFrame(() => {
    console.log(gl.info.render.calls);
  });

  return (
    <Merged
      meshes={[
        new THREE.Mesh(nodes.mesh_0.geometry, nodes.mesh_0.material),
        new THREE.Mesh(nodes.mesh_1.geometry, nodes.mesh_1.material),
        new THREE.Mesh(nodes.mesh_1_1.geometry, nodes.mesh_1_1.material),
      ]}
    >
      {(Mesh0: any, Mesh1: any, Mesh1_1: any) => (
        <>
          {positions.map((position, index) => (
            <group
              key={index}
              position={[position.x, position.y, position.z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <Mesh0 />
              <Mesh1 />
              <Mesh1_1 />
            </group>
          ))}
        </>
      )}
    </Merged>
  );
}

useGLTF.preload("assets/models/tree-transformed.glb");
