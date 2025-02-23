/** @type {import("prettier").Config} */
export default {
    printWidth: 100,
    tabWidth: 4,
    semi: true,
    arrowParens: "avoid",

    overrides: [
        {
            files: "*.jsonc",
            options: {
                trailingComma: "none",
            },
        },
    ],

    // Tailwind class sorter config
    plugins: ["prettier-plugin-tailwindcss"],
    tailwindStylesheet: "./app/styles/index.css",
    tailwindFunctions: ["cva", "cx", "clsx"],
};
