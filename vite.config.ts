import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import mdDocument from "./src/plugin";
import ViteRestart from "vite-plugin-restart";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        mdDocument({
            md: {
                target: "./README.md",
                includes: ["./docs/*.md"],
            },
            code: {
                includes: ["./src/views/demo/*", "./src/App.vue"],
            },
        }),
        ViteRestart({
            restart: ["./docs/*.md", "./src/views/demo/*"],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "md-document": fileURLToPath(new URL(".", import.meta.url)),
        },
    },
});
