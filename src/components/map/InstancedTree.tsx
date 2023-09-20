import * as THREE from "three";
import { useRef } from "react";
import { useFrame, Vector3 } from "@react-three/fiber";
import { Instances, Instance, useGLTF } from "@react-three/drei";
import { Canvas, Coordinates } from "react-three-map/maplibre";

// interface Props {
//   treeLatLng: { lat: number; lng: number }[];
// }

// export function Trees(props: Props) {
//   const { treeLatLng } = props;
//   const gltf = useGLTF("assets/models/tree.glb");
//   // @ts-ignore
//   const nodes = gltf.nodes;

//   return (
//     <group position={[0, 0, 0]}>
//       {treeLatLng.map((coord, index) => (
//         <Coordinates key={index} latitude={coord.lat} longitude={coord.lng}>
//           {Object.keys(nodes).map((nodeName, idx) => {
//models             // @ts-ignore
//             const mesh = nodes[nodeName];
//             if (mesh instanceof THREE.Mesh) {
//               return (
//                 <Instances
//                   key={idx}
//                   material={mesh.material}
//                   geometry={mesh.geometry}
//                 >
//                   <TreeInstance position={[0, 0, 0]} />
//                 </Instances>
//               );
//             }
//             return null;
//           })}
//         </Coordinates>
//       ))}
//     </group>
//   );
// }

// interface TreeInstanceProps {
//   position: Vector3;
// }

// function TreeInstance(props: TreeInstanceProps) {
//   return (
//     <Instance
//       {...props}
//       rotation={[-Math.PI / 2, 0, 0]}
//       scale={[0.05, 0.05, 0.05]}
//     />
//   );
// }

// interface Props {
//   treeLatLng: { lat: number; lng: number }[];
// }

// export function Trees(props: Props) {
//   const { treeLatLng } = props;
//   const gltf = useGLTF("assets/models/shoe.glb");
//   console.log(gltf);
//   // @ts-ignoree
//   const nodes = gltf.nodes;

//   return (
//     <group position={[0, 0, 0]}>
//       {Object.keys(nodes).map((nodeName, idx) => {
//         const mesh = nodes[nodeName];
//         if (mesh instanceof THREE.Mesh) {
//           return (
//             <Instances
//               key={idx}
//               material={mesh.material}
//               geometry={mesh.geometry}
//             >
//               {treeLatLng.map((coord, index) => (
//                 <Coordinates
//                   key={index}
//                   latitude={coord.lat}
//                   longitude={coord.lng}
//                 >
//                   <TreeInstance position={[0, 0, 0]} />
//                 </Coordinates>
//               ))}
//             </Instances>
//           );
//         }
//         return null;
//       })}
//     </group>
//   );
// }

// interface TreeInstanceProps {
//   position: Vector3;
// }

// function TreeInstance(props: TreeInstanceProps) {
//   return (
//     <Instance
//       {...props}
//       rotation={[-Math.PI / 2, 0, 0]}
//       scale={[0.05, 0.05, 0.05]}
//     />
//   );
// }

// interface Props {
//   treeLatLng: { lat: number; lng: number }[];
// }

// export function Trees(props: Props) {
//   const { treeLatLng } = props;
//   const gltf = useGLTF("assets/models/tree.glb");
//   // @ts-ignore
//   const nodes = gltf.nodes;

//   return (
//     <group position={[0, 0, 0]}>
//       {treeLatLng.map((coord, index) => (
//         <Coordinates key={index} latitude={coord.lat} longitude={coord.lng}>
//           {Object.keys(nodes).map((nodeName, idx) => {
//             // @ts-ignore
//             const mesh = nodes[nodeName];
//             if (mesh instanceof THREE.Mesh) {
//               return (
//                 <Instances
//                   key={idx}
//                   material={mesh.material}
//                   geometry={mesh.geometry}
//                 >
//                   <TreeInstance position={[0, 0, 0]} />
//                 </Instances>
//               );
//             }
//             return null;
//           })}
//         </Coordinates>
//       ))}
//     </group>
//   );
// }

// interface TreeInstanceProps {
//   position: Vector3;
// }

// function TreeInstance(props: TreeInstanceProps) {
//   return (
//     <Instance
//       {...props}
//       rotation={[-Math.PI / 2, 0, 0]}
//       scale={[0.05, 0.05, 0.05]}
//     />
//   );
// }