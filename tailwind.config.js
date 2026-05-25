export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1440px",
      },
      screens: {
        xs: "320px",
        sm: "375px",
        sml: "500px",
        md: "667px",
        mdl: "768px",
        lg: "960px",
        lgl: "1024px",
        xl: "1280px",
      },
      fontFamily: {
        bodyFont: ["DM Sans", "sans-serif"],
        titleFont: ["Poppins", "sans-serif"],
      },
      colors: {
        primeColor: "#262626",
        lightText: "#6D6D6D",
        brand: {
          orange: "#FF8533",
          ember: "#FF6A00",
          ink: "#262626",
          mist: "#F5F5F3",
          teal: "#00A6A6",
        },
      },
      boxShadow: {
        testShadow: "0px 24px 70px -34px rgba(38, 38, 38, 0.45)",
        glass: "0 24px 70px -34px rgba(38, 38, 38, 0.38)",
      },
    },
  },
  plugins: [],
};
