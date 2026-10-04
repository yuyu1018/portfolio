import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  base: "./",
  build: {
    rolldownOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        lodgingService: fileURLToPath(new URL("./works/lodging-service.html", import.meta.url)),
        numberDesigns: fileURLToPath(new URL("./works/number-designs.html", import.meta.url)),
      },
    },
  },
});
