import { constants } from "config/constants";
import { LngLatLike } from "maplibre-gl";
import { Euler, Matrix4, Quaternion, Vector3 } from "three";

const quat = new Quaternion();
const euler = new Euler();
const pos = new Vector3();
const scale = new Vector3();
const m4 = new Matrix4();

export function coordsToMatrix({
  longitude,
  latitude,
  altitude,
  fromLngLat,
}: {
  longitude: number;
  latitude: number;
  altitude: number;
  fromLngLat: FromLngLat;
}) {
  const center = fromLngLat([longitude, latitude], altitude);
  const scaleUnit = center.meterInMercatorCoordinateUnits();
  pos.set(center.x, center.y, center.z || 0);
  scale.set(scaleUnit, -scaleUnit, scaleUnit);
  quat.setFromEuler(euler.set(-Math.PI * 0.5, 0, 0));
  return m4.compose(pos, quat, scale).toArray();
}
export type FromLngLat = (
  lngLatLike: LngLatLike,
  altitude?: number
) => MercatorCoordinate;

export interface MercatorCoordinate {
  x: number;
  y: number;
  z?: number;
  meterInMercatorCoordinateUnits(): number;
}

interface Decomposition {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export function decomposeMatrix(matrix: Matrix4): Decomposition {
  const position = new Vector3();
  const quaternion = new Quaternion();
  const rotation = new Euler();
  const scale = new Vector3();

  matrix.decompose(position, quaternion, scale);
  rotation.setFromQuaternion(quaternion);

  return {
    position: position.toArray() as [number, number, number],
    rotation: rotation.toArray() as [number, number, number],
    scale: scale.toArray() as [number, number, number],
  };
}

export function unProjectFromWorld(worldUnits: Vector3) {
  var unprojected = [
    -worldUnits.x /
      (constants.MERCATOR_A *
        constants.DEG2RAD *
        constants.PROJECTION_WORLD_SIZE),
    (2 *
      (Math.atan(
        Math.exp(
          worldUnits.y /
            (constants.PROJECTION_WORLD_SIZE * -constants.MERCATOR_A)
        )
      ) -
        Math.PI / 4)) /
      constants.DEG2RAD,
  ];
  var pixelsPerMeter = projectedUnitsPerMeter(unprojected[1]);

  //z dimension
  var height = worldUnits.z || 0;
  unprojected.push(height / pixelsPerMeter);

  return unprojected;
}

function projectedUnitsPerMeter(latitude: number) {
  return Math.abs(
    constants.WORLD_SIZE /
      Math.cos(constants.DEG2RAD * latitude) /
      constants.EARTH_CIRCUMFERENCE
  );
}

export function projectToWorld(coords: [number, number, number?]) {
  // Spherical mercator forward projection, re-scaling to WORLD_SIZE

  var projected = [
    -constants.MERCATOR_A *
      constants.DEG2RAD *
      coords[0] *
      constants.PROJECTION_WORLD_SIZE,
    -constants.MERCATOR_A *
      Math.log(Math.tan(Math.PI * 0.25 + 0.5 * constants.DEG2RAD * coords[1])) *
      constants.PROJECTION_WORLD_SIZE,
  ];

  //z dimension, defaulting to 0 if not provided

  if (!coords[2]) projected.push(0);
  else {
    var pixelsPerMeter = projectedUnitsPerMeter(coords[1]);
    projected.push(coords[2] * pixelsPerMeter);
  }

  var result = new Vector3(projected[0], projected[1], projected[2]);

  return result;
}
