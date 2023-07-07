import { rmSync } from "node:fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import UnoCss from "unocss/vite";
import pkg from "./package.json";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });

  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    base: "./",
    plugins: [
      vue(),
      electron([
        {
          // Main-Process entry file of the Electron App.
          entry: "electron/main/index.ts",
          onstart(options) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
              );
            } else {
              options.startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {}
                ),
              },
            },
          },
        },
        {
          entry: "electron/preload/index.ts",
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload();
          },
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {}
                ),
              },
            },
          },
        },
      ]),
      // Use Node.js API in the Renderer-process
      renderer(),
      UnoCss(),
    ],
    server:
      process.env.VSCODE_DEBUG &&
      (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })(),
    clearScreen: false,
    resolve: {
      // 路径别名配置
      alias: [
        {
          find: "src",
          replacement: "/src/",
        },
        {
          find: "assets",
          replacement: "/src/assets/",
        },
        {
          find: "components",
          replacement: "/src/components/",
        },
        {
          find: "plugins",
          replacement: "/src/plugins/",
        },
        {
          find: "pages",
          replacement: "/src/pages/",
        },
        {
          find: "router",
          replacement: "/src/router/",
        },
        {
          find: "apis",
          replacement: "/src/apis/",
        },
        {
          find: "utils",
          replacement: "/src/utils/",
        },
        // {
        //   find: 'components',
        //   replacement: path.resolve(__dirname, 'src/components')
        // },
        // {
        //   '/@/': path.resolve(__dirname, 'src'),
        //   '/assets/': path.resolve(__dirname, 'src/assets'),
        //   '/components/': path.resolve(__dirname, 'src/components'),
        //   '/pages/': path.resolve(__dirname, 'src/pages'),
        //   '/router/': path.resolve(__dirname, 'src/router'),
        // }
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 使用 less 编写样式的 UI 库（如 antd）时建议加入这个设置
        },
        scss: {
          additionalData: '@import "assets/styles/theme.scss";',
        },
      },
    },
  };
});
