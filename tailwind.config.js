/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
            "./node_modules/react-tailwindcss-select/dist/index.esm.js"],
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
    colors: {
      white: "#FBF5EF",
      "light-pink": "#F8DCD8",
      "dark-pink": "#F28482",
      grey: "#D9D9D9",
      "dark-grey": "#353839",
      yellow: "#FADDAD",
      green: "#84A59D",
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F8DCD8",
          secondary: "#F28482",
          accent: "#84A59D",
          neutral: "#353839",
          "base-100": "#FBF5EF",
          info: "#FADDAD",
          success: "#33B400",
          warning: "#FF7800",
          error: "#CE2029",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
