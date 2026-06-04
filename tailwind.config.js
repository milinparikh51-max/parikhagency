/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7c3aed', // Cyber Purple
                    dark: '#5b21b6',
                    light: '#0066ff', // Electric Blue
                },
                accent: {
                    DEFAULT: '#00a896', // Dark Cyan
                    hover: '#008272',
                },
                dark: {
                    bg: '#080710',
                    card: '#131125',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
