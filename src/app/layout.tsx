import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Shopify Migration Readiness Assessment | Avenue Z",
  description:
    "Evaluate whether your brand is ready to migrate to Shopify. Get personalized scores across fit, readiness, confidence, and complexity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
