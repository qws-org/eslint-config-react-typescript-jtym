import { defineConfig } from "vite";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  build: {
    lib: {
      entry: "index.js", // ваш исходник
      formats: ["cjs", "es"], // CJS и ESM
      name: "eslintConfigBundle", // нужно для UMD, но без UMD тоже обязателен
      fileName: (format) =>
        format === "cjs"
          ? "bundle.cjs.js" // итоговый CJS-файл
          : "bundle.es.mjs", // итоговый ESM-файл
    },
    rollupOptions: {
      // Выносим наружу только встроенные модули Node.js,
      // всё остальное (плагины, парсер и т.д.) попадёт в бандл
      external: ["path", "url"],
      plugins: [
        resolve({ preferBuiltins: true }), // подтянет ваши npm-зависимости в бандл
        commonjs(), // переведёт их из CJS в ES внутри бандла
      ],
      output: {
        exports: "named", // чтобы при require() работали именованные экспорты
      },
    },
  },
});
