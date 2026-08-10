import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { business } from "@/config/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCallBar } from "@/components/StickyCallBar";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, webSiteSchema } from "@/lib/schema";

const bigShoulders = localFont({
  src: "./fonts/big-shoulders-latin.woff2",
  variable: "--font-big-shoulders",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: false,
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: "Garage Door Repair Chicago, IL | 24/6 Same-Day Service",
  description:
    "Family-owned garage door repair serving Chicago & all of Chicagoland. Springs, cables, openers & installation — open 24 hours Mon–Sat. Book online, save 10%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShoulders.variable} ${libreFranklin.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col pb-16 md:pb-0">
        <JsonLd data={localBusinessSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
