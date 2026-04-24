import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { Lexend } from "next/font/google";

const lexendSans = Lexend({
  variable: "--font-lexend-sans",
  subsets: ["latin"],
});

export const theme = createTheme({
  fontFamily: `${lexendSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
  primaryColor: "orange",
  colors: {
    orange: [
      "#fff7e1",
      "#ffedcb",
      "#ffd99a",
      "#ffc464",
      "#ffb237",
      "#ffa61b",
      "#ff9d00",
      "#e38c00",
      "#cb7b00",
      "#b06900",
    ],
    black: [
      "#f5f5f5",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#000000",
    ],
  },
});
