import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clock 2",
  description: "A focused clock display"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
