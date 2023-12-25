import "~/styles/globals.css";

import {
  // Inter,
  Pixelify_Sans,
} from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Idle Cat Cafe",
  description: "The best cat cafe game ever",
  icons: [{ rel: "icon", url: "/icons/favicon.ico" }], // TODO: add the rest of the icons
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${pixelifySans.variable} ${pixelifySans.className}`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
