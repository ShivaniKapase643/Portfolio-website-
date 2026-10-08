import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BlueprintBackdrop } from "@/components/layout/blueprint-backdrop";
import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { AppProviders } from "@/components/providers/app-providers";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { profile } from "@/lib/data/profile";
import { display, mono, sans } from "@/lib/fonts";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  applicationName: `${profile.name} — Portfolio`,
  keywords: [
    "Shivani Kapase",
    "Computer Engineering student",
    "Full-stack developer",
    "Software developer",
    "MERN",
    "Next.js",
    "FastAPI",
    "Data analytics",
    "AI applications",
    "MES Wadia College of Engineering",
    "Pune",
  ],
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title: siteTitle,
    description: siteDescription,
    locale: "en_IN",
    firstName: "Shivani",
    lastName: "Kapase",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0c10" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
  ],
  colorScheme: "dark light",
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
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <head>
        {/* Without JavaScript, scroll-reveal content and counters must stay visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}[data-counter-anim]{display:none!important}[data-counter-final]{position:static!important;width:auto!important;height:auto!important;margin:0!important;overflow:visible!important;clip:auto!important;white-space:normal!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AppProviders>
            <div className="grain" aria-hidden />
            <BlueprintBackdrop />
            <Nav />
            <main id="main" tabIndex={-1} className="relative focus:outline-none">
              {children}
            </main>
            <Footer />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
