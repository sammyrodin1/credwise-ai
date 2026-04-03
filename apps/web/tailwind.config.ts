import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102133",
        sand: "#f7f2eb",
        mist: "#e6eef5",
        sky: "#cfe8ff",
        pine: "#1f4d3d",
        gold: "#b78628",
      },
      boxShadow: {
        card: "0 18px 50px rgba(16, 33, 51, 0.08)",
      },
      borderRadius: {
        xl2: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
