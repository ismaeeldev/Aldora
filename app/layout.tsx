import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/lib/providers/query-provider";
import { Navbar, ConditionalFooter } from "@/components/layout";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://liora.com"),
  title: {
    default: "Liora | Urgent Behavioral Health Placement",
    template: "%s | Liora",
  },
  description: "Find immediate placement in trusted behavioral health facilities, treatment centers, and recovery homes.",
  keywords: ["behavioral health", "treatment centers", "recovery homes", "urgent placement", "mental health care"],
  authors: [{ name: "Liora Team" }],
  creator: "Liora",
  publisher: "Liora Platform",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://liora.com",
    siteName: "Liora Placement",
    title: "Liora | Urgent Behavioral Health Placement",
    description: "Find immediate placement in trusted behavioral health facilities, treatment centers, and recovery homes.",
    images: [
      {
        url: "/images/wellness_hero_bg.png",
        width: 1200,
        height: 630,
        alt: "Liora Placement Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liora | Urgent Behavioral Health Placement",
    description: "Find immediate placement in trusted behavioral health facilities, treatment centers, and recovery homes.",
    images: ["/images/wellness_hero_bg.png"],
    creator: "@lioraplatform",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
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
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className={`min-h-full flex flex-col ${inter.className}`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
          >
            <Navbar />
            <div className="flex-grow flex flex-col min-w-0">
              {children}
            </div>
            <ConditionalFooter />
            <Toaster richColors position="top-center" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
