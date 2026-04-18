import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "E5Labs — Software Development",
  description:
    "E5Labs is a software development firm concentrating on software development efforts. We build robust, scalable solutions for modern businesses.",
  metadataBase: new URL("https://e5labs.com"),
  openGraph: {
    title: "E5Labs — Software Development",
    description:
      "E5Labs is a software development firm concentrating on software development efforts.",
    url: "https://e5labs.com",
    siteName: "E5Labs",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-body">
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}