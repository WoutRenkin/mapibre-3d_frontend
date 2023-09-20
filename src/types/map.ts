export interface BackgroundLayer extends TileLayer {
  default: boolean;
  preview: string;
}

export interface TileLayer extends LayerBase {
  nativeZoom?: number;
  url: string;
}

export interface WMSLayer extends LayerBase {
  wms: WmsParams;
}

interface LayerBase {
  id: number;
  name?: string;
  description?: string;
  default?: boolean;
}

export interface WmsParams {
  url: string;
  layers?: string;
  styles?: string;
  format: string;
  transparent: boolean;
  opacity: number;
  attribution?: string;
  tiled?: boolean;
}
