import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    1: '#1C1F2E',
                    2: '#161925',
                },
                blue: {
                    1: '#5EEAD4',
                },
                sky: {
                    1: '#C4F9EB',
                },
                orange: {
                    1: '#FF742E',
                },
                purple: {
                    1: '#830EF9',
                },
                yellow: {
                    1: '#F9A90E',
                },
            },
            backgroundImage: {
                hero: "url('/images/hero-background.png')",
            },
        },
    },
    plugins: [],
};
export default config;