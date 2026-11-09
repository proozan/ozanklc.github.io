import type { Metadata } from "next";
import SidebarNav from "@/components/SidebarNav";
import { getAllContent } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ozan Kılıç — Kişisel Arşiv & Algoritmalar",
  description:
    "Yazdığım algoritmaları, teknik yazıları ve fotoğraf karelerini biriktirdiğim kişisel arşiv.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projectCount = getAllContent("projects").length;
  const blogCount = getAllContent("blog").length;

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-dvh text-base">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-10 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
            <SidebarNav projectCount={projectCount} blogCount={blogCount} />
            <main className="md:col-span-8 min-w-0">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
