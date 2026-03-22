import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dylan的博客",
  description: "一个使用 Next.js 构建的个人博客",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold hover:text-indigo-500 transition-colors"
            >
              Dylan的博客
            </Link>
            <div className="flex gap-6 text-sm">
              <Link
                href="/"
                className="hover:text-indigo-500 transition-colors"
              >
                首页
              </Link>
              <Link
                href="/categories"
                className="hover:text-indigo-500 transition-colors"
              >
                分类
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1 max-w-3xl mx-auto px-6 py-10 w-full">
          {children}
        </main>

        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-3xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Dylan的博客. Built with Next.js.
          </div>
        </footer>
      </body>
    </html>
  );
}
