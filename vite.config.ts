import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: "build" },
  server: {
    https: true,
    proxy: {
      "/api": "https://XXXXXX.marvintest.vito.be/",
      "/geoserver": "https://XXXXXX.marvintest.vito.be/",
    },
  },
  define: {
    VITE_APP_VERSION: JSON.stringify(process.env.npm_package_version),
    VITE_APP_RELEASE_DATE: JSON.stringify(process.env.npm_package_date),
  },
  plugins: [
    react(),
    svgrPlugin(),
    basicSsl(),
    viteTsconfigPaths(),
    splitVendorChunkPlugin(),
  ],
});
