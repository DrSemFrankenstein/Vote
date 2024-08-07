import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/Vote/",
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: "VotePWA",
        name: "Vote PWA",
        start_url: "/Vote/",
        display: "standalone",
        theme_color: "#242424",  // Default color
        background_color: "#242424",  // Default color
        icons: [
          {
            src: "/Vote/icons/favicon-32x32.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/Vote/icons/apple-touch-icon.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/Vote/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/Vote/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        // Options for the workbox plugin if necessary
      },
      injectManifest: {
        // Options for the inject manifest
      }
    }),
  ],
});
