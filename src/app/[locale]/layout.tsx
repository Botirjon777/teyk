import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import BottomNav from "@/components/ui/BottomNav";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "Coffee Take - Fresh Coffee Delivered",
  description: "Order your favorite coffee drinks and get them delivered fresh",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <Script
          src="https://api-maps.yandex.ru/v3/?apikey=4aaff061-a4fe-409d-9c0d-1452a5c030ce&lang=en_US"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased font-mabry">
        <NextIntlClientProvider messages={messages}>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#007B6A",
                color: "#fff",
                fontFamily: "var(--font-mabry-pro)",
              },
              success: {
                iconTheme: {
                  primary: "#007B6A",
                  secondary: "#fff",
                },
              },
            }}
          />
          {children}
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
