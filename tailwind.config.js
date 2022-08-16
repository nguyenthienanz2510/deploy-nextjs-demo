/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-primary": "#EB6300",
        "color-secondary": "#107CEC",
        "color-text": "#4F4F4F",
        "color-background": "#E5E5E5",
        "color-black": "black",
        "color-white": "white",
        "color-border": "#C8CACD",
        "color-grey": "#828282",
      },
      backgroundImage: {
        "background-button": "linear-gradient(to right,  #F83600,#FE8C00)",
      },
    },
  },
  plugins: [],
};
