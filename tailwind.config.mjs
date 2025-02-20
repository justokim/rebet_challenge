/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sliderOrangeLight: "rgba(37, 37, 47, 1)",
        sliderOrangeDark: "rgba(20, 20, 27, 1)",
        sliderOrangeBorderLight: "rgba(252, 66, 51, 0.5)",
        sliderOrangeBorderDark: "rgba(255, 238, 146, 1)",
        sliderRedLight: "rgba(98, 22, 49, 1)",
        sliderRedDark: "rgba(255, 90, 139, 1)",
        sliderRedBorderLight: "rgba(98, 22, 49, 1)",
        sliderRedBorderDark: "rgba(218, 73, 108, 1)",
        sliderGreenLight: "rgba(27, 125, 67, 1)",
        sliderGreenDark: "rgba(108, 231, 150, 1)",
        sliderGreenBorderLight: "rgba(26, 80, 62, 1)",
        sliderGreenBorderDark: "rgba(64, 198, 134, 1)",
        redText: "rgba(128, 32, 55, 1)",
        greenText: "rgba(7, 110, 73, 1)",
      },
    },
  },
  plugins: [],
};
