import { defineConfig, presetUno, presetWebFonts, transformerDirectives } from "unocss"

export default defineConfig({
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
            ].join(", "),
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
            ].join(", "),
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
            ].join(", "),
        },
        boxShadow: {
            "hard-lg": "-4px 4px 0px 0px #000",
            hard: "-2px 2px 0px 0px #000",
        },
    },
    presets: [
        presetUno({ dark: "media" }),
        presetWebFonts({
            provider: "google",
            fonts: {
                sans: {
                    name: "Outfit",
                    weights: ["600"],
                },
            },
        }),
    ],
    transformers: [transformerDirectives()],
})
