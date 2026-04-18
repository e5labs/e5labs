import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "E5Labs — We Build Software That Matters",
  description:
    "E5Labs is a software engineering firm that builds high-performance applications, developer tools, and cloud infrastructure. We ship reliable software for teams that can't afford to ship anything less.",
  metadataBase: new URL("https://e5labs.com"),
  openGraph: {
    title: "E5Labs — We Build Software That Matters",
    description:
      "High-performance applications, developer tools, and cloud infrastructure — built by engineers who stay until it works.",
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