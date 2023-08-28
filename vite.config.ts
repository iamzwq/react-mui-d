import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import vitePluginEslint from "vite-plugin-eslint";
import UnoCSS from "unocss/vite";
import versionUpdatePlugin from "./src/vitePlugins/versionUpdate";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS(),
    vitePluginEslint({
      // cache: false,
      // fix: true,
      // include: 'src/**/*.{ts,tsx,js,jsx}',
      // exclude: ['node_modules/**', 'dist/**', '.git/**', 'public/**'],
      failOnError: false
    }),
    versionUpdatePlugin()
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  },
  server: {
    port: 3000
  }
});
