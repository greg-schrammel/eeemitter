import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./eventEmmiter.ts"),
      fileName: "index",
      formats: ["es", "cjs"],
    },
    sourcemap: true,
  },
});
