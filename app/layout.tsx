import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somil Pachauri | Portfolio",
  description: "A Full-stack developer building immersive websites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // THE FIX: Add suppressHydrationWarning here and on the body!
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}