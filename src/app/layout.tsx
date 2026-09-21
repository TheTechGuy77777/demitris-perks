import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { AppFrame } from "@/components/layout/AppFrame";
import { Toaster } from "@/components/ui/Toaster";
import { DirectionContract } from "@/components/layout/DirectionContract";
import { en } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Archivo carries the savings values and headings — the broadsheet voice. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${en.brand.name} — ${en.brand.tagline}`,
    template: `%s · ${en.brand.name}`,
  },
  description:
    "Find products, coupons and loyalty stamps, register purchases with receipts, and enter prize competitions.",
  manifest: "/manifest.webmanifest",
  applicationName: en.brand.name,
};

export const viewport: Viewport = {
  themeColor: "#FBFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <DirectionContract />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          {en.nav.skipToContent}
        </a>
        <AppFrame>{children}</AppFrame>
        <Toaster />
      </body>
    </html>
  );
}
