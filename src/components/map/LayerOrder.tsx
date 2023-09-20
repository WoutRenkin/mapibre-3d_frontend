import { FeatureCollection } from "geojson";
import { Layer, Source } from "react-map-gl";

export function LayerOrder() {
  const emptyGeoJSON: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  };
  return (
    <>
      <Source id={`extra-layers`} type="geojson" data={emptyGeoJSON}>
        <Layer id={`extra-layers`} type="symbol" />
      </Source>
      <Source id={`wms-layers`} type="geojson" data={emptyGeoJSON}>
        <Layer id={`wms-layers`} type="symbol" beforeId="extra-layers" />
      </Source>
      <Source id={`base-layers`} type="geojson" data={emptyGeoJSON}>
        <Layer id={`base-layers`} type="symbol" beforeId="wms-layers" />
      </Source>
    </>
  );
}
