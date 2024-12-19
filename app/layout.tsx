import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeModeProvider from "@/components/theme-provider";



const font_sans = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',

})

export const metadata: Metadata = {
  title: "SyncCare",
  description: "healthcare management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`min-h-screen bg-dark-300 font-sans antialiased`, font_sans.variable)}
      >
        <ThemeModeProvider>
          {children}
        </ThemeModeProvider>
      </body>
    </html>
  );
}