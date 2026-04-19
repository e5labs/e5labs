import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "E5Labs — Engineering That Changes the Outcome",
  description:
    "E5Labs builds high-performance web applications, developer tooling, and cloud infrastructure for teams where engineering quality is the difference between shipping and succeeding. Remote-first. Production-obsessed.",
  metadataBase: new URL("https://e5labs.com"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "E5Labs — Engineering That Changes the Outcome",
    description:
      "Web applications, developer tools, and cloud infrastructure built by engineers who own the result — from first commit to production health check.",
    url: "https://e5labs.com",
    siteName: "E5Labs",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "E5Labs — Engineering That Changes the Outcome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E5Labs — Engineering That Changes the Outcome",
    description:
      "Web applications, developer tools, and cloud infrastructure built by engineers who own the result — from first commit to production health check.",
    images: [
      {
        url: "/opengraph-image",
        alt: "E5Labs — Engineering That Changes the Outcome",
      },
    ],
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