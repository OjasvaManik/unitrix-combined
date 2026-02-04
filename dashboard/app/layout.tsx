import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { architectsDaughter } from "@/types/fonts";
import NavBar from "@/components/nav-bar";
import React from "react";

export const metadata: Metadata = {
  title: "Unitrix",
  description: "I don't know what to put here",
  icons: {
    icon: "/icon-dark.png",
  },
};

export default function RootLayout( {
                                      children,
                                    }: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className={ cn( architectsDaughter.className, "relative min-h-screen lg:pb-16 pb-20 space-y-2" ) }>
        { children }

        <div className="fixed bottom-0 left-0 right-0 z-50 w-full pointer-events-none flex justify-center">
          <div className="w-full pointer-events-auto">
            {/* No props needed now, it handles itself */ }
            <NavBar/>
          </div>
        </div>
      </div>
    </ThemeProvider>
    </body>
    </html>
  );
}