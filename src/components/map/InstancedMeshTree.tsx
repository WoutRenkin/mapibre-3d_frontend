import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { MercatorCoordinate } from "maplibre-gl";
import { useMap } from "react-three-map/maplibre";
import { createPortal, useThree } from "@react-three/fiber";
import { InstancedMesh, Scene, Vector3 } from "three";
import { constants } from "config/constants";
import { projectToWorld, unProjectFromWorld } from "utils/3d.utils";

interface Props {
  positions: Array<{ lat: number; lng: number }>;
  center: { lat: number; lng: number };
}

export function InstancedMeshTree({ positions, center }: Props) {
  const { camera } = useThree();
  const map = useMap();
  const meshRef = useRef<InstancedMesh>();
  console.log(map);
  //@ts-ignore
  const { nodes } = useGLTF("assets/models/onemesh-tree2.glb");
  const anything = useMap();
  const worldScale = meshRef?.current?.getWorldScale(new THREE.Vector3());
  console.log(worldScale);
  const lol = useThree();
  console.log(lol);

  console.log(projectToWorld([center.lat, center.lng]));

  const worldMatrix = lol.camera.matrixWorld;
  const cameraPosition = lol.camera.position;

  const glCoordMatrix = map?.transform.glCoordMatrix;
  const mercatorMatix = map?.transform.mercatorMatrix;

  //   useEffect(() => {
  //     if (!meshRef.current) return;
  //     const tempMatrix = new THREE.Matrix4();

  //     positions.forEach((position, index) => {
  //       if (!meshRef.current) return;
  //       tempMatrix.makeTranslation(position.x, position.y, position.z);
  //       meshRef.current.setMatrixAt(index, tempMatrix);
  //     });

  //     meshRef.current.instanceMatrix.needsUpdate = true;
  //   }, [positions]);

  //   useEffect(() => {
  //     if (!meshRef.current) return;
  //     const tempMatrix = new THREE.Matrix4();
  //     const rotationMatrix = new THREE.Matrix4();
  //     const scaleMatrix = new THREE.Matrix4();

  //     positions.forEach((position, index) => {
  //       if (!meshRef.current) return;

  //       // Random rotation around Y-axis between -π/8 and π/8 (for a slight rotation)
  //       const randomRotationY = -Math.PI / 8 + Math.random() * (Math.PI / 4);

  //       // Random scale between 0.9 and 1.3
  //       const randomScale = 0.2 + Math.random() * 1;

  //       rotationMatrix.makeRotationFromEuler(
  //         new THREE.Euler(0, randomRotationY, 0)
  //       );
  //       scaleMatrix.makeScale(randomScale, randomScale, randomScale);

  //       tempMatrix
  //         .makeTranslation(position.x, position.y, position.z)
  //         .multiply(rotationMatrix)
  //         .multiply(scaleMatrix);

  //       meshRef.current.setMatrixAt(index, tempMatrix);
  //     });

  //     meshRef.current.instanceMatrix.needsUpdate = true;
  //   }, [positions]);

  const coords = [
    {
      lat: 51.100323,
      lng: 4.796398,
    },
    {
      lat: 51.099973,
      lng: 4.796178,
    },
    {
      lat: 51.109586,
      lng: 4.79523,
    },
    {
      lat: 51.100168,
      lng: 4.797151,
    },
    {
      lat: 51.099675,
      lng: 4.797772,
    },
    {
      lat: 50.378806,
      lng: 7.62033,
    },
    {
      lat: 50.379403,
      lng: 7.62122,
    },
  ];

  // function calculateMercatorMeterLengthFactor(latitude: number) {
  //   // Convert latitude from degrees to radians
  //   const latitudeRadians = (latitude * Math.PI) / 180;
  //   // Calculate the cosine of the latitude in radians
  //   const cosLatitude = Math.cos(latitudeRadians);
  //   // Calculate the Mercator Meter Length Factor
  //   const mercatorMeterLengthFactor = 1 / cosLatitude;
  //   return mercatorMeterLengthFactor;
  // }

  useEffect(() => {
    if (!meshRef.current) return;
    if (!mercatorMatix) return;
    const tempMatrix = new THREE.Matrix4();
    const rotationMatrix = new THREE.Matrix4();
    const scaleMatrix = new THREE.Matrix4();
    const mapcameramatrix = new THREE.Matrix4();
    // @ts-ignore
    mapcameramatrix.fromArray(lol.r3m.mapCamMx);

    // Convert the center latitude and longitude to Mercator coordinates
    const centerCoord = MercatorCoordinate.fromLngLat({
      lat: center.lat,
      lng: center.lng,
    });

    var scaleFactor = 1 / Math.cos((center.lng * Math.PI) / 180);
    var mercatorExtent = 2 * Math.PI * 6378137;
    var modelScale = (1 / mercatorExtent) * scaleFactor;

    coords.forEach((position, index) => {
      if (!meshRef.current) return;

      // Convert each geographic coordinate to Mercator coordinates
      const mercatorCoord = MercatorCoordinate.fromLngLat({
        lat: position.lat,
        lng: position.lng,
      });
      // Calculate the relative position and scale it

      const relativeX =
        (mercatorCoord.x - centerCoord.x) * constants.MERCATOR_A;
      const relativeY = 0;
      const relativeZ =
        (mercatorCoord.y - centerCoord.y) * constants.MERCATOR_A;
      rotationMatrix.makeRotationFromEuler(new THREE.Euler(0, 0, 0));
      scaleMatrix.makeScale(1000000, 1000000, 1000000); // Adjust the scale using the Mercator scale

      tempMatrix
        // .makeTranslation(centerCoord.x, centerCoord.z, centerCoord.y)
        .makeTranslation(mercatorCoord.x, mercatorCoord.z, 0)
        .multiply(rotationMatrix)
        .multiply(scaleMatrix);
      meshRef.current.setMatrixAt(index, tempMatrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, camera]);
  // useEffect(() => {
  //   if (!meshRef.current) return;

  //   const tempMatrix = new THREE.Matrix4();
  //   const rotationMatrix = new THREE.Matrix4();
  //   const scaleMatrix = new THREE.Matrix4();

  //   // Convert the center latitude and longitude to its corresponding world coordinates
  //   const centerWorld = projectToWorld([center.lat, center.lng]);

  //   coords.forEach((position, index) => {
  //     if (!meshRef.current) return;

  //     // Convert each tree's latitude and longitude to its corresponding world coordinates
  //     const treeWorld = projectToWorld([position.lat, position.lng]);
  //     const scaleFactor = Math.cos((position.lat * Math.PI) / 180);

  //     // Calculate the position in world coordinates
  //     const worldPos = new THREE.Vector3(
  //       treeWorld.x * scaleFactor,
  //       treeWorld.y * scaleFactor,
  //       treeWorld.z * scaleFactor
  //     );

  //     // Calculate the relative position to the center
  //     const relativePos = new THREE.Vector3(
  //       worldPos.x - centerWorld.x,
  //       worldPos.y - centerWorld.y,
  //       worldPos.z - centerWorld.z
  //     );

  //     scaleMatrix.makeScale(100000, 100000, 100000); // Adjust the scale using the Mercator scale
  //     rotationMatrix.makeRotationFromEuler(new THREE.Euler(0, 0, 0));

  //     tempMatrix
  //       .makeTranslation(relativePos.x, relativePos.z, relativePos.y)
  //       .multiply(rotationMatrix)
  //       .multiply(scaleMatrix);

  //     meshRef.current.setMatrixAt(index, tempMatrix);
  //   });

  //   meshRef.current.instanceMatrix.needsUpdate = true;
  // }, [positions, camera]);
  const [scene] = useState(() => new Scene());

  return createPortal(
    <instancedMesh
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={[1, 1, 1]}
      // @ts-ignore
      ref={meshRef}
      args={[nodes.mesh_0.geometry, nodes.mesh_0.material, positions.length]}
    />,
    scene
  );
}

useGLTF.preload("assets/models/onemesh-tree2.glb");
