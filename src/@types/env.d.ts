/// <reference types="vite/client" />

declare const VITE_APP_VERSION: string;
declare const VITE_APP_RELEASE_DATE: string;

interface ImportMetaEnv {
  VITE_NAME: string;
  VITE_TITLE: string;
  VITE_LANGUAGES: string;
  VITE_API: string;
  VITE_GEOSERVER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
