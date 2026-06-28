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
  title: "Open Recruitment Panitia FTRN #5 — Festival Teater Remaja Nusantara",
  description:
    "Pendaftaran panitia Festival Teater Remaja Nusantara #5 (3-8 Agustus 2026). Festival teater skala nasional oleh HMJ Teater ISI Yogyakarta.",
  keywords: [
    "FTRN",
    "Festival Teater Remaja Nusantara",
    "Open Recruitment",
    "Panitia",
    "ISI Yogyakarta",
    "HMJ Teater",
    "Teater",
  ],
  authors: [{ name: "HMJ Teater ISI Yogyakarta" }],
  icons: {
    icon: "/ftrn-logo.png",
    apple: "/ftrn-logo.png",
  },
  openGraph: {
    title: "Open Recruitment Panitia FTRN #5",
    description:
      "Festival Teater Remaja Nusantara #5 — 3-8 Agustus 2026. Bergabung jadi panitia panggung terbesar nasional.",
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
