import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import BottomNav from "@/components/ui/BottomNav";

export const metadata: Metadata = {
  title: "Coffee Take - Fresh Coffee Delivered",
  description: "Order your favorite coffee drinks and get them delivered fresh",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
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
      </body>
    </html>
  );
}
