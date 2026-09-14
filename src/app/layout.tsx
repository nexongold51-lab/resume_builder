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
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? "http://localhost:3000"),
  title: {
    default: "ResumePro AI — Create Professional ATS-Friendly Resumes",
    template: "%s · ResumePro AI",
  },
  description:
    "Build job-winning, ATS-friendly resumes with 50 professional templates. Live preview, auto-save, and instant PDF export.",
  keywords: ["resume builder", "ATS resume", "resume templates", "CV builder", "job application"],
  openGraph: {
    title: "ResumePro AI — Create Professional ATS-Friendly Resumes",
    description: "Build job-winning, ATS-friendly resumes with 50 professional templates in minutes.",
    type: "website",
    siteName: "ResumePro AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumePro AI — Create Professional ATS-Friendly Resumes",
    description: "Build job-winning, ATS-friendly resumes with 50 professional templates in minutes.",
  },
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
