import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: "Paul's Roofing - Southern NB Specialist",
  description: "30 Years on the Roof. Ready for Yours. Southern New Brunswick's Premier Metal Roofing Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Roboto+Slab:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
