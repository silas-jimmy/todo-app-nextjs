import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { Lexend } from "next/font/google";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const theme = createTheme({
  /** Your theme override here */
  fontFamily: `${lexendSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  primaryColor: "blue",
  colors: {
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
});
