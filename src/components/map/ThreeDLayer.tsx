import { MercatorCoordinate } from "maplibre-gl";
import { useEffect } from "react";
import { LngLatLike, useMap } from "react-map-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Map as MaplibreMap } from "maplibre-gl";

type CustomLayerProps = {
  id: string;
  type: string;
  renderingMode: string;
  onAdd: (map: MaplibreMap, gl: WebGLRenderingContext) => void;
  render: (gl: WebGLRenderingContext, matrix: number[]) => void;
  camera?: THREE.Camera;
  scene?: THREE.Scene;
  map?: MaplibreMap;
  renderer?: THREE.WebGLRenderer;
};

export function ThreeDLayer() {
  const maplibre = useMap();
  useEffect(() => {
    if (!maplibre.current || !maplibre) return;
    const map = maplibre.current;

    const modelOrigin: LngLatLike = [148.9819, -35.39847];
    const modelAltitude = 0;
    const modelRotate = [Math.PI / 2, 0, 0];
    const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    const customLayer: CustomLayerProps = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd(map: MaplibreMap, gl: WebGLRenderingContext) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        const loader = new GLTFLoader();

        loader.load(
          "https://maplibre.org/maplibre-gl-js/docs/assets/34M_17/34M_17.gltf",
          (gltf) => {
            this.scene?.add(gltf.scene);
          }
        );

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render(gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        if (this.camera && this.renderer && this.scene && this.map) {
          this.camera.projectionMatrix = m.multiply(l);
          this.renderer.resetState();
          this.renderer.render(this.scene, this.camera);
          this.map.triggerRepaint();
        }
      },
    };

    map.on("style.load", () => {
      // @ts-ignore
      map.addLayer(customLayer);
    });
  }, []);

  return null;
}
