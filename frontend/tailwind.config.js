/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                gray:{
                    100 : "#eeedef",
                    200 : "#e6e6ec",
                    600 : "#828185"
                },
                purple:{
                    200 : "#d6d8ef",
                    500 : "#8482b2",
                    600 : "#6656b3"
                }
            }
        },
    },
    plugins: [],
}
