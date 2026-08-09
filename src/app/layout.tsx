import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CommandPalette } from "@/components/layout/command-palette";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { BackToTop } from "@/components/layout/back-to-top";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Java backend engineer",
    "Spring Boot developer",
    "enterprise software engineer",
    "system architecture",
    "REST API development",
    "cloud migration Java",
    "Upwork Java developer",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.social.upwork],
  knowsAbout: [
    "Java",
    "Spring Boot",
    "System Architecture",
    "REST APIs",
    "Distributed Systems",
    "Cloud Migration",
    "Apache Kafka",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <TooltipProvider>
          <NextTopLoader color="#3b82f6" height={2.5} showSpinner={false} shadow="0 0 10px #3b82f6,0 0 5px #3b82f6" />
          <ScrollProgress />
          <Navbar />
          <CommandPalette />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </TooltipProvider>
      </body>
    </html>
  );
}
