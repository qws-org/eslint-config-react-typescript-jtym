import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "index.js", // ваш исходник
      formats: ["cjs", "es", "umd"], // CommonJS и ESM
      name: "eslintConfigReactTypescriptJtym",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        /^eslint($|\/)/, // весь пакет eslint
        /^eslint-plugin-/, // все плагины
        /^@typescript-eslint/, // TS-парсер/плагин
        "globals", // если где-то используете
      ],
      output: {
        // чтобы CJS-файл правильно экспонировал default export
        exports: "named",
      },
    },
  },
});
