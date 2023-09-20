import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

interface Props {
  position: Vector3;
}

export function TreeModel(props: Props) {
  const { position } = props;
  // @ts-ignore
  const { nodes, materials } = useGLTF("assets/models/tree.glb");
  return (
    <group {...props} position={position} dispose={null}>
      <mesh
        geometry={nodes.mesh_0.geometry}
        material={materials["Material #47"]}
        position={[0.029, -0.005, -0.045]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.008}
      />
      <group
        position={[0.029, -0.005, -0.045]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.008}
      >
        <mesh
          geometry={nodes.mesh_1.geometry}
          material={materials["Material #48"]}
        />
        <mesh
          geometry={nodes.mesh_1_1.geometry}
          material={materials["Material #49"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("assets/models/tree.glb");
