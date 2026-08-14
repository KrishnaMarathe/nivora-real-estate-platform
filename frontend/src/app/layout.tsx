import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nivora | South Bombay Property Advisors",
    template: "%s | Nivora",
  },
  description:
    "Discover homes, studios and commercial properties to buy or rent across South Bombay.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}