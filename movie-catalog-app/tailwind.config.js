/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      cyberPurple: "#711c91",
      cyberPink: "#ea00d9",
      cyberBlue: "#133e7c",
      cyberDarkBlue: "#091833",
      cyberTurquoise: "#0abdc6",
      cyberGreen: "	#00ff9f"
    },
    margin: {
      quarterTopScreen: "25%",
      halfScreen: "50%",
      halfVh: "50vh",
    },
    width: {
      "150px": "150px",
      "257px": "257px",
      "100%": "100%",
      "24px": "24px",
      "62px": "62px",
      "95%": "95%",
    },
    height: {
      "100%": "100%",
      "62px": "62px",
    },
  },
  plugins: [],
};
