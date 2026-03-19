import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura QR | Professional QR Code Generator",
  description: "Create modern, high-quality QR codes for business and personal use. Quick, easy, and customizable.",
  keywords: ["QR Code Generator", "Custom QR", "Smart QR", "Marketing Tools", "Next.js QR"],
  openGraph: {
    title: "Smart QR Generator",
    description: "Professional grade QR code creation tool.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
