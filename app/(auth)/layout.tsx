import { ProviderTheme } from "@/components/layout/ProviderTheme";
import "../globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center ">
        <ProviderTheme>{children}</ProviderTheme>
      </body>
    </html>
  );
}
