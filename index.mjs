import pluginTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import configStandardWithTypescript from "eslint-config-love";
import configStandard from "eslint-config-standard";
import boundaries from "eslint-plugin-boundaries";
import pluginImport from "eslint-plugin-import";
import pluginN from "eslint-plugin-n";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import pluginPromise from "eslint-plugin-promise";
import reactRefresh from "eslint-plugin-react-refresh";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";

const ext = {
  js: "js,mjs,cjs",
  ts: "ts,mts,cts",
  jsx: "jsx,mjsx",
  tsx: "tsx,mtsx",
};

const globs = {
  js: `**/*.{${ext.js}}`,
  ts: `**/*.{${ext.ts}}`,
  jsx: `**/*.{${ext.jsx}}`,
  tsx: `**/*.{${ext.tsx}}`,
  any: `**/*.{${ext.js},${ext.ts},${ext.jsx},${ext.tsx}}`,
  build: "**/{dist,build}/**",
  config: `**/{eslint,prettier,vite,playwright}.config.{${ext.js},${ext.ts}}`,
};

const jsRules = {
  "no-shadow": ["error"],
  "no-unused-vars": [
    "error",
    {
      args: "after-used",
      argsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      ignoreRestSiblings: true,
      vars: "all",
    },
  ],
};

const tsRules = Object.entries(jsRules).reduce(
  (result, [ruleName, ruleValue]) => {
    result[ruleName] = ["off"];
    result[`@typescript-eslint/${ruleName}`] = ruleValue;
    return result;
  },
  {},
);

/**
 * Конфиг задающий основные правила ESLint
 * @type {import('eslint').Linter.FlatConfig}
 */
const baseConfig = {
  files: [globs.any],
  plugins: {
    import: pluginImport,
    n: pluginN,
    promise: pluginPromise,
    unicorn: pluginUnicorn,
    "simple-import-sort": pluginSimpleImportSort,
  },
  languageOptions: {
    globals: {
      ...globals.es2021,
      ...globals.browser,
      ...globals.node,
      LanguageCode: "readonly",
      ExtractArrayItemType: "readonly",
      DataLayer: "readonly",
      ID: "readonly",
      ReportSelectors: "readonly",
      MetricType: "readonly",
      DimensionType: "readonly",
      DeepPartial: "readonly",
      UiKitFC: "readonly",
    },
  },
  rules: {
    ...configStandard.rules,
    ...jsRules,
    camelcase: "off",
    "import/no-absolute-path": ["off"],
    "import/newline-after-import": ["error"],
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true,
      },
    ],
    "n/no-callback-literal": ["off"],
    "no-console": [
      "error",
      {
        allow: ["info", "warn", "error"],
      },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
      },
    ],
    "simple-import-sort/exports": ["error"],
    "simple-import-sort/imports": ["error"],
    "unicorn/expiring-todo-comments": ["error"],
    "unicorn/prefer-node-protocol": ["error"],
  },
};

const { "@typescript-eslint/ban-types": _, ...standardLoveRules } =
  configStandardWithTypescript.rules;

function createTsConfig(opts) {
  return {
    files: [globs.ts, globs.tsx],
    plugins: {
      "@typescript-eslint": pluginTypescript,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
        tsconfigRootDir: opts.tsconfigRootDir,
        project: opts.project,
      },
    },
    rules: {
      ...standardLoveRules,
      ...tsRules,
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/class-methods-use-this": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      "@typescript-eslint/consistent-indexed-object-style": ["off"],
      "@typescript-eslint/consistent-type-assertions": ["off"],
      "@typescript-eslint/consistent-type-definitions": ["off"],
      "@typescript-eslint/no-throw-literal": ["off"],
      "@typescript-eslint/only-throw-error": ["off"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowHigherOrderFunctions: true,
          allowTypedFunctionExpressions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowedNames: ["loader", "clientLoader", "action", "clientAction"],
        },
      ],
      "@typescript-eslint/member-delimiter-style": [
        "error",
        {
          multiline: {
            delimiter: "semi",
            requireLast: true,
          },
          singleline: {
            delimiter: "semi",
            requireLast: false,
          },
          multilineDetection: "brackets",
        },
      ],
      "@typescript-eslint/method-signature-style": ["off"],
      "@typescript-eslint/no-confusing-void-expression": ["off"],
      "@typescript-eslint/no-dynamic-delete": ["off"],
      "@typescript-eslint/no-floating-promises": ["off"],
      "@typescript-eslint/no-invalid-void-type": ["off"],
      "@typescript-eslint/no-misused-promises": ["off"],
      "no-use-before-define": ["off"],
      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          functions: true,
          classes: true,
          variables: true,
          allowNamedExports: false,
          enums: true,
          typedefs: true,
          ignoreTypeReferences: true,
        },
      ],
      "@typescript-eslint/prefer-reduce-type-parameter": ["off"],
      "@typescript-eslint/promise-function-async": ["off"],
      "@typescript-eslint/restrict-template-expressions": ["off"],
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      "@typescript-eslint/strict-boolean-expressions": ["off"],
    },
    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx"],
        },
        typescript: {
          project: opts.project,
        },
      },
    },
  };
}

