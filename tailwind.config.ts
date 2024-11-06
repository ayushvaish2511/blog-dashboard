import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#4CAF50', // Light green for primary accents
            secondary: '#4a90e2', // Bluish color for secondary accents
            background: '#f7fafc', // Very light background
        },
        borderRadius: {
            'lg': '12px',
        },
    },
},

  plugins: [],
};
export default config;
