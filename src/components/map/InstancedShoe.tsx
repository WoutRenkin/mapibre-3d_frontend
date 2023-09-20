import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame, Vector3 } from "@react-three/fiber";
import { Instances, Instance, useGLTF } from "@react-three/drei";
import { Canvas, Coordinates } from "react-three-map/maplibre";
import { useControls } from "leva";
import { MercatorCoordinate } from "maplibre-gl";

interface Props {
  treeLatLng: { lat: number; lng: number }[];
}

export function InstancedShoes(props: Props) {
  const { treeLatLng } = props;
  const { range } = useControls({
    range: { value: 10, min: 0, max: 300, step: 10 },
  });

  const gltf = useGLTF("assets/models/shoe.glb");
  // @ts-ignore
  const nodes = gltf.nodes;
  // @ts-ignore
  const materials = gltf.materials;
  console.log(treeLatLng);
  return (
    <Instances
      range={range}
      material={materials.phong1SG}
      geometry={nodes.Shoe.geometry}
    >
      {treeLatLng.map((coord, index) => {
        // const [x, y] = latLongTo3D(coord.lat, coord.lng);
        return (
          <group key={index} position={[0 + index * 10, 0 + index * -10, 0]}>
            <Shoe />
          </group>
        );
      })}
    </Instances>
  );
}

function Shoe() {
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  return (
    <group position={[0, 0, 0]}>
      <Instance
        scale={[1000, 1000, 1000]}
        ref={ref}
        onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
        onPointerOut={(e) => setHover(false)}
      />
    </group>
  );
}

// Utility function to convert latitude and longitude to 3D coordinates
function latLongTo3D(lat: number, lng: number) {
  const R = 6378137; // Earth's radius in meters
  const d = Math.PI / 180; // Degree to Radian conversion factor

  const x = R * lng * d;
  const y = R * Math.log(Math.tan(Math.PI / 4 + (lat * d) / 2));

  const scale = 0.001; // Example scale factor

  const sceneX = x * scale;
  const sceneY = y * scale;

  return [sceneX, sceneY];
}
