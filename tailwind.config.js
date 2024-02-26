/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        '"InterVariable", "system-ui", "Helvetica", "Arial", "sans-serif"',
        {
          fontFeatureSettings: '"ss04"',
        },
      ],
      mono: ["ui-monospace", "Menlo", "Monaco", "monospace"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
};
