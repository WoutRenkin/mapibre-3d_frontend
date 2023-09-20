import { useSelectedBackgroundLayer } from "hooks/mapHooks";
import { Layer, Source } from "react-map-gl";

export function RenderBaseLayer() {
  const selectedBackgroundLayer = useSelectedBackgroundLayer();
  const key = `${selectedBackgroundLayer.id.toString()}-base-layer}`;
  return (
    <Source
      id={key}
      type="raster"
      tileSize={256}
      tiles={[selectedBackgroundLayer.url]}
      key={key}
    >
      <Layer
        id={key}
        beforeId="base-layers"
        type="raster"
        paint={{ "raster-opacity": 1 }}
      />
    </Source>
  );
}
