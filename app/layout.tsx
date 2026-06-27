import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Protezione Civile Dipignano",
  description: "Gruppo di volontari della Protezione Civile di Dipignano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
