/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".h-full-minus-header": {
          height: "calc(100vh - 51px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
