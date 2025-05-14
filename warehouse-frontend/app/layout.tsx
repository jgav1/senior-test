import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Warehouse System',
  description: 'Modern warehouse dashboard for operations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <nav className="bg-white shadow px-6 py-4 flex gap-6 text-lg font-semibold">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/parts">Parts</Link>
          <Link href="/orders">Orders</Link>          
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}