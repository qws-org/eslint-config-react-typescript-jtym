import stylisticTsPlugin from "@stylistic/eslint-plugin-ts";
import pluginTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import configStandardWithTypescript from "eslint-config-love";
import configStandard from "eslint-config-standard";
import boundariesPlugin from "eslint-plugin-boundaries";
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

const {"@typescript-eslint/ban-types": _, ...standardLoveRules} =
    configStandardWithTypescript.rules;

/**
 *
 * @param opts {{ts: string, tsx: string, tsconfigRootDir: string, project: Array<string>}}
 * @returns {{files: string[], plugins: {"@typescript-eslint": {configs: Record<string, ClassicConfig.Config>, meta: FlatConfig.PluginMeta, rules: typeof rules}}, languageOptions: {parser: {meta: {name: string, version: string}, createProgram: (configFile: string, projectDirectory?: string) => ts.Program, clearCaches: () => void, ParserServices: ParserServicesWithoutTypeInformation | ParserServicesWithTypeInformation, version: string, withoutProjectParserOptions: <Options extends object>(opts: Options) => Omit<Options, "EXPERIMENTAL_useProjectService" | "project" | "projectService">, ParserServicesWithoutTypeInformation: ParserServicesWithoutTypeInformation, ParserOptions: ParserOptions, parseForESLint: (code: (string | ts.SourceFile), parserOptions?: (ParserOptions | null)) => ParseForESLintResult, ParserServicesWithTypeInformation: ParserServicesWithTypeInformation, parse: (code: (string | ts.SourceFile), options?: ParserOptions) => ParseForESLintResult["ast"]}, parserOptions: {sourceType: string, ecmaVersion: string, tsconfigRootDir: *, project: *}}, rules: {"@typescript-eslint/naming-convention": string, "@typescript-eslint/init-declarations": string, "@typescript-eslint/class-methods-use-this": string, "@typescript-eslint/no-empty-function": string, "@typescript-eslint/no-unused-vars": [string,{caughtErrors: string, argsIgnorePattern: string, varsIgnorePattern: string}], "@typescript-eslint/array-type": [string,{default: string}], "@typescript-eslint/consistent-indexed-object-style": string[], "@typescript-eslint/consistent-type-assertions": string[], "@typescript-eslint/consistent-type-definitions": string[], "@typescript-eslint/no-throw-literal": string[], "@typescript-eslint/only-throw-error": string[], "@typescript-eslint/consistent-type-imports": [string,{prefer: string}], "@typescript-eslint/explicit-function-return-type": [string,{allowExpressions: boolean, allowHigherOrderFunctions: boolean, allowTypedFunctionExpressions: boolean, allowDirectConstAssertionInArrowFunctions: boolean, allowedNames: string[]}], "@typescript-eslint/member-delimiter-style": [string,{multiline: {delimiter: string, requireLast: boolean}, singleline: {delimiter: string, requireLast: boolean}, multilineDetection: string}], "@typescript-eslint/method-signature-style": string[], "@typescript-eslint/no-confusing-void-expression": string[], "@typescript-eslint/no-dynamic-delete": string[], "@typescript-eslint/no-floating-promises": string[], "@typescript-eslint/no-invalid-void-type": string[], "@typescript-eslint/no-misused-promises": string[], "no-use-before-define": string[], "@typescript-eslint/no-use-before-define": [string,{functions: boolean, classes: boolean, variables: boolean, allowNamedExports: boolean, enums: boolean, typedefs: boolean, ignoreTypeReferences: boolean}], "@typescript-eslint/prefer-reduce-type-parameter": string[], "@typescript-eslint/promise-function-async": string[], "@typescript-eslint/restrict-template-expressions": string[], "@typescript-eslint/return-await": string[], "@typescript-eslint/strict-boolean-expressions": string[]}, settings: {"import/parsers": {"@typescript-eslint/parser": string[]}, "import/resolver": {node: {extensions: string[]}, typescript: {project: *}}}}}
 */
function createTsConfig(opts) {
    return {
        files: [globs.ts, globs.tsx],
        plugins: {
            "@typescript-eslint": pluginTypescript,
            stylistic: stylisticTsPlugin,
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
            "@typescript-eslint/array-type": ["error", {default: "generic"}],
            "@typescript-eslint/consistent-indexed-object-style": ["off"],
            "@typescript-eslint/consistent-type-assertions": ["off"],
            "@typescript-eslint/consistent-type-definitions": ["off"],
            "@typescript-eslint/no-throw-literal": ["off"],
            "@typescript-eslint/only-throw-error": ["off"],
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {prefer: "type-imports"},
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
           "stylistic/member-delimiter-style": [
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
 * @param props {{
 *       boundaries?: {
 *          elements: Array<{type: string, pattern: Array<string>}>,
 *          disalowedInternalTypes: Array<{from: string, allow: Array<string>}>,
 *          allowedExternaltypes: Array<{from: string, dissalow: Array<string>}>
 *         },
 *       ignores?: Array<string>,
 *       ts: {tsconfigRootDir: string; project: Array<string>},
 *       useReactRules?: boolean,
 *       globs?: {js?: string; ts?:string, tsx?: string, any?:string, config?: string} }}
 * @return {import('eslint').Linter.FlatConfig}
 */
export default function ({ts, useReactRules, ignores, boundaries, ...rest}) {
    const rules = [baseConfig, eslintPluginPrettierRecommended];
    const globals = {
        ...globs,
        ...rest.globs,
    }
    if (ts) {
        rules.push(createTsConfig({
            tsconfigRootDir: ts.tsconfigRootDir,
            project: ts.project,
            ...globals,
        }));
    }

    if (useReactRules) {
        rules.push(reactRules);
    }

    if (boundaries) {
        rules.push( {
            plugins: { boundaries: boundariesPlugin },
            settings: {
                "boundaries/elements": boundaries.elements,
            },
            rules: {
                "boundaries/element-types": [
                    2,
                    {
                        default: "disallow",
                        rules: boundaries.disalowedInternalTypes,
                    },
                ],
                "boundaries/external": [
                    2,
                    {
                        default: "allow",
                        rules: boundaries.allowedExternaltypes,
                    },
                ],
            },
        })
    }

    rules.push({
        ignores: [
            globs.build,
            ...ignores,
        ],
    })

    return rules;
};
