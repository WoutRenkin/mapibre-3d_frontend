import { useSearchParams } from "react-router-dom";
import { BackgroundLayer } from "types/map";
import { LngLatBoundsLike } from "react-map-gl";

export const initialBounds: LngLatBoundsLike = [
  [2.489921, 50.658897],
  [5.923148, 51.55559],
];
export function useSelectedBackgroundLayer() {
  const { selectedBackgroundLayerId } = useBackgroundLayerParams();
  const availableBackgroundLayers = backgroundLayers;
  const backgroundLayerUrl = availableBackgroundLayers.find(
    (backgroundLayer) => backgroundLayer.id === selectedBackgroundLayerId
  );
  const defaultbackgroundLayer = availableBackgroundLayers.find(
    (backgroundLayer) => backgroundLayer.default
  );

  if (backgroundLayerUrl) return backgroundLayerUrl;
  if (defaultbackgroundLayer) return defaultbackgroundLayer;

  const [firstBackgroundLayer] = availableBackgroundLayers || [];
  return firstBackgroundLayer;
}

export function useBackgroundLayerParams() {
  const [params, setParams] = useSearchParams();
  const selectedBackgroundLayerId = +(params.get("bgl") || "");

  function updateBackgroundLayerParam(backgroundLayerId: number) {
    const newParams = new URLSearchParams(params);
    newParams.set("bgl", backgroundLayerId.toString());

    setParams(newParams);
  }

  return { selectedBackgroundLayerId, updateBackgroundLayerParam };
}

export function useCurrentMapBounds(initial = initialBounds): LngLatBoundsLike {
  const [queryParams] = useSearchParams();
  const bounds = queryParams.get("bounds");
  if (!bounds) return initial;
  const [SELng, SELat, NWLng, NWLat] = bounds.split(",").map(parseFloat);
  return [SELng, SELat, NWLng, NWLat];
}

export const backgroundLayers: BackgroundLayer[] = [
  {
    id: 1,
    name: "Streetplan",
    preview: "street-map",
    default: false,
    url: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
  },
  {
    id: 2,
    name: "Laag contrast",
    preview: "low-contrast",
    default: true,

    url: "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  },
  {
    id: 3,
    name: "Satelliet",
    preview: "world-imagery",
    default: false,

    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  },

  {
    id: 4,
    name: "GRB Grijs",
    preview: "grb-grijs",
    default: false,
    url: "https://geo.api.vlaanderen.be/GRB/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=grb_bsk_grijs&STYLE=&FORMAT=image/png&TILEMATRIXSET=GoogleMapsVL&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
  },
];
