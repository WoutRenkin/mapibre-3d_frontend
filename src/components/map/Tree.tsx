import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Clone, useGLTF } from "@react-three/drei";
import { useFrame, useThree, Vector3 } from "@react-three/fiber";
import { Canvas, Coordinates } from "react-three-map/maplibre";
import { useControls } from "leva";

export function Tree(props: {
  position: Vector3;
  treeLatLng: { lat: number; lng: number }[];
}) {
  const gltf = useGLTF("assets/models/tree-transformed.glb");
  const { gl } = useThree();

  useFrame(() => {
    console.log(gl.info.render.calls);
  });

  return (
    <group
      {...props}
      dispose={null}
      //   rotation={[Math.PI, 0, -Math.PI / 2]}
      rotation={[0, 0, 0]}
    >
      {props.treeLatLng.map((coord, index) => (
        <Coordinates key={index} latitude={coord.lat} longitude={coord.lng}>
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
          />
          <object3D scale={2}>
            {/* Cloned tree at the specified coordinate */}
            <Clone object={gltf.scene} position={[0, 0, 0]} />
          </object3D>
        </Coordinates>
      ))}
    </group>
  );
}
