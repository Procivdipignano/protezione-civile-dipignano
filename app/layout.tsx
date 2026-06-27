import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Protezione Civile Dipignano",
  description: "Gruppo Volontari Protezione Civile del Comune di Dipignano (CS)",
  openGraph: {
    title: "Protezione Civile Dipignano",
    description: "Gruppo Volontari Protezione Civile del Comune di Dipignano (CS)",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
