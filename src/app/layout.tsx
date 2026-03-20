import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bluecorestudio.com"),
  title: {
    default: "Bluecore Studios — Engineering for Ambitious Products",
    template: "%s | Bluecore Studios",
  },
  description:
    "We design and build production-grade software — from AI systems and financial infrastructure to complex backends and data pipelines.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Bluecore Studios",
    title: "Bluecore Studios — Engineering for Ambitious Products",
    description:
      "A modern dev shop that ships. AI systems, financial infrastructure, complex backends — built to production standard.",
    type: "website",
    url: "https://bluecorestudio.com",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Bluecore Studios",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluecore Studios — Engineering for Ambitious Products",
    description:
      "A modern dev shop that ships. AI systems, financial infrastructure, complex backends — built to production standard.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
