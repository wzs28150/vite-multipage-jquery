import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import $ from "jquery";
const pageData = {
  "/index.html": {
    title: "Main Page",
  },
  "/about.html": {
    title: "Sub Page",
  },
};
export default defineConfig({
  root: "./src",
  server: {
    port: 8080,
    https: false,
    open: false,
    host: '0.0.0.0',
    hmr: {
      overlay: true,
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@view": resolve(__dirname, "./src/view"),
      "@js": resolve(__dirname, "./src/js"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@nodepath": resolve(__dirname, "./node_modules"),
    },
  },
  define: {
    $: $
  },
  build: {
    outDir: "../dist",
    assetsDir: "./assets/",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
      },
    },
  },
  optimizeDeps: {
    include: [],
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return pageData[pagePath];
      },
      partialDirectory: resolve(__dirname, "src/view"),
    }),
  ],
});
