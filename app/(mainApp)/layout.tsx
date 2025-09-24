import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ProviderTheme } from "@/components/layout/ProviderTheme";
import ProviderQuery from "@/components/layout/ProviderQuery";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const DmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Movie App",
    template: "%s | Movie App",
  },
  description: "Movie App with Sidebar and Header",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${DmSans.variable} antialiased min-h-screen bg-muted`}>
        <SessionProvider>
          <ProviderQuery>
            <ProviderTheme>
              <div className="grid grid-rows-[auto_1fr] lg:grid-cols-[250px_1fr] min-h-screen">
                <header className="lg:col-span-2">
                  <Header />
                </header>

                {/* Sidebar only on large screens */}
                <aside className="hidden lg:block">
                  <Sidebar />
                </aside>

                {/* Main content */}
                <main className="p-3 lg:p-6">{children}</main>
              </div>
            </ProviderTheme>
            <Toaster position="top-right" reverseOrder={false} />
          </ProviderQuery>
        </SessionProvider>
      </body>
    </html>
  );
}
