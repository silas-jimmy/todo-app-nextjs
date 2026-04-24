import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { theme } from "./constants/theme";

import '@mantine/core/styles.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo app",
  description: "Track your todos with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">{children}</MantineProvider>
      </body>
    </html>
  );
}
