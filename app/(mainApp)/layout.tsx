import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { ProviderTheme } from "@/components/layout/ProviderTheme";
import ProviderQuery from "@/components/layout/ProviderQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const DmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie App",
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
        <ProviderQuery>
          <ProviderTheme>
            <div className="grid grid-rows-[auto_1fr] lg:grid-cols-[250px_1fr] min-h-screen">
              {/* Header always on top */}
              <header className="lg:col-span-2">
                <Header />
              </header>

              {/* Sidebar only on large screens */}
              <aside className="hidden lg:block">
                <Sidebar />
              </aside>

              {/* Main content */}
              <main className="p-6 ">{children}</main>
            </div>
          </ProviderTheme>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </ProviderQuery>
      </body>
    </html>
  );
}
