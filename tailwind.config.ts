import type { Config } from "tailwindcss"

export default {
    content: ["./src/**/*.tsx"],
    theme: {
        fontFamily: {
            "serif-display": [
                "Roslindale Display",
                "-apple-system-ui-serif",
                "ui-serif",
                "Georgia",
                "Iowan Old Style",
                "Apple Garamond",
                "Baskerville",
                "Times New Roman",
                "Droid Serif",
                "Times",
                "Source Serif Pro",
                "serif",
            ],
            "serif-text": [
                "Roslindale Text",
                "-apple-system-ui-serif",
                "ui-serif",
                "Georgia",
                "Iowan Old Style",
                "Apple Garamond",
                "Baskerville",
                "Times New Roman",
                "Droid Serif",
                "Times",
                "Source Serif Pro",
                "serif",
            ],
            sans: [
                "Outfit",
                "-apple-system",
                "BlinkMacSystemFont",
                "avenir next",
                "avenir",
                "segoe ui",
                "helvetica neue",
                "helvetica",
                "Cantarell",
                "Ubuntu",
                "roboto",
                "noto",
                "arial",
                "sans-serif",
            ],
        },
        boxShadow: {
            "hard-lg": "-4px 4px 0px 0px #000",
            hard: "-2px 2px 0px 0px #000",
        },
        extend: {
            screens: {
                xl: "1260px",
            },
        },
    },
    plugins: [],
    darkMode: "media",
} satisfies Config
