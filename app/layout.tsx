import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sur La Liste",
  description: "Yet another todo list",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
