import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Recruitment Panitia FTRN #5 — Festival Teater Rakyat Nasional",
  description:
    "Pendaftaran panitia Festival Teater Rakyat Nasional #5 (3-8 Agustus 2026). Festival teater skala nasional oleh HMJ Teater ISI Yogyakarta. Ayo bergabung jadi bagian dari panggung terbesar ini!",
  keywords: [
    "FTRN",
    "Festival Teater Rakyat Nasional",
    "Open Recruitment",
    "Panitia",
    "ISI Yogyakarta",
    "HMJ Teater",
    "Teater",
  ],
  authors: [{ name: "HMJ Teater ISI Yogyakarta" }],
  openGraph: {
    title: "Open Recruitment Panitia FTRN #5",
    description:
      "Festival Teater Rakyat Nasional #5 — 3-8 Agustus 2026. Bergabung jadi panitia panggung terbesar nasional.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster richColors position="top-center" />
      </body>
    </html>
  );
}
