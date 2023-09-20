import { Instances, Instance, useGLTF } from "@react-three/drei";
import { Matrix4, Quaternion, Vector3 } from "three";
import { Coordinates, useMap } from "react-three-map/maplibre";
import { MercatorCoordinate } from "maplibre-gl";
import { coordsToMatrix, decomposeMatrix } from "utils/3d.utils";

interface Props {
  latLngs: { lat: number; lng: number }[];
  center: { lat: number; lng: number };
}

export function InstancedTrees2Coords({ latLngs, center }: Props) {
  // @ts-ignore
  const { nodes } = useGLTF("assets/models/tree-transformed.glb");
  const test = useMap();
  console.log(test);
  const latLngTo3D = (
    longitude: number,
    latitude: number,
    altitude: number,
    fromLngLat: any
  ) => {
    const matrixArray = coordsToMatrix({
      longitude,
      latitude,
      altitude,
      fromLngLat,
    });
    const matrix = new Matrix4().fromArray(matrixArray);
    const position = new Vector3();
    matrix.decompose(position, new Quaternion(), new Vector3());
    return [position.x, position.y, position.z];
  };

  function calculateRelativePosition(
    center: { lat: number; lng: number },
    point: { lat: number; lng: number }
  ): { x: number; y: number; z: number } {
    const centerMerc = MercatorCoordinate.fromLngLat([center.lng, center.lat]);
    const pointMerc = MercatorCoordinate.fromLngLat([point.lng, point.lat]);
    const scaleUnit = centerMerc.meterInMercatorCoordinateUnits();

    const deltaX = pointMerc.x - centerMerc.x;
    const deltaY = pointMerc.y - centerMerc.y;

    return {
      x: deltaX * scaleUnit,
      y: deltaY * scaleUnit,
      z: 0,
    };
  }

  return (
    <>
      <mesh position={[0, 0, 0]} scale={[100, 100, 100]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <Instances
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      >
        {latLngs.map((coord, index) => {
          // const matrixArray = coordsToMatrix({
          //   longitude: coord.lng,
          //   latitude: coord.lat,
          //   altitude: 0,
          //   fromLngLat: MercatorCoordinate.fromLngLat,
          // });
          // const matrixObj = new Matrix4().fromArray(matrixArray);
          // return <Instance key={index} matrix={matrixObj} />;

          const { x, y, z } = calculateRelativePosition(center, coord);
          return <Instance key={index} position={[x, y, z]} />;
        })}
      </Instances>
      <Instances
        geometry={nodes.mesh_1.geometry}
        material={nodes.mesh_1.material}
      >
        {latLngs.map((coord, index) => {
          // const matrixArray = coordsToMatrix({
          //   longitude: coord.lng,
          //   latitude: coord.lat,
          //   altitude: 0,
          //   fromLngLat: MercatorCoordinate.fromLngLat,
          // });
          // const matrixObj = new Matrix4().fromArray(matrixArray);
          // return <Instance key={index} matrix={matrixObj} />;
          const { x, y, z } = calculateRelativePosition(center, coord);
          return <Instance key={index} position={[x, y, z]} />;
        })}
      </Instances>
      <Instances
        geometry={nodes.mesh_1_1.geometry}
        material={nodes.mesh_1_1.material}
      >
        {latLngs.map((coord, index) => {
          // const matrixArray = coordsToMatrix({
          //   longitude: coord.lng,
          //   latitude: coord.lat,
          //   altitude: 0,
          //   fromLngLat: MercatorCoordinate.fromLngLat,
          // });
          // const matrixObj = new Matrix4().fromArray(matrixArray);
          // return <Instance key={index} matrix={matrixObj} />;
          const { x, y, z } = calculateRelativePosition(center, coord);
          console.log(x, y, z);
          return <Instance key={index} position={[x, y, z]} />;
        })}
      </Instances>
    </>
  );
}

useGLTF.preload("assets/models/tree-transformed.glb");
