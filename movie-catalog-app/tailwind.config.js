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
      "42px": "62px",
    },
    height: {
      "100%": "100%",
      "42px": "62px",
    },
  },
  plugins: [],
};
