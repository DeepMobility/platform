import type { Viewport, Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DeepMobility",
  description: "Pour vos routines musculaires",
  robots: { index: false }
};

export const viewport: Viewport = {
  themeColor: 'only light',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" crossOrigin="use-credentials" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.4/dist/add-to-homescreen.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/gh/philfung/add-to-homescreen@3.4/dist/add-to-homescreen_fr.min.js"
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
