import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumePro AI — Create Professional ATS-Friendly Resumes",
  description: "Create Professional ATS-Friendly Resumes That Get Interviews",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 font-sans overflow-x-hidden">
        <Providers>
          <div className="print:hidden">
            <NavBar />
          </div>
          <div className="flex flex-1 flex-col">{children}</div>
          <div className="print:hidden">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
