import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import globals from "globals";

import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import casePolice from "eslint-plugin-case-police";

/** @type {import("eslint").Linter.Config[]} */
export default [
    {
        ignores: [
            "!**/.server",
            "!**/.client",
            "**/node_modules",
            "**/dist",
            "**/build",
            ".react-router",
            ".gitignore",
        ],
    },

    {
        plugins: { "case-police": casePolice },
        rules: casePolice.configs.recommended.rules,
    },

    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.es2021,
                ...globals.node,
                // Add Cloudflare Workers globals
                Env: "readonly",
                ExecutionContext: "readonly",
                ExportedHandler: "readonly",
            },
        },
        settings: {
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                    project: "tsconfig.cloudflare.json",
                },
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
        ...js.configs.recommended,
    },

    {
        files: ["**/*.{,ts,tsx}"],
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "jsx-a11y": jsxA11y,
        },
        settings: {
            react: {
                version: "detect",
            },
            formComponents: ["Form"],
            linkComponents: [
                { name: "Link", linkAttribute: "to" },
                { name: "NavLink", linkAttribute: "to" },
            ],
        },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,

            "react/react-in-jsx-scope": "off",
            // Let TypeScript handle this
            "react/prop-types": "off",

            "react/jsx-sort-props": [
                "warn",
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    multiline: "last",
                    reservedFirst: ["key"],
                },
            ],

            "react-refresh/only-export-components": [
                "error",
                {
                    allowExportNames: [
                        "loader",
                        "clientLoader",
                        "action",
                        "clientAction",
                        "ErrorBoundary",
                        "HydrateFallback",
                        "headers",
                        "handle",
                        "links",
                        "meta",
                        "shouldRevalidate",
                    ],
                },
            ],
        },
    },

    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": typescriptPlugin,
            import: importPlugin,
        },
        rules: {
            ...typescriptPlugin.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,

            "@typescript-eslint/no-unused-vars": "warn",

            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { fixStyle: "separate-type-imports" },
            ],
            "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],
            "import/order": [
                1,
                { groups: ["external", "builtin", "internal", "sibling", "parent", "index"] },
            ],
        },
    },

    {
        files: ["eslint.config.js"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
