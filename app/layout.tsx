import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col ">
            <div className="flex-1 w-full flex flex-col gap-20 ">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full flex justify-between  p-3 px-5 text-sm">
                  <div className="flex gap-5  font-semibold">
                    <Link href={"/"}>CRUD Supabase</Link>

                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-20 p-5">
                {children}
              </div>

              {/*  <footer className="w-full flex  justify-center border-t mx-auto text-center text-xs gap-8 py-16">

                <ThemeSwitcher />
              </footer> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}