import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: "GrantMatch AI | Find Your Grants",
  description: "Find the grants your business may qualify for in minutes using AI.",
};

import { ErrorBoundary } from "@/components/common/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased font-sans bg-paper`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
        <ErrorBoundary>
          <div className="flex-1 flex flex-col w-full mx-auto">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