const tsConfig = {
  files: [globs.ts, globs.tsx],
  plugins: {
    "@typescript-eslint": pluginTypescript,
  },
  languageOptions: {
    parser: typescriptParser,
  /*  parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      tsconfigRootDir: opts.tsconfigRootDir,
      project: opts.project,
    },*/
  },
  rules: {
    ...standardLoveRules,
    ...tsRules,
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/init-declarations": "off",
    "@typescript-eslint/class-methods-use-this": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        caughtErrors: "none",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/array-type": ["error", { default: "generic" }],
    "@typescript-eslint/consistent-indexed-object-style": ["off"],
    "@typescript-eslint/consistent-type-assertions": ["off"],
    "@typescript-eslint/consistent-type-definitions": ["off"],
    "@typescript-eslint/no-throw-literal": ["off"],
    "@typescript-eslint/only-throw-error": ["off"],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowedNames: ["loader", "clientLoader", "action", "clientAction"],
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
        multilineDetection: "brackets",
      },
    ],
    "@typescript-eslint/method-signature-style": ["off"],
    "@typescript-eslint/no-confusing-void-expression": ["off"],
    "@typescript-eslint/no-dynamic-delete": ["off"],
    "@typescript-eslint/no-floating-promises": ["off"],
    "@typescript-eslint/no-invalid-void-type": ["off"],
    "@typescript-eslint/no-misused-promises": ["off"],
    "no-use-before-define": ["off"],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
        allowNamedExports: false,
        enums: true,
        typedefs: true,
        ignoreTypeReferences: true,
      },
    ],
    "@typescript-eslint/prefer-reduce-type-parameter": ["off"],
    "@typescript-eslint/promise-function-async": ["off"],
    "@typescript-eslint/restrict-template-expressions": ["off"],
    "@typescript-eslint/return-await": ["error", "in-try-catch"],
    "@typescript-eslint/strict-boolean-expressions": ["off"],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
   /* "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
      },
      typescript: {
        project: opts.project,
      },
    },*/
  },
}


const reactRules = {
  // in main config for TSX/JSX source files
  plugins: {
    "react-refresh": reactRefresh,
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      {
        allowExportNames: [
          "meta",
          "links",
          "headers",
          "loader",
          "action",
          "clientLoader",
        ],
      },
    ],
  },
}

/**
 *
 * @param _dirname {string}
 * @return {import('eslint').Linter.FlatConfig}
 */
export const createConfig = (_dirname) => {
  return [
    baseConfig,
    createTsConfig({
      tsconfigRootDir: __dirname,
      project: ["./tsconfig.json"],
    }),
    reactRules,
    eslintPluginPrettierRecommended,
    {
      plugins: { boundaries },
      settings: {
        "boundaries/elements": [
          {
            type: "client-sdk",
            pattern: ["~/client-sdk/*", "app/client-sdk/*"],
          },
          {
            type: "core",
            pattern: ["~/core/*", "app/core/*"],
          },
          {
            type: "features",
            pattern: ["~/features/*", "app/features/*"],
          },
          {
            type: "features-deprecated",
            pattern: ["~/features-deprecated/*", "app/features-deprecated/*"],
          },
          {
            type: "icons",
            pattern: ["~/icons/*", "app/icons/*"],
          },
          {
            type: "middlewares",
            pattern: ["~/middlewares/*", "app/middlewares/*"],
          },
          {
            type: "routes",
            pattern: ["~/routes/*", "app/routes/*"],
          },
          {
            type: "shared",
            pattern: ["~/shared/*", "app/shared/*"],
          },
          {
            type: "widgets",
            pattern: ["~/widgets/*", "app/widgets/*"],
          },
          {
            type: "utils",
            pattern: ["~/utils/*", "app/utils/*"],
          },
        ],
      },
      rules: {
        "boundaries/element-types": [
          2,
          {
            default: "disallow",
            rules: [
              {
                from: "client-sdk",
                allow: ["core", "shared", "remix"],
              },
              {
                from: "core",
                allow: ["core"],
              },
              {
                from: "features",
                allow: ["shared", "icons", "core"],
              },
              {
                from: "features-deprecated",
                allow: ["shared", "icons", "core", "features-deprecated"],
              },
              {
                from: "middlewares",
                allow: ["shared", "core", "remix"],
              },
              {
                from: "widgets",
                allow: [
                  "shared",
                  "features-deprecated",
                  "core",
                  "features",
                  "remix",
                  "translations",
                  "widgets",
                ],
              },
              {
                from: "shared",
                allow: ["shared", "icons"],
              },
              {
                from: "core",
                allow: ["shared", "core"],
              },
            ],
          },
        ],
        "boundaries/external": [
          2,
          {
            default: "allow",
            rules: [
              {
                from: "features",
                disallow: ["react-i18next", "react-router", "classnames"],
              },
              {
                from: "shared",
                disallow: ["classnames", "react-i18next", "react-router"],
              },
              { from: "middlewares", disallow: ["react", "react-i18next"] },
              { from: "client-sdk", disallow: ["react", "react-i18next"] },
              {
                from: "core",
                disallow: ["react", "react-i18next", "react-router"],
              },
              {
                from: "icons",
                disallow: ["react-i18next", "react-router"],
              },
            ],
          },
        ],
      },
    },
    {
      ignores: [
        globs.build,
        "app/icons/**",
        ".storybook/**",
        "storybook-static",
        "vite.config.ts",
        "test.config.ts",
        ".react-router",
      ],
    },
  ];
};

export default {
  base: baseConfig,
  reactRules,
  prettierRules: eslintPluginPrettierRecommended,
  tsRules: tsConfig,
}