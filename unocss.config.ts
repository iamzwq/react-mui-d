import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      warn: true
    })
  ],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "wh-full": "w-full h-full"
  }
});
