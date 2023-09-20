import { styled } from "@mui/material";
import { LayerOrder } from "components/map/LayerOrder";
import { RenderBaseLayer } from "components/map/RenderBaseLayer";
import { useCurrentMapBounds } from "hooks/mapHooks";
import Map from "react-map-gl/maplibre";
import { Canvas, Coordinates } from "react-three-map/maplibre";
import { Feature, FeatureCollection, Point, Position } from "geojson";
import { centroid } from "turf";
import { Tree } from "components/map/Tree";
import { Mesh } from "three";
import { useRef, useState } from "react";
import { useFrame, Vector3 } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

import { InstancedShoes } from "components/map/InstancedShoe";
import { InstancedTrees } from "components/map/TreeModel2";
import { InstancedTrees2 } from "components/map/InstancedTrees2";
import { InstancedTrees2Coords } from "components/map/InstancedTrees2Coords";
import { InstancedMeshTree } from "components/map/InstancedMeshTree";
import { MercatorCoordinate } from "maplibre-gl";

export function MapContent() {
  const bounds = useCurrentMapBounds();
  const [canvasRef, setCanvasRef] = useState<any>();
  function generatePositions(
    count: number,
    maxX: number,
    maxY: number
  ): Array<{ x: number; y: number; z: number }> {
    const positions = [];

    for (let i = 0; i < count; i++) {
      positions.push({
        x: Math.random() * maxX * (Math.random() < 0.5 ? -1 : 1), // Random value between -maxX and maxX
        y: 0,
        z: Math.random() * maxY * (Math.random() < 0.5 ? -1 : 1), // Random value between -maxY and maxY
      });
    }

    return positions;
  }

  // Usage:
  const positions = generatePositions(34000, 100, 100);

  function generateCoordinates(
    baseLat: number,
    baseLng: number,
    count: number,
    offset: number = 0.0009
  ): { lat: number; lng: number }[] {
    const coordinates = [];

    for (let i = 0; i < count; i++) {
      const latOffset = (Math.random() - 0.5) * 2 * offset; // Random value between -offset and +offset
      const lngOffset = (Math.random() - 0.5) * 2 * offset; // Random value between -offset and +offset

      coordinates.push({
        lat: baseLat + latOffset,
        lng: baseLng + lngOffset,
      });
    }

    return coordinates;
  }
  const treeLatLong = generateCoordinates(51.09992, 4.796431, 100); // Generates 10 coordinates around Brussels

  function calculateCentroid(coords: Position[]): Feature<Point> {
    // Create a GeoJSON FeatureCollection from the coordinates
    const geojson: FeatureCollection = {
      type: "FeatureCollection",
      features: coords.map((coord) => ({
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: coord,
        },
      })),
    };
    return centroid(geojson);
  }

  const center = calculateCentroid(
    treeLatLong.map((coord) => [coord.lng, coord.lat])
  );
  const [lng, lat] = center.geometry.coordinates;

  console.log(bounds);

  return (
    <StyledDiv>
      <Map
        id="map-container"
        key={"map-container"}
        initialViewState={{
          bounds: bounds,
          pitch: 0,
        }}
        mapStyle={
          "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        }
      >
        <LayerOrder />

        {/* <Canvas latitude={lat} longitude={lng}>
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
          />

          <Tree position={[0, 0, 0]} key="2" treeLatLng={treeLatLong} />

          <Stats className="stats" />
        </Canvas> */}
        {/* <Canvas latitude={lat} longitude={lng}>
          <Trees treeLatLng={treeLatLong} />
          <Stats className="stats" />
        </Canvas> */}
        {/* <Canvas latitude={lat} longitude={lng} performance={{ min: 0.1 }}>
          <InstancedShoes treeLatLng={treeLatLong} />
          <Stats className="stats" />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.3} position={[5, 25, 20]} />
        </Canvas> */}
        {/* <Canvas latitude={lat} longitude={lng} performance={{ min: 0.1 }}>
          <InstancedTrees positions={positions} />
          <Stats className="stats" />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.3} position={[5, 25, 20]} />
        </Canvas> */}
        <Canvas latitude={lat} longitude={lng} performance={{ min: 0.1 }}>
          <InstancedMeshTree
            positions={treeLatLong}
            center={{ lat: lat, lng: lng }}
          />
          <Stats className="stats" />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.3} position={[5, 25, 20]} />
        </Canvas>
        {/* <Canvas latitude={lat} longitude={lng} performance={{ min: 0.1 }}>
          <InstancedTrees2Coords latLngs={treeLatLong} center={{ lat, lng }} />
          <Stats className="stats" />
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.3} position={[5, 25, 20]} />
        </Canvas> */}
        {/* <RenderBaseLayer /> */}
      </Map>
    </StyledDiv>
  );
}

const StyledDiv = styled("div")`
  width: 100%;
  .zoom-controls {
    position: absolute;
    right: 0;
    bottom: 50px;
    z-index: 9999;
  }

  .maplibregl-canvas-container,
  .maplibregl-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  #comparison-container {
    width: 100%;
    height: 100%;
  }

  .mapboxgl-ctrl button:not(:disabled):hover,
  .maplibregl-ctrl button:not(:disabled):hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

function Box(props: { position: Vector3 }) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => (ref.current!.rotation.x += delta));
  useFrame((_state, delta) => (ref.current!.rotation.z -= delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
