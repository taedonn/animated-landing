/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                d: {
                    2: '#202020',
                    3: '#3C4043',
                    6: '#646568',
                    g: '#40E0D0'
                }
            }
        },
    },
    plugins: [],
}