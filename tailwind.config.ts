import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        cafe: "url(/cafe.jpg)",
        'cafe-small': "url(/cafe-small.jpg)"
      }
    },
  },
  plugins: [],
} satisfies Config;
