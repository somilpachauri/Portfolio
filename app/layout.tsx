import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/ui/CustomCursor";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}