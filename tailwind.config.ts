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
        "cafe-small": "url(/cafe-small.jpg)",
      },
      fontSize: {
        clamp: "clamp(1rem, 5vw, 1.25rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
