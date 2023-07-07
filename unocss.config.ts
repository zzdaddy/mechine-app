import { defineConfig, presetUno } from "unocss";
import presetAttributify from "@unocss/preset-attributify";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import transformerDirectives from "@unocss/transformer-directives";
import presetIcons from "@unocss/preset-icons";
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({}),
    presetIcons({
      scale: 1.2,
      cdn: "https://esm.sh/",
    }),
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
});
