/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                car: 'url(./assets/car3.jpg)',
            },
        },
    },
    plugins: [],
};

// require('@tailwindcss/line-clamp'),
// ...
