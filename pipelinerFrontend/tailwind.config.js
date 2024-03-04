// @type {import('tailwindcss').Config}
module.exports = {
    important: true,
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#f2f7fd",
                    100: "#e5eef9",
                    200: "#c4dbf3",
                    300: "#90bde9",
                    400: "#559bdb",
                    500: "#3182ce",
                    600: "#2062a9",
                    700: "#1a4472",
                    800: "#2d3748",
                    900: "#1a202c",
                    950: "#171923",
                },
                secondary: {
                    50: "#f2f7fd",
                    100: "#e5eef9",
                    200: "#c4dbf3",
                    300: "#90bde9",
                    400: "#559bdb",
                    500: "#3182ce",
                    600: "#2062a9",
                    700: "#1b4f89",
                    800: "#1a4472",
                    900: "#1b3a5f",
                    950: "#12253f",
                },
            },
        },
    },
    plugins: [],
};
