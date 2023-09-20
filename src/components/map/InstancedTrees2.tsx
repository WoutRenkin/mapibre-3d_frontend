import { Instances, Instance, useGLTF } from "@react-three/drei";
import { useMemo } from "react";

interface Props {
  positions: Array<{ x: number; y: number; z: number }>;
}

export function InstancedTrees2({ positions }: Props) {
  // @ts-ignore
  const { nodes } = useGLTF("assets/models/onemesh-tree-less-vertices.glb");
  const instances = useMemo(
    () =>
      positions.map((position, index) => (
        <Instance position={[position.x, position.y, position.z]} key={index} />
      )),
    [positions]
  );
  console.log("Rerender");
  return (
    <Instances
      geometry={nodes.mesh_0.geometry}
      material={nodes.mesh_0.material}
    >
      {instances}
    </Instances>
  );
}

useGLTF.preload("assets/models/onemesh-tree-less-vertices.glb");
